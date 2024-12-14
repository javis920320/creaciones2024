<?php

use App\Http\Controllers\AsignacionController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\CobroController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\DownloadPdfController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CorteConfeccionController;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PedidoController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\Reports\AlmacenReportController;
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


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get("/dashboard",[DashBoardController::class,"index"])->name("dashboard");
});



/* Route::get('/dashboard', function () {
    $empleados = Empleado::all();
    $clientes=Client::all();
    $products=Product::all();
      return Inertia::render('Dashboard',["clientes"=>count($clientes),"empleados"=>count($empleados),"products"=>count($products)]);
  })->middleware(['auth', 'verified'])->name('dashboard'); */
  

// Modulos  Completos de forma Basica con Tareas avanzadas Pendientes para mejorar
Route::middleware('auth')->group(function(){
    Route::get('/clients',[ClientController::class,'index'])->name('clients.index');
    Route::get('/clients/{client}/edit',[ClientController::class,'edit'])->name('clients.edit');
    Route::put('/client/{idclient}',[ClientController::class,'update'])->name('client.update');
    Route::get('/client/create',[ClientController::class,'create'])->name('client.create');
    Route::post('/client/store',[ClientController::class,'store'])->name('client.store');
    Route::get("/findClient/{query}",[ClientController::class,"serchClient"])->name("client.search");
    Route::patch("/client/{client}",[ClientController::class ,"updateStatusClient"])->name("uptstatusclient");
});

Route::middleware('auth')->group(function(){
    Route::get('/employees',[EmpleadoController::class,'index'])->name('employees.index');
    Route::get('/employees/create',[EmpleadoController::class,'create'])->name('employees.create');
    Route::post('/employees/store',[EmpleadoController::class,'store'])->name('employees.store');
    Route::get('/employees/{id}/edit',[EmpleadoController::class,'edit'])->name('employees.edit');
   Route::put('/employees/{empleado}',[EmpleadoController::class,'update'])->name('employees.update');   
});


Route::middleware('auth')->group(function(){
    Route::get('/categorias',[CategoriaController::class,'index'])->name('categoria.index');
    Route::get("/getcateogrias",[CategoriaController::class,"getCategorias"])->name("categorias");


    Route::get("/categorias/{categoria}",[CategoriaController::class,'edit'])->name('categoria.edit');
    Route::post('/categorias',[CategoriaController::class,'store'])->name('categoria.store');
    Route::put("/categorias/{categoria}",[CategoriaController::class,'update'])->name('categoria.update');   
});


// Modulos  Completos de forma Basica con Tareas avanzadas Pendientes para mejorar

Route::middleware('auth')->group(function(){
    Route::get('/products/',[ProductController::class,'index'])->name('products.index');
    Route::get('/products/{category}',[ProductController::class, "list"])->name("products.list");
    Route::get("/productos/{categoria}",[ProductController::class,"productoconcategoria"])->name("productos.categoria");

    Route::get('/product/{idproduct}/edit',[ProductController::class,'edit'])->name('product.edit');
    Route::put('/product/{idProducto}',[ProductController::class,'update'])->name('product.update');
    Route::get('/product/create',[ProductController::class,'create'])->name('product.create');
    Route::post('/produc/store',[ProductController::class,'store'])->name('product.store');
    Route::post("/product/image",[ProductImageController::class,"store"])->name("product.image");
    Route::delete("/product/image",[ProductImageController::class,"destroy"])->name("delete.image");
});


Route::middleware('auth')->group(function(){
    
    
    Route::get("/asignacion",[AsignacionController::class,'index'])->name("asignacion.index");
    Route::get("/asignacion/{pedido}/create",[AsignacionController::class,'create'])->name("asignacion.create");
    Route::get("/asignacion/{orden}",[AsignacionController::class,"show"])->name("asignacion.listar");
    Route::post("/asignacion/create",[AsignacionController::class,"store"])->name("asignacion.store");
    Route::get("/asignacion/listar/{orden}",[AsignacionController::class,"asignacionorden"])->name("asignacion.listado");
    Route::delete("/asignacion/{asignacion}",[AsignacionController::class,"destroy"])->name("asignacion.delete");
    Route::get("/asignacionesocupadas/{orden}",[AsignacionController::class,"ordenesAsignadas"])->name("asignacionesocupadas");
    
});



Route::middleware('auth')->group(function(){
    Route::get('/corteConfeccion',[CorteConfeccionController::class,'index'])->name('corteConfeccion.index');
    Route::get("/getpedidos",[CorteConfeccionController::class,"getPedidos"])->name("pedidosEnviado.get");
    Route::post('/pedidos/imprimir', [PedidoController::class, 'imprimir'])->name('pedidos.imprimir');
    Route::get("/corteConfeccion/editar/{pedido}",[PedidoController::class,"edit"])->name("editar.envio");
   // Route::get("/generate/ticket",[DownloadPdfController::class,"generarTickets"])->name("generate.pdf");

    

});


Route::middleware('auth')->group(function(){
    Route::get('/ordenes',[CorteConfeccionController::class,'index'])->name('ordenes.index');
});

Route::middleware('auth')->group(function(){
    Route::get('/cobros',[CobroController::class,'index'])->name('cobros');
});

Route::middleware('auth')->group(function(){
    Route::get('/listar',[PedidoController::class,"list"])->name("lista.pedidos");
    Route::get("/listOfAllOrders",[PedidoController::class,'listAllOrders'])->name("listaAllpedidos");
    Route::get('/crear-pedidos',[PedidoController::class,'index'])->name('pedidos.index');
    Route::put('/pedido/{idpedido}',[PedidoController::class,'submit'])->name('pedido.submit');
    Route::get("/pedido/{pedidoenviado}",[PedidoController::class,'pedidoSubmited'])->name("pedido.send");
    Route::post("/store",[PedidoController::class,"store"])->name("pedido.store");
    Route::get("/order/{order}/edit",[OrderController::class,"edit"])->name("order.edit");
    Route::get('/order/{pedido}',[OrderController::class,'index'])->name('order.index');//usar para editar pedidos
    Route::post('/order/{pedido}',[OrderController::class,'store'])->name('order.store');
    Route::put('/orden/{order}',[OrderController::class,'update'])->name('orden.update');
    Route::post("/pedido/enviarProduccion",[PedidoController::class,"enviarAProduccion"])->name( "pedidos.produccion");

    Route::get("/pedido/{pedido}/cancelar",[PedidoController::class,"show"])->name("pedido.cancelar");
    Route::put("/pedido/{pedido}/cancelar",[PedidoController::class,"cancelar_pedido" ])->name("cancelar.pedido");

});

Route::middleware('auth')->group(function(){
    Route::get('/reports',[AlmacenReportController::class,'index'])->name('index');
    Route::get('/reportemensual',[AlmacenReportController::class,'index'])->name('index');
});



require __DIR__.'/auth.php';
