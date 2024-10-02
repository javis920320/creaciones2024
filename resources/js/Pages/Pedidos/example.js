import React, { useState, useEffect, useMemo } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import Section from "@/Components/Section";
import Dropdown from "@/Components/Dropdown";
import axios from "axios";

const Asignacion = ({ auth }) => {
    const [data, setData] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1); 
    const [filters, setFilters] = useState({
        factura: "",
        cliente: "",
        estado: "Producción en curso",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(route("lista.pedidos"), {
                    params: {
                        page: pageIndex + 1, 
                        per_page: pageSize,
                        ...filters, 
                    },
                });
                setData(response.data); 
                setTotalPages(response.data.last_page); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [pageIndex, pageSize, filters]);

    const columns = useMemo(() => [
        { header: "Factura", accessorKey: "factura" },
        { header: "Pedido", accessorKey: "id" },
        { header: "Cliente", accessorKey: "cliente.full_name" },
        { header: "Estado", accessorKey: "estado" },
        { header: "Fecha de Ingreso", accessorKey: "created_at" },
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
                        <Dropdown.Link href="#">Editar</Dropdown.Link>
                        <Dropdown.Link href="#">Eliminar</Dropdown.Link>
                        <Dropdown.Link href="#">Imprimir</Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            )
        }
    ], []);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const resetFilters = () => {
        setFilters({
            factura: "",
            cliente: "",
            estado: "Producción en curso",
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Asignacion de Pedidos
                </h2>
            }
        >
            <Head title="Asignar Pedidos" />

            <Section>
                <h1 className="text-bold">Pedidos Pendientes</h1>

                <div className="mb-4 flex gap-4">
                    <input
                        type="text"
                        name="factura"
                        value={filters.factura}
                        onChange={handleFilterChange}
                        placeholder="Buscar por Factura"
                        className="p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="cliente"
                        value={filters.cliente}
                        onChange={handleFilterChange}
                        placeholder="Buscar por Cliente"
                        className="p-2 border rounded"
                    />
                    <select
                        name="estado"
                        value={filters.estado}
                        onChange={handleFilterChange}
                        className="p-2 border rounded"
                    >
                        <option value="Producción en curso">Producción en curso</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                    <button
                        onClick={resetFilters}
                        className="p-2 bg-red-500 text-white rounded"
                    >
                        Resetear Filtros
                    </button>
                </div>

                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-collapse">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index} className="px-6 py-3">{col.header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="px-6 py-3">
                                        {col.accessorKey ? getNestedValue(row, col.accessorKey) : row[col.accessorKey] || 'N/A'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination-controls">
                    <button
                        onClick={() => setPageIndex(old => Math.max(old - 1, 0))}
                        disabled={pageIndex === 0}
                    >
                        Anterior
                    </button>
                    <span>{`Página ${pageIndex + 1} de ${totalPages}`}</span>
                    <button
                        onClick={() => setPageIndex(old => Math.min(old + 1, totalPages - 1))}
                        disabled={pageIndex === totalPages - 1}
                    >
                        Siguiente
                    </button>
                </div>
            </Section>
        </AuthenticatedLayout>
    );
};

function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj) || 'N/A';
}

export default Asignacion;