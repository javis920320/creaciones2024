<?php

namespace App\Http\Controllers;

use App\Http\Resources\AsignacionResource;
use App\Http\Resources\PedidoResource;
use App\Models\Asignacion;
use App\Models\Empleado;
use App\Models\Order;
use App\Models\Pedido;
use App\Models\Product;
use Carbon\Carbon;
use Carbon\Traits\ToStringFormat;
use Date;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AsignacionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $pedidos = Pedido::where("estado", "Producción en curso")->paginate(20);

        return Inertia("Pedidos/Asignacion", [
            "pedidos" => PedidoResource::collection($pedidos)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Pedido $pedido)
    {


        //

        $empleados = Empleado::where("cargo", "Operador")->orWhere("cargo", "Operador Externo")->orWhere("cargo", "Administrador")->get();

        $pedidoseleleccionado = Pedido::where("id", $pedido->id)->get();

        return Inertia("Asignacion/Create", [
            "pedido" => PedidoResource::collection($pedidoseleleccionado),
            "empleados" => $empleados


        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->merge([
            'fecha_asignacion' => Carbon::now()->format('Y-m-d'),
            'estado' => "asignado"
        ]);

        $order = Order::find($request->order_id);
        //verificar si existe la orden
        if (!$order) {
            return redirect()->back()->with("error", "La orden no existe");
        }

        $limitcantidad = $order->cantidad;

        $ordenesOcupadas = Asignacion::where("order_id", $request->order_id)->sum("cantidad");



        if (($ordenesOcupadas + $request->cantidad) > $limitcantidad) {
            return redirect()->back()->with("error", "La cantidad solicitada excede la cantidad disponible.");
        }



        // Validar los campos del formulario
        $validaciones = $request->validate([
            'empleado_id' => 'required|exists:empleados,id',
            'order_id' => 'required|exists:orders,id',
            "cantidad" => "required",
            "producto" => "required",
            'tipocosto' => 'required|in:operador_normal,hora_extra,externo_normal,sin_costo',
            'fecha_asignacion' => 'required|date',
            'estado' => 'required',
            //'estado' => 'required|in:asignado,terminado',
        ]);



        $producto = Product::where("id", $request->producto)->first();

        $precioProducto = $this->calcularPrecioProducto($producto, $validaciones["tipocosto"]);


        // Crear la asignación con los datos validados

        $asignacion = Asignacion::create([
            'empleado_id' => $validaciones['empleado_id'],
            'order_id' => $validaciones['order_id'],
            'cantidad' => $validaciones['cantidad'],
            'fecha_asignacion' => $validaciones['fecha_asignacion'],
            "tipocosto" => $validaciones["tipocosto"],
            //calculo de costos
            'costo' => $validaciones['cantidad'] * $precioProducto,
            'estado' => $validaciones['estado'],
        ]);

        $totalAsignado = Asignacion::where("order_id", $request->order_id)->sum("cantidad");
        if ($totalAsignado >= $limitcantidad) {

            $order->estado = 'completado';
            $order->save();

            $order->pedido->verificarEstado();



        }


        return redirect()->back()->with('success', 'Exitos');



    }


    private function calcularPrecioProducto($producto, $tipoCosto)
    {


        switch ($tipoCosto) {
            case 'operador_normal':
                return $producto->costo_produccion;
            case 'hora_extra':
                return $producto->costoProduccionExtra;
            case 'externo_normal':
                return $producto->costoExterno;
            default:
                return 0;  // Sin costo
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(string $orden)
    {
        $asignaciones = Asignacion::where("order_id", $orden)->get();
        return response()->json($asignaciones);

    }
    public function asignacionorden($orden)
    {


        $ordernasignadas = Asignacion::where("order_id", $orden)->get();
        //dd($ordernasignadas);

        return inertia("Asignacion/Listar", [
            "ordenes" => AsignacionResource::collection($ordernasignadas)
        ]);

    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asignacion $asignacion)
    {

        $orden = Order::where("id", $asignacion->order_id)->first();
        $asignacion->delete();
        $orden->estado = "creado";
        $orden->save();

        return redirect()->route('asignacion.create', $asignacion->orden->pedidoId)
            ->with('success', 'Asignación eliminada exitosamente.');
    }
}
