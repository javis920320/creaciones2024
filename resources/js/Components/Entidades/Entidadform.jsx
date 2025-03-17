import { useEntidad } from '../../hooks/useEntidad';
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import React, { useState } from 'react';

const Entidadform = () => {
  const { postEntidad } = useEntidad();
  const [entidad, setEntidad] = useState({
    nombre: '',
    tipo: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entidad.nombre || !entidad.tipo) {
      setSnackbarMessage('Todos los campos son obligatorios.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    try {
      await postEntidad(entidad);
     
      setSnackbarMessage('Entidad creada exitosamente.');
      setSnackbarSeverity('success');
    } catch (error) {
         
      setSnackbarMessage('Error al crear la entidad.');
      setSnackbarSeverity('error');
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
        <TextField
          label="Nombre"
          value={entidad.nombre}
          onChange={(e) => setEntidad({ ...entidad, nombre: e.target.value })}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box mb={2}>
        <FormControl fullWidth>
          <InputLabel id="tipo-label">Tipo de Entidad</InputLabel>
          <Select
            labelId="tipo-label"
            id="tipo"
            value={entidad.tipo}
            onChange={(e) => setEntidad({ ...entidad, tipo: e.target.value })}
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Crear
      </Button>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default Entidadform;