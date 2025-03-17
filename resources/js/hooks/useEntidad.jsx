import axios from "axios";
import { useState } from "react";

export function useEntidad() {
    const [errorEntidad, setErrorEntidad] = useState(null);
    const [entidadesTipo, setEntidadTipo] = useState([]);

    /**
     * Sends a POST request to create a new entidad.
     * @param {Object} data - The data to be sent in the request body.
     * @returns {Object} - The response from the server or an error object.
     */
    const postEntidad = async (data) => {
        setErrorEntidad(null);
        try {
            const response = await fetch(route("entidades.store"), {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
             
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            return result;
        } catch (error) {
            //console.error("Error posting entidad:",JSON.stringify(error) );
            return { error: error.message };
           
        }
    };

     const getEntidadforType = async (tipo) => {
        
       console.log("tipo",tipo) ;
       
        setErrorEntidad(null);
        try {
            const response = await fetch(route("entidades.tipo", { tipo: tipo }), {
                method: "GET",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log(result)
            return result;
        } catch (error) {
     
            return { error: error.message };
        }      
    }


    const programaNuevo = async (data) => { 

        
        try {
            const response = await fetch(route("programas.store"), {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();

            if (result.error) {
                throw new Error(result.error);
            }
            
            return result;
        } catch (error) {
            return { error: error.message };
        }             
    }

     const getProgramsforIdEntidad=async(entidad)=>{
       
          const resp=await axios(route("programas.entidad",entidad));
        return resp;

     }

    return { postEntidad ,getEntidadforType,entidadesTipo,programaNuevo,getProgramsforIdEntidad};
}
