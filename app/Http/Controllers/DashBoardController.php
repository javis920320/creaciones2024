<?php

namespace App\Http\Controllers;

use App\Http\Resources\AsignacionResource;
use App\Models\Asignacion;
use App\Models\Client;
use App\Models\Cobro;
use App\Models\Empleado;
use App\Models\Pedido;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashBoardController extends Controller
{
    public function Index()
    {
        /* $asignacion = new Asignacion();
        $Listasignaciones = $asignacion->obtenerAsignaciones();
        $costosproduccion = $asignacion->obtenerCostosProduccion(); */





        return Inertia("Dashboard");
        //return Inertia::render('Dashboard', ["costosproduccion" => $costosproduccion, "asignaciones" => $Listasignaciones]);
    }
}
