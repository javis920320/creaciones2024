<?php


// create new manager instance with desired driver

namespace App\Http\Controllers;

use App\Models\Product_image;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

use Storage;
use Str;

class ProductImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // Validar que la solicitud contenga archivos y que cada uno sea una imagen
        $request->validate([
            'file' => 'required',
            'file.*' => 'image|mimes:jpg,jpeg,png,gif|max:2048',
        ]);

        // Array para almacenar las rutas de las imágenes subidas
        $imagePaths = [];

        // Iterar sobre los archivos subidos
        foreach ($request->file('file') as $file) {
           
            $manager = ImageManager::gd();
            $image = $manager->read($file);

            // Redimensionar la imagen (por ejemplo, a 800x600) sin distorsión
            $image->resize(1000,1000);

            // Generar un nombre único para cada imagen
            $filename = time() . uniqid() . '.' . $file->getClientOriginalExtension();

            // Guardar la imagen redimensionada en la carpeta 'uploads'
            $path = 'uploads/' . $filename;
            Storage::disk('public')->put($path, (string) $image->encode());
            

            // Almacenar la ruta de la imagen
            $imagePaths[] = Storage::url($path);
        }

        // Devolver la respuesta en JSON con las rutas de las imágenes subidas
        return response()->json([
            'success' => true,
            'paths' => $imagePaths,
            'message' => 'Imágenes subidas y ajustadas con éxito',
        ], 200);

    }

    /**
     * Display the specified resource.
     */
    public function show(Product_image $product_image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product_image $product_image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product_image $product_image)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        // Validar la solicitud para asegurarse de que contiene el archivo
        $request->validate([
            'file' => 'required|string',
        ]);

        // Obtener la ruta del archivo desde la solicitud
        $filePath = str_replace('/storage/', '', $request->file);

        // Eliminar el archivo del sistema
        if (Storage::disk('public')->exists($filePath)) {
            Storage::disk('public')->delete($filePath);

            return response()->json([
                'success' => true,
                'message' => 'Imagen eliminada con éxito',
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Imagen no encontrada',
        ], 404);
    }
}
