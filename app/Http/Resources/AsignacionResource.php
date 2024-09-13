<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AsignacionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        
        return [
            "id"=> $this->id,
            "empleado_id" => $this->empleado,
            "order_id"=>$this->order_id,            
            "fecha_asignacion"=>$this->fecha_asignacion,
            "estado"=>$this->estado,
            "cantidad"=>$this->cantidad,
            "costo"=>$this->costo,
            "tipocosto"=>$this->tipocosto,
            "orden"=>$this->orden
        ];

    }
}
