import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Section from "@/Components/Section";
import SecondaryButton from "@/Components/SecondaryButton";
import Sidebar from "@/Layouts/Sidebar";
import Asignacion from "./Pedidos/Asignacion";
import { Button, ButtonGroup } from "@mui/material";
import Tablecobros from "@/Components/Cobros/Tablecobros";
import { FiEdit, FiList, FiScissors } from "react-icons/fi";
import Acordeon from "@/Components/Acordeon";
import TableCostos from "@/Components/Asignacion/TableCostos";

export default function Dashboard({
    auth,
    clientes,
    empleados,
    products,
    costosproduccion,
    asignaciones,
    cortes,
    pendientesasignacion,
    cobros,
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

            <main className=" flex  ">
                <Sidebar />
                <div className=" w-full flex-col">
                    <div className="w-full flex flex-row justify-between m-2 p-4 items-center bg-white">
                        <Button
                            variant="contained"
                            startIcon={<FiList></FiList>}
                        >
                            <Link href="/crear-pedidos">Nuevo Pedido</Link>
                        </Button>
                        <Button
                            variant="outlined"
                            startIcon={<FiEdit></FiEdit>}
                        >
                            <Link href={route("asignacion.index")}>
                                Asignar{" "}
                            </Link>
                        </Button>
                        <Button variant="outlined" startIcon={<FiScissors />}>
                            <Link href={route("corteConfeccion.index")}>
                                En Cortes
                            </Link>
                        </Button>
                    </div>

                    <div className="flex flex-col">
                        <Acordeon title={`Lista de costos empleados - $${costosproduccion.toFixed(2)}`}>
                            <TableCostos  asignaciones={asignaciones} costosproduccion={costosproduccion}/>
                        </Acordeon>
                        <Acordeon title="Saldo por cobrar en Almacen ">
                            <Tablecobros />
                        </Acordeon>
                    </div>
                </div>
                {/* <div className=" grid grid-cols-3">
                    
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
                                            
                                        </td>
                                        <td className="px-4 py-2">
                                            {asignacion.total_asignaciones}{" "}
                                            
                                        </td>
                                        <td className="px-4 py-2">
                                            ${asignacion.total_costo.toFixed(2)}{" "}
                                            
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t border-gray-200 dark:border-gray-700">
                                    <td
                                        colSpan={3}
                                        className="text-end px-4 py-2"
                                    >
                                        {" "}
                                        Total :${costosproduccion.toFixed(2)}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </Section>
                    <Section>
                        <Tablecobros />
                    </Section>
                </div> */}
            </main>
        </AuthenticatedLayout>
    );
}
