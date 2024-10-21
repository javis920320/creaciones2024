import React from "react";

const TableCostos = ({asignaciones,costosproduccion}) => {
    return (
        <>
            <h1 className="text-gray-400">Tabla de Costos</h1>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                    <tr>
                        <th className="px-4 py-2 text-left">Empleado</th>
                        <th className="px-4 py-2 text-left">
                            Total Asignaciones
                        </th>
                        <th className="px-4 py-2 text-left">Total Costo</th>
                    </tr>
                </thead>
                <tbody>
                    {asignaciones.map((asignacion, index) => (
                        <tr
                            key={index}
                            className="border-t border-gray-200 dark:border-gray-700"
                        >
                            <td className="px-4 py-2">
                                {asignacion.empleado.nombreCompleto}{" "}
                            </td>
                            <td className="px-4 py-2">
                                {asignacion.total_asignaciones}{" "}
                            </td>
                            <td className="px-4 py-2">
                            
                                ${!isNaN(Number(asignacion.total_costo))?Number(asignacion.total_costo).toFixed(2):"0:00"}{" "}
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr className="border-t border-gray-200 dark:border-gray-700">
                        <td colSpan={3} className="text-end px-4 py-2">
                            {" "}
                            Total :$
                            {!isNaN(Number(costosproduccion))?Number(costosproduccion).toFixed(2):"0.00"}
                            
                        </td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
};

export default TableCostos;
