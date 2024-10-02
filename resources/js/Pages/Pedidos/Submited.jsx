import React from "react";
import Section from "@/Components/Section";
import SecondaryButton from "@/Components/SecondaryButton";
import { Divider } from "@mui/material";
import { Link } from "@inertiajs/react";

const Submited = ({ pedido }) => {
    const {
        factura,
        fechaEntrega,
        id,
        cliente,
        estado,
        envioDomicilio,
        ordenes,
    } = pedido.data[0];
    const subtotal = ordenes.reduce(
        (total, { precioUnitario, cantidad }) =>
            total + precioUnitario * cantidad,
        0
    );
    const Domicilio = 5000;
    return (
        <div className="bg-background text-foreground p-6 md:p-10 rounded-lg shadow-lg max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Resumen de la compra </h1>
            </div>
            <div>
                <h2 className="text-lg font-medium">Informacion del Cliente</h2>
                <p>Numero Factura: Fac- {factura}</p>
                <p>
                    Cliente : {cliente.identification_number}{" "}
                    {cliente.full_name}
                </p>
                <p>
                    Entrega:
                    {fechaEntrega ? fechaEntrega : "Fecha no establecida"}
                </p>
                <p>Estado: {estado}</p>
                <p>
                    Envio Domicilio:{" "}
                    {envioDomicilio ? "Envio Solicitado" : "No solicitado"}
                </p>
            </div>
            <Divider></Divider>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <h2 className="text-lg font-medium">Artículos comprados</h2>

                    {ordenes.map(
                        ({
                            producto,
                            talla,
                            cantidad,
                            precioUnitario,
                            descripcion,
                        }) => (
                            <div className="grid gap-3">
                                <div className="grid grid-cols-[1fr_auto] items-center gap-4">
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
                                                {producto}
                                            </h3>
                                            <p className="text-muted-foreground text-sm">
                                                Descripion: {descripcion}
                                            </p>
                                            <p className="text-muted-foreground text-sm">
                                                Talla: {talla}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            ${precioUnitario}
                                        </p>
                                        <p className="text-muted-foreground text-sm">
                                            Cantidad: {cantidad}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
                {/* <Separator /> */}
                <Divider />
                <div className="grid gap-2">
                    <h2 className="text-lg font-medium">Resumen del pedido</h2>
                    <div className="grid gap-3">
                        <div className="flex items-center justify-between">
                            <p>Subtotal</p>

                            <p className="font-medium">
                                ${subtotal.toFixed(2)}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p> Envio Domicilio</p>

                            <p className="font-medium">
                                {envioDomicilio ? Domicilio : 0}
                            </p>
                        </div>
                        {/* <Separator /> */}
                        <Divider />
                        <div className="flex items-center justify-between">
                            <p className="font-medium">Total</p>
                            <p className="font-medium">
                                ${(subtotal + Domicilio).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
                <SecondaryButton className="w-full">
                    Imprimir resumen
                </SecondaryButton>
                <Link
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300 ease-in-out underline decoration-dashed decoration-gray-300 hover:decoration-solid hover:decoration-blue-500"
                    href={route("pedidos.index")}
                >
                    Nuevo pedido
                </Link>
            </div>
        </div>
    );
};

export default Submited;
