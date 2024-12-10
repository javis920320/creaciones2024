<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Client;
use Illuminate\Support\Facades\Redirect;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();
      
        return Inertia::render('Clients/Index', [
            'clients' => $clients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Clients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validar los datos de la solicitud

        $validatedData = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:clients',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:255',
            'birthday' => 'nullable|date',
            'identification_number' =>'required|string|max:20|min:5|unique:clients|regex:/^[A-Za-z0-9]+$/',
            'gender' => 'nullable|in:male,female,other',
            'notes' => 'nullable|string',
            'status' => 'nullable|in:active,inactive',
        ]);

        // Crear el nuevo cliente
        $newClient = Client::create($validatedData);

        // Verificar si la solicitud es AJAX (por ejemplo, a través de Axios)
        if ($request->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Cliente creado exitosamente.',
                'client' => $newClient,
            ]);
        }

        // Para solicitudes normales (Inertia.js, por ejemplo)
        return redirect()->route('clients.index')
            ->with('success', 'Cliente creado exitosamente.');
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
    public function edit(Client $client)
    {

        return Inertia("Clients/Create", [
            "client" => $client
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $idclient)
    {


        // Validate the request data
        $validatedData = $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $idclient->id,
            'phone' => 'required|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'country' => 'nullable|string|max:255',
            'birthday' => 'nullable|date',
            'identification_number' =>'required|string|max:20|min:5|unique:clients|regex:/^[A-Za-z0-9]+$/',
            'gender' => 'nullable|in:male,female,other',
            'notes' => 'nullable|string',
            'status' => 'nullable|in:active,inactive',
        ]);


        if ($idclient->update($validatedData)) {
            return redirect()->route('clients.index', $idclient->id)
                ->with('success', 'Client updated successfully.');
        }
        ;





    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function serchClient($query)
    {
  try {
    $cliente = Client::where("identification_number", $query)->limit(1)->get();

        if (!$cliente) {
            return response()->json(["error" => " client not found "]);
        }
        return response()->json($cliente);
  } catch (\Throwable $th) {
    return response()->json(["error" => " Error internal server "]);
  }
        
    }
}
