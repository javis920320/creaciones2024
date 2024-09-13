import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import Section from "@/Components/Section";
import SelectList from "@/Components/SelectList";
import Checkbox from "@/Components/Checkbox";

import SecondaryButton from "@/Components/SecondaryButton";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
} from "@mui/material";
import { useRef } from "react";
import RenderButtons from "@/Components/Asignacion/RenderButtons";

import { useState } from "react";
import VerDisponibles from "@/Components/orders/Verdisponibles";

const Create = ({ auth, empleados, pedido }) => {
    const { ordenes, cliente, factura, fechaEntrega, envioDomicilio, estado } =
        pedido.data[0];
    const [newClientDialogOpen, setNewClientDialogOpen] = useState(false);
    

    const [orderSelected, SetordenSelected] = useState();
    
 

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Asignación de Pedidos  <Link
                        className="text-indigo-400 hover:text-indigo-600"
                        href="/asignacion"
                    >
                      /  Lista Pedidos 
                    </Link>
                </h2>
            }
        >
            <Head title="Asignar Pedidos" />
            <div className="flex justify-center   ">
                <Section className="flex justify-center">
                    <form action="">
                        <div>
                            <h2 className="text-lg font-medium">
                                Informacion del Cliente
                            </h2>
                            <p>Numero Factura: Fac- {factura}</p>
                            <p>
                                Cliente : {cliente.identification_number}{" "}
                                {cliente.full_name}
                            </p>
                            <p>
                                Entrega:
                                {fechaEntrega
                                    ? fechaEntrega
                                    : "Fecha no establecida"}
                            </p>
                            <p>Estado: {estado}</p>
                            <p>
                                Envio Domicilio:{" "}
                                {envioDomicilio
                                    ? "Envio Solicitado"
                                    : "No solicitado"}
                            </p>
                        </div>
                    </form>
                    <Divider />
                    <form className="m-6">
                        
                        {ordenes.map((orden) => (
                            <div className="flex items-center  gap-4 " key={orden.id}>
 
                                <div className={`grid gap-3 w-full my-1  ${orden.estado==="completado"?"border-2 border-dashed p-4 border-green-500 bg-green-100":""} `}>
                                    <div className="grid grid-cols-[1fr_auto] items-center gap-4 ">
                                        <div className="flex items-center gap-3">
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
                                                <h3 className="font-medium">
                                                    {orden.producto}
                                                </h3>
                                                <p className="text-muted-foreground text-sm">
                                                    Descripion:{" "}
                                                    {orden.descripcion}
                                                </p>
                                                <p className="text-muted-foreground text-sm">
                                                    Talla: {orden.talla}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-medium">
                                                Categoria: {orden.categoriaId}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                Cantidad: {orden.cantidad}
                                            </p>
                                            <p
                                                className={`text-sm ${
                                                    orden.estado === "creado"
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
                                            
                                            <SecondaryButton
                                                onClick={() => {
                                                    SetordenSelected(orden);
                                                    setNewClientDialogOpen(
                                                        true
                                                    );
                                                }}
                                            >
                                                Asignar Pedido
                                            </SecondaryButton>
                                            <VerDisponibles orden={orden}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </form>
                    <Divider />
                </Section>
                <Dialog
                    open={newClientDialogOpen}
                    onClose={() => setNewClientDialogOpen(false)}
                >
                    <DialogTitle>Registrar Asignacion</DialogTitle>
                    <DialogContent>
                        <h1 className="text-gray-500">
                            Asignacion y costos de elaboracion
                        </h1>
                        
                        <RenderButtons
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
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
