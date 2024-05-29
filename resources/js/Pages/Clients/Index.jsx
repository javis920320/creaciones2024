import Guest from "@/Layouts/GuestLayout";
import { Head, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

const Index = ({auth, clients }) => {
    return (
      <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Listado de Clientes</h2>}
        >
            <Head title="Clientes" />
            <h1 className=" text-white mb-8 text-3xl font-bold">Clientes</h1>

            <Link className="px-6 py-3  rounded bg-indigo-600 text-white text-sm  leading-4 font-bold whitespace-nowrap hover:bg-orange-400 focus:bg-orange-400" href={route("client.create")}><span>Crear</span><span>Cliente</span> </Link>
            <div className="bg-white rounded-md shadow overflow-x-auto">
                <table className="w-full whitespace-nowrap">
                    <thead>
                        <tr className="text-left font-bold">
                            <th className="pb-4 pt-6 px-6">Nombre </th>
                            <th className="pb-4 pt-6 px-6">Dirección</th>
                            <th className="pb-4 pt-6 px-6">Celular</th>
                            <th className="pb-4 pt-6 px-6">Identificacion</th>
                            <th className="pb-4 pt-6 px-6">Email</th>
                            <th className="pb-4 pt-6 px-6">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(({ id,full_name,email,phone,address,identification_number ,status}) => (
                            <tr key={id} className="hover:bg-gray-100 focus-within:bg-gray-100">
                                <td className="border-t"><Link className="text-indigo-600 hover:text-indigo-900" href={route('clients.edit',id)}>{full_name}</Link></td> 
                                <td className="border-t">{address}</td>
                                <td className="border-t">{phone}</td>
                                <td className="border-t">{identification_number}</td>
                                <td className="border-t">{email}</td>
                                <td className="border-t">{status}</td>
                            </tr>
                            

                            
                            
                        ))}
                    </tbody>
                </table>
            </div>

        </AuthenticatedLayout>
    );
};

export default Index;
