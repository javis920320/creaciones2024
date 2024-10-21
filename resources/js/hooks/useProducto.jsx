import axios from "axios";
import { useEffect, useState } from "react";

function useProducto(idcategoria = []) {
    const [errorsProduct, setErrorProducts] = useState(null);
    const [products, setproducts] = useState([]);
    const obtenerProductosconcategoria = async (idcategoria) => {
        try {
            const { data } = await axios(
                route("productos.categoria", idcategoria)
            );
            setproducts(data);
        } catch (error) {
            setErrorProducts(error);
        }
    };

    useEffect(() => {
        if (idcategoria) {
            obtenerProductosconcategoria(idcategoria);
        }
    }, []);

    return { obtenerProductosconcategoria, products, errorsProduct };
}

export default useProducto;
