<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Order extends Model
{
    use HasFactory;
    protected $fillable=["categoriaId","producto","descripcion","talla","cantidad","precioUnitario","estado","pedidoId","facultad"];
    public function pedido(){
        return $this->belongsTo(Pedido::class,"pedidoId");
    }
   // Relación muchos a muchos con Empleado a través de la tabla pivot 'asignacions'
   public function empleados()
   {
       return $this->belongsToMany(Empleado::class, 'asignacions', 'order_id', 'empleado_id')
                   ->withPivot('cantidad', 'fecha_asignacion', 'costo', 'tipocosto', 'estado') // Campos adicionales de la tabla pivot
                   ->withTimestamps();
   }
   public function cobro(){
    return $this->hasOne(Cobro::class,"order_id");
   }

   public function categoria(){
    return $this->hasOne(Category::class);
   }
}
