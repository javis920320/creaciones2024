import { usePedidos } from "@/hooks/usePedidos";
import { flexRender, getCoreRowModel,useReactTable } from "@tanstack/react-table";
import React, { useMemo } from "react";

const ListOfAllOrders = () => {
    const { pedidos } = usePedidos();
    const columns = useMemo(
        () => [
            { header: "codigo", accessorKey: "id" },
            { header: "factura", accessorKey: "factura" },
            { header: "cliente", accessorKey: "cliente.full_name" },
            { header: "Entrega a domicilio", accessorKey: "envioDomicilio" },
            { header: "fecha Entrega", accessorKey: "fechaEntrega" },
            { header: "fecha registro", accessorKey: "created_at" },
            { header: "Estado", accessorKey: "estado" },
        ],
        []
    );
    const tableInstance = useReactTable({
      data:pedidos.data||[],
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
