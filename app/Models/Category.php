<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable=["id","nameCategory","description","status"];

    public function products(){
        return $this->hasMany(Product::class);
    }

    public function ordern(){
        return $this->hasOne(Order::class,"categoriaId");
    }
}
