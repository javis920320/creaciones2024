<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: 'DejaVu Sans', sans-serif;
            font-size: 12px;
            margin: 20px;
        }

        h1 {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
            text-align: center;
        }

        .table-header {
            background-color: #4CAF50;
            color: white;
        }

        .total-row {
            font-weight: bold;
            background-color: #f2f2f2;
        }

        .right-align {
            text-align: right;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <div class="header">
        <img src="logo.png" alt="Logo de Creaciones Crea">
        <h1>Creaciones Crea</h1>
        <p>Reporte Mensual de Actividades</p>
        <p><strong>Período: Agosto 2024</strong></p>
    </div>

    <!-- Resumen de Cobros -->
    <div class="info-section">
        <h2>Resumen de Cobros Pendientes</h2>
        @if($cobros->isEmpty())
            <p>No hay cobros pendientes.</p>
        @else
            <table>
                <thead>
                    <tr class="table-header">
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Monto</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($cobros as $cobro)
                    <tr>
                        <td>{{ $cobro->id }}</td>
                        <td>{{ $cobro->cliente->nombre ?? 'N/A' }}</td>
                        <td class="right-align">{{ number_format($cobro->monto, 2) }}</td>
                        <td>{{ $cobro->fecha }}</td>
                    </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr class="total-row">
                        <td colspan="2">Total</td>
                        <td class="right-align" colspan="2">
                            ${{ number_format($cobros->sum('monto'), 2) }}
                        </td>
                    </tr>
                </tfoot>
            </table>
        @endif
    </div>

    <!-- Totals Summary -->
    <div class="totals-summary">
        <p>Total General: <strong>${{ number_format($cobros->sum('monto'), 2) }}</strong></p>
    </div>

    <!-- Footer -->
    <div class="footer">
        <p>Creaciones Crea - Reporte generado el 11 de Octubre, 2024</p>
        <p>Página {PAGE_NUM} de {PAGE_COUNT}</p>
    </div>

</body>
</html>
