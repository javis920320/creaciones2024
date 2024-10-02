<?php

namespace App\Http\Resources;

use App\Models\Product_image;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
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
            "nameProduct"=>$this->nameProduct,
            "categoria"=>$this->category,
            "price"=>$this->price,
            "costoProduccionExtra"=>$this->costoProduccionExtra,
            "costo_produccion"=>$this->costo_produccion,
            "costoExterno"=>$this->costoExterno,
            "status"=>$this->status,
            "description"=>$this->description,
            "images"=>Product_image::where("product_id",$this->id)->get()//$this->imagenes()

        ];
    }
}
