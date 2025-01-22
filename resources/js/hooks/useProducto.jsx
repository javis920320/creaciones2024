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

    const createProducto = async (data) => {
        try {
            
           const resp= await axios.post(route("product.store"), data);
           
         
              return resp.data; 
         

            //obtenerProductosconcategoria(idcategoria);

        } catch (error) {
            console.log(error.response)
            setErrorProducts(error);
        }
    };

    return { obtenerProductosconcategoria, products, errorsProduct,createProducto };
}

export default useProducto;
