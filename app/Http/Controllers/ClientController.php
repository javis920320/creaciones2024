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
        $clients=Client::all();
        //return view("clients.index",compact('clients'));
        return Inertia::render('Clients/Index',[
            'clients'=>$clients
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

         $request->validate([
            'full_name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:clients',
            'phone'=>'nullable|string|max:20',
            'address'=>'nullable|string|max:255',
            'city'=>'nullable|string|max:255',
            'state'=>'nullable|string|max:255',
            'postal_code'=>'nullable|string|max:20',
            'country'=>'nullable|string|max:255',
            'birthday'=>'nullable|date',
            'identification_number'=>'nullable|string|max:255',
            'gender'=>'nullable|in:male,female,other',
            'notes'=>'nullable|string',
            'status'=>'nullable|in:active,inactive',
        ]); 
            $client=Client::create($request->all());
          //  return redirect()->route('client.create')->with('success','Cliente creado correctamente');
          return redirect()->route('clients.index');
           /*  return  Inertia::render('Clients/Create',[
            'client'=>$client
             ]);   */
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
        return  Inertia::render('Clients/Edit',[
            "client"=>[
                'id'=>$client->id,
                'phone'=>$client->phone,
                'full_name'=>$client->full_name,
                'email'=>$client->email,
                'address'=>$client->address,
                'country'=>$client->country,
                
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        
      
        // Validate the request data
    $validatedData = $request->validate([
        'full_name' => 'required|string|max:255',
         'email' => 'required|email|unique:clients,email,' . $request->id,
        'phone' => 'nullable|string|max:20',
        // Add other fields as necessary
    ]);
    

    // Find the client by ID
    $client = Client::findOrFail($request->id);
    


    // Update the client's information
    $client->full_name = $validatedData['full_name'];
    $client->email = $validatedData['email'];
    $client->phone = $validatedData['phone'] ?? $client->phone;
    // Update other fields as necessary

    // Save the updated client
    $client->save();

    // Redirect to the edit page with a success message
     return redirect()->route('clients.edit', $client->id)
                     ->with('success', 'Client updated successfully.');  
     //return Redirect::route("clients.edit");
 
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
