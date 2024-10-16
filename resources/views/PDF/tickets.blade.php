<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ticket de Pedido</title>
    <style>
        /* Estilos generales optimizados para impresoras térmicas */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff;
        }

        .ticket-container {
            width: 100%;
            max-width: 226px;
            /* Aproximadamente 80mm en puntos */
            margin: 0 auto;
            padding: 0;
            text-align: center;
        }

        .ticket-header {
            text-align: center;
            margin-bottom: 10px;
        }

        .ticket-header h2 {
            margin: 0;
            font-size: 16px;
            /* Tamaño ajustado para impresora */
        }

        .ticket-header p {
            margin: 2px 0;
            font-size: 10px;
        }

        /* Detalles del ticket */
        .ticket-details {
            font-size: 10px;
            margin-bottom: 10px;
            text-align: left;
        }

        .ticket-details p {
            margin: 3px 0;
        }

        .ticket-details strong {
            font-weight: bold;
        }

        /* Listado de productos */
        table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
            text-align: left;
        }

        table thead th {
            border-bottom: 1px solid #000;
            padding-bottom: 5px;
        }

        table tbody td {
            padding: 5px 0;
        }

        .descripcion {
            font-size: 9px;
            /* Tamaño más pequeño para la descripción */
            color: #555;
            /* Color más claro para diferenciar */
            overflow: hidden;
            white-space: nowrap;
            /* Evita el salto de línea */
            text-overflow: ellipsis;
            /* Muestra puntos suspensivos si el texto es largo */
            max-width: 100%;
            /* Asegura que no exceda el ancho de la celda */
        }

        /* Pie de ticket */
        .ticket-footer {
            font-size: 8px;
            margin-top: 10px;
            text-align: center;
        }

        .ticket-footer p {
            margin: 3px 0;
        }
    </style>
</head>

<body>
    <div class="ticket-container">

        <!-- Encabezado del Ticket -->
        <div class="ticket-header">
            <h2>Bordados Crea</h2>
            <p>Dirección: Crj8#k348</p>
            <p>Teléfono: 3175462685</p>
        </div>

        <!-- Detalles del Ticket -->
        <div class="ticket-details">
            <p><strong>ID del Ticket:</strong> {{ $pedido['id'] }}</p>
            <p><strong>Fecha:</strong> {{ \Carbon\Carbon::parse($pedido['fecha'])->format('d/m/Y H:i') }}</p>
            <p><strong>Cliente:</strong> {{ $pedido['cliente']->full_name }}</p>
            <p><strong>Factura:</strong> {{ $pedido['factura'] }}</p>
        </div>

        <!-- Listado de Productos -->
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Facultad</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Talla</th>
                </tr>
            </thead>
            <tbody>
                @if(isset($pedido['ordenes']) && count($pedido['ordenes']) > 0)
                    @foreach($pedido['ordenes'] as $producto)
                        <tr>
                            <td>{{ $producto['producto'] }}</td>
                            <td>{{ $producto['facultad'] }}</td>
                            <td>
                                @foreach ($categorias as $categoria)
                                    @if($producto['categoriaId'] == $categoria->id)
                                        {{ $categoria->nameCategory }}
                                    @endif
                                @endforeach
                            </td>
                            <td>{{ $producto['cantidad'] }}</td>
                            <td>{{ $producto['talla'] }}</td>
                        </tr>
                        <tr>
                            <td colspan="4" class="descripcion">{{ $producto['descripcion'] }}</td>
                        </tr>
                    @endforeach
                @endif

            </tbody>
        </table>

        <!-- Total del Pedido -->
        <div class="ticket-details">

        </div>

        <!-- Pie del pedido -->
        <div class="ticket-footer">

            <p>https://www.linkedin.com/in/javilopezdev/</p>
        </div>
    </div>
</body>

</html>