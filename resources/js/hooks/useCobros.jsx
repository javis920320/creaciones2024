import axios from "axios";
import { useEffect, useMemo, useState } from "react";

function useCobros() {
    const [listcobros, setListCobros] = useState([]);
    const [loading,setLoading]=useState(true);
    const[error,setError]=useState(null);
    const obtenerlistadodecobros = async() => {
        try {
            setLoading(true)
            const resp= await axios.get(route("cobros"));    
            setListCobros(resp.data)
        } catch (error) {
            console.error("Error obteniendo cobros:", err);
            setError("Hubo un error al cargar los cobros.")
        }finally{
            setLoading(false)
        }
        
    };
    useEffect(() => {
        obtenerlistadodecobros();
    }, []);


    
    const memoizedCobros = useMemo(() => listcobros, [listcobros]);

    return { listcobros: memoizedCobros, loading, error };
}

export default useCobros;
