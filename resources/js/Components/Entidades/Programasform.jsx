import React, { useState } from "react";
import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Snackbar,
    Alert,
} from "@mui/material";
import axios from "axios";
import { useEntidad } from "@/hooks/useEntidad";

const Programasform = () => {
    const [entidadTipo, setEntidadTipo] = useState("");
    const [nuevoPrograma, setNuevoPrograma] = useState({ nombre: "",entidad_id: "" }); 
    const { entidadesTipo, getEntidadforType,programaNuevo } = useEntidad();
    const [programas, setProgramas] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

     const handleSubmit = async (e) => {
        e.preventDefault();
        if (!nuevoPrograma.nombre || !nuevoPrograma.entidad_id) {
            setSnackbarMessage("Todos los campos son obligatorios.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }
        try {
           const resp= await programaNuevo(nuevoPrograma);
           if(resp.error){
                throw new Error(resp.error);
           }
            setSnackbarMessage("Programa creado exitosamente.");
            setSnackbarSeverity("success");
        } catch (error) {
            setSnackbarMessage(error.message);
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
        }


     }


    const handleEntidadTipoChange = async (e) => {
        const tipo = e.target.value;

        try {
            const response = await getEntidadforType(tipo);

            setProgramas(response.entidades);
            setSnackbarMessage("Programas filtrados exitosamente.");
            setSnackbarSeverity("success");
        } catch (error) {
            setSnackbarMessage("Error al filtrar los programas.");
            setSnackbarSeverity("error");
        } finally {
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <form onSubmit={handleSubmit}>
          
            <Box mb={2}>
           
                <FormControl fullWidth>
                
                    <InputLabel id="entidad-tipo-label">
                        Tipo de Entidad
                    </InputLabel>
                    <Select
                        labelId="entidad-tipo-label"
                        id="entidad-tipo"
                        value={entidadTipo}
                        onChange={handleEntidadTipoChange}
                    >
                        <MenuItem value="">
                            <em>Seleccione una opción</em>
                        </MenuItem>
                        <MenuItem value="Universidad">Universidad</MenuItem>
                        <MenuItem value="Empresa">Empresa</MenuItem>
                        <MenuItem value="Colegio">Colegio</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box mb={2}>
                <Select sx={{ width: "100%" }} value={nuevoPrograma.entidad_id} onChange={(e) => setNuevoPrograma({ ...nuevoPrograma, entidad_id: e.target.value })}> 
                <MenuItem value="">
                            <em>Seleccione una entidad</em>
                        </MenuItem>
                    {programas.length > 0 &&
                        programas.map((entidad) => (
                            <MenuItem key={entidad.id} value={entidad.id}>
                                {entidad.nombre}
                            </MenuItem>
                        ))}
                </Select>
            </Box>
            <Box mb={2}>
                <TextField
                    label="Nombre del Programa"
                    fullWidth
                    margin="normal"
                     value={nuevoPrograma.nombre} onChange={(e) => setNuevoPrograma({ ...nuevoPrograma, nombre: e.target.value })}  
                />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Crear
            </Button>
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
        </form>
    );
};

export default Programasform;
