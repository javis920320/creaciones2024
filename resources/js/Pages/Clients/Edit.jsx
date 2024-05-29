import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import React from "react";

const Edit = ({ auth, client,className='' }) => {
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            id:client.id,
            full_name: client.full_name,
            email: client.email,
            address: client.address,
            phone: client.phone,
        });
    const onSubmit = (e) => {
        e.preventDefault();
        patch(route('client.update'));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Editar Cliente
                </h2>
            }
        >
            <Head title="Editar Cliente"></Head>
            <Link
                className="text-indigo-400 hover:text-indigo-600"
                href="/clients"
            >
                Clientes
            </Link>
            <span className="text-indigo-400 font-medium">/</span>
           <span className="text-white">{client.full_name}</span> 

            <section className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg">
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Informacion Personal</h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Realiza la actualizacion de datos, los campos son requeridos.
                </p>
            </header>

                <form onSubmit={onSubmit}>
                    <div className="flex flex-wrap  -m-8 -mr-6 p-8">
                        <div>
                            <InputLabel>Nombre Completo</InputLabel>
                            <TextInput
                                value={data.full_name}
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
                            <InputLabel>Email</InputLabel>
                            <TextInput 
                            value={data.email}
                            onChange={(e)=>setData("email",e.target.value)}
                            isFocused
                            required
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
                             onChange={(e)=>setData("address",e.target.value)}
                             isFocused
                             required
                             />
                            <InputError
                                className="mt-2"
                                message={errors.address}
                            />
                        </div>

                        <div>
                            <InputLabel>Celular</InputLabel>
                            <TextInput
                             value={data.phone}
                             onChange={(e)=>setData("phone",e.target.value)}
                            isFocused 
                            required
                              />
                            <InputError className="mt-2" message={errors.phone}/>
                        </div>

                        <PrimaryButton>Editar</PrimaryButton>
                    </div>
                </form>
                </section>
        </AuthenticatedLayout>
    );
};

export default Edit;
