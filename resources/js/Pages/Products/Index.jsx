import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import Section from "@/Components/Section";
import SecondaryButton from "@/Components/SecondaryButton";
import { LucidePencil } from "@/Icons/Pencil";
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
                <div className="flex bg-gray-800 w-64 justify-center min-h-[90vh] overflow-y-scroll 	  rounded">
                    <ul className="bg-gray-900 w-full">
                        <li>
                            <SecondaryButton className="w-full">
                                <Link href="/categorias">+Categorias</Link>
                            </SecondaryButton>
                        </li>
                        {categories.map(({ nameCategory, id }) => (
                            <li
                                key={id}
                                className=" flex  justify-between cursor-pointer text-gray-300 p-4 hover:bg-gray-700 focus:text-white"
                            >
                                {nameCategory}
                                <div className="flex justify-between gap-5">
                                    <SecondaryButton>
                                        <Link href={route("categoria.edit",id)}>
                                            <LucidePencil />
                                        </Link>
                                    </SecondaryButton>
                                    <SecondaryButton>
                                        <Link>
                                            <LucidePencil />
                                        </Link>
                                    </SecondaryButton>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <Link href={route("product.create")}><SecondaryButton>Crear +</SecondaryButton></Link>
                
                 <div className="  text-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4  flex-1 p-4 ">
                    
                    {products.data.map(
                        ({
                            id,
                            nameProduct,
                            categoria,
                            price,
                            costo_produccion,
                            costoProduccionExtra,
                            status,
                            costoExterno,
                            description,
                        }) => (
                            <div className=" w-[280px] h-max mx-auto bg-white dark:bg-gray-800 flex flex-col justify-between shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl">
                                <header className="bg-gray-200 dark:bg-gray-700 p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                        {categoria.nameCategory}
                                    </h3>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {nameProduct}
                                    </h2>
                                </header>
                                <div className="p-6">
                                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                                        {description}
                                    </p>
                                    <label className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        Costos de Elaboración:
                                    </label>
                                    <table className="w-full mt-4 text-left text-gray-800 dark:text-gray-200 border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="border-b dark:border-gray-700 py-2">
                                                    Descripción
                                                </th>
                                                <th className="border-b dark:border-gray-700 py-2">
                                                    Costo
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="border-b dark:border-gray-700 py-2">
                                                    Costo de producción
                                                </td>
                                                <td className="border-b dark:border-gray-700 py-2">
                                                    ${costo_produccion}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-gray-700 py-2">
                                                    Costos jornadas extra
                                                </td>
                                                <td className="border-b dark:border-gray-700 py-2">
                                                    ${costoProduccionExtra}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="border-b dark:border-gray-700 py-2">
                                                    Costo a externos 
                                                </td>
                                                <td className="border-b dark:border-gray-700 py-2">
                                                $ {costoExterno}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <footer className="bg-gray-100 dark:bg-gray-700 p-4 flex justify-between items-center ">
                                    <span
                                        className={`px-2 py-1 rounded text-sm font-medium ${
                                            status === "Activo"
                                                ? "bg-green-500 text-white"
                                                : "bg-red-500 text-white"
                                        }`}
                                    >
                                        {status}
                                    </span>
                                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                                        Precio: $ {price}
                                    </span>
                                    
                                </footer>
                                <Link href={route("product.edit",id)}><SecondaryButton>Edit </SecondaryButton></Link>
                            </div>
                        )
                    )}
                </div> 
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;