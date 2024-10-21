import { Link } from '@inertiajs/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const VerDisponibles = ({ orden }) => {
  const [asignacionOrden, setAsignacion] = useState([]);

  const obtenerAsignaciones = (id) => {
    axios(route("asignacion.listar", id)).then((resp) => setAsignacion(resp.data));
  };

  useEffect(() => {
    obtenerAsignaciones(orden.id);
  }, [orden.id]);

  // Verificamos que asignacionOrden sea un array y usamos reduce
  let cantidadAsignada = asignacionOrden?.reduce((a, b) => a + (b.cantidad || 0), 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg  flex justify-between items-center gap-3">
      {/* Mostramos los datos disponibles */}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Asignados: <span className="text-green-600 dark:text-green-400 font-bold">{cantidadAsignada}/{orden.cantidad}</span>
      </p>
   
      {/* <Link href={route("asignacion.listado",orden.id)}  className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Ver asignaciónes</Link> */}
    </div>
  );
};

export default VerDisponibles;
