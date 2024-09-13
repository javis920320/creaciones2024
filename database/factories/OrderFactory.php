<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Pedido;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "categoriaId"=> Category::factory(),
            "producto"=> $this->faker->title(),    
            "pedidoId"=>Pedido::factory(),
            "descripcion"=> $this->faker->text(),
            "talla"=> $this->faker->randomElement(["M","S","L"]),
            "cantidad"=>$this->faker->numberBetween(1,10),
            "precioUnitario"=> $this->faker->numberBetween(2000,40000),
            "estado"=> $this->faker->randomElement(["creado","pendiente"]),
        ];
    }
}
