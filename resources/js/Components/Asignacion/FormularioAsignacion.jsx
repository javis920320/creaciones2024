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
import useProducto from "@/hooks/useProducto";
import { useAsignacion } from "@/hooks/useAsignacion";
import ListaAsignacion from "./ListaAsignacion";
import { Divider } from "@mui/material";

const FormularioAsignacion = ({ empleados, orden }) => {
   
    const { obtenerProductosconcategoria, products, errorsProduct } =
        useProducto(orden.categoriaId);
    const { errorAsignacion, asignacion, AsignarOrden ,loading,numerodeasignaciones,deleteAsignacion} = useAsignacion(
        orden.id
    );
    
    const [message, setMessage] = useState("");
  const [tipoEmpleado, settipoEmpleado] = useState();


    const {
        data,
        setData,
        errors,
        setError,
        recentlySuccessful,
        processing,
        clearErrors
        
    } = useForm({
        order_id: orden?.id || null,
        empleado_id: null || "",
    });
    useEffect(() => {
        
        if (errorAsignacion) {
            console.log("cambio de error")
            if (typeof errorAsignacion === 'object' && errorAsignacion !== null) {
                // Si es un objeto, puede contener varios errores específicos
                setError(errorAsignacion);
            } else {
                // Si es un string o un mensaje general de error
                setError({ general: errorAsignacion });
            }
        } else {
            // Si no hay errores, limpia el estado de errores
            setError(null);
        }

    }, [errorAsignacion]);
    
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
        AsignarOrden(data);
        clearErrors()
        
    };
    return (
        <div>
        
            
            <form onSubmit={handleSubmit} className="my-2">
                {products.length > 0 ? (
                    <div>
                        <InputLabel>Producto</InputLabel>
                        <SelectList
                            onChange={(e) =>
                                setData("producto", e.target.value)
                            }
                            className="w-1/2"
                        >
                            <option defaultValue>Seleccione </option>
                            {products.map(({ nameProduct, id }) => (
                                <option value={id} key={id}>{nameProduct}</option>
                            ))}
                        </SelectList>
                        <InputError message={errors.producto}></InputError>
                    </div>
                ) : (
                    <h2 className="text-red-500">
                        No hay productos disponibles para esta categoria
                    </h2>
                )}
                <div>
                    <InputLabel>Lista de trabajadores </InputLabel>
                    <SelectList onChange={tipoPago} className="w-1/2" name="tipoempleado">
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
                        max={orden ? orden.cantidad - numerodeasignaciones : null}
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
            <Divider></Divider>
            <section className="m-4">
                <h2 className="text-gray-700 dark:text-gray-300 text-center uppercase">
                    Trabajos Asignados
                </h2>

                <ListaAsignacion asignacion={asignacion} deleteAsignacion={deleteAsignacion}/>
            </section>
        </div>
    );
};

export default FormularioAsignacion;
