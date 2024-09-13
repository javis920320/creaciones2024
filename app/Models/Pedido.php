<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    use HasFactory;
    protected $fillable = ["factura", "fechaEntrega", "clientId", "estado", "impreso", "notas", "envioDomicilio"];

    public function cliente()
    {
        return $this->belongsTo(Client::class, 'clientId');

    }
    public function ordenes()
    {
        return $this->hasMany(Order::class, "pedidoId");
    }

    public function verificarEstado()
    {
        if ($this->ordenes()->where("estado", "creado")->count() === 0) {
            //dd($this->id);
            $this->estado = "Pedido confirmado";
            $this->save();
           // $this->enviarACobro();
        }
    }
    public function enviarACobro()
    {

        dd($this);
        Cobro::create([
            "id" => $this->id,
            "order_id" => $this->order_id,
            "monto" => $this->calcularMonto(),
            "fechacobro" => Carbon::now(),
            "fechavecimiento" => $this->fecha,
            "estado" => "pendiente",

        ]);
    }

    public function calcularMonto()
    {
        return $this->items->sum('precio');
    }
}
