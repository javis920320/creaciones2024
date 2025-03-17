import axios from "axios";
import { useEffect, useState } from "react";

function useProducto(idcategoria = []) {
    const [errorsProduct, setErrorProducts] = useState(null);
    const [formData, setFormData] = useState({
        nameProduct: "",
        price: "",
        category_id: "",
        sector: [],
        images_url: "",
        description: "",
        costo_produccion: "",
        costoProduccionExtra: "",
        costoExterno: "",
        status: "Activo",
        detalles: {
            entidad_id: "",
            program: "",
        },
    });
     const getAllProducts = async () => { 
        try {
            const { data } = await axios(route("products.all"));
            setproducts(data);
        } catch (error) {
            setErrorProducts(error);
        }   
       }

    const resetForm = () => {
        setFormData({
            nameProduct: "",
            price: "",
            category_id: "",
            sector: [],
            images_url: "",
            description: "",
            costo_produccion: "",
            costoProduccionExtra: "",
            costoExterno: "",
            status: "Activo",
        });
    };

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
            const resp = await axios.post(route("product.store"), data);

            return resp.data;

            //obtenerProductosconcategoria(idcategoria);
        } catch (error) {
            console.log(error.response);
            setErrorProducts(error);
        }
    };

    return {
        obtenerProductosconcategoria,
        products,
        errorsProduct,
        createProducto,
        formData,
        setFormData,
        resetForm,
        getAllProducts, 
    };
}

export default useProducto;
