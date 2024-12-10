import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Card, Container, Paper, Tab, Tabs } from "@mui/material";

const Index = ({ auth }) => {
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

            <Container sx={{ marginTop: "4px" }}>
                <Card>
                    <Tabs className="text-blue-200">
                        <Tab label="Itme 1"></Tab>
                        <Tab label="Item 3"></Tab>
                    </Tabs>
                </Card>
            </Container>
        </AuthenticatedLayout>
    );
};

export default Index;
