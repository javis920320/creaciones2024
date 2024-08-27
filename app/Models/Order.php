<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable=["categoriaId","producto","descripcion","talla","cantidad","precioUnitario","estado","pedidoId"];
    public function pedido(){
        return $this->belongsTo(Pedido::class);
    }
}
