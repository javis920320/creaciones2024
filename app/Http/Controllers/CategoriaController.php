<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia("Categories/Index");
    }

    public function getCategorias(){


        $categorias=Category::where("status","active")->get();

        return response()->json(["categorias"=>$categorias]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //protected $fillable=["id","nameCategory","description","status"];
        $validate = $request->validate([
            "nameCategory" => "required|max:255|unique:categories,nameCategory",
            "descripcion" => "nullable|max:255",
        ]);

        $nuevacategoria =  new Category();
        $nuevacategoria->nameCategory=$request->nameCategory;
        $nuevacategoria->description=$request->descripcion;
        $nuevacategoria->status="active";

        $iscreated=$nuevacategoria->save();
        if($iscreated){
            return redirect()->route("products.index");
        }


    }

    /**
     * Display the specified resource.
     */
    public function show(Category $categoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $categoria)
    {
        
       return inertia("Categories/Index",["categoria"=>$categoria]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $categoria)
    {
        $validate = $request->validate([
            "nameCategory" => "required|max:255|unique:categories,nameCategory,".$categoria->id,
            "descripcion" => "nullable|max:255",
        ]);

        if($categoria->update($validate)){
            return redirect()->route("products.index");
        }
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $categoria)
    {
        //
    }
}
