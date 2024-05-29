import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import React from "react";

const Create = ({ auth }) => {
    const { data, errors, setData, processing, recentlySuccessful,post } =
        useForm();


    const HandleSubmit = (e) => {
        e.preventDefault();
        post(route("client.store"));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Crear Cliente
                </h2>
            }
        >
            <Head title="Crear Cliente "></Head>
            <Link
                className="text-indigo-400 hover:text-indigo-600"
                href="/clients"
            >
                Clientes
            </Link>
            <span className="text-indigo-400 font-medium">/</span>
            <section className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
                <header>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Informacion Personal
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Realiza la actualizacion de datos, los campos son
                        requeridos.
                    </p>
                </header>
                
                <form onSubmit={HandleSubmit}>
                    <div>
                        
                        <InputLabel>Nombre Completo</InputLabel>
                        <TextInput
                            onChange={(e) =>
                                setData("full_name", e.target.value)
                            }
                            required
                            isFocused
                            autoComplete="full_name"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.full_name}
                        />
                    </div>
                    <div>
                        <InputLabel>Identificación</InputLabel>
                        <TextInput
                            onChange={(e) => setData("identification_number", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.identification_number} />
                    </div>
                    <div>
                        <InputLabel>Celular</InputLabel>
                        <TextInput
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                            isfocused
                        />
                        <InputError className="mt-2" message={errors.phone} />
                    </div>
                    <div>
                        <InputLabel>Email</InputLabel>
                        <TextInput
                        type="email"
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div>
                        <InputLabel>Dirección</InputLabel>
                        <TextInput
                            onChange={(e) => setData("address", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.address} />
                    </div>
                    <div>
                        <InputLabel>Ciudad</InputLabel>
                        <TextInput
                            onChange={(e) => setData("city", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.city} />
                    </div>
                    <div>
                        <InputLabel>Fecha Nacimiento</InputLabel>
                        <TextInput
                        type="date"
                            onChange={(e) => setData("birthday", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.birthday} />
                    </div>
                    <PrimaryButton>Nuevo Cliente</PrimaryButton>
                </form>
            </section>
        </AuthenticatedLayout>
    );
};

export default Create;
