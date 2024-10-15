<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Cobro extends Model
{
    use HasFactory;
    protected $fillable = ["order_id", "monto", "fechacobro", "fechavencimiento", "estado"];

    public function pedido()
    {
        return $this->BelongsTo(Pedido::class);
    }
    public function orden()
    {
        return $this->belongsTo(Order::class,"order_id");
    }
}
