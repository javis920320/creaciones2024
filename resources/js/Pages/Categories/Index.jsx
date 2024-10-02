import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Section from "@/Components/Section";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextArea from "@/Components/TextArea";
import SecondaryButton from "@/Components/SecondaryButton";

const Index = ({ auth, categoria = null }) => {
    const iseditable = !!categoria;
    const { post, put, data, setData, errors } = useForm({
        nameCategory: categoria?.nameCategory || "",
        descripcion: categoria?.descripcion || "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (iseditable) {
            put(route("categoria.update", categoria.id));
        } else {
            post(route("categoria.store"));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Crear Categoria{" "}
                    <Link
                        className="text-indigo-400 hover:text-indigo-600"
                        href="/products"
                    >
                        / Lista Productos
                    </Link>
                </h2>
            }
        >
            <Head title="Crear Categoria "></Head>

            <div className="flex justify-center">
                <Section className="min-w-[400px]">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <InputLabel>Categoria</InputLabel>
                            <TextInput
                                value={data.nameCategory}
                                onChange={(e) =>
                                    setData("nameCategory", e.target.value)
                                }
                            ></TextInput>
                            <InputError
                                message={errors.nameCategory}
                            ></InputError>
                        </div>
                        <div>
                            <InputLabel>Descripcion</InputLabel>
                            <TextArea
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                            ></TextArea>
                            <InputError
                                message={errors.descripcion}
                            ></InputError>
                        </div>
                        <SecondaryButton type="submit">
                            {iseditable
                                ? "Editar Categoria"
                                : "Crear Categoria"}
                        </SecondaryButton>
                    </form>
                </Section>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
