import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Section from "@/Components/Section";
import SecondaryButton from "@/Components/SecondaryButton";
import Sidebar from "@/Layouts/Sidebar";

export default function Dashboard({ auth, clientes, empleados, products }) {
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
            <main className="flex">
                <Sidebar />
                <div className=" grid  grid-cols-3 gap-2 items-baseline">
                <Section className=" flex justify-center items-center  ">
                        <h1 className="text-gray-500 dark:text-gray-200 text-2x1">
                            Tus Pedidos{" "}
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200">
                            Introduce nuestro dinámico panel de pedidos para una
                            gestión fluida y un análisis perspicaz.
                        </p>
                        <SecondaryButton>
                            <Link href="/crear-pedidos">Crear Nuevo pedio</Link>
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
                    
                   {/*  
                    
                    <Section className="w-1/3 flex justify-center items-center ">
                        <h1 className="text-gray-500 dark:text-gray-200 text-2x1 text-center">
                            Clientes registrados
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200 text-center">
                            {clientes}
                        </p>
                        <SecondaryButton>
                            {" "}
                            <Link href="/clients">Ver clientes</Link>
                        </SecondaryButton>
                    </Section>
                    <Section className="w-1/3">
                        <h1 className="text-gray-500 dark:text-gray-200 text-2x1 text-center">
                            Empleados registrados
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200 text-center">
                            {empleados}
                        </p>
                        <SecondaryButton>
                            {" "}
                            <Link href="/employees">Ver Empleado</Link>
                        </SecondaryButton>
                    </Section>
                    <Section className="w-1/3">
                        <h1 className="text-gray-500 dark:text-gray-200 text-2x1 text-center">
                            Productos
                        </h1>
                        <p className="text-gray-700 dark:text-gray-200 text-center">
                            {products}
                        </p>
                        <SecondaryButton>
                            {" "}
                            <Link href="/products">Ver Productos</Link>
                        </SecondaryButton>
                    </Section>
                     */}
                </div>
            </main>
        </AuthenticatedLayout>
    );
}
