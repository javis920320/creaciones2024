import axios from "axios";
import React, { useState } from "react";

function useClient() {
     const [clients, setClients] = useState([]);    
     const [errorsCLient,setErrorsClient]=useState(null)

     const getListClients = async() => { 
        const resp= await axios("clients")
        setClients(resp.data) 

     }
    const updateStatusClient = (client, status) => {
        axios
            .patch(route("uptstatusclient", client), {
                status: status,
            })
            .then((resp) => {
                if (resp.data) {
                    const { client } = resp.data;
                   
                    return client;
                }
            });
    };
    const updateDataClient = (idClient, dataClient) => {
        axios
            .put(route("client.update", idClient), dataClient)
            .then((resp) => {
                if (resp.status !== 200) {
                    setErrorsClient(resp.data.errors || {});
                    return;
                }
    
                const { client } = resp.data;
                if (client) {
                    console.log(client);
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrorsClient(error.response.data.errors || {});
                } else {
                    console.error("Error inesperado:", error);
                    setErrorsClient({ general: "Ocurrió un error inesperado" });
                }
            });
    };
    

    return { updateStatusClient ,updateDataClient,errorsCLient,setErrorsClient ,getListClients,clients};
}

export default useClient;
