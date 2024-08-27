<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Pedido;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients=Client::all();
        return Inertia('Pedidos/Index',[
            "clients"=>$clients
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
    public function store(Request $request)
    {
        $request["clientId"]=$request->cliente["id"];

        $validaciones = $request->validate([
            "factura" => "required",
            "cliente" => "required",
            "fecheEntrega" => "date|nullable",
            "clientId"=> "required",
            "envioDomicilio"=>"nullable",
            

        ]);


        $nuevopedido = Pedido::create($validaciones);

        
        if ($nuevopedido) {
         return  redirect()->route("order.index",$nuevopedido["id"]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pedido $pedido)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        //
    }


    public function submit(Request $request, Pedido $idpedido){

        $validaciones=$request->validate([
                "estado"=>"required"
        ]);

        
       if( $idpedido->update($validaciones)){
        return redirect()->route("pedido.send");
       }
        
    }
    
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        //
    }
}
