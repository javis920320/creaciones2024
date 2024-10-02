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
        Schema::create('cobros', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->unsignedBigInteger('pedido_id');
            $table->decimal('monto',10,2);
            $table->date("fechacobro");
            $table->date("fechavencimiento")->nullable();
            $table->enum('estado', ['pendiente','pagado','vencido'])->default('pendiente');
            $table->foreign('pedido_id')->references('id')->on("pedidos")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cobros');
    }
};
