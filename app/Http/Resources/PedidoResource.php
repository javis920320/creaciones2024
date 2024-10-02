<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PedidoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "fechaEntrega"=>$this->fechaEntrega,
            "factura"=>$this->factura,
            "cliente"=>$this->cliente,
            "ordenes"=>$this->ordenes,
            "estado"=>$this->estado,
            "envioDomicilio"=>$this->envioDomicilio,
            "impresiones"=>$this->historial,
            "created_at"=> ( new Carbon($this->created_at))->format("Y-m-d H:i"),

        ];
    }
}
