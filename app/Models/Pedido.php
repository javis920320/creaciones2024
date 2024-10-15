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


    public function asignaciones() {
        return $this->hasMany(Asignacion::class);
    }
    public function verificarEstado()
    {
        if ($this->ordenes()->where("estado", "creado")->count() == 0) {
            
            $this->estado = "Pedido confirmado";
            $this->save();
            return true;
           
        }
        return false;
    }
    public function enviarACobro($orderid,$precio)
    {

     
        Cobro::create([
            "order_id" => $orderid,
            "monto" => $precio,
            "fechacobro" => Carbon::now(),
            "fechavecimiento" => null,
            "estado" => "pendiente",

        ]);
    }
    public function enviaraProduccion(){
        $this->estado = 'Producción en curso';
        //$this->fechaProduccion = Carbon::now();
        
        // Guardar el cambio en la base de datos
        $this->save();
    }

    public function calcularMonto()
    {
        return $this->items->sum('precio');
    }
    public function historial(){
        return $this->hasMany(HistorialImpresion::class,"pedido_id");
    }

   
}
