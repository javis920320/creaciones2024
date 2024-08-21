<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('empleados', function (Blueprint $table) {
            $table->id();
            $table->string('nombreCompleto');
            $table->date('fechaNacimiento');
            $table->string('genero'); // Cambiado a minúsculas para seguir la convención
            $table->string('dni')->unique();
            $table->string('direccion');
            $table->string('telefono');
            $table->string('email')->unique();
            $table->date('fechaContratacion');
            $table->string('cargo');
            $table->string('salario'); // Decimal para almacenar salarios
            $table->string('fotografia')->nullable(); 
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('empleados');
    }
};
