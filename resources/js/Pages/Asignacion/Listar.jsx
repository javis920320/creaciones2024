import Section from "@/Components/Section";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FiTrash } from "react-icons/fi";
const Listar = ({ auth, ordenes }) => {
    const { errors, processing, delete: destroy } = useForm();

    const handleEliminar = (id) => {
        destroy(route("asignacion.delete", id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Ordenes asignadas
                </h2>
            }
        >
            <Head title="Asignacion orden" />
            <div className="flex justify-center">
                <Section>
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b text-left">
                                    Empleado
                                </th>
                                <th className="py-2 px-4 border-b text-left">
                                    Order ID
                                </th>
                                <th className="py-2 px-4 border-b text-left">
                                    Fecha Asignación
                                </th>
                                <th className="py-2 px-4 border-b text-left">
                                    Estado
                                </th>
                                <th className="py-2 px-4 border-b text-left">
                                    Cantidad
                                </th>
                                <th className="py-2 px-4 border-b text-left">
                                    Costo
                                </th>
                                <th className="py-2 px-4 border-b text-left">
                                    Tipo Costo
                                </th>
                                <th className="py-2 px-4 border-b text-left">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                          
                            {ordenes.data.map((orden) => (
                                <tr
                                    key={orden.order_id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="py-2 px-4 border-b">
                                        {orden.empleado.nombreCompleto}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {orden.order_id}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {orden.fecha_asignacion}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {orden.estado}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {orden.cantidad}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        ${orden.costo.toFixed(2)}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        {orden.tipocosto}
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() =>
                                                handleEliminar(orden.id)
                                            }
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
                                        >
                                            <FiTrash className="h-4 w-4 mr-1" />
                                            <span className="sr-only">
                                                Eliminar
                                            </span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                                
                        </tbody> 
                    </table>
                </Section>
            </div>
        </AuthenticatedLayout>
    );
};

export default Listar;
