import { LucidePencil } from "@/Icons/Pencil";
import React from "react";
import SecondaryButton from "../SecondaryButton";
import { Link } from "@inertiajs/react";
import { FiFilter } from "react-icons/fi";

const ListaCategorias = ({ categoria }) => {
    const { id, nameCategory } = categoria;
    return (
        <li
            key={id}
            className=" flex  justify-between cursor-pointer text-gray-700 p-4  dark:hover:bg-gray-700 focus:text-white"
        >
            {nameCategory}
            <div className="flex justify-between gap-5">
                <SecondaryButton className="size-4 text-center items-center">
                    <Link href={route("categoria.edit", id)}>
                        <LucidePencil />
                    </Link>
                </SecondaryButton>
                <SecondaryButton className="size-4">
                    <Link href={route("products.list",id)}>
                        <FiFilter />
                    </Link>
                </SecondaryButton>
            </div>
        </li>
    );
};

export default ListaCategorias;
