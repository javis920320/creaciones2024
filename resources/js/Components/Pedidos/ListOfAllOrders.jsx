import { usePedidos } from "@/hooks/usePedidos";
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";
import TypeStatus from "./TypeStatus";

const ListOfAllOrders = () => {
    const Renderestado = ({ estado }) => {
        let className = "";
        let text = "";

        switch (estado) {
            case "Pedido confirmado":
                className = "px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800";
                text = "En proceso";
                break;
            case "Pedido creado":
                className = "px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800";
                text = "En proceso";
                break;
            case "Empaquetado":
            case "Pedido completado":
                className = "px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800";
                text = "Finalizado";
                break;
            case "Producción en curso":
                className = "px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800";
                text = "En proceso";
                break;
            case "Control de calidad":
            default:
                className = "px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800";
                text = "Anulado";
                break;
        }

        return <span className={className}>{text}</span>;
    };

    const { pedidos } = usePedidos();
    const columns = useMemo(
        () => [
            { header: "codigo", accessorKey: "id" },
            { header: "factura", accessorKey: "factura" },
            { header: "cliente", accessorKey: "cliente.full_name" },
            { header: "Entrega a domicilio", accessorKey: "envioDomicilio" },
            { header: "fecha Entrega", accessorKey: "fechaEntrega" },
            { header: "fecha registro", accessorKey: "created_at" },
            {
                accessorKey: "estado",
                cell: ({ cell, row }) =><TypeStatus status={row.original.estado} />
                ,
            },
        ],
        []
    );
    const tableInstance = useReactTable({
        data: pedidos.data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    {tableInstance.getHeaderGroups().map((headerGroup) => (
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
                                              header.column.columnDef.header,
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
        </div>
    );
};

export default ListOfAllOrders;
