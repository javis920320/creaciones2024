<?php

namespace App\Http\Resources;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrdenResource extends JsonResource
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
            "cantidad"=>$this->cantidad,
            "producto"=>$this->producto,
            "talla"=>$this->talla,
            "descripcion"=>$this->descripcion,
            "precioUnitario"=>$this->precioUnitario,
            "facultad"=>$this->facultad,
            "categoria"=>Category::where("id",$this->categoriaId)->get()
        ];
    }
}
