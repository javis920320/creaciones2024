import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";

function useCategorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const fecthCategorias = async () => {
            try {
                setLoading(true);
                const resp = await axios.get(route("categorias"));

                if (isMounted) {
                    
                    setCategorias(resp.data.categorias);
                    setLoading(false);
                }
            } catch (error) {
                if (isMounted) {
                    setError(error.message);
                    setLoading(false);
                }
            }
        };

        fecthCategorias();

        return () => {
            isMounted = false;
        };

    }, []);

    const categoriememorize = useMemo(() => categorias, [categorias]);

    const inforCategoria = (idcategoria) => {
        // Encuentra la categoría por su ID
        const categoriaEncontrada = categoriememorize.find(
            (categoria) => categoria.id === idcategoria
        );

        // Retorna el nombre de la categoría si se encuentra, o un mensaje por defecto
        return categoriaEncontrada
            ? categoriaEncontrada.nameCategory
            : "Categoría no encontrada";
    };

    return { categorias: categoriememorize, inforCategoria };
}

export default useCategorias;
