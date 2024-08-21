import React from 'react'

const Infoclients = ({pedido}) => {
  return (
    <>
    <div className=" w-10/12  text-gray-300 flex justify-between">
                            <p className="text-xl">
                                Codigo: {pedido.data[0].id}
                            </p>
                            <h2 className="text-xl">
                                Factura :{pedido.data[0].factura}
                            </h2>
                        </div>

                        <div className="text-gray-400 uppercase">
                            <p>
                                Nombre Cliente:
                                {pedido.data[0].cliente.full_name}
                            </p>
                            <p>
                                Identificacion :
                                {pedido.data[0].cliente.identification_number}
                            </p>
                            <p>Email :{pedido.data[0].cliente.email}</p>
                            <p>Telefono :{pedido.data[0].cliente.phone}</p>
                        </div>

                        <div className="flex gap-6 text-gray-500">
                            <p>
                                Fecha y hora de creacion :
                                {pedido.data[0].created_at}
                            </p>
                            <p>Estado:{pedido.data[0].estado}</p>
                        </div>
                        <div className="flex gap-6 text-gray-500">
                            <p>
                                Envio Domicilio :
                                {pedido.data[0].envioDomicilio
                                    ? "Activo"
                                    : "No Solicitado"}
                            </p>
                        </div>
                        </>
  )
}

export default Infoclients
