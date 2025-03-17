import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import {
    Badge,
    Button,
    Card,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
} from "@mui/material";
import { useRef } from "react";
import RenderButtons from "@/Components/Asignacion/FormularioAsignacion";

import { useState } from "react";
import VerDisponibles from "@/Components/orders/Verdisponibles";
import axios from "axios";
import InformacionCliente from "@/Components/Asignacion/InformacionCliente";
import useCategorias from "@/hooks/useCategorias";
import FormularioAsignacion from "@/Components/Asignacion/FormularioAsignacion";

const Create = ({ auth, empleados, pedido }) => {
   
    const{categorias,inforCategoria} = useCategorias([]);
    const { ordenes } =
        pedido.data[0];
    const [newClientDialogOpen, setNewClientDialogOpen] = useState(false);

    const [orderSelected, SetordenSelected] = useState();
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Asignación de Pedidos{" "}
                    <Link
                        className="text-indigo-400 hover:text-indigo-600"
                        href="/asignacion"
                    >
                        / Lista Pedidos
                    </Link>
                </h2>
            }
        >
            <Head title="Asignar Pedidos" />
            <div className="grid grid-cols-4 gap-4 p-4">
                <div className="grid-cols-subgrid col-span-1 row-span-4">
                    <InformacionCliente pedido={pedido.data[0]}/>
                </div>
                <div className="col-span-3 grid grid-cols-1 gap-6">
                    <Card sx={{ borderRadius: "1rem" }}>
                        <CardContent>
                            <form className="space-y-6">
                                {ordenes.map((orden) => (
                                    <div
                                        className={`border p-4 rounded-lg transition-all duration-300 ${
                                            orden.estado === "completado"
                                                ? "border-green-500 bg-green-50"
                                                : "border-gray-200 bg-white"
                                        }`}
                                        key={orden.id}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                                            {/* Información del Producto */}
                                            <div className="flex items-start gap-4">
                                                <img
                                                    src="/placeholder.svg"
                                                    alt="Producto"
                                                    width={64}
                                                    height={64}
                                                    className="rounded-md"
                                                    style={{
                                                        aspectRatio: "64/64",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                                        {orden.producto}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm">
                                                        Descripción:{" "}
                                                        {orden.descripcion}
                                                    </p>
                                                    <p className="text-gray-600 text-sm">
                                                        Talla: {orden.talla}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Información de la Orden */}
                                            <div className="text-right space-y-3">
                                                <p className="text-gray-800 font-medium">
                                                     Categoría:
                                                    {inforCategoria(
                                                        orden.categoriaId
                                                    )}
                                                </p>
                                                <p className="text-gray-600 text-sm">
                                                    Cantidad: {orden.cantidad}
                                                </p>
                                                <p
                                                    className={`text-sm font-medium ${
                                                        orden.estado ===
                                                        "creado"
                                                            ? "text-yellow-500"
                                                            : orden.estado ===
                                                              "procesando"
                                                            ? "text-blue-500"
                                                            : orden.estado ===
                                                              "completado"
                                                            ? "text-green-500"
                                                            : "text-red-500"
                                                    }`}
                                                >
                                                    Estado: {orden.estado}
                                                </p>

                                                {/* Botones */}
                                                <div className="flex justify-end gap-4">
                                                    <SecondaryButton
                                                        onClick={() => {
                                                            SetordenSelected(
                                                                orden
                                                            );
                                                            setNewClientDialogOpen(
                                                                true
                                                            );
                                                        }}
                                                    >
                                                        Asignar Pedido
                                                    </SecondaryButton>
                                                    <VerDisponibles
                                                        orden={orden}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Dialog
            maxWidth={"lg"}
                open={newClientDialogOpen}
                onClose={() => setNewClientDialogOpen(false)}
            >
                <DialogTitle>Registrar Asignacion</DialogTitle>
                <DialogContent>
                    <h1 className="text-gray-500">
                        Asignacion y costos de elaboracion
                    </h1>

                    <FormularioAsignacion
                        empleados={empleados}
                        orden={orderSelected}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewClientDialogOpen(false)}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
};

export default Create;
