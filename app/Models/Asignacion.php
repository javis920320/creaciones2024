<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Asignacion extends Model
{
    use HasFactory;

    protected $fillable = ["empleado_id","order_id","fecha_asignacion","estado","cantidad","costo","tipocosto"];

public function empleado(){
    return $this->belongsTo(Empleado::class);
}
public function orden(){
    return $this->belongsTo(Order::class,"order_id");    
}

}
