<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Empleado>
 */
class EmpleadoFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            "nombreCompleto"=>$this->faker->name,
            "fechaNacimiento"=>$this->faker->date,
            "genero"=>$this->faker->randomElement(["Masculino","Femenino"]),
            "dni"=>Str::random(7),
            "direccion"=>$this->faker->address(),
            "telefono"=>$this->faker->phoneNumber(),
            "email"=>$this->faker->email(),
            "fechaContratacion"=>$this->faker->date,
            "salario"=>$this->faker->numberBetween(4000,6000),
            "cargo"=>$this->faker->randomElement(["Diseño_Corte","Operador","Vendedor","Administrador","Operador Externo","Otro"])



        ];
    }
}
