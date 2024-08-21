<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'birth_date',
        'identification_number',
        'gender',
        'notes',
        'registration_date',
        'status',
    ];
     public function pedidos(){
        return $this->hasMany(Pedido::class,'clientId');
     }
}
