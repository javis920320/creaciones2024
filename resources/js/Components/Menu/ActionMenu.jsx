import React from 'react'

import { Menu } from "@headlessui/react"; // Biblioteca para Dropdown
import { FiMoreVertical } from 'react-icons/fi';
import clsx from "clsx";
import { router } from "@inertiajs/react";
// Componente para cada item del menú
const MenuItem = ({ label, onClick }) => (
    <Menu.Item>
        {({ active }) => (
            <button
                onClick={onClick}
                className={clsx(
                    "group flex rounded-md items-center w-full px-2 py-2 text-sm",
                    active
                        ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                        : "text-gray-700 dark:text-gray-200"
                )}
            >
                {label}
            </button>
        )}
    </Menu.Item>
);

const ActionMenu = ({row}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none">
                <FiMoreVertical />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                <div className="px-1 py-1 ">
                    <MenuItem
                        label="Asignar y procesar"
                        onClick={() =>
                            router.get(route("asignacion.create", row.id))
                        }
                    />
                    <MenuItem
                        label="Editar"
                        onClick={() => router.get(route("orders.edit", row.id))}
                    />
                    <MenuItem
                        label="Eliminar"
                        onClick={() => handleDelete(row.id)}
                    />
                    <MenuItem
                        label="Imprimir"
                        onClick={() => handlePrint(row.id)}
                    />
                </div>
            </Menu.Items>
        </Menu>
  )
}

export default ActionMenu