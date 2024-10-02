import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Section from "@/Components/Section";
import SecondaryButton from "@/Components/SecondaryButton";
import { LucidePencil } from "@/Icons/Pencil";
import CardProduct from "@/Components/Products/CardProduct";
import ListaCategorias from "@/Components/Products/ListaCategorias";
const Index = ({ auth, products, categories }) => {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Productos
                </h2>
            }
        >
            <Head title="Lista de Productos "></Head>
            <div className="w-full flex gap-4">
                <div className="flex dark:bg-gray-800 w-64 justify-center min-h-[90vh] overflow-y-scroll rounded">
                    <ul className=" dark:bg-gray-900 w-full bg-white text-gray-700">
                        <li>
                            <SecondaryButton className="w-full">
                                <Link href="/categorias">+Categorias</Link>
                            </SecondaryButton>
                        </li>
                        {categories.map((categoria) => (
                             <ListaCategorias categoria={categoria}/>                            
                        ))}
                    </ul>
                </div>
                <Link href={route("product.create")}>
                    <SecondaryButton>Crear +</SecondaryButton>
                </Link>

                <div className="  text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6   flex-1 p-4 ">
                    {products.data.map((product) => (
                        
                        <CardProduct  product={product} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
