import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";
import Section from "@/Components/Section";

const Index = ({ auth, clients }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Listado de Clientes
                </h2>
            }
        >
            <Head title="Clientes" />
            <h1 className=" text-white mb-8 text-3xl font-bold">Clientes</h1>

            <Link
                className="px-6 py-3  rounded bg-indigo-600 text-white text-sm  leading-4 font-bold whitespace-nowrap hover:bg-orange-400 focus:bg-orange-400"
                href={route("client.create")}
            >
                <span>Crear</span>
                <span>Cliente</span>{" "}
            </Link>
            <Section className="m-4 w-2/3">
                <div className=" overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr className="text-left font-bold">
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    Nombre{" "}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Dirección</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Celular</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                    Identificacion
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Estado</th>
                            </tr>
                        </thead>
                        <tbody  className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                            {clients.map(
                                ({
                                    id,
                                    full_name,
                                    email,
                                    phone,
                                    address,
                                    identification_number,
                                    status,
                                }) => (
                                    <tr
                                        key={id}
                                        
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            <Link
                                                className="text-indigo-600 hover:text-indigo-900"
                                                href={route("clients.edit", id)}
                                            >
                                                {full_name}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{phone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                            {identification_number}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{status}</td>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </Section>
        </AuthenticatedLayout>
    );
};

export default Index;
