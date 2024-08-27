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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id();
            $table->string('factura')->nullable();
            $table->string('fechaEntrega')->nullable();
            $table->boolean("envioDomicilio")->default(false);
            $table->unsignedBigInteger('clientId');
            $table->foreign('clientId')->references('id')->on('clients')->onDelete('cascade');
            $table->enum('estado', [
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
            ])->default('Pedido creado');
            $table->boolean('impreso')->default(false);
            $table->text('notas')->nullable(); // Para cualquier nota adicional sobre el pedido
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
