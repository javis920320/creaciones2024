import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import {
    Alert,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    MenuItem,
    Select,
    Snackbar,
    TextField,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { set } from "lodash";
import useProducto from "@/hooks/useProducto";
import DropzoneProductImages from "@/Components/Dropzone/DropzoneProductImages";

const Index = ({ auth, categories }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [open, setOpen] = useState(false);

   
    const resetForm = () => {
        setFormData({
            nameProduct: "",
            price: "",
            category_id: "",
            sector: [],
            images_url: "",
            description: "",
            costo_produccion: "",
            costoProduccionExtra: "",
            costoExterno: "",
            status: "Activo",
        });
    };

    const { createProducto } = useProducto();
    const [sector, setSector] = useState([
        "Universidad",
        "Colegios",
        "Empresas",
        "Otros",
    ]);
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    const [formData, setFormData] = useState({
        nameProduct: "",
        price: "",
        category_id: "",
        sector: [],
        images_url: "",
        description: "",
        costo_produccion: "",
        costoProduccionExtra: "",
        costoExterno: "",
        status: "Activo",
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const resp = await createProducto(formData);
        if (resp.error) {
            setSnackbarMessage(resp.error);
            setSnackbarSeverity("error");
        } else {
            setSnackbarMessage("Producto creado con éxito");
            setSnackbarSeverity("success");
            resetForm();
 
        }
        setSnackbarOpen(true);
    };
    const toogleSector = (sector) => {
        setFormData((prev) => ({
            ...prev,
            sector: prev.sector.includes(sector)
                ? prev.sector.filter((sec) => sec !== sector)
                : [...prev.sector, sector],
        }));
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
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Crear Producto</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor, ingrese los detalles del producto.
                    </DialogContentText>
                 
                 
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Nombre del Producto"
                            type="text"
                            fullWidth
                            value={formData.nameProduct}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    nameProduct: e.target.value,
                                }))
                            }
                        />
                        <Select
                            fullWidth
                            value={formData.category_id}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    category_id: e.target.value,
                                }))
                            }
                        >
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.nameCategory}
                                </MenuItem>
                            ))}
                        </Select>
                        <TextField
                            margin="dense"
                            id="description"
                            label="Descripción"
                            value={formData.description}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                }))
                            }
                            type="text"
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="price"
                            label="Precio"
                            type="number"
                            value={formData.price}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    price: e.target.value,
                                }))
                            }
                            fullWidth
                        />
                        <section className="py-2">
                            <Label>Sector</Label>

                            {sector.map((sector) => (
                                <Chip
                                    key={sector}
                                    label={sector}
                                    onClick={() => toogleSector(sector)}
                                    variant={
                                        formData.sector.includes(sector)
                                            ? "filled"
                                            : "outlined"
                                    }
                                />
                            ))}
                        </section>
                        <Divider />
                        Costos de Elaboracion
                        <TextField
                            margin="dense"
                            id="costo_produccion"
                            label="Costo de Producción"
                            type="number"
                            value={formData.costo_produccion}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    costo_produccion: e.target.value,
                                }))
                            }
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="costoProduccionExtra"
                            label="Costo de Producción Extra"
                            type="number"
                            value={formData.costoProduccionExtra}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    costoProduccionExtra: e.target.value,
                                }))
                            }
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="costoExterno"
                            label="Costo Externo"
                            type="number"
                            value={formData.costoExterno}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    costoExterno: e.target.value,
                                }))
                            }
                            fullWidth
                        />
                     <DropzoneProductImages setData={setFormData} setSnackbarOpen={setSnackbarOpen} setSnackbarMessage={setSnackbarMessage} setSnackbarSeveryty={setSnackbarSeverity}/> 
                        <Button type="submit" color="primary">
                            Guardar
                        </Button>
                    </form>
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
