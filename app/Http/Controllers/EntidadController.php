<?php

namespace App\Http\Controllers;

use App\Models\Entidad;
use Illuminate\Http\Request;

class EntidadController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        try {

            $request->validate([
                //'nombre' => 'required|string|max:255|unique:entidads,nombre',
                'nombre' => 'required|string|max:255',
                'tipo' => 'nullable|string',
            ]);
            $entidad = new Entidad();
            if(!$entidad->EntidadandTipoExistente($request->nombre,$request->tipo)){
            $entidad->nombre = $request->nombre;
            $entidad->tipo = $request->tipo;
            $entidad->save();
            return response()->json(['success' => 'Entidad created successfully.', 'newentidad' => $entidad]);
            }else{
                return response()->json(['error' => 'Entidad ya existe.']);
            }
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating entidad.', 'message' => $e->getMessage()])->setStatusCode(500);
        }
        

    }

    public function entidadesTipo($tipo){
        $entidades = Entidad::where('tipo',$tipo)->get();
        return response()->json(['entidades' => $entidades]);
    }   
    /**
     * Display the specified resource.
     */
    public function show(Entidad $entidad)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Entidad $entidad)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Entidad $entidad)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Entidad $entidad)
    {
        //
    }
}
