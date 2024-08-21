<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


        $products = Product::where('status', 'Activo')->orderBy('nameProduct')->get();
        $categories = Category::where('status', 'active')->orderBy('nameCategory')->get();

        return Inertia::render("Products/Index", ['products' =>ProductResource::collection($products) , 'categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categorias = Category::where("status", "active")->get();
        return inertia("Products/Create", [
            "categorias" => $categorias

        ]);
    }


    public function store(Request $request)
    {


        // try {
        $validateInfo = $request->validate([
            "nameProduct" => "required|min:5|unique:products,nameProduct", //,except,id",
            "category_id" => "required",
            "description" => "nullable",
            "status" => "required",
            "price" => "required",
            "costo_produccion" => "required",
            "costoProduccionExtra" => "nullable",
            "costoExterno" => "nullable"

        ]);
        $resp = Product::create($validateInfo);

        if ($resp) {
            return redirect()->route("products.index");
        }

        /* } catch (\Throwable $th) {
            echo $th;
        } */
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $idproduct)
    {

        $categorias = Category::where("status", "active")->get();
        return inertia("Products/Create", [
            "categorias" => $categorias,
            "product" => $idproduct

        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $idProducto)
    {
        $validateInfo = $request->validate([
            "nameProduct" => "required|min:5|unique:products,nameProduct," . $idProducto->id, //,except,id",
            "category_id" => "required",
            "description" => "nullable",
            "status" => "required",
            "price" => "required",
            "costo_produccion" => "required",
            "costoProduccionExtra" => "nullable",
            "costoExterno" => "nullable"

        ]);

        if ($idProducto->update($validateInfo)) {
            return redirect()->route("products.index");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
