<?php

namespace App\Http\Controllers;

use App\Models\Programa;
use Illuminate\Http\Request;

class ProgramaController extends Controller
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
                'nombre' => 'required|string|max:255',
                'entidad_id' => 'nullable|integer', 
            ]);
            $programa = new Programa();
            if(!$programa->ProgramaandEntidad($request->nombre,$request-> entidad_id )){
            $programa->nombre = $request->nombre;
            $programa->entidad_id = $request->entidad_id;
            $programa->save();
            return response()->json(['success' => 'Programa created successfully.', 'newprograma' => $programa]);
            }else{
                return response()->json(['error' => 'Programa ya existe.']);
            }
            
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error creating programa.', 'message' => $e->getMessage()])->setStatusCode(500);
        }   
    }

    /**
     * Display the specified resource.
     */
    public function show(Programa $programa)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Programa $programa)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Programa $programa)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Programa $programa)
    {
        //
    }
}
