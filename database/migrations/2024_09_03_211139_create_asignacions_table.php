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
        Schema::create('asignacions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("empleado_id");
            $table->unsignedBigInteger("order_id");
            $table->integer("cantidad");
            $table->date("fecha_asignacion");
            $table->decimal("costo",10, 2);
            $table->decimal("precio",10, 2);
            $table->string("tipocosto");
            $table->enum("estado",["asignado","terminado"])->default("asignado");
            $table->foreign('empleado_id')->references('id')->on('empleados')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('asignacions');
    }
};
