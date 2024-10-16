import { useForm } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export function useCorteHook() {
    const [filters, setFilters] = useState({
        factura: "",
        cliente: "",
        estado: "",
    });
    const [pedidos, setPedidos] = useState([]);
    const getPedidosEnviados = () => {
        axios
            .get(route("pedidosEnviado.get"))
            .then((resp) => {
                console.log(resp.data); // Asegúrate de que la respuesta tiene los datos correctos
                setPedidos(resp.data); // Estás guardando los datos en pedidos
            })
            .catch((error) => {
                console.log("Error al obtener los pedidos:", error);
            });
    };

    useEffect(() => {
        getPedidosEnviados();
    }, []);

    const { data, setData, post } = useForm({
        pedidos: [], // Array para los pedidos seleccionados
    });

    const [itemselect, setItemselect] = useState([]);
    const [rowSelection, setRowSelection] = useState({});
    const [allSelected, setAllSelected] = useState(false);

    const imprimirPedidosSeleccionados = (selectedItems) => {
        console.log("Pedidos seleccionados para imprimir:", selectedItems);
    
        axios
            .post(route("pedidos.imprimir"), {
                pedidos: selectedItems,
            }, { responseType: 'blob' }) // Esto es importante para manejar archivos PDF
            .then((response) => {
                // Crear un URL del blob del PDF y abrirlo o descargarlo
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'pedidos-seleccionados.pdf');
                document.body.appendChild(link);
                link.click();
            })
            .catch((error) => {
                console.log("Error al imprimir los pedidos:", error);
            });
    };
    
    
    
    
    

    const enviapedidosproduccion = (items) => {
        console.log("Items seleccionados para producción (Axios):", items);

        axios
            .post(route("pedidos.produccion"), {
                pedidos: items,
            })
            .then((response) => {
                console.log("Respuesta del servidor:", response.data);
                setPedidos(response.data)
                setRowSelection({});  // Reinicia la selección de filas
                setAllSelected(false);
            })
            .catch((error) => {
                console.log("Error al enviar:", error.response.data);
            });
    };

    // Filtrado de datos con base en los filtros aplicados
    const datainstance = useMemo(() => {
        return pedidos.filter((row) => {
            // Asegurarse de que row.factura no sea null o undefined
            const factura = row.factura ? String(row.factura) : '';
    
            return (
                factura.includes(filters.factura) && // Verificación de factura
                row.cliente.full_name
                    .toLowerCase()
                    .includes(filters.cliente.toLowerCase()) &&
                row.estado.toLowerCase().includes(filters.estado.toLowerCase())
            );
        });
    }, [pedidos, filters]);
    

    return {
        enviapedidosproduccion,
        datainstance,
        filters,
        rowSelection,
        setData,
        setRowSelection,
        setItemselect,
        setFilters,
        pedidos,
        imprimirPedidosSeleccionados
    };
}

/* const handleChangeItems = (e) => {
        setimeselect((items) => {
            const itemName = e.target.name;
            const itemValue = e.target.value;

            // Si el ítem ya existe, lo quitamos
            if (items[itemName] === itemValue) {
                const updatedItems = { ...items };
                delete updatedItems[itemName]; // Eliminamos el ítem
                return updatedItems;
            }

            // Si no existe, lo agregamos o actualizamos
            return {
                ...items,
                [itemName]: itemValue,
            };
        });
    }; */
