import React, { useEffect, useState } from "react";
import useProducto from "@/hooks/useProducto";
import DropzoneProductImages from "@/Components/Dropzone/DropzoneProductImages";
import {
    Box,
    Button,
    Chip,
    Divider,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Label } from "@mui/icons-material";
import { useEntidad } from "@/hooks/useEntidad";
import { get } from "lodash";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import DetailsProduct from "./DetailsProduct";
const ProductForm = ({ categories,setSnackbarMessage, setSnackbarSeverity,setSnackbarOpen }) => {
    const { createProducto,formData,setFormData,resetForm } = useProducto();
    const [entidadSeleted, setEntidadSelected] = useState([]);
    useEffect(() => {
        if (formData.sector.length > 0) {
            getEntidadforType(formData.sector[0]).then((result) => {
                setEntidadSelected(result.entidades);
            });
        } else {
            setEntidadSelected(null);   
        }  
    }, [formData.sector]);        
  const {getEntidadforType} = useEntidad();
        const [sector, setSector] = useState([
            "Universidad",
            "Colegios",
            "Empresas",
            "Otros",
        ]);
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
    return (
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
           <Box sx={{ my: 2 }}>
            <SimpleTreeView>
                <TreeItem label="Mas Detalles">
                    {entidadSeleted&&(<DetailsProduct entidadSeleted={entidadSeleted} setFormData={setFormData} formData={formData} />)}    
              {/*   {entidadSeleted && ( <Select
                fullWidth   >
                {entidadSeleted.map((entidad) => ( 
                    <MenuItem key={entidad.id} value={entidad.id}>
                        {entidad.nombre}  
                    </MenuItem>   
                ))}
                </Select>)}  */}

                </TreeItem>
            </SimpleTreeView>
            
             
            </Box>
            
            
            
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
            <DropzoneProductImages
                setData={setFormData}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarMessage={setSnackbarMessage}
                setSnackbarSeveryty={setSnackbarSeverity}
            />
            <Button type="submit" color="primary">
                Guardar
            </Button>
        </form>
    );
};

export default ProductForm;
