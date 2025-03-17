<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entidad extends Model
{
    use HasFactory;

    public function programas()
    {
        return $this->hasMany(Programa::class);
    }   

    public function EntidadandTipoExistente($nombre,$tipo)
    {
        return Entidad::where('nombre',$nombre)->where('tipo',$tipo)->first();
    }   
}
