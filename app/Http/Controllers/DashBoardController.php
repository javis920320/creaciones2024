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
        $empleados = Empleado::all();
        $clientes = Client::all();
        $products = Product::all();
        $cortes=Pedido::where("estado","Pedido enviado")->count();
        $pendientesasignacion=Pedido::where("estado","Producción en curso")->count();
        $cobrosPendientes=Cobro:: where("estado","pendiente")->get();
        
        $asignaciones = Asignacion::selectRaw('count(empleado_id) as total_asignaciones, empleado_id, sum(costo) as total_costo')
        ->where('estado', 'asignado')
        ->groupBy('empleado_id')
        ->with('empleado') // Traer la relación con el empleado
        ->limit(100)
        ->get();
        


        $costosproduccion = Asignacion::where("estado", "asignado")->sum("costo");


        return Inertia::render('Dashboard', ["clientes" => count($clientes), "empleados" => count($empleados), "products" => count($products), "costosproduccion" => $costosproduccion, "asignaciones" => $asignaciones,"cortes"=>$cortes,"pendientesasignacion"=>$pendientesasignacion,"cobros"=>$cobrosPendientes]);
    }
}
