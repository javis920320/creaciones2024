<?php

namespace App\Http\Controllers;

use App\Http\Resources\PedidoResource;
use App\Models\HistorialImpresion;
use App\Models\Pedido;
use Illuminate\Http\Request;

class CorteConfeccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $pedidos = Pedido::where("estado", "Pedido enviado")->get();
       
        return inertia("Corte/Index", [
            "pedidos" => PedidoResource::collection($pedidos)
        ]);
    }
    public function getPedidos()
    {
        $pedidos = Pedido::where("estado", "Pedido enviado")->get();

        return response()->json( PedidoResource::collection($pedidos));
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function destroy(string $id)
    {
        //
    }
}
