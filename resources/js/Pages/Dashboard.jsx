import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Section from "@/Components/Section";
import SecondaryButton from "@/Components/SecondaryButton";
import Sidebar from "@/Layouts/Sidebar";
import Asignacion from "./Pedidos/Asignacion";

export default function Dashboard({
    auth,
    clientes,
    empleados,
    products,
    costosproduccion,
    asignaciones,
}) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            
            
            <main className=" flex">
                <Sidebar />
                <div className="parent">
                    <Section className=" flex justify-center items-center  ">
                        <h1 className="text-gray-500 dark:text-gray-200 text-2x1">
                            Tus Pedidos{" "}
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200">
                            Introduce nuestro dinámico panel de pedidos para una
                            gestión fluida y un análisis perspicaz.
                        </p>
                        <SecondaryButton>
                            <Link href="/crear-pedidos">Crear Nuevo pedidos</Link>
                        </SecondaryButton>
                    </Section>
                    <Section className="w-1/3 flex justify-center items-center ">
                        <h1 className="text-gray-500 dark:text-gray-200 text-2x1 text-center">
                            Asignar Pedidos
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200 text-center">
                            {clientes}
                        </p>
                        <SecondaryButton>
                            {" "}
                            <Link href={route("asignacion.index")}>
                                Asignar{" "}
                            </Link>
                        </SecondaryButton>
                    </Section>
                    <Section className="w-1/5">
                        <h1 className="text-gray-500 dark:text-gray-200 text-2x1 text-center">
                            Corte y Confección
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200 text-center">
                            {empleados}
                        </p>
                        <SecondaryButton>
                            {" "}
                            <Link href={route("corteConfeccion.index")}>
                                Ver Proceso
                            </Link>
                        </SecondaryButton>
                    </Section>
                    <Section className="div4">
                        <h1 className="text-gray-400">Tabla de Costos</h1>
                        <table className="min-w-full table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">
                                        Empleado
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Total Asignaciones
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                        Total Costo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {asignaciones.map((asignacion, index) => (
                                    <tr
                                        key={index}
                                        className="border-t border-gray-200 dark:border-gray-700"
                                    >
                                        <td className="px-4 py-2">
                                            {asignacion.empleado.nombreCompleto}{" "}
                                            {/* Nombre del empleado */}
                                        </td>
                                        <td className="px-4 py-2">
                                            {asignacion.total_asignaciones}{" "}
                                            {/* Total de asignaciones */}
                                        </td>
                                        <td className="px-4 py-2">
                                            ${asignacion.total_costo.toFixed(2)}{" "}
                                            {/* Suma total de costos */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t border-gray-200 dark:border-gray-700"><td colSpan={3} className="text-end px-4 py-2"> Total :${costosproduccion.toFixed(2)}</td></tr>
                            </tfoot>
                        </table>
                    </Section>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
