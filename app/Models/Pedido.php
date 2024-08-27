<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;
    protected $fillable=["factura","fechaEntrega","clientId","estado","impreso","notas","envioDomicilio"];

    public function cliente(){
        return $this->belongsTo(Client::class,'clientId');

    }
    public function ordenes(){
        return $this->hasMany(Order::class,"id");
    }
}
