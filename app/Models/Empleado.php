<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;
    protected $fillable = ["nombreCompleto", "fechaNacimiento", "genero", "dni", "direccion", "telefono", "email", "fechaContratacion", "cargo", "salario", "fotografia"];


    public function asignaciones()
    {
        return $this->hasMany(Asignacion::class, "empleado_id");
    } 
    
        // Relación muchos a muchos con Orden a través de la tabla pivot 'asignacions'
    public function ordenes()
    {
        return $this->belongsToMany(Order::class, 'asignacions', 'empleado_id', 'order_id')
                    ->withPivot('cantidad', 'fecha_asignacion', 'costo', 'tipocosto', 'estado')
                    ->withTimestamps();
    }
    

}
