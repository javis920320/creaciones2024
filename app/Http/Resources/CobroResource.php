<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CobroResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            "id"=>$this->id,
            "factura"=>$this->orden->pedido->factura,
            //"empleado"=>$this->empleado->nombreCompleto,
            "producto"=>$this->orden->producto,
            "cantidad"=>$this->orden->cantidad,
            "order_id"=>$this->order_id,
            "monto"=>$this->monto,
            "fechacobro"=>$this->fechacobro,
            "estado"=>$this->estado
        ];
    }
}
