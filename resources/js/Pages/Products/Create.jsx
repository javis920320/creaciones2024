import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import Section from "@/Components/Section";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import SelectList from "@/Components/SelectList";

const Create = ({ auth, categorias,product=null }) => {

    const iseditable=!!product;
    const { data,put, setData, errors, post } = useForm({
        category_id:product?.category_id||"",
        nameProduct:product?.nameProduct||"",
        description:product?.description||"",
        status: product?.status||"",
        price: product?.price||"",
        costo_produccion: product?.costo_produccion||"",
        costoProduccionExtra:  product?.costoProduccionExtra||"",
        costoExterno:  product?.costoExterno||"",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if(iseditable){
            put(route("product.update",product.id))
        }else{
            post(route("product.store"))
        }
       
    };
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Crear Productos
                </h2>
            }
        >
            <Head title="Crear Productos " />
            <Link
  className="text-gray-400 hover:text-blue-500 transition-colors duration-300 ease-in-out underline decoration-dashed decoration-gray-300 hover:decoration-solid hover:decoration-blue-500"
  href="/products/"
>
  /Listar
</Link>

            <div className="flex justify-center py-8 gap-4">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
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
                                 onChange={(e)=>setData("nameProduct",e.target.value)}
                                 value={data.nameProduct}
                            />
                            <InputError className="mt-2" message={errors.nameProduct} />
                        </div>
                        <div className="w-full">
                            <InputLabel>Descripcion</InputLabel>
                            <TextInput
                                className="mt-1 block w-full"
                                placeholder="comentarios"
                                 onChange={(e)=>setData("description",e.target.value)}
                                 value={data.description}
                            />
                            <InputError className="mt-2" message={errors.nameProduct} />
                        </div>
                        <div className="flex">
                            <div className="w-3/4">
                                <InputLabel>Categoria</InputLabel>
                                <SelectList className=" mt-1 block w-full" value={data.category_id} onChange={(e)=>setData("category_id",e.target.value)}>
                                    <option value="" checked disabled>Seleccione la categoria</option>
                                    {categorias.map((categoria) => (
                                        <option value={categoria.id}>
                                            {categoria.nameCategory}
                                        </option>
                                    ))}

                                </SelectList>
                                <InputError className="mt-2" message={errors.category_id} />
                            </div>
                            <div>
                                <InputLabel>Precio de venta</InputLabel>
                                <TextInput
                                    className="mt-1 block w-full"
                                    placeholder="$2000"
                                    value={data.price}
                                     onChange={(e)=>setData("price",e.target.value)}
                                />
                                <InputError className="mt-2" message={errors.price} />
                            </div>
                        </div>
                        <div>
                                <InputLabel>Estado</InputLabel>
                                <SelectList
                                    className="mt-1 block w-full"
                                   
                                    value={data.status}
                                     onChange={(e)=>setData("status",e.target.value)}
                                >
                                 <option value={""} checked disabled>Estado</option>  
                                 <option value={"Activo"}>Activo</option> 
                                 <option value={"Inactivo"}>Inactivo</option>   
                                </SelectList>
                                <InputError className="mt-2" message={errors.status} />
                            </div>
                    </Section>
                    <Section className="w-full max-w-4xl p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                        <p className="text-gray-800 dark:text-gray-300 mb-6">
                            Ajusta los Costos de elaboracion
                        </p>

                        <div>
                            <InputLabel>Costo Operario</InputLabel>
                            <TextInput className="mt-1 block w-full" value={data.costo_produccion} onChange={(e)=>setData("costo_produccion",e.target.value)} />
                            <InputError className="mt-2" message={errors.costo_produccion} />
                        </div>

                        <div>
                            <InputLabel>Costo Operario Externo</InputLabel>
                            <TextInput className="mt-1 block w-full" value={data.costoExterno} onChange={(e)=>setData("costoExterno",e.target.value)} />
                            <InputError className="mt-2" message={errors.costoExterno} />
                        </div>
                        <div>
                            <InputLabel>Costo Nocturo</InputLabel>
                            <TextInput className="mt-1 block w-full" value={data.costoProduccionExtra} onChange={(e)=>setData("costoProduccionExtra",e.target.value)} />
                            <InputError className="mt-2"  message={errors.costoProduccionExtra}/>
                        </div>
                    </Section>
                    <div className="col-span-1 md:col-span-2 flex justify-end mt-6">
                        <SecondaryButton type="submit">{iseditable?"Editar Producto":"Crear Producto"}</SecondaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
