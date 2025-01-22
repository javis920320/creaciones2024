import axios from "axios";
import { useEffect, useState } from "react";

function useCategorias({ search }) {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSearch, setCategoriaSearch] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCategorias = async () => {
      try {
        setLoading(true);
        const resp = await axios.get(route("categorias"));

        if (isMounted) {
          setCategorias(resp.data.categorias);
          setCategoriaSearch(resp.data.categorias); // Inicializa con todas las categorías
          setLoading(false);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          setLoading(false);
        }
      }
    };

    fetchCategorias();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (search) {
        console.log(search)
        const filteredCategorias = categorias.filter((categoria) =>
          categoria.nameCategory && categoria.nameCategory.toLowerCase().includes(search.toLowerCase())
        );
        setCategoriaSearch(filteredCategorias);
      } else {
        setCategoriaSearch(categorias);
      }
    }, 300); // Ajusta el retraso del debounce según sea necesario

    return () => {
      clearTimeout(handler);
    };
  }, [search, categorias]);

  return { categorias, categoriaSearch, loading, error };
}

export default useCategorias;