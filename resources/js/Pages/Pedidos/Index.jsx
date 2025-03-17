import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import {
    Container,
    Typography,
    Box,
    TextField,
    Autocomplete,
    Snackbar,
    Alert,
    Checkbox,
    Card,
    Button,
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Section from "@/Components/Section";
import ClientSelected from "@/Components/ClientSelected";
import axios from "axios";
import TruckIcon from "@/Icons/TruckIcon";
import { FiPackage } from "react-icons/fi";
import DB from "./products";
import ListItems from "@/Components/Pedidos/ListItems";
import ModalMui from "@/Components/Modal/ModalMui";
import AddProductOrder from "@/Components/Products/AddProductOrder";

const Index = ({ auth, clients }) => {
    const [data, setData] = useState({
        cliente: null,

        items: [],
        delivery: {
            type: "store",
            date: null,
        },
    });
    const existDBProd = DB.products.length > 0;
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [openModal, setOpenModal] = useState(false);

    const searchCliente = async (value) => {
        try {
            const response = await axios.get(route("clients.search"), {
                params: { query: value },
            });
            setClients(response.data);
        } catch (error) {
            console.error("Error searching clients:", error);
        }
    };

     const handleAddProduct=()=>{
        
     }
    const handleClientChange = (event, value) => {
        setData((prev) => ({
            ...prev,
            cliente: value,
        }));
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Crear Pedidos
                </h2>
            }
        >
            <Head title="Crear Pedidos" />
            <Container maxWidth="md">
                <Card sx={{ p: 2, mb: 4 }}>
                    <Box>
                        <Typography variant="h6">Datos del Cliente</Typography>

                        <Autocomplete
                            id="cliente"
                            options={clients}
                            getOptionLabel={(option) => option.full_name}
                            onChange={handleClientChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Cliente"
                                    variant="outlined"
                                />
                            )}
                        />
                        {data.cliente && (
                            <ClientSelected
                                clients={clients}
                                value={data.cliente}
                                onChange={handleClientChange}
                            />
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "start",
                            bgcolor: "background.paper",
                            flexDirection: "column",
                            boxShadow: 1,
                            p: 4,
                        }}
                    >
                        <Typography
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                            }}
                        >
                            {" "}
                            <TruckIcon></TruckIcon>Información de Entrega
                        </Typography>
                        <Box>
                            <div className="flex gap-2 items-center">
                                <div className="columns-6">
                                    <Checkbox></Checkbox>{" "}
                                    <Typography>
                                        Recoger en la tienda
                                    </Typography>
                                </div>

                                <TextField type="date" fullWidth></TextField>
                            </div>
                        </Box>
                    </Box>
                    <Box sx={{ mt: 2, p: 2 }}>
                        <Typography
                            variant="h6"
                            sx={{ display: "flex", gap: 2 }}
                        >
                            {" "}
                            <FiPackage />
                            Items del Pedido
                        </Typography>
                        <Button onClick={() => setOpenModal(true)}>
                            Agregar Producto
                        </Button>
                        {JSON.stringify(openModal)}
                        <ModalMui
                            openModal={openModal}
                            handleClose={() => setOpenModal(false)}
                        >
                            <Card>
                                <AddProductOrder  categories={[]}
                   
                        addProduct={handleAddProduct}/>{" "}
                             
                            </Card>
                        </ModalMui>
                        {existDBProd ? (
                            DB.products.map((product) => (
                                <ListItems
                                    item={product}
                                    key={product.id}
                                ></ListItems>
                            ))
                        ) : (
                            <Typography color="textSecondary">
                                No hay items en el pedido. Haga clic en "Agregar
                                Item" para comenzar.
                            </Typography>
                        )}
                    </Box>
                </Card>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={snackbarSeverity}
                        sx={{ width: "100%" }}
                    >
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </AuthenticatedLayout>
    );
};

export default Index;
