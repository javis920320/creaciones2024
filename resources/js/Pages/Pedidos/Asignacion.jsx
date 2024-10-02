import React, { useState, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import Section from "@/Components/Section";
import axios from "axios";

import clsx from "clsx";
import TextInput from "@/Components/TextInput";

import ActionMenu from "@/Components/Menu/ActionMenu";

const Asignacion = ({ auth }) => {
    const [data, setData] = useState([]); // Datos de los pedidos
    const [pageIndex, setPageIndex] = useState(1); // Página actual (1-based index)
    const [pageSize, setPageSize] = useState(50); // Tamaño de página
    const [totalPages, setTotalPages] = useState(1); // Total de páginas
    const [loading, setLoading] = useState(false); // Estado de carga
    const [error, setError] = useState(null); // Estado de error
    const [filters, setFilters] = useState({
        factura: "",
    });

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(route("lista.pedidos"), {
                params: {
                    page: pageIndex,
                    per_page: pageSize,
                    estado: "Producción en curso",
                    factura:filters.factura|| null
                },
            });
            setData(response.data.data); // Datos transformados
            setPageIndex(response.data.current_page); // Página actual
            setTotalPages(response.data.total_pages); // Total de páginas
            setPageSize(response.total_items); // Total de ítems
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Hubo un error al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    // Llamar a fetchData cuando cambie pageIndex o pageSize
    useEffect(() => {
        fetchData();
    }, [pageIndex, pageSize,filters]);

    // Definición de las columnas de la tabla
    const columns = useMemo(
        () => [
            { header: "Factura", accessor: "factura" },
            { header: "Pedido", accessor: "id" },
            {
                header: "Cliente",
                accessor: "cliente.full_name",
                cell: (row) => row.cliente?.full_name || "N/A",
            },
            { header: "Fecha de entrega", accessor: "fechaEntrega" },
            { header: "Estado", accessor: "estado" },
            {
                header: "Fecha de Ingreso",
                accessor: "created_at",
                cell: (row) =>
                    new Date(row.created_at).toLocaleDateString("es-ES"),
            },
            {
                header: "Acciones",
                cell: (row) => <ActionMenu row={row} />,
            },
        ],
        []
    );

    
    // Funciones para manejar acciones
    const handleDelete = (id) => {
        // Lógica para eliminar
        console.log("Eliminar pedido:", id);
    };

    const handlePrint = (id) => {
        // Lógica para imprimir
        console.log("Imprimir pedido:", id);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Asignación de Pedidos
                </h2>
            }
        >
            <Head title="Asignar Pedidos" />

            <Section>
                <h1 className="text-2xl font-bold mb-4">Pedidos Pendientes</h1>
                
                <TextInput placeholder="Buscar  factura" onChange={(e)=>setFilters((prev)=>({...prev,factura:e.target.value}))}></TextInput>
                {loading ? (
                    <div className="text-center py-10">Cargando...</div>
                ) : error ? (
                    <div className="text-center py-10 text-red-500">
                        {error}
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    {columns.map((col, index) => (
                                        <th
                                            key={index}
                                            className="px-6 py-3 whitespace-nowrap"
                                        >
                                            {col.header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((row, rowIndex) => (
                                        <tr
                                            key={rowIndex}
                                            className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            {columns.map((col, colIndex) => (
                                                <td
                                                    key={colIndex}
                                                    className="px-6 py-4 whitespace-nowrap"
                                                >
                                                    {col.cell
                                                        ? col.cell(row)
                                                        : row[col.accessor] ||
                                                          "N/A"}
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={columns.length}
                                            className="px-6 py-4 text-center"
                                        >
                                            No hay datos disponibles.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Controles de paginación */}
                <div className="flex items-center justify-between mt-4">
                    <div>
                        Mostrando página {pageIndex} de {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={() =>
                                setPageIndex((prev) => Math.max(prev - 1, 1))
                            }
                            disabled={pageIndex === 1 || loading}
                            className={clsx(
                                "px-4 py-2 rounded-md",
                                pageIndex === 1 || loading
                                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
                            )}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() =>
                                setPageIndex((prev) =>
                                    Math.min(prev + 1, totalPages)
                                )
                            }
                            disabled={pageIndex === totalPages || loading}
                            className={clsx(
                                "px-4 py-2 rounded-md",
                                pageIndex === totalPages || loading
                                    ? "bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-500"
                            )}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </Section>
        </AuthenticatedLayout>
    );
};

export default Asignacion;
