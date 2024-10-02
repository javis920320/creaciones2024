import React, { useMemo, useRef, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Section from "@/Components/Section";
import Dropdown from "@/Components/Dropdown";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import PrimaryButton from "@/Components/PrimaryButton";
import { FiPrinter, FiSend } from "react-icons/fi";
import { useCorteHook } from "./useCorteHook";
import Acordeon from "@/Components/Acordeon";

function IndeterminateCheckbox({ indeterminate, className = "", ...rest }) {
    const ref = useRef(null);

    React.useEffect(() => {
        if (typeof indeterminate === "boolean") {
            ref.current.indeterminate = !rest.checked && indeterminate;
        }
    }, [ref, indeterminate]);

    return (
        <input
            type="checkbox"
            ref={ref}
            className={className + " cursor-pointer"}
            {...rest}
        />
    );
}
const Index = ({ auth }) => {
    const {
        enviapedidosproduccion,
        datainstance,
        filters,
        setFilters,
        rowSelection,
        setRowSelection,
        setData,
        pedidos,
        imprimirPedidosSeleccionados
    } = useCorteHook();

     const handlePrinter=()=>{
        const selectedRows = tableInstance.getSelectedRowModel().rows;
        // Mapear a los IDs de las filas seleccionadas
        const selectedIds = selectedRows.map((row) => row.original.id);
        imprimirPedidosSeleccionados(selectedIds)

     }
    const handleSubmit = () => {
        // Obtener las filas seleccionadas directamente
        const selectedRows = tableInstance.getSelectedRowModel().rows;

        // Mapear a los IDs de las filas seleccionadas
        const selectedIds = selectedRows.map((row) => row.original.id);

        // Enviar los ítems seleccionados a producción
        enviapedidosproduccion(selectedIds);
    };

    const columns = useMemo(
        () => [
            {
                header: ({ table }) => (
                    <div>
                        <IndeterminateCheckbox
                            {...{
                                checked: table.getIsAllRowsSelected(),
                                indeterminate: table.getIsSomeRowsSelected(),
                                onChange:
                                    table.getToggleAllRowsSelectedHandler(),
                            }}
                        />
                    </div>
                ),
                accessorKey: "id",
                cell: ({ row }) => (
                    <div>
                        <IndeterminateCheckbox
                            {...{
                                checked: row.getIsSelected(),
                                disabled: !row.getCanSelect(),
                                indeterminate: row.getIsSomeSelected(),
                                onChange: row.getToggleSelectedHandler(),
                            }}
                        />
                    </div>
                ),
            },
            {
                header: "Factura",
                accessorKey: "factura",
            },
            {
                header: "Cliente",
                accessorKey: "cliente.full_name",
            },
            {
                header: "Fecha de entrega",
                accessorKey: "fechaEntrega",
            },
            {
                header: "Estado",
                accessorKey: "estado",
            },
            {
                header: "impreso",
                accessorKey: "impreso",
                cell: ({ row }) => (
                    <div>
                        {row.original.impreso ? "Se imprimio" : "sin imprimir"}
                    </div>
                ),
            },
            {
                header: "Detalles",
                accessorKey: "ordenes",
                cell: ({ row }) => (
                    <ul className="list-disc list-inside space-y-2 bg-gray-100 p-4 rounded-md shadow-md">
                        {row.original.ordenes.map((orden) => (
                            <li
                                key={orden.id}
                                className="border-b border-gray-300 pb-2"
                            >
                                <p className="font-bold text-indigo-600">
                                    Facultad:{" "}
                                    <span className="text-gray-800">
                                        [{orden.facultad}]
                                    </span>
                                </p>
                                <p className="text-gray-700">
                                    {orden.descripcion}
                                    <span className="text-gray-500">
                                        {" "}
                                        (Cantidad: {orden.cantidad})
                                    </span>
                                </p>
                            </li>
                        ))}
                    </ul>
                ),
            },
            {
                header: "Fecha de Ingreso",
                accessorKey: "created_at",
            },
            {
                header: "Acciones",
                cell: ({ row }) => (
                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                Acciones
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content align="right" width="48">
                            
                            <Dropdown.Link href="#">Ver detalles</Dropdown.Link>
                            <Dropdown.Link href={route("editar.envio",row.original.id)}>Editar</Dropdown.Link>
                            <Dropdown.Link href={route("pedido.cancelar",row.original.id)}>Cancelar Pedido</Dropdown.Link>
                            <Dropdown.Link href="#">Imprimir</Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>
                ),
            },
        ],
        [rowSelection]
    );

    const tableInstance = useReactTable({
        columns,
        data: datainstance,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Modulo de Corte y Confección
                </h2>
            }
        >
            <Head title="Corte y Confección"></Head>
            <div className="flex justify-center">
                <Section>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Buscar factura"
                            value={filters.factura}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    factura: e.target.value,
                                }))
                            }
                            className="mr-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Buscar cliente"
                            value={filters.cliente}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    cliente: e.target.value,
                                }))
                            }
                            className="mr-2 p-2 border border-gray-300 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Buscar estado"
                            value={filters.estado}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    estado: e.target.value,
                                }))
                            }
                            className="mr-2 p-2 border border-gray-300 rounded"
                        />
                        <PrimaryButton onClick={handlePrinter} className="flex gap-3">
                            <FiPrinter /> Imprimir
                        </PrimaryButton>
                        <PrimaryButton
                            className="flex gap-2"
                            onClick={handleSubmit}
                        >
                            <FiSend /> Enviar a Producción({rowSelection.length}
                            )
                        </PrimaryButton>
                    </div>

                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            {tableInstance
                                .getHeaderGroups()
                                .map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <th
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                className="px-6 py-3"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </th>
                                        ))}
                                    </tr>
                                ))}
                        </thead>

                        <tbody className="bg-white dark:bg-gray-800">
                            {tableInstance.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.original.id}
                                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-6 py-4 text-gray-900 dark:text-white"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Section>
                <Section>
                    <h1>Pedidos Impresos hoy</h1>
                    
                </Section>
                {/* <Acordeon/> */}
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
