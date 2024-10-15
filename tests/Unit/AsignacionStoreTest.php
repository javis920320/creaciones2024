<?php

namespace Tests\Unit;

use App\Models\Empleado;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Order;
use App\Models\Product;
use App\Models\Asignacion;
use Illuminate\Support\Facades\DB;

class AsignacionStoreTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_store_asignacion_and_update_order_status()
    {
        // Crear el producto asociado a la orden
        $product = Product::factory()->create();

        // Crear un empleado asociado
        $empleado = Empleado::factory()->create();

        // Crear la orden
        $order = Order::factory()->create([
            'categoriaId' => 1,
            'producto' => $product->id,  // Asociar el producto
            'descripcion' => 'Pantalones de trabajo',
            'talla' => 'M',
            'cantidad' => 5,  // Cantidad total del pedido
            'precioUnitario' => 2000,
            'estado' => 'pendiente',  // Estado inicial del pedido
            'pedidoId' => 1,
            'facultad' => 'Ingeniería',
        ]);

        // Simular el request con los datos necesarios
        $requestData = [
            'order_id' => $order->id,
            'producto' => $product->id,
            'cantidad' => 3,  // Cantidad asignada a este empleado
            'costo' => 1000,
            'precio' => 3000,
            'tipocosto' => 'operador_normal',
            'empleado_id' => $empleado->id,
            'estado' => 'asignado',
            'fecha_asignacion' => now()->format('Y-m-d'),
        ];

        // Hacer la solicitud HTTP a la ruta que llama al método store
        $response = $this->postJson(route("asignacion.store"), $requestData);

        // Verificar que la asignación se ha creado correctamente
        $this->assertDatabaseHas('asignacions', [
            'order_id' => $order->id,
            'producto_id' => $product->id,
            'cantidad' => $requestData['cantidad'],
            'estado' => 'asignado',
        ]);

        // Refrescar el pedido para obtener los últimos datos
        $order->refresh();

        // Verificar que el estado de la orden se actualizó si la cantidad fue completada
        if ($order->cantidad == 3) { // Aquí 3 representa las cantidades completadas
            $this->assertEquals('completado', $order->estado);
        } else {
            $this->assertEquals('pendiente', $order->estado);
        }

        // Verificar la respuesta JSON
        $response->assertStatus(200)
            ->assertJson([
                'mensaje' => 'asignacion realizada',
            ]);
    }
}
