<?php

namespace App\Http\Controllers\Reports;

use App\Http\Controllers\Controller;
use App\Models\Asignacion;
use App\Models\Cobro;
use Barryvdh\DomPDF\Facade\Pdf;

use Illuminate\Http\Request;

class AlmacenReportController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

       
        $asignacion = new Asignacion();
        $Listasignaciones = $asignacion->obtenerAsignaciones();
        $costosproduccion = $asignacion->obtenerCostosProduccion();

        return inertia("Reports/Index",["costosproduccion" => $costosproduccion, "asignaciones" => $Listasignaciones]); 
        
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
