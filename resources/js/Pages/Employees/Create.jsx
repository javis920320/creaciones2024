import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Section from "@/Components/Section";
import InputLabel from "@/Components/InputLabel";

import TextInput from "@/Components/TextInput";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectList from "@/Components/SelectList";
import InputError from "@/Components/InputError";
const Create = ({ auth, empleado = null }) => {
    const iseditable = !!empleado;
    const { post, data, setData, errors, processing, progress, put } = useForm({
        nombreCompleto: empleado?.nombreCompleto || "",
        dni: empleado?.dni || "",
        genero: empleado?.genero || "",
        cargo: empleado?.cargo || "",
        fechaNacimiento: empleado?.fechaNacimiento || "",
        email: empleado?.email || "",
        direccion: empleado?.direccion || "",
        telefono: empleado?.telefono || "",
        fechaContratacion: empleado?.fechaContratacion || "",
        salario: empleado?.salario || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (iseditable) {
            put(route("employees.update", empleado.id));
        } else {
            post(route("employees.store"));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {iseditable ? "Editar Empleado" : "Crear Empleado"}{" "}
                    <Link
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300 ease-in-out underline decoration-dashed decoration-gray-300 hover:decoration-solid hover:decoration-blue-500"
                        href="/employees/"
                    >
                        /Listar
                    </Link>
                </h2>
            }
        >
            <Head title="Registro de Empleado "></Head>

            <div className="w-full flex justify-center gap-4">
                <Section className="w-3/4 ">
                    <h2 className="text-gray-700 dark:text-gray-400 mb-4">
                        Completa la informacion necesaria para registrar un
                        empleado
                    </h2>
                    <h2 className="text-gray-700 dark:text-gray-400 mb-4">
                        (*) Informacion Obligatoria
                    </h2>
                    <form className="flex flex-col" onSubmit={handleSubmit}>
                        <div className="flex gap-3">
                            <div className="mt-4">
                                <InputLabel>Nombre Completo *</InputLabel>
                                <TextInput
                                    value={data.nombreCompleto}
                                    onChange={(e) =>
                                        setData(
                                            "nombreCompleto",
                                            e.target.value
                                        )
                                    }
                                    placeholder=""
                                ></TextInput>
                                <InputError
                                    message={errors.nombreCompleto}
                                    className="mt-2"
                                />
                            </div>
                            <div className="mt-4">
                                <InputLabel>
                                    Numero de identificación *
                                </InputLabel>
                                <TextInput
                                    type="number"
                                    placeholder="Cedula de ciudadania"
                                    value={data.dni}
                                    onChange={(e) =>
                                        setData("dni", e.target.value)
                                    }
                                ></TextInput>
                                <InputError
                                    message={errors.dni}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2 w-full">
                            <div className="w-1/3">
                                <InputLabel>Genero *</InputLabel>
                                <SelectList
                                    value={data.genero}
                                    onChange={(e) =>
                                        setData("genero", e.target.value)
                                    }
                                >
                                    <option selected disabled>
                                        Seleccione{" "}
                                    </option>
                                    <option value={"Masculino"}>
                                        Masculino{" "}
                                    </option>
                                    <option value={"Femenino"}>
                                        Femenino{" "}
                                    </option>
                                    <option value={"Otro"}>Otro </option>
                                </SelectList>
                                <InputError
                                    message={errors.genero}
                                    className="mt-2"
                                />
                            </div>
                            <div className="w-1/4">
                                <InputLabel>Cargo *</InputLabel>
                                <SelectList
                                    value={data.cargo}
                                    onChange={(e) =>
                                        setData("cargo", e.target.value)
                                    }
                                >
                                    <option selected disabled>
                                        Seleccione{" "}
                                    </option>
                                    <option value={"Operador"}>
                                        Operador{" "}
                                    </option>
                                    <option value={"Diseño_Corte"}>
                                        Diseño y Corte
                                    </option>
                                    <option value={"Externo"}>
                                        Operador Externo
                                    </option>
                                    <option value={"Vendedor"}>
                                        Vendedor{" "}
                                    </option>
                                    <option value={"Administrador"}>
                                        Administrador{" "}
                                    </option>

                                    <option value={"Otro"}>Otro </option>
                                </SelectList>
                                <InputError
                                    message={errors.cargo}
                                    className="mt-2"
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel>Fecha de nacimiento</InputLabel>
                            <TextInput
                                type="date"
                                value={data.fechaNacimiento}
                                onChange={(e) =>
                                    setData("fechaNacimiento", e.target.value)
                                }
                                placeholder=""
                            ></TextInput>
                            <InputError
                                message={errors.fechaContratacion}
                                className="mt-2"
                            />
                        </div>
                        <div className="w-full">
                            <InputLabel>Email *</InputLabel>
                            <TextInput
                                value={data.email}
                                placeholder="prueba@prueba.com"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            ></TextInput>
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel>Dirección *</InputLabel>
                            <TextInput
                                value={data.direccion}
                                placeholder="Calle # 123"
                                onChange={(e) =>
                                    setData("direccion", e.target.value)
                                }
                            ></TextInput>
                            <InputError
                                message={errors.direccion}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel>Celular *</InputLabel>
                            <TextInput
                                value={data.telefono}
                                placeholder=""
                                onChange={(e) =>
                                    setData("telefono", e.target.value)
                                }
                            ></TextInput>
                            <InputError
                                message={errors.telefono}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <InputLabel>Fecha de Contratación</InputLabel>
                            <TextInput
                                value={data.fechaContratacion}
                                type="date"
                                onChange={(e) =>
                                    setData("fechaContratacion", e.target.value)
                                }
                                placeholder=""
                            ></TextInput>
                            <InputError
                                message={errors.fechaContratacion}
                                className="mt-2"
                            />
                        </div>
                        <div className="mb-4">
                            <InputLabel>Salario</InputLabel>
                            <TextInput
                                value={data.salario}
                                placeholder=""
                                onChange={(e) =>
                                    setData("salario", e.target.value)
                                }
                            ></TextInput>
                            <InputError message={errors.salario}></InputError>
                        </div>

                        <SecondaryButton type="submit">
                            {iseditable
                                ? "Actualizar Datos"
                                : "registrar empleado"}
                        </SecondaryButton>
                    </form>
                </Section>
                {/* <Section>
                    <div>
                        <InputLabel>Fotografia</InputLabel>
                        <TextInput placeholder="Calle # 123"></TextInput>
                    </div>
                </Section> */}
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
