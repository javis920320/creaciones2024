import { Link } from "@inertiajs/react";
import React from "react";
import SecondaryButton from "../SecondaryButton";
import { Badge, Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import { FiStar } from "react-icons/fi";
import PrimaryButton from "../PrimaryButton";
import CarruselImages from "./CarruselImages";

const CardProduct = ({ product }) => {
    const {
        id,
        nameProduct,
        categoria,
        price,
        costo_produccion,
        costoProduccionExtra,
        status,
        costoExterno,
        description,
    } = product;
    return (
        <Card key={id} sx={{ width: 320, height: 200 }}>
            <CardContent>
                <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold">{nameProduct}</h2>

                    <Badge
                        variant={
                            status === "Inactive" ? "default" : "secondary"
                        }
                    >
                        {status}
                    </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                    Categoria:{categoria.nameCategory}
                </p>
                <p className="text-sm mb-4">Descripcion:{description}</p>

                <div className="flex items-center justify-between">
                    {/* <span className="text-lg font-bold">
                        ${price.toFixed(2)}
                    </span> */}
                    <div className="flex items-center gap-2">
                        <FiStar className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                        <span className="ml-1 text-sm">
                            Precio :${price.toFixed(1)}
                        </span>
                    </div>
                </div>
            </CardContent>

            <>
                <Link href={route("product.edit", id)}>
                    {" "}
                    <PrimaryButton>Editar</PrimaryButton>
                </Link>
            </>
        </Card>
    );
};

export default CardProduct;
