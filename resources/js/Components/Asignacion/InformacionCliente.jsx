import { Card, CardContent } from '@mui/material'
import React from 'react'

const InformacionCliente = ({pedido}) => {
    const {  cliente, factura, fechaEntrega, envioDomicilio, estado } =
        pedido;
  return (
    <Card sx={{ borderLeft: "2px", borderRadius: "1rem" }}>
                        <CardContent>
                            <div className="space-y-3">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Información del Cliente 
                                </h2>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                        Número Factura:
                                    </span>{" "}
                                    Fac-{factura}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                        Cliente:
                                    </span>{" "}
                                    {cliente.identification_number} -{" "}
                                    {cliente.full_name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                        Entrega:
                                    </span>{" "}
                                    {fechaEntrega
                                        ? fechaEntrega
                                        : "Fecha no establecida"}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">Estado:</span>{" "}
                                    {estado}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    <span className="font-medium">
                                        Envío Domicilio:
                                    </span>{" "}
                                    {envioDomicilio
                                        ? "Envío Solicitado"
                                        : "No solicitado"}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
  )
}

export default InformacionCliente