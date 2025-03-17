<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Category;
use App\Models\Product;
use App\Models\Product_image;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {


         $productsdb = Product::where('status', 'Activo')->orderBy('nameProduct')->get();
        $products = ProductResource::collection($productsdb);   
   
        $categories = Category::where('status', 'active')->orderBy('nameCategory')->get();

        //return Inertia::render("Products/Index", ['products' => ProductResource::collection($products), 'categories' => $categories]); */
        $categorias=Category::where("status","active")->get();
        return Inertia::render("Products/v2/Index",["categories"=>$categorias,"products"=>$products ]);      
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


        try {
                 // Asegúrate de que el valor de sector sea una cadena
                 $request->merge([
                    'sector' => is_array($request->sector) ? implode(',', $request->sector) : $request->sector,
                ]);
            
        $validateInfo = $request->validate([
            "nameProduct" => "required|min:5|unique:products,nameProduct", //,except,id",
            "category_id" => "required",
            "description" => "nullable",
            "sector" => "nullable|string", //,in:Universidades,Colegios,Empresas,Otro",    
            "status" => "required",
            "price" => "required",
            "costo_produccion" => "required",
            "costoProduccionExtra" => "nullable",
            "costoExterno" => "nullable",
            "detalle" => "nullable",  
            "slug" => "nullable|unique:products,slug",  

        ]);
         // Generar un slug automáticamente si no se proporciona uno
         if (empty($validateInfo['slug'])) {
            $validateInfo['slug'] = Str::slug($validateInfo['nameProduct']);
        }

        if($request->detalles){
            $validateInfo["entidad_id"]=$request->detalles["entidad_id"];    
            $validateInfo["program"]=$request->detalles["program"];  
            
        }

        $resp = Product::create($validateInfo);

        if ($resp) {
            if ($request->images_url) {
                foreach ($request->images_url as $image) {
                    Product_image::create([
                        "product_id" => $resp->id,
                        "image_path" => $image,
                    ]);
                }
            }




           // return redirect()->route("products.index");
           return response()->json(["success"=>"Producto creado correctamente","product"=>$resp]);  
        }

         } catch (\Throwable $th) {
          //  echo $th;
          return response()->json(["error"=>"Error al crear el producto","message"=>$th->getMessage()]);    
        } 
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
    public function edit($idproduct)
    {
        $products = Product::where("id", $idproduct)->get();
        $categorias = Category::where("status", "active")->get();
        return inertia("Products/Create", [
            "categorias" => $categorias,
            "product" => ProductResource::collection($products)

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

            if ($request->images_url) {
                foreach ($request->images_url as $image) {
                    Product_image::create([
                        "product_id" => $idProducto->id,
                        "image_path" => $image,
                    ]);
                }
            }
           // $idProducto->imagenes()->create(["image_path"=>$request->images_url]);

            //dd($idProducto);
            return redirect()->back();
            //return redirect()->route("products.index");
        }

        
        
        /* if (count($request->images_url) > 3) {
            $idProducto->imagenes()->update($request->images_url);
        } else {
            $idProducto->imagenes()->create($request->images_url);
        } */

    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function list(Category $category)
    {

         $categories= Category::where("status","active")->get();

        $productos= Product::where("category_id",$category->id)->get();

        return Inertia::render("Products/Index", ['products' => ProductResource::collection($productos), 'categories' => $categories]); 

    }



    public  function productoconcategoria( $category){
        
        $products = Product::where("category_id", $category)->get();
        

        if (!$products) {
            return response()->json([]);
        }

        return response()->json($products); 

    }
    public function getAllProducts()
    {
        dd("hola"); 
        $productsdb = Product::where('status', 'Activo')->orderBy('nameProduct')->get();
        $products = ProductResource::collection($productsdb);   
        
        return response()->json($products);
    }   

}
