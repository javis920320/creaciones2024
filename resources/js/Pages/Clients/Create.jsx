import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import Section from "@/Components/Section";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { isNumber } from "lodash";
import React from "react";

const Create = ({ auth, client = null }) => {
    const iseditable = !!client;
    const { data, errors, setData, processing, post,put } = useForm({
        full_name: client?.full_name || "",
        email: client?.email || "",
        phone: client?.phone || "",
        identification_number: client?.identification_number || "",
        address: client?.address || "",
        city: client?.city || "",
        birthday: client?.birthday || "",
    });

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (iseditable) {
            put(route("client.update",client.id));
        } else {
            post(route("client.store"));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Crear Cliente
                    <span className="text-indigo-400 font-medium">/</span>
                    <Link
                        className="text-indigo-400 hover:text-indigo-600"
                        href="/clients"
                    >
                        Clientes
                    </Link>
                </h2>
            }
        >
            <Head title="Crear Cliente " />

            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Información Personal
                    </h2>
                </div>

                <Section>
                    
                    <form onSubmit={HandleSubmit}>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <InputLabel>Nombre Completo</InputLabel>
                                <TextInput
                                value={data.full_name}
                                    onChange={(e) =>{
                                        if(String(e.target.value).startsWith(" "))return;
                                        setData("full_name", e.target.value)
                                    }
                                       
                                    }
                                    required
                                    autoComplete="full_name"
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.full_name}
                                />
                            </div>

                            <div>
                                <InputLabel>Identificación</InputLabel>
                                <TextInput
                                type="number"
                                value={data.identification_number}
                                    onChange={(e) =>{
                                        const{value}=e;    
                                        if(!isNumber(Number(value)) )return;
                                        setData(
                                            "identification_number",
                                            e.target.value
                                        )
                                    }

                                        
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.identification_number}
                                />
                            </div>

                            <div>
                                <InputLabel>Celular</InputLabel>
                                <TextInput
                                type="number"
                                value={data.phone}
                                    onChange={(e) =>
                                        setData("phone", e.target.value)
                                    }
                                    required
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.phone}
                                />
                            </div>

                            <div>
                                <InputLabel>Email</InputLabel>
                                <TextInput
                                value={data.email}
                                    type="email"
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.email}
                                />
                            </div>

                            <div>
                                <InputLabel>Dirección</InputLabel>
                                <TextInput
                                value={data.address}
                                    onChange={(e) =>
                                        setData("address", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.address}
                                />
                            </div>

                            <div>
                                <InputLabel>Ciudad</InputLabel>
                                <TextInput
                                value={data.city}
                                    onChange={(e) =>
                                        setData("city", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.city}
                                />
                            </div>

                            <div>
                                <InputLabel>Fecha de Nacimiento</InputLabel>
                                <TextInput
                                    type="date"
                                    value={data.birthday}
                                    onChange={(e) =>
                                        setData("birthday", e.target.value)
                                    }
                                    className="mt-1 block w-full"
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.birthday}
                                />
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <PrimaryButton processing={processing}>
                                {iseditable
                                    ? "Editar Cliente"
                                    : "Nuevo Cliente"}
                            </PrimaryButton>
                        </div>
                    </form>
                </Section>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
