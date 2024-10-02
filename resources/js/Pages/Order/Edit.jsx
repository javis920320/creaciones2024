import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Section from "@/Components/Section";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectInput from "@mui/material/Select/SelectInput";
import SelectList from "@/Components/SelectList";
import InputError from "@/Components/InputError";

const tallas = [
    //    { value: "", label: "Seleccione una talla" },
    { value: "0", label: "0" },
    { value: "2", label: "2" },
    { value: "4", label: "4" },
    { value: "6", label: "6" },
    { value: "8", label: "8" },
    { value: "10", label: "10" },
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "16", label: "16" },
    { value: "S", label: "S" },
    { value: "XS", label: "XS" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
];

const Edit = ({ auth, order, categorias }) => {
    const { data, setData, errors, put } = useForm({
        producto: order?.producto || "",
        cantidad: order?.cantidad || "",
        categoria: order?.categoriaId || "",
        talla: order?.talla || "",
        descripcion: order?.descripcion || "",
        precioUnitario: order?.precioUnitario || "",
        facultad:order?.facultad|| "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("orden.update", order.id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Editar Order/{" "}
                    {/* <Link href={route("")}>Pedido Seleccionado</Link> */}
                </h2>
            }
        >
            <Head title="Editar Orden "></Head>
            <div className="flex justify-center ">
                <Section>
                    <h1 className="text-capitalize p-2 text-center">
                        Editar Orden{" "}
                    </h1>
                    
                    <form onSubmit={handleSubmit}>
                        
                        <div>
                            <InputLabel>Categoria</InputLabel>
                            <SelectList
                                className="w-full"
                                value={data.categoria}
                                onChange={(e) =>
                                    setData("categoria", e.target.value)
                                }
                            >
                                <option value="">Selecciona</option>
                                {categorias.map(({ id, nameCategory }) => (
                                    <option key={id} value={id}>
                                        {nameCategory}
                                    </option>
                                ))}
                            </SelectList>
                            <InputError message={errors.categoria} />
                        </div>
                        <div>
                            <InputLabel>Producto</InputLabel>
                            <TextInput
                                value={data.producto}
                                onChange={(e) =>
                                    setData("producto", e.target.value)
                                }
                            ></TextInput>
                            <InputError message={errors.producto} />
                        </div>
                        <div>
                            <InputLabel>Facultad</InputLabel>
                            <TextInput
                                value={data.facultad}
                                onChange={(e) =>
                                    setData("facultad", e.target.value)
                                }
                            ></TextInput>
                            <InputError message={errors.facultad} />
                        </div>
                        <div>
                            <InputLabel>Cantidad</InputLabel>
                            <TextInput
                            type="number"
                                value={data.cantidad}
                                onChange={(e) =>
                                    setData("cantidad", e.target.value)
                                }
                            ></TextInput>
                            <InputError message={errors.cantidad} />
                        </div>
                        <div className="w-full">
                            <InputLabel>Talla </InputLabel>
                            <SelectList
                                className="w-full"
                                value={data.talla}
                                onChange={(e) =>
                                    setData("talla", e.target.value)
                                }
                            >
                                <option>Seleccione</option>
                                {tallas.map(({ value, label }) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </SelectList>
                            <InputError message={errors.talla} />
                        </div>
                        <div>
                            <InputLabel>Descripción </InputLabel>
                            <TextInput
                                value={data.descripcion}
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                            ></TextInput>
                            <InputError message={errors.descripcion} />
                        </div>
                        <div>
                            <InputLabel>Precio /unitario </InputLabel>
                            <TextInput
                                value={data.precioUnitario}
                                onChange={(e) =>
                                    setData("precioUnitario", e.target.value)
                                }
                            ></TextInput>
                            <InputError message={errors.precioUnitario} />
                        </div>
                        <SecondaryButton type="submit" className="my-2">
                            Editar
                        </SecondaryButton>
                    </form>
                </Section>
            </div>
        </AuthenticatedLayout>
    );
};

export default Edit;
