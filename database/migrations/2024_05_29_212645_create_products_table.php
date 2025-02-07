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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('nameProduct')->unique();
            $table->text('description')->nullable(true);
            $table->decimal('price', 8, 2);
            $table->decimal("costo_produccion");
            $table->decimal("costoProduccionExtra")->nullable();
            $table->decimal("costoExterno")->nullable();
            $table->string('sector')->nullable(); 
            $table->enum('status',["Activo","Inactivo"])->default("Activo");
            $table->unsignedBigInteger('category_id');
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade');
            $table->unsignedBigInteger("entidad_id")->nullable(); 
            $table->foreign("entidad_id")->references("id")->on("entidads")->onDelete("cascade"); 
            $table->unsignedInteger("program")->nullable(); 
            $table->foreign("program")->references("id")->on("programas")->onDelete("cascade"); 
            $table->string("slug")->unique();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
