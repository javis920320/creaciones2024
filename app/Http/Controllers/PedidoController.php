<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrdenResource;
use App\Http\Resources\PedidoResource;
use App\Models\Category;
use App\Models\Client;
use App\Models\HistorialImpresion;
use App\Models\Order;
use App\Models\Pedido;
use Carbon\Carbon;
use iio\libmergepdf\Merger;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\File;

class PedidoController extends Controller
{

    public function index()
    {
        $clients = Client::all();
        return Inertia('Pedidos/Index', [
            "clients" => $clients
        ]);
    }


    public function list(Request $request)
    {

        $filterFactura = $request->get("factura");

        $perPage = $request->get('per_page', 10); // Número de elementos por página
        $estado = $request->get('estado', 'Producción en curso'); // Estado por defecto
        if ($filterFactura) {
            
            $pedidos = Pedido::where('estado', $estado)
                ->where(function ($query) use ($filterFactura) {
                    $query->where('factura', 'like', "%{$filterFactura}%");
                })
                ->paginate($perPage);
                
        } else {
            
            
            $pedidos = Pedido::where('estado', $estado)

                ->paginate($perPage);
        }



        return [
            'data' => PedidoResource::collection($pedidos), // Transformar los datos
            'current_page' => $pedidos->currentPage(),
            'total_pages' => $pedidos->lastPage(),
            'total_items' => $pedidos->total(),
        ];
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request["clientId"] = $request->cliente["id"];

        $validaciones = $request->validate([
            "factura" => "required",
            "cliente" => "required",
            "fecheEntrega" => "date|nullable",
            "clientId" => "required",
            "envioDomicilio" => "nullable",


        ]);


        $nuevopedido = Pedido::create($validaciones);


        if ($nuevopedido) {
            return redirect()->route("order.index", $nuevopedido["id"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($pedido)
    {
        $pedidoseleccionado = Pedido::where("id", $pedido)->get();

        return Inertia("Pedidos/PedidoCancelar", ["pedido" => PedidoResource::collection($pedidoseleccionado)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($pedido)
    {
        //dd($pedido->ordenes());
        $pedidoInfo = Pedido::where("id", $pedido)->get();
        $ordenes = Order::where("pedidoId", $pedido)->get();
        $categorias = Category::where("status", "active")->get();

        return Inertia("Order/Index", [
            "categorias" => $categorias,
            "pedido" => PedidoResource::collection($pedidoInfo),
            "iseditable" => true,
            "ordenes" => OrdenResource::collection($ordenes)

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        //
    }


    public function submit(Request $request, Pedido $idpedido)
    {

        $validaciones = $request->validate([
            "estado" => "required"
        ]);


        if ($idpedido->update($validaciones)) {

            return redirect()->route("pedido.send", $idpedido->id);
        }

    }
    public function pedidoSubmited($pedidoenviado)
    {
        //dd($pedidoenviado);
        $pedido = Pedido::where("id", $pedidoenviado)->get();
        return Inertia('Pedidos/Submited', [
            "pedido" => PedidoResource::collection($pedido)
        ]);
    }

    public function enviarAProduccion(Request $request)
    {


        $pedidos = $request->input('pedidos');



        // Iterar sobre los pedidos y enviar cada uno a producción
        foreach ($pedidos as $pedidoId) {

            $pedido = Pedido::find($pedidoId);

            if ($pedido) {
                $pedido->enviarAProduccion(); // Llama al método en el modelo
            }
        }

        //return redirect()->back()->with('success', 'Los pedidos han sido enviados a producción.');
        $pedidos = Pedido::where("estado", "Pedido enviado")->get();

        return response()->json(PedidoResource::collection($pedidos));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }public function imprimir(Request $request)
    {
        $ids = $request->input('pedidos');
    
        // Recuperar los pedidos seleccionados
        $pedidos = Pedido::whereIn('id', $ids)->get();
        $categorias = Category::where("status", "active")->get();
    
        // Registrar la impresión en el historial
        foreach ($pedidos as $pedido) {
            HistorialImpresion::create([
                'pedido_id' => $pedido->id,
                'fecha_impresion' => Carbon::now(),
                'usuario' => auth()->user()->name,  // Registrar el usuario
                'tipo_impresion' => 'POS',
            ]);
        }
    
        // Crear directorio si no existe
        $ticketsPath = storage_path('tickets');
        if (!File::exists($ticketsPath)) {
            File::makeDirectory($ticketsPath, 0755, true);
        }
    
        // Instanciar el mergeador de PDFs
        $merger = new Merger();
    
        // Generar y agregar PDFs al merger
        foreach ($pedidos as $pedido) {
            // Generar el PDF para cada pedido
            $pdf = PDF::loadView('PDF.tickets', compact('pedido', 'categorias'));
            $pdf->setPaper([0, 0, 250, 400], 'portrait');  // Altura dinámica
    
            // Guardar temporalmente cada PDF en el sistema de archivos
            $pdfPath = $ticketsPath . '/' . $pedido->id . '.pdf';
            $pdf->save($pdfPath);
    
            // Agregar el PDF al merger
            $merger->addFile($pdfPath);
        }
    
        // Combinar los PDFs en un único archivo
        $combinedPdf = $merger->merge();
    
        // Guardar el PDF combinado
        $outputPath = $ticketsPath . '/combined_tickets_' . time() . '.pdf';
        file_put_contents($outputPath, $combinedPdf);
    
        // Eliminar los archivos PDF temporales
        foreach ($pedidos as $pedido) {
            $pdfPath = $ticketsPath . '/' . $pedido->id . '.pdf';
            if (File::exists($pdfPath)) {
                File::delete($pdfPath);
            }
        }
    
        // Retornar el archivo combinado al navegador
        return response()->file($outputPath)->deleteFileAfterSend(true);
    }
    

    public function cancelar_pedido(Pedido $pedido, Request $request)
    {


        $pedido->estado = "Cancelado";
        $pedido->notas = $request->notas;
        $pedido->save();

        return redirect()->route("corteConfeccion.index");

    }

}
