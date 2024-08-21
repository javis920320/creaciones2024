import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Section from "@/Components/Section";
import PrimaryButton from "@/Components/PrimaryButton";
const Index = ({ auth, empleados = null }) => {
    const { props } = usePage();
    const { flash } = props;

    const existEmpleados = !!empleados;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Listado Empleados
                </h2>
            }
        >
            <Head title="Lista de Empleados "></Head>
            
            <SecondaryButton className="m-4">
                <Link href="/employees/create">Registrar Empleado</Link>
            </SecondaryButton>
           {/*  {flash.success && (
                <div className="alert alert-success">{flash.success}</div>
            )} */}
            
            <Section className="w-3/4">
                <table className=" w-full text-sm text-left rtl:text:rigth text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr className="text-nowrap">
                            <th className="px-3 py-2">Nombre Completo</th>
                            <th className="px-3 py-2">Numero de Identidad</th>
                            <th className="px-3 py-2">Genero</th>
                            <th className="px-3 py-2">Fecha de nacimiento</th>
                            <th className="px-3 py-2">Celular</th>

                            <th className="px-3 py-2">Email</th>
                            <th className="px-3 py-2">Cargo</th>
                            <th className="px-3 py-2">Cargo</th>
                            <th className=" px-3 py-2">Fecha Contratación</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="dark:to-blue-950 ">
                        {empleados ? (
                            empleados.data.map((empleado) => (
                                <tr className="p-4 text-gray-400">
                                    <td className="px-3 py-2">
                                        {empleado.nombreCompleto}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.dni}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.genero}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.fechaNacimiento}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.telefono}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.email}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.cargo}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.fechaContratacion}
                                    </td>
                                    <td className="px-3 py-2">
                                        {empleado.fechaContratacion}
                                    </td>
                                    <td className="px-3 py-2">
                                        <Link
                                            href={route(
                                                "employees.edit",
                                                empleado.id
                                            )}
                                        >
                                        <PrimaryButton>Editar</PrimaryButton>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td>"No hay empleados registrados"</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </Section>
        </AuthenticatedLayout>
    );
};

export default Index;
