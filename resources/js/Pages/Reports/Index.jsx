import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Card, Container, Paper, Tab, Tabs } from "@mui/material";
import Acordeon from "@/Components/Acordeon";
import Tablecobros from "@/Components/Cobros/Tablecobros";
import TableCostos from "@/Components/Asignacion/TableCostos";

const Index = ({ auth, asignaciones, costosproduccion }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Reportes de trabajo
                </h2>
            }
        >
            <Head title="Reporte Actividades" />

            <Container sx={{ marginTop: "4px", display: "flex", gap: 2 }}>
                <div className="flex flex-col">
                    <Acordeon
                        title={`Lista de costos empleados - $${
                            !isNaN(Number(costosproduccion))
                                ? Number(costosproduccion).toFixed(2)
                                : "0.00"
                        }`}
                    >
                        <TableCostos
                            asignaciones={asignaciones}
                            costosproduccion={costosproduccion}
                        />
                    </Acordeon>

                    <Acordeon title="Saldo por cobrar en Almacen ">
                        <Tablecobros /> 
                    </Acordeon>
                </div>
            </Container>
        </AuthenticatedLayout>
    );
};

export default Index;
