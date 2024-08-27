<?php

use App\Http\Controllers\AsignacionController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CorteConfeccionController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductController;
use App\Models\Client;
use App\Models\Empleado;
use App\Models\Product;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
  $empleados = Empleado::all();
  $clientes=Client::all();
  $products=Product::all();
    return Inertia::render('Dashboard',["clientes"=>count($clientes),"empleados"=>count($empleados),"products"=>count($products)]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::middleware('auth')->group(function(){
    Route::get('/clients',[ClientController::class,'index'])->name('clients.index');
    Route::get('/clients/{client}/edit',[ClientController::class,'edit'])->name('clients.edit');
    Route::put('/client/{idclient}',[ClientController::class,'update'])->name('client.update');
    Route::get('/client/create',[ClientController::class,'create'])->name('client.create');
    Route::post('/client/store',[ClientController::class,'store'])->name('client.store');
    Route::get("/findClient/{query}",[ClientController::class,"serchClient"])->name("client.search");
});
Route::middleware('auth')->group(function(){
    Route::get('/products/',[ProductController::class,'index'])->name('products.index');
    Route::get('/product/{idproduct}/edit',[ProductController::class,'edit'])->name('product.edit');
    Route::put('/product/{idProducto}',[ProductController::class,'update'])->name('product.update');
    Route::get('/product/create',[ProductController::class,'create'])->name('product.create');
    Route::post('/produc/store',[ProductController::class,'store'])->name('product.store');
});

Route::middleware('auth')->group(function(){
    Route::get('/categorias',[CategoriaController::class,'index'])->name('categoria.index');
    Route::get("/categorias/{categoria}",[CategoriaController::class,'edit'])->name('categoria.edit');
    Route::post('/categorias',[CategoriaController::class,'store'])->name('categoria.store');
    Route::put("/categorias/{categoria}",[CategoriaController::class,'update'])->name('categoria.update');   
});

Route::middleware('auth')->group(function(){
    Route::get('/employees',[EmpleadoController::class,'index'])->name('employees.index');
    Route::get('/employees/create',[EmpleadoController::class,'create'])->name('employees.create');
    Route::post('/employees/store',[EmpleadoController::class,'store'])->name('employees.store');
    Route::get('/employees/{id}/edit',[EmpleadoController::class,'edit'])->name('employees.edit');
   Route::put('/employees/{empleado}',[EmpleadoController::class,'update'])->name('employees.update');   
});

Route::middleware('auth')->group(function(){
    Route::get('/corteConfeccion',[CorteConfeccionController::class,'index'])->name('corteConfeccion.index');
    Route::get("/asignacion",[AsignacionController::class,'index'])->name("asignacion.index");
   /*  Route::get('/employees/create',[EmpleadoController::class,'create'])->name('employees.create');
    Route::post('/employees/store',[EmpleadoController::class,'store'])->name('employees.store');
    Route::get('/employees/{id}/edit',[EmpleadoController::class,'edit'])->name('employees.edit');
   Route::put('/employees/{empleado}',[EmpleadoController::class,'update'])->name('employees.update');    */
});

Route::middleware('auth')->group(function(){
    Route::get('/ordenes',[CorteConfeccionController::class,'index'])->name('ordenes.index');
 
   /*  Route::get('/employees/create',[EmpleadoController::class,'create'])->name('employees.create');
    Route::post('/employees/store',[EmpleadoController::class,'store'])->name('employees.store');
    Route::get('/employees/{id}/edit',[EmpleadoController::class,'edit'])->name('employees.edit');
       */
});

Route::middleware('auth')->group(function(){
    Route::get('/crear-pedidos',[PedidoController::class,'index'])->name('pedidos.index');
    Route::put('/pedido/{idpedido}',[PedidoController::class,'submit'])->name('pedido.submit');
    Route::get("/pedido",[PedidoController::class,'submited'])->name("pedido.send");
    Route::post("/store",[PedidoController::class,"store"])->name("pedido.store");
    Route::get("/order/{order}/edit",[OrderController::class,"edit"])->name("order.edit");
    Route::get('/order/{pedido}',[OrderController::class,'index'])->name('order.index');
    Route::post('/order/{pedido}',[OrderController::class,'store'])->name('order.store');
    Route::put('/orden/{order}',[OrderController::class,'update'])->name('orden.update');
});

require __DIR__.'/auth.php';
