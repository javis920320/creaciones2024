import React from "react";
import { Business, CardGiftcard, List, ListAlt, Shop, Tag, TagSharp } from "@mui/icons-material"; // Asegúrate de importar el ícono Tag
import SectorItem from "../SectorItem";
import { FiTag } from "react-icons/fi";
import { Button, Card } from "@mui/material";
import { Link } from "@inertiajs/react";

const MemoizedSectorItem = React.memo(SectorItem);

const ProductCard = ({ product }) => {
    // Convierte la cadena sector en un array
    const sectors = product.sector ? product.sector.split(",") : [];
    // Obtén la primera imagen del arreglo de imágenes
    const firstImage =
        product.images && product.images.length > 0
            ? product.images[0].image_path
            : "https://react.semantic-ui.com/images/wireframe/image.png";

    return (
        <div className="bg-white rounded-lg shadow-md  overflow-hidden transition-transform hover:scale-[1.02] relative">
            <img
                src={firstImage}
                alt={product.nameProduct}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                    {product.nameProduct}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                    <ListAlt className="text-gray-600" />
                    <span className="text-gray-600 text-sm">
                        {product.categoria?.nameCategory}{" "}
                        <small>(Categoria)</small>
                    </span>
                </div>
                {/*   <p className="text-gray-600 text-sm mt-1">
                    {product.description}
                </p> */}

                <div className="mt-2  items-center gap-2">
                    <div>
                        <p className="text-gray-600 font-medium">
                            Prg: <small> {product.programa?.nombre} </small>
                        </p>
                        <span className="text-blue-600 font-medium">
                            <Business className="w-4 h-4 text-blue-600" />{" "}
                            <small></small> {product.entidad?.nombre}
                        </span>
                    </div>
                </div>

                {/*  <div className="mt-3 flex flex-wrap gap-2"> */}
                <div className=" top-0 absolute">
                    {sectors.length > 0
                        ? sectors.map((sector) => (
                              <MemoizedSectorItem
                                  key={sector}
                                  sector={sector}
                              />
                          ))
                        : null}
                </div>
                {/*  <div className="mt-2 flex items-center gap-2"> */}
                <div className="top-0 right-0 absolute rounded-full bg-blue-200 opacity-2  text-white p-2">
                    <FiTag className="w-4 h-4 text-green-600  " />
                    <span className="text-green-600 font-medium">
                        ${product.price}
                    </span>
                </div>

                <div className="mt-4">
                <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        component={Link}
                        href={route('product.edit', product.id)}
                    >
                        Editar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
