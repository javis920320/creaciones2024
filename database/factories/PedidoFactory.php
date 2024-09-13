<?php

namespace Database\Factories;
use Illuminate\Support\Str;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pedido>
 */
class PedidoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "factura"=>Str::random(20),
            "fechaEntrega"=>$this->faker->date(),
            "clientId"=>Client::factory(),
            "impreso"=>$this->faker->randomElement([true,false
            ]),
            "estado"=>$this->faker->randomElement([
                'Pedido creado',
                'Pedido enviado',
                'Pedido recibido', 
                'Pedido confirmado', 
                'Materiales en stock', 
                'Producción en curso', 
                'Control de calidad', 
                'Empaquetado', 
                'Enviado', 
                'Entregado', 
                'Pedido completado', 
                'Cancelado'
            ]),
            "envioDomicilio"=>$this->faker->randomElement([
                true,false
            ])


        ];
    }
}
