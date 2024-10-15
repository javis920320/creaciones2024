import useCobros from "@/hooks/useCobros";
import { Button } from "@mui/material";
import { flexRender, getCoreRowModel,useReactTable } from "@tanstack/react-table";
import axios from "axios";
import React, { useMemo } from "react";

const Tablecobros = () => {
    const { listcobros } = useCobros();
    const columns = useMemo(
        () => [
            { header: "codigo", accessorKey: "id" },
            { header: "factura", accessorKey: "factura" },
             { header: "producto", accessorKey: "producto" },
            { header: "cantidad", accessorKey: "cantidad" },
            { header: "precio", accessorKey: "monto" },
            { header: "fecha registro", accessorKey: "fechacobro" },
            { header: "Estado", accessorKey: "estado" }
        ],
        []
    );

    const tableInstance = useReactTable({
        data: listcobros,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const existdata = listcobros.length > 0;

    return (
        <div className="bg-gray-300 w-full m-4">
            <h2>Lista de ordenes por cobrar</h2>
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

export default Tablecobros;
