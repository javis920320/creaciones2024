import React, { useState } from "react";
import TextInput from "./TextInput";
import InputLabel from "./InputLabel";
import InputError from "./InputError";
import PrimaryButton from "./PrimaryButton";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import SecondaryButton from "./SecondaryButton";

const FormClient = () => {
    const [cliente, setClient] = useState({
        full_name: "",
        identification: "",
        phone: "",
        email: "",
        address: "",
    });

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
            alert("Cliente creado exitosamente.");
            // Aquí puedes limpiar el formulario o redirigir si es necesario.
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                console.error("Error creando el cliente:", error);
            }
        }
    };

    return (
        <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <InputLabel htmlFor="fullName">Nombre completo</InputLabel>
                    <TextInput
                        name="full_name"
                        onChange={handleChange}
                        id="fullName"
                        placeholder="Ingresa el nombre completo"
                    />
                    {errors.full_name && (
                        <InputError message={errors.full_name} />
                    )}
                </div>
                <div className="space-y-2">
                    <InputLabel htmlFor="identification">
                        Identificación
                    </InputLabel>
                    <TextInput
                        onChange={handleChange}
                        name="identification"
                        id="identification"
                        placeholder="Ingresa el número de identificación"
                    />
                    {errors.identification && (
                        <InputError message={errors.identification} />
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
