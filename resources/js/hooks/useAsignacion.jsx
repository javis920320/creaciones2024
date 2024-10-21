import axios from "axios";
import { useEffect, useState } from "react";

export function useAsignacion(orden) {
    const [asignacion, setAsignacion] = useState([]);
    const [errorAsignacion, setErrorAsignacion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [numerodeasignaciones, setNumeroOrdenesAsignadas] = useState(0);

    const obtenerasignacionconorden = (orden) => {
        setLoading(true); // Iniciar el estado de carga
        axios
            .get(route("asignacion.listar", orden))
            .then((res) => {
                setAsignacion(res.data);
            })
            .catch((error) => {
                setErrorAsignacion(error);
            })
            .finally(() => setLoading(false)); // Finalizar el estado de carga
    };

    // Calcular el número total de asignaciones
    const minnumberasignacion = () => {
        const numeroAsignadas = asignacion.reduce((total, current) => total + current.cantidad, 0);
        setNumeroOrdenesAsignadas(numeroAsignadas);
    };

    // Ejecutar el cálculo cuando haya un cambio en las asignaciones
    useEffect(() => {
        if (asignacion.length > 0) {
            minnumberasignacion();
        }
    }, [asignacion]); // Dependencia de asignacion

    useEffect(() => {
        if (orden) {
            obtenerasignacionconorden(orden);
        }
    }, [orden]);


    const AsignarOrden = (data) => {
        axios
            .post(route("asignacion.store"), data)
            .then((res) => {
                
                
                if (res.data.errors) {
                    setErrorAsignacion(res.data.errors); // res.data.errors si el backend envía los errores en esta propiedad
                } else {
                    obtenerasignacionconorden(orden); // Obtener nuevas asignaciones después de la creación
                }
                
            })
            .catch((err) => {
                
                if (err.response && err.response.data && err.response.data.errors) {
                    setErrorAsignacion(err.response.data.errors); // Acceder a los errores de validación
                } else {
                    setErrorAsignacion(err.message); // Mensaje de error general si no hay detalles
                }
            });
    };
    

    const deleteAsignacion=(id)=>{
        axios.delete(route("asignacion.delete", id)).then((res)=>{
            if(res.data.eliminado){
                obtenerasignacionconorden(orden);
            }
        })

    }

    return { asignacion, errorAsignacion, AsignarOrden, loading, numerodeasignaciones ,deleteAsignacion};
}
