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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedInteger("categoriaId");
            $table->unsignedInteger("pedidoId");
            $table->foreign("categoriaId")->references("id")->on("categories")->onDelete("cascade");
            $table->string("producto");
            $table->text("descripcion");
            $table->string("talla");
            $table->string("cantidad");
            $table->string("facultad");
            $table->string("precioUnitario")->nullable();
            $table->string("estado");
            $table->foreign("pedidoId")->references("id")->on("pedidos")->onDelete("cascade");

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
