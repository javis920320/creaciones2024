<?php

namespace App\Http\Resources;

use App\Models\Entidad;
use App\Models\Product_image;
use App\Models\Programa;
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
            "sector"=>$this->sector,    
            "entidad"=>Entidad::find($this->entidad_id),    
            "programa"=>Programa::find($this->program),
            "category_id"=>$this->category_id,  
            'images' => $this->images->map(function ($image) {
                return [
                    'id' => $image->id,
                    'image_path' => $image->image_path,
                ];
            }),

        ];
    }
}
