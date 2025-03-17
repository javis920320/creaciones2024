<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignacion extends Model
{
    use HasFactory;

    protected $fillable = ["empleado_id", "order_id", "fecha_asignacion", "estado", "cantidad", "costo", "tipocosto", "precio"];

    public function empleado()
    {
        return $this->belongsTo(Empleado::class);
    }
    public function orden()
    {
        return $this->belongsTo(Order::class, "order_id");
    }

     public function obtenerAsignaciones()
    {
        return  $this::selectRaw('count(empleado_id) as total_asignaciones, empleado_id, sum(costo) as total_costo')
            ->where('estado', 'asignado')
            ->groupBy('empleado_id')
            ->with('empleado') // Traer la relación con el empleado
            ->limit(100)
            ->get();
    }
     public function obtenerCostosProduccion(){
        return $this::where("estado","asignado")->sum("costo");
     }


}
