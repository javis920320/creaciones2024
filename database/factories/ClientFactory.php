<?php

namespace Database\Factories;
use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'full_name' => $this->faker->name,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'city' => $this->faker->city,
            'state' => $this->faker->state,
            'postal_code' => $this->faker->postcode,
            'country' => $this->faker->country,
            'birth_date' => $this->faker->date,
            'identification_number' => Str::random(10),
            'gender' => $this->faker->randomElement(['male', 'female', 'other']),
            'notes' => $this->faker->paragraph,
            'registration_date' => $this->faker->date,
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }
}
