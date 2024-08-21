<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Empleado extends Model
{
    use HasFactory;
    protected $fillable=["nombreCompleto","fechaNacimiento","genero","dni","direccion","telefono","email","fechaContratacion","cargo","salario","fotografia"];
}
