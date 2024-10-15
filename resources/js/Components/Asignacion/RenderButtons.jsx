import { useState } from "react";
import InputLabel from "../InputLabel";
import PrimaryButton from "../PrimaryButton";
import RadioButton from "../RadioButton";
import TextInput from "../TextInput";
import SelectList from "../SelectList";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import axios from "axios";
import InputError from "../InputError";
import { Transition } from "@headlessui/react";

const RenderButtons = ({ empleados, orden }) => {
    const [products, setproducts] = useState([]);
    const [ordenesasignadas, setnumerordenesasignadas] = useState(0);
    const [message, setMessage] = useState("");
    const [tipoEmpleado, settipoEmpleado] = useState();

    useEffect(() => {
        axios
            .get(route("asignacionesocupadas", orden.id))
            .then((resp) => setnumerordenesasignadas(resp.data));
    }, []);
    useEffect(() => {
        axios(route("productos.categoria", orden.categoriaId)).then((res) =>
            setproducts(res.data)
        );
    }, []);

    const {
        data,
        setData,
        post,
        errors,
        setError,
        recentlySuccessful,
        processing,
        reset,
    } = useForm({
        order_id: orden?.id || null,
        empleado_id: null || "",
    });

    const tipoPago = (e) => {
        const idempleado = e.target.value;

        const empleadoseleccionado = empleados.find(
            (empleado) => empleado.id == idempleado
        );
        settipoEmpleado(empleadoseleccionado.cargo);
        setData((prevdata) => ({ ...prevdata, empleado_id: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        /* 
        post(route("asignacion.store"), {
            onSuccess: (response) => {
                setMessage("Formulario enviado exitosamente.");
                reset();
            },
            onError: (errors) => {
                setMessage("Hubo un error en el envío.");
            },
        }); */

        axios.post(route("asignacion.store"), data)
        .then(response => {
            // Manejar la respuesta exitosa, puedes mostrar un mensaje o redirigir al usuario
            
            if(response.data.errors){
                setError(response.data.errors);
            }
            // Aquí puedes realizar una acción como redireccionar a otra página
        })
        .catch(err => {
            // Manejar los errores de la petición
            if (err.response) {
                // Si el error proviene del servidor (código de estado 4xx o 5xx)
                console.error("Error del servidor:", err.response.data);
            } else if (err.request) {
                // Si no hubo respuesta del servidor
                console.error("No se recibió respuesta:", err.request);
            } else {
                // Otros errores relacionados con la configuración de la petición
                
                 
                console.error(JSON.stringify(err))
            }
        });
    
    };
    return (
        <div>
            
            <form onSubmit={handleSubmit}>
            
                {products.length > 0 ? (
                    <div>
                        <InputLabel>Producto</InputLabel>
                        <SelectList
                            onChange={(e) =>
                                setData("producto", e.target.value)
                            }
                            className="w-1/2"
                        >
                            <option disabled selected>
                                Seleccione{" "}
                            </option>
                            {products.map(({ nameProduct, id }) => (
                                <option value={id}>{nameProduct}</option>
                            ))}
                        </SelectList>
                    </div>
                ) : (
                    <h2 className="text-red-500">
                        No hay productos disponibles para esta categoria
                    </h2>
                )}
                <div>
                    <InputLabel>Lista de trabajadores </InputLabel>
                    <SelectList onChange={tipoPago} name="tipoempleado">
                        <option>Asignar a:</option>
                        {empleados.map((empleado) => (
                            <option value={empleado.id} key={empleado.id}>
                                {empleado.nombreCompleto} {empleado.cargo}
                            </option>
                        ))}
                    </SelectList>
                    <InputError message={errors.empleado_id}></InputError>
                </div>

                <div>
                    <InputLabel>Cantidad asignada</InputLabel>
                    <TextInput
                        type="number"
                        onChange={(e) => setData("cantidad", e.target.value)}
                        min={1}
                        max={orden ? (orden.cantidad-ordenesasignadas) : null}
                    ></TextInput>
                    <InputError message={errors.cantidad}></InputError>
                </div>
                {tipoEmpleado == "Operador Externo" ? (
                    <>
                        <div>
                            <InputLabel>Costo Externo</InputLabel>
                            <RadioButton
                                name="tipocosto"
                                id="externo_normal"
                                onChange={(e) =>
                                    setData("tipocosto", e.target.id)
                                }
                            />
                        </div>
                        <div>
                            <InputLabel>Sin Costo </InputLabel>
                            <RadioButton
                                name="tipocosto"
                                id="sincosto"
                                onChange={(e) =>
                                    setData("tipocosto", e.target.id)
                                }
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <div>
                            <InputLabel>Costo Normal</InputLabel>
                            <RadioButton
                                name="tipocosto"
                                id="operador_normal"
                                onChange={(e) =>
                                    setData("tipocosto", e.target.id)
                                }
                            />
                        </div>
                        <div>
                            <InputLabel>Costo Extra</InputLabel>
                            <RadioButton
                                name="tipocosto"
                                id="hora_extra"
                                onChange={(e) =>
                                    setData("tipocosto", e.target.id)
                                }
                            />
                        </div>
                        <div>
                            <InputLabel>Sin Costo </InputLabel>
                            <RadioButton
                                name="tipocosto"
                                id="sincosto"
                                onChange={(e) =>
                                    setData("tipocosto", e.target.id)
                                }
                            />
                        </div>
                    </>
                )}
                <InputError message={errors.order_id}></InputError>
                <InputError message={errors.fecha_asignacion}></InputError>
                <InputError message={errors.tipocosto}></InputError>

                {/* <PrimaryButton disabled={!products.length > 0}>
                    Registrar Asignación
                </PrimaryButton> */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {" "}
                        {processing ? "Enviando..." : "Enviar"}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Asignar
                        </p>
                    </Transition>
                </div>
            </form>
            {/* Mostrar el mensaje de éxito o error */}
            {message && <p className="text-green-500">{message}</p>}
        </div>
    );
};

export default RenderButtons;
