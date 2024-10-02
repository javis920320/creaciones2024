import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import Section from "@/Components/Section";
import React from "react";
import { FiInfo } from "react-icons/fi";
import TextArea from "@/Components/TextArea";
import InputLabel from "@/Components/InputLabel";

const PedidoCancelar = ({ auth, pedido=null }) => {

    const { data, errors, setData, put } = useForm({
        idpedido: pedido?.data[0]?.id || "",
        factura: pedido?.data[0]?.factura || "",
        cliente:pedido?.data[0]?.cliente.full_name||"",
        ordenes:pedido?.data[0]?.ordenes||"",
        estado:pedido?.data[0]?.estado||""
    });
     const handleSubmit=(e)=>{
      e.preventDefault()
      put(route("cancelar.pedido",data.idpedido))

     }
    return (
      <AuthenticatedLayout
      user={auth.user}
      header={
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
              Crear Pedidos
          </h2>
      }
  >
      <Head title="Crear Pedidos " />
        <main className=" flex justify-center">
         
            <Section>
                
                <form onSubmit={handleSubmit}>
                    <p className="flex items-center  justify-evenly gap-2  text-orange-400"> ¿ <FiInfo></FiInfo> Estas Seguro de Cancelar este pedido?</p>

                    <div className=" flex"><span>Codigo :</span><p> {data.idpedido}</p>{" "}</div>
                    <div className=" flex"><span>Factura :</span><p> {data.factura}</p>{" "}</div>
                    <div className=" flex"><span>Informacion del Cliente  :</span><p> {data.cliente}</p>{" "}</div>
                    <div className=" flex gap-2 "><span>Estado  :</span><p className={data.estado=="Cancelado"?"bg-red-200 px-3 rounded text-gray-500":"bg-green-200 px-3 rounded text-gray-500"}> {data.estado}</p>{" "}</div>
                    <p>productos :{data.ordenes.length}</p>
                    


                    <input type="hidden" value={data.idpedido} />
                    <div className="my-3">
                      <InputLabel>Escribe el Motivo</InputLabel>
                    <TextArea className="w-full" onChange={(e)=>setData("notas",e.target.value)}></TextArea>
                    </div>
                    
                    <PrimaryButton className="my-2">Cancelar Pedido</PrimaryButton>
                </form>
            </Section>
        </main>
        </AuthenticatedLayout>
    );
};

export default PedidoCancelar;
