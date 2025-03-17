import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import Section from "@/Components/Section";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectList from "@/Components/SelectList";
import DropzoneProducts from "@/Components/Dropzone/DropzoneProducts";
import CarruceImage from "@/Components/Products/CarruselImages";
import PreviewProduct from "@/Components/Products/PreviewProduct";
import { Alert, Container, Snackbar } from "@mui/material";

const Create = ({ auth, categorias, product = null }) => {
    const { url } = usePage();
    const iseditable = !!product;

    const { data, put, setData, errors, post, processing } = useForm({
        category_id: product?.data?.[0]?.categoria?.id || "",
        nameProduct: product?.data?.[0]?.nameProduct || "",
        description: product?.data?.[0]?.description || "",
        status: product?.data?.[0]?.status || "",
        price: product?.data?.[0]?.price || "",
        costo_produccion: product?.data?.[0]?.costo_produccion || "",
        costoProduccionExtra: product?.data?.[0]?.costoProduccionExtra || "",
        costoExterno: product?.data?.[0]?.costoExterno || "",
        images_url: product?.data?.[0]?.image_url || "",
    });

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const images = product?.data?.[0]?.images || [];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (iseditable) {
            put(route("product.update", product.data[0].id));
        } else {
            post(route("product.store"));
        }
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Crear Productos
                    <Link
                        className="text-gray-400 hover:text-blue-500 transition-colors duration-300 ease-in-out underline decoration-dashed decoration-gray-300 hover:decoration-solid hover:decoration-blue-500"
                        href="/products/"
                    >
                        /Listar
                    </Link>
                </h2>
            }
        >
            <Head title="Crear Productos " />
            <Container maxWidth="md">
                <div className="grid grid-cols-2 justify-center py-8 gap-4 ">
                    <form onSubmit={handleSubmit} className="flex flex-col ">
                        <Section className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <p className="text-gray-800 dark:text-gray-300 mb-6">
                                Diligencia todo el formulario para agregar a tu
                                inventario
                            </p>

                            <div className="w-full">
                                <InputLabel>Nombre de Producto</InputLabel>
                                <TextInput
                                    className="mt-1 block w-full"
                                    placeholder="Pantalones,camisas"
                                    onChange={(e) =>
                                        setData("nameProduct", e.target.value)
                                    }
                                    value={data.nameProduct}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.nameProduct}
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel>Descripcion</InputLabel>
                                <TextInput
                                    className="mt-1 block w-full"
                                    placeholder="comentarios"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                    value={data.description}
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.nameProduct}
                                />
                            </div>

                            <div className="flex">
                                <div className="w-3/4">
                                    <InputLabel>Categoria</InputLabel>

                                    <SelectList
                                        className="mt-1 block w-full"
                                        value={data.category_id || ""} // Asegúrate de que haya un valor por defecto
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        } // Actualiza el estado
                                    >
                                        <option value="" disabled>
                                            Seleccione la categoria
                                        </option>
                                        {categorias.map((categoria) => (
                                            <option
                                                key={categoria.id}
                                                value={categoria.id} // Vincula el valor con el id de la categoría
                                            >
                                                {categoria.nameCategory}
                                            </option>
                                        ))}
                                    </SelectList>

                                    <InputError
                                        className="mt-2"
                                        message={errors.category_id}
                                    />
                                </div>
                                <div>
                                    <InputLabel>Precio de venta</InputLabel>
                                    <TextInput
                                        className="mt-1 block w-full"
                                        placeholder="$2000"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.price}
                                    />
                                </div>
                            </div>
                            <div>
                                <InputLabel>Estado</InputLabel>
                                <SelectList
                                    className="mt-1 block w-full"
                                    value={data.status}
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                >
                                    <option value={""} disabled>
                                        Estado
                                    </option>
                                    <option checked value={"Activo"}>
                                        Activo
                                    </option>
                                    <option value={"Inactivo"}>Inactivo</option>
                                </SelectList>
                                <InputError
                                    className="mt-2"
                                    message={errors.status}
                                />
                            </div>
                        </Section>
                        <Section className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                            <p className="text-gray-800 dark:text-gray-300 mb-6">
                                Ajusta los Costos de elaboracion
                            </p>

                            <div>
                                <InputLabel>Costo Operario</InputLabel>
                                <TextInput
                                    className="mt-1 block w-full"
                                    value={data.costo_produccion}
                                    onChange={(e) =>
                                        setData(
                                            "costo_produccion",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.costo_produccion}
                                />
                            </div>

                            <div>
                                <InputLabel>Costo Operario Externo</InputLabel>
                                <TextInput
                                    className="mt-1 block w-full"
                                    value={data.costoExterno}
                                    onChange={(e) =>
                                        setData("costoExterno", e.target.value)
                                    }
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.costoExterno}
                                />
                            </div>
                            <div>
                                <InputLabel>Costo Nocturo</InputLabel>
                                <TextInput
                                    className="mt-1 block w-full"
                                    value={data.costoProduccionExtra}
                                    onChange={(e) =>
                                        setData(
                                            "costoProduccionExtra",
                                            e.target.value
                                        )
                                    }
                                />
                                <InputError
                                    className="mt-2"
                                    message={errors.costoProduccionExtra}
                                />
                                <input type="hidden" name="images" />
                            </div>
                        </Section>
                        <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
                            <SecondaryButton type="submit">
                                {iseditable
                                    ? "Editar Producto"
                                    : "Crear Producto"}
                            </SecondaryButton>
                        </div>
                        {processing ? (
                            <h1 className="text-green-200 bg-green-500 p-4">
                                Datos almacenados correctamente
                            </h1>
                        ) : null}
                    </form>
                    <div>
                    <Section className="h-28 w-44">
                        {images.length > 0 ? (
                            
                                
                                <PreviewProduct
                                    images={images}
                                ></PreviewProduct>
                            
                        ):(<h1>no hay imagenes</h1>)}
                        </Section>

                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                <DropzoneProducts setData={setData} setSnackbarMessage={setSnackbarMessage} setSnackbarOpen={setSnackbarOpen} setSnackbarSeverity={setSnackbarSeverity} />
                            </div>
                        </div>
                    </div>
                </div>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </AuthenticatedLayout>
    );
};

export default Create;
