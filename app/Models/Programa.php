<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Programa extends Model
{
    use HasFactory;

    public function entidades(){
        return $this->belongsToMany(Entidad::class);
    }   
    public function ProgramaandEntidad($nombre,$entidad_id){
        $programa = Programa::where('nombre',$nombre)->where('entidad_id',$entidad_id)->first();
        if($programa){
            return true;
        }else{
            return false;
        }
    }   

    public function ProgramaandTipoExistenteUpdate($nombre,$tipo,$id){
        $programa = Programa::where('nombre',$nombre)->where('tipo',$tipo)->where('id','!=',$id)->first();
        if($programa){
            return true;
        }else{
            return false;
        }
    }   
}
