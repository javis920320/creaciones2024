import axios from "axios";
import { useEffect, useState } from "react";

export function usePedidos() {
    const [pedidos, setpedidos] = useState([]);
    const [error, setError] = useState(null);
    const getPedidos = async () => {
        try {
            const response = await axios.get(route("listaAllpedidos"));
            setpedidos(response.data);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        getPedidos();
    }, []);

    return { pedidos };
}
