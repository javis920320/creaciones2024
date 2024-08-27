<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrdenResource;
use App\Http\Resources\PedidoResource;
use App\Models\Category;
use App\Models\Order;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($pedido)
    {

        $pedidoInfo = Pedido::where("id", $pedido)->get();
        $ordenes=Order::where("pedidoId",$pedido)->get();
        $categorias = Category::where("status", "active")->get();
        return Inertia("Order/Index", [
            "categorias" => $categorias,
            "pedido" => PedidoResource::collection($pedidoInfo),
            "ordenes"=> OrdenResource::collection($ordenes)

        ]);
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
    public function store(Request $request, $pedido)
    {
        $request["pedidoId"] = $pedido;
        $validaciones = $request->validate([

            "categoria" => "required",
            "producto" => "required",
            "talla" => "required",
            "cantidad" => "required|min:1",
            "precioUnitario" => "nullable",
            "descripcion" => "required"
        ]);
      

        $nuevaOrden = new Order();
        $nuevaOrden->categoriaId = $request->categoria;
        $nuevaOrden->producto=$request->producto;
        $nuevaOrden->descripcion = $request->descripcion;
        $nuevaOrden->talla = $request->talla;
        $nuevaOrden->cantidad = $request->cantidad;
        $nuevaOrden->precioUnitario = $request->precioUnitario;
        $nuevaOrden->pedidoId = $request->pedidoId;
        $nuevaOrden->estado = "creado";
        $resp = $nuevaOrden->save();

        if ($resp) {
            return redirect()->route("order.index",$pedido);
        }


        // Order::create($validaciones);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        $categorias = Category::where("status", "active")->get();
        return  Inertia("Order/Edit",[
            "order"=>$order,
            "categorias"=>$categorias
        ]);

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Order $order)
    {
        
       $validation= $request->validate([
        "categoria" => "required",
        "producto" => "required",
        "talla" => "required",
        "cantidad" => "required|min:1",
        "precioUnitario" => "nullable",
        "descripcion" => "required"
       ]);

       $order->categoriaId=$request->categoria;
       $order->producto=$request->producto;
       $order->talla=$request->talla;
       $order->cantidad=$request->cantidad;
       $order->precioUnitario=$request->precioUnitario;
       $order->descripcion=$request->descripcion;
       

        $order->update();
        return redirect()->route("order.index",$order->pedidoId);


    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
}

