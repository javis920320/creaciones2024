import React from 'react'

import { Link } from "@inertiajs/react";
import { FiActivity, FiArchive, FiUser, FiUsers } from 'react-icons/fi';

export default function Sidebar() {
    return (
        <div className="w-96 h-screen  bg-white border-dashed border-2 shadow-sm dark:bg-gray-800  flex flex-col">
            <div className="p-4">
                <h1 className="text-2xl font-bold">Navegación</h1>
            </div>
            <nav className="mt-5 flex-1">
               
                <Link href="/clients" className=" flex gap-3  py-2.5 px-4 dark:hover:bg-gray-700 text-gray-700"> <FiUser/>Ver Clientes  </Link>
                <Link href="/employees" className="flex gap-3 py-2.5 px-4 dark:hover:bg-gray-700 text-gray-700"> <FiUsers/>Ver Empleados </Link>
                <Link href="/products" className="flex gap-3 py-2.5 px-4 dark:hover:bg-gray-700 text-gray-700"> <FiArchive/>Ver Productos  </Link>
               
            </nav>
        </div>
    );
}
  

