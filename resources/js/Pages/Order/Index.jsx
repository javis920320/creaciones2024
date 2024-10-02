import React, { useRef } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import Section from "@/Components/Section";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Infoclients from "@/Components/orders/Infoclients";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectList from "@/Components/SelectList";
import TextArea from "@/Components/TextArea";
import Checkbox from "@/Components/Checkbox";
import List from "@/Components/orders/List";

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

const Index = ({ auth, categorias, pedido, ordenes,iseditable=false }) => {
    const editable=useRef(iseditable)
    const { data, setData, post, errors,put } = useForm({});
  const handleSend=(e)=>{
    e.preventDefault();
    if(ordenes.data[0]){
        put(route("pedido.submit",pedido.data[0].id))
    }

        return;

  }
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("order.store", pedido.data[0].id));
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    {iseditable?"Editar Pedido":"Crear Pedido"}
                </h2>
            }
        >
            <Head title="Crear Pedidos "></Head>

            <div className="flex gap-2 ">
                <Section className="w-1/2">
                
                    <p className="text-gray-500 dark:text-gray-700">
                        Complete el formulario para realizar su pedido.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex w-full gap-6 ">
                            <div className="w-1/2">
                                <InputLabel>Categoria </InputLabel>
                                <SelectList
                                    required
                                    className="w-full"
                                    onChange={(e) =>
                                        setData("categoria", e.target.value)
                                    }
                                >
                                    <option selected disabled>
                                        Categoria producto
                                    </option>
                                    {categorias.map(({ nameCategory, id }) => (
                                        <option key={id} value={id}>
                                            {nameCategory}
                                        </option>
                                    ))}
                                </SelectList>
                            </div>
                            <div className="w-1/2">
                                <InputLabel>Nombre Producto </InputLabel>
                                <TextInput
                                    required
                                    className="w-full"
                                    onChange={(e) =>
                                        setData("producto", e.target.value)
                                    }
                                ></TextInput>
                            </div>
                            <div className="w-1/2">
                                <InputLabel>Facultad </InputLabel>
                                <TextInput
                                    required
                                    className="w-full"
                                    onChange={(e) =>
                                        setData("facultad", e.target.value)
                                    }
                                ></TextInput>
                            </div>
                        </div>

                        <div className="flex w-full gap-6">
                            <div className="w-1/3">
                                <InputLabel>Size/Talla </InputLabel>
                                <SelectList
                                    className="w-full"
                                    onChange={(e) =>
                                        setData("talla", e.target.value)
                                    }
                                    required
                                >
                                    <option selected disabled>
                                        seleccione
                                    </option>
                                    {tallas.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </SelectList>
                            </div>

                            <div className="w-1/3">
                                <InputLabel>Cantidad </InputLabel>
                                <TextInput
                                    onChange={(e) =>
                                        setData("cantidad", e.target.value)
                                    }
                                    type="number"
                                    min="1"
                                    className="w-full"
                                    required
                                ></TextInput>
                            </div>
                            <div className="w-1/3">
                                <InputLabel>Precio Unitario </InputLabel>
                                <TextInput
                                    type="number"
                                    onChange={(e) =>
                                        setData(
                                            "precioUnitario",
                                            e.target.value
                                        )
                                    }
                                    className="w-full"
                                ></TextInput>
                            </div>
                        </div>

                        <div>
                            <InputLabel>Descripcion del Producto </InputLabel>
                            <TextArea
                                className="w-full"
                                onChange={(e) =>
                                    setData("descripcion", e.target.value)
                                }
                            ></TextArea>
                        </div>
                        <SecondaryButton type="submit">
                            Crear Orden
                        </SecondaryButton>
                    </form>
                </Section>
                <div className="w-1/2">
                    <Section className="w-full">
                        <Infoclients pedido={pedido} />
                    </Section>

                    <Section className="w-1/2 ">
                        <h1 className="text-black dark:text-gray-300 text-xl">
                            Ordenes Pendientes
                        </h1>
                        {ordenes ? (
                            <List ordenes={ordenes} iseditable={iseditable}/>
                        ) : (
                            <h2>No hay ordenes pendientes</h2>
                        )}
                    </Section>
                    <div className="w-1/2">
                    {!iseditable?(
                    <form onSubmit={handleSend} className="flex">
                    <InputLabel>Estado del Pedido</InputLabel>
                        <SelectList
                            required
                            className="w-full"
                            onChange={(e) => setData("estado", e.target.value)}
                        >
                            <option selected disabled>
                                Seleccione un estado
                            </option>
                            <option value="Producción en curso">Procesamiento</option>
                            <option value="Pedido enviado">Alistamiento</option>
                        </SelectList>
                        <SecondaryButton type="submit">Enviar A:</SecondaryButton>
                    </form>
                        ):<Link href={route("corteConfeccion.index")}>Volver a lista</Link>}

                        {JSON.stringify(editable)}
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
