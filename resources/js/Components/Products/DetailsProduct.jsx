import React, { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";
import { useEntidad } from "@/hooks/useEntidad";


const DetailsProduct = ({ entidadSeleted, setFormData, formData }) => {
    const { getProgramsforIdEntidad } = useEntidad();
    const [programFiltered, setProgramFiltered] = useState([]);
    const [entidadFilter, setEntidadFilter] = useState(null);

    useEffect(() => {
        if (entidadFilter) {
            getProgramsforIdEntidad(entidadFilter).then((resp) => setProgramFiltered(resp.data.programs));
        }
    }, [entidadFilter]);

    const handleEntidadChange = (e) => {
        const entidadId = e.target.value;
        setEntidadFilter(entidadId);
        setFormData((prevFormData) => ({
            ...prevFormData,
            detalles: {
                ...prevFormData.detalles,
                entidad_id: entidadId,
                program: "", // Resetear el programa cuando se cambia la entidad
            }
        }));
    };

    const handleProgramChange = (e) => {
        const programId = e.target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            detalles: {
                ...prevFormData.detalles,
                program: programId,
            }
        }));
    };

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Detalles del Producto
            </Typography>
            <FormControl fullWidth margin="normal">
                <InputLabel id="entidad-label">Entidad</InputLabel>
                <Select
                    labelId="entidad-label"
                    value={entidadFilter || ""}
                    onChange={handleEntidadChange}
                    label="Entidad"
                >
                    {entidadSeleted.map((entidad) => (
                        <MenuItem key={entidad.id} value={entidad.id}>
                            {entidad.nombre}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {programFiltered.length > 0 && (
                <FormControl fullWidth margin="normal">
                    <InputLabel id="program-label">Programa</InputLabel>
                    <Select
                        labelId="program-label"
                        value={formData.detalles?.program || ""}
                        onChange={handleProgramChange}
                        label="Programa"
                    >
                        {programFiltered.map((program) => (
                            <MenuItem key={program.id} value={program.id}>
                                {program.nombre}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </Box>
    );
};

export default DetailsProduct;