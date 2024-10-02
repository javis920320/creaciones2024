<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class HistorialImpresion extends Model
{
    use HasFactory;

    protected $fillable = ["fecha_impresion","usuario","tipo_impresion","pedido_id"];

    public function pedido(){
        return $this->belongsTo(Pedido::class);
    }
}
