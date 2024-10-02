import CalendarIcon from "@/Icons/CalendarIcon";
import MailIcon from "@/Icons/MailIcon";
import PhoneIcon from "@/Icons/PhoneIcon";
import TruckIcon from "@/Icons/TruckIcon";
import UserIcon from "@/Icons/UserIcon";
import { Badge } from "@mui/material";
import React from "react";

const Infoclients = ({ pedido }) => {
     const {cliente,factura,id,created_at,status,envioDomicilio}= pedido.data[0]
    return (
        <>
            <div className="flex justify-between items-center">
                <span className="font-semibold">Código:</span>
                <span>{id}</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="font-semibold">Factura:</span>
                <span>{factura}</span>
            </div>
            <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                <span className="font-semibold">Nombre Cliente:</span>
                <span>{cliente.full_name}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-semibold">Identificación:</span>
                <span>{cliente.identification_number}</span>
            </div>
            <div className="flex items-center gap-2">
                <MailIcon className="h-4 w-4" />
                <span className="font-semibold">Email:</span>
                <span>{cliente.email}</span>
            </div>
            <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4" />
                <span className="font-semibold">Teléfono:</span>
                <span>{cliente.phone}</span>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="font-semibold">Fecha y hora de creación:</span>
                <span>{created_at}</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="font-semibold">Estado:{status}</span>
                <Badge variant="secondary">Pedido creado</Badge>
            </div>
            <div className="flex items-center gap-2">
                <TruckIcon className="h-4 w-4" />
                <span className="font-semibold">Envío Domicilio:</span>
                <span>{envioDomicilio?"Domicilio solicitado":"No solicitado"}</span>
            </div>
        </>
    );
};

export default Infoclients;
