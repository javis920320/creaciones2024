<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class DownloadPdfController extends Controller
{
    public function generarTickets(Request $request)
    {
        // Simulación de los tickets
        $tickets = [
            [
                'id' => '001',
                'fecha' => '2024-09-13',
                'cliente' => 'Juan Pérez',
                'total' => 150.00
            ],
            [
                'id' => '002',
                'fecha' => '2024-09-13',
                'cliente' => 'Ana Gómez',
                'total' => 200.50
            ]
        ];

        // Verificar si la carpeta 'tickets' en 'storage' existe, si no, crearla
        $ticketsPath = storage_path('tickets');
        if (!File::exists($ticketsPath)) {
            File::makeDirectory($ticketsPath, 0755, true);
        }

        // Generar PDFs
        foreach ($tickets as $ticket) {
            // Generar el PDF con la vista 'PDF.tickets'
            $pdf = PDF::loadView('PDF.tickets', compact('ticket'));

            // Guardar el archivo PDF en la carpeta 'storage/tickets/'
            //$pdf->save($ticketsPath . '/' . $ticket['id'] . '.pdf');
            $pdf->stream();
        }

        // Retornar respuesta
        return response()->json(['message' => 'Tickets generados exitosamente']);
    }
}
