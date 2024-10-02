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
        Schema::create('historial_impresions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('pedido_id');  // Columna pedido_id
            $table->timestamp('fecha_impresion');
            $table->string('usuario');
            $table->string('tipo_impresion');
            $table->timestamps();

            // Definir una relación con la tabla pedidos
            $table->foreign('pedido_id')->references('id')->on('pedidos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historial_impresions');
    }
};
