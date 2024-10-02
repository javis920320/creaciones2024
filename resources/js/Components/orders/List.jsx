import { Link } from '@inertiajs/react'
import React from 'react'

const List = ({ordenes,iseditable}) => {
  return (
    <table className="w-full text-sm text-left rtl:text:rigth text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                        <tr className="text-nowrap">
                                            <th className="px-3 py-2">
                                                Categoria
                                            </th>
                                            <th className="px-3 py-2">
                                                Producto
                                            </th>
                                            <th className="px-3 py-2">
                                                Facultad
                                            </th>
                                            <th className="px-3 py-2">
                                                Cantidad
                                            </th>
                                            <th className="px-3 py-2">Talla</th>
                                            <th className="px-3 py-2">
                                                Descripcion
                                            </th>
                                            <th className="px-3 py-2">
                                                Precio
                                            </th>
                                            <th className="px-3 py-2">Total</th>
                                            <th className="px-3 py-2">
                                                Acciones
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        
                                        {ordenes.data.map(
                                            ({
                                                id,
                                                categoria,
                                                producto,
                                                facultad,
                                                cantidad,
                                                talla,
                                                descripcion,
                                                precioUnitario,
                                            }) => (
                                                <tr className="px-3 py-2">
                                                    <td>
                                                        {
                                                            categoria[0]
                                                                .nameCategory
                                                        }
                                                    </td>
                                                    <td>{producto}</td>
                                                    <td>{facultad}</td>
                                                    <td>{cantidad}</td>
                                                    <td>{talla}</td>
                                                    <td>{descripcion}</td>
                                                    <td>{precioUnitario}</td>
                                                    <td>
                                                        {precioUnitario *
                                                            cantidad}
                                                    </td>
                                                    <td>
                                                        <Link href={route("order.edit",id)}>Editar</Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
  )
}

export default List