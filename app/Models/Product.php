<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;




class Product extends Model
{
    use HasFactory;

    protected $fillable = ["id","nameProduct","category_id", "description", "status","price","costo_produccion","costoProduccionExtra","costoExterno"];
    public  function category()
    {
        return $this->belongsTo(Category::class);
    }
     public function imagenes(){
        return $this->hasMany(Product_image::class); 
     }
}
