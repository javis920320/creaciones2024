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
import ListaCategorias from "@/Components/Products/ListaCategorias";
import PanelCategorias from "@/Components/Categorias/PanelCategorias";
import ListOfAllOrders from "@/Components/Pedidos/ListOfAllOrders";

export default function Dashboard({
    auth,
  
   
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
                {/* <Sidebar /> */}
                <div className=" w-full flex-col">
                    <div className="w-full flex flex-row justify-between m-2 p-4 items-center bg-white dark:bg-slate-900">
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

                 
                    <div>
                        <ListOfAllOrders />
                    </div>
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
