import React, { useState } from "react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import InputError from "./InputError";

import axios from "axios";
import SecondaryButton from "./SecondaryButton";
import { useRef } from "react";
import { useEffect } from "react";
import _ from "lodash";
import { useCallback } from "react";

const FormClient = ({setData,setNewClientDialogOpen}) => {
    const [errorcliente, setErrorcliente] = useState();
    const [cliente, setClient] = useState({
        full_name: "",
        identification_number: "",
        phone: "",
        email: "",
        address: "",
    });
    const isfirtserch = useRef(true); //establece que es la primera busqueda

    const buscarCliente = useCallback(
        _.debounce(async (identification) => {
            if (identification.length >= 5) {
                try {
                    const response = await axios.get(
                        route("client.search",identification)
                        
                    );
                     if(response.data.length!==0){
                        setClient(response.data[0])
                        console.log(response.data[0])
                     }
                    
                    
                } catch (error) {
                    console.error("Error buscando el cliente:", error);
                }
            }
        }, 5000),
        []
    );
    useEffect(() => {
        if (isfirtserch.current) {
            isfirtserch.current = cliente.identification === "";
            return;
        }

        buscarCliente(cliente.identification);
      
    }, [cliente.identification]);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      

        setClient({ ...cliente, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(route("client.store"), cliente, {
                headers: {
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    "Content-Type": "application/json",
                },
            });
            setData((prevData) => ({
                ...prevData,
                cliente:  response.data.client,
            }));
            setNewClientDialogOpen(false)

            
        } catch (error) {
            
            if (error.response && error.response.status === 422) {
                console.log(error.response.data.errors)
                setErrors(error.response.data.errors);
            } else {

                console.error("Error creando el cliente:", error);
            }
        }
    };

    return (
        <form className="grid gap-4 " onSubmit={handleSubmit}>
            {JSON.stringify(cliente,null,2)}
            {JSON.stringify(errors)}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <InputLabel htmlFor="identification">
                        Numero de Identificación
                    </InputLabel>
                    <TextInput
                        onChange={handleChange}
                        type="number"
                        name="identification_number"
                        id="identification_number"
                        placeholder="Ingresa el número de identificación"
                        required
                    />
                    {errors.identification_number && (
                        <InputError message={errors.identification_number} />
                    )}
                </div>
                <div className="space-y-2">
                    <InputLabel htmlFor="fullName">Nombre completo</InputLabel>
                    <TextInput
                        name="full_name"
                        onChange={handleChange}
                        id="fullName"
                        placeholder="Ingresa el nombre completo"
                        required
                    />
                    {errors.full_name && (
                        <InputError message={errors.full_name} />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInput
                        onChange={handleChange}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Ingresa el email"
                        
                    />
                    {errors.email && <InputError message={errors.email} />}
                </div>
                <div className="space-y-2">
                    <InputLabel htmlFor="phone">Teléfono</InputLabel>
                    <TextInput
                        onChange={handleChange}
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Ingresa el número de teléfono"
                        required
                    />
                    {errors.phone && <InputError message={errors.phone} />}
                </div>
            </div>
            <div className="space-y-2">
                <InputLabel htmlFor="address">Dirección</InputLabel>
                <TextInput
                    id="address"
                    onChange={handleChange}
                    name="address"
                    placeholder="Ingresa la dirección"
                    required
                />
                {errors.address && <InputError message={errors.address} />}
            </div>
            <div className="space-y-2">
                <InputLabel htmlFor="notes">Notas</InputLabel>
                <TextInput
                    onChange={handleChange}
                    id="notes"
                    placeholder="Agrega notas o comentarios"
                />
                {errors.notes && <InputError message={errors.notes} />}
            </div>
            <SecondaryButton type="submit">Crear</SecondaryButton>
        </form>
    );
};

export default FormClient;
