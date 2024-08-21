<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmpleadoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $data= Empleado::query();
       $empleados=$data->paginate(10)->onEachSide(1);
       //dd($empleados);


        return Inertia("Employees/Index",[
            "empleados"=>$empleados
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia("Employees/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

       
        $parametros = $request->validate([
            "nombreCompleto" => "required",
            "dni"=>"required|unique:empleados,dni",
            "cargo"=>"required",
            "genero"=>"required",
            "fechaNacimiento"=>"required",
            "direccion"=>"required",
            "telefono"=>"required",
            "email"=>"required|email|unique:empleados,email",
            "fechaContratacion"=>"required",
            "salario"=>"required",
            "fotografia"=>"nullable"

        ]);
        $nuevoempleado=Empleado::create($parametros);
        if($nuevoempleado){
            return redirect()->route("employees.index");
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Empleado $empleado)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit( $empleado)
    {
        $empleadoEncontrado=Empleado::findOrFail($empleado);
        return Inertia("Employees/Create",[
            "empleado" => $empleadoEncontrado
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Empleado $empleado)
{
    // Validar los datos del formulario
    $validatedData = $request->validate([
        'nombreCompleto' => 'required|string|max:255',
        'dni' => 'required|numeric|unique:empleados,dni,' . $empleado->id,
        'genero' => 'required|string',
        'cargo' => 'required|string',
        'fechaNacimiento' => 'nullable|date',
        'email' => 'required|email|unique:empleados,email,' . $empleado->id,
        'direccion' => 'required|string|max:255',
        'telefono' => 'required|string|max:15',
        'fechaContratacion' => 'nullable|date',
        'salario' => 'nullable|numeric',
    ]);

    // Actualizar el empleado con los datos validados
    $empleado->update($validatedData);

    // Redirigir a la lista de empleados con un mensaje de éxito
    return redirect()->route('employees.index')->with('success', 'Empleado actualizado con éxito');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Empleado $empleado)
    {
        //
    }
}
