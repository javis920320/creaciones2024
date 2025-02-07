import React, { useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import {
    Alert,
    Box,
    Button,
    Card,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Snackbar,
} from "@mui/material";
import ProductForm from "@/Components/Products/ProductForm";
import useCategorias from "@/hooks/useCategorias";
import PanelCategorias from "@/Components/Categorias/PanelCategorias";

import useProducto from "@/hooks/useProducto";
import ProductCard from "@/Components/Products/ProductCard";

const Index = ({ auth, categories, products }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const [open, setOpen] = useState(false);
    const [sectorFilter, setSectorFilter] = useState([]);
    const toogleSector = (sector) => {
        setSectorFilter((prev) =>
            prev.includes(sector)
                ? prev.filter((sec) => sec !== sector)
                : [...prev, sector]
        );
    };
    const [categorysFilter, setCategorysFilter] = useState([]);
    

    const [sector, setSector] = useState([
        //"Todos",
        "Universidad",
        "Colegios",
        "Empresas",
        "Otros",
    ]);
    const filteredProducts = useMemo(() => { 
        return products.data.filter((product) => {
            const sectorMatch= sectorFilter.length === 0 || sectorFilter.includes(product.sector);  
            const categoryMatch = categorysFilter.length === 0 || categorysFilter.includes(product.category_id);   
            return sectorMatch && categoryMatch;
        })},[sectorFilter, categorysFilter, products.data]);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    productos
                </h2>
            }
        >
            <Head title="Crear Pedidos " />
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                Abrir Diálogo
            </Button>
            <Container maxWidth="lg" sx={{ display: "flex", flexDirection: "row", gap : 2 , mt: 4 }}>     
                <Card
                    sx={{
                        width: 500,
                        height: 600,
                        overflow: "auto",
                      
                        p: 2,
                    }}
                >
                    <h1>Filtros</h1>
                    <Box sx={{ my: 2 }}>
                        <p className="text-gray-400">Sector</p>
                        {sector.map((sector) => (
                            <Chip
                                key={sector}
                                label={sector}
                                onClick={() => toogleSector(sector)}
                                variant={
                                    sectorFilter.includes(sector)
                                        ? "filled"
                                        : "outlined"
                                }
                            />
                        ))}
                    </Box>
                    <Divider />
              
                    <Box sx={{ my: 2 }}>
                        <PanelCategorias
                            setCategorysFilter={setCategorysFilter}
                            categorysFilter={categorysFilter}
                        />

                    </Box>
                    <Divider />
                </Card>
                <Box className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4 ">    
                  
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))} 
                </Box>
            </Container>
           

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Crear Producto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles del producto.
                    </DialogContentText>

                    <ProductForm
                        categories={categories}
                        setSnackbarMessage={setSnackbarMessage}
                        setSnackbarOpen={setSnackbarOpen}
                        setSnackbarSeverity={setSnackbarSeverity}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </AuthenticatedLayout>
    );
};

export default Index;
