<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nameProduct' => $this->faker->unique->name(),
            'description' => $this->faker->sentence,
            'price' => $this->faker->randomFloat(2, 1, 100),
            'category_id' => Category::factory(),
            //"price"=>$this->faker->numberBetween(3000,10000),
            "costo_produccion"=>$this->faker->numberBetween(3000,10000),
            "costoProduccionExtra"=>$this->faker->numberBetween(3000,10000),
            "costoExterno"=>$this->faker->numberBetween(3000,10000),
           // 'size' => $this->faker->randomElement(['S', 'M', 'L', 'XL']),
           // 'color' => $this->faker->colorName,
            //'stock' => $this->faker->numberBetween(0, 100),
        ];
    }
}
