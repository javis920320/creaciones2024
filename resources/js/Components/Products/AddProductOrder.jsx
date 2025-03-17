import React, { useState, useEffect } from "react";

import { Box, Typography, TextField, Button, MenuItem } from "@mui/material";
import axios from "axios";
import ButtonsSector from "../Sectors/ButtonsSector";
import useProducto from "@/hooks/useProducto";
import { useEntidad } from "@/hooks/useEntidad";

const AddProductForm = ({ categories, addProduct }) => {
    const [sectorSelected, setSectorSelected] = useState("");
    const [entidadTipo, setEntidadTipo] = useState([]);
     const{ products,getAllProducts}=useProducto()
    
    useEffect(() => {
        getAllProducts();
    }, [products]);

    const { getEntidadforType } = useEntidad();
    useEffect(() => {
        if (!sectorSelected.sector) return; 

        getEntidadforType(sectorSelected.sector).then((data) => {
            console.log("data");
            setEntidadTipo(data);
        });
    }, [sectorSelected]);

    return (
        <>
            <Box sx={{ mb: 2, width: "800px" }}>
                <Typography variant="h6">Agregar Producto</Typography>

                <ButtonsSector setSectorSelected={setSectorSelected} />
                {JSON.stringify(products)}
            </Box>
        </>
    );
};

export default AddProductForm;
