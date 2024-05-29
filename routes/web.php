<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ClientController;
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
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    
});

Route::middleware('auth')->group(function(){
    Route::get('/clients',[ClientController::class,'index'])->name('clients.index');
    Route::get('/clients/{client}/edit',[ClientController::class,'edit'])->name('clients.edit');
    Route::patch('/client',[ClientController::class,'update'])->name('client.update');
    Route::get('/client/create',[ClientController::class,'create'])->name('client.create');
    Route::post('/client/store',[ClientController::class,'store'])->name('client.store');
});
require __DIR__.'/auth.php';
