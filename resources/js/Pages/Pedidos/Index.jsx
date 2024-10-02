import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import Section from "@/Components/Section";
import DangerButton from "@/Components/DangerButton";
import Checkbox from "@/Components/Checkbox";
import PrimaryButton from "@/Components/PrimaryButton";
import {
    Autocomplete,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Divider,
} from "@mui/material";
import axios from "axios";
import InputError from "@/Components/InputError";
import FormClient from "@/Components/FormClient";
import ClientSelected from "@/Components/ClientSelected";
import SecondaryButton from "@/Components/SecondaryButton";

const Index = ({ auth, clients }) => {
    const { post, data, setData, errors } = useForm({
        cliente: { id: null, username: "" },
        factura: "",
        fechaEntrega: "",
        envioDomicilio: false,
    });

    const [newClientDialogOpen, setNewClientDialogOpen] = useState(false);

    const handleClientChange = (event, value) => {
        if (value) {
            setData("cliente", value);
        }
    };

    const handleNewClientSubmit = async () => {
        try {
            const response = await axios.post(route("client.store"), newClient);
            setData("cliente", response.data);
            setNewClientDialogOpen(false);
            setNewClient({ username: "", email: "" });
        } catch (error) {
            console.error("Error creating client:", error);
        }
    };

    

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("pedido.store"));
    };

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
            <div className="flex justify-center">
                
                <Section>
                    <ClientSelected client={data.cliente}/>
                    <div className="flex gap-2 w-full justify-start my-4">
                            <Autocomplete
                                sx={{ width: "390px" }}
                                options={clients}
                                getOptionLabel={(option) =>
                                    option.identification_number +
                                    " " +
                                    option.full_name
                                }
                                onInputChange={(event, value) =>
                                    searchCliente(value)
                                }
                                onChange={handleClientChange}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        placeholder="Buscar cliente"
                                    />
                                )}
                                noOptionsText={
                                    <SecondaryButton className="my-2" onClick={()=>setNewClientDialogOpen(true)}>Buscar Cliente</SecondaryButton>
                                }
                            />
                        
                    </div>
                    
                    <form onSubmit={handleSubmit}>
                     
                        <Divider/>
                        <div className="flex gap-2 w-full justify-start my-6">
                         
                            <div>
                                <InputLabel>Factura</InputLabel>
                                <TextInput
                                    onChange={(e) =>
                                        setData("factura", e.target.value)
                                    }
                                    placeholder="Factura #123"
                                    value={data.factura}
                                />
                            </div>
                            <div>
                                <InputLabel>Fecha de entrega </InputLabel>
                                <TextInput
                                    type="date"
                                    onChange={(e) =>
                                        setData("fechaEntrega", e.target.value)
                                    }
                                    value={data.fechaEntrega}
                                />
                            </div>
                        </div>
      
                        <div>
                            <small className="text-gray-800 dark:text-gray-300">El costo del domicilio es $5000</small>
                            <InputLabel>Solicitar envío domicilio</InputLabel>
                            <Checkbox
                                onChange={(e) =>
                                    setData("envioDomicilio", e.target.checked)
                                }
                                checked={data.envioDomicilio}
                            />
                        </div>
                        <PrimaryButton>Crear Pedido</PrimaryButton>
                    </form>
                </Section>
            </div>

            <Dialog
                open={newClientDialogOpen}
                onClose={() => setNewClientDialogOpen(false)}
               
            >
                <DialogTitle>Crear nuevo cliente</DialogTitle>
                <DialogContent>
                    <FormClient  setData={setData} setNewClientDialogOpen={setNewClientDialogOpen}  />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setNewClientDialogOpen(false)}>
                        Cancelar
                    </Button>
                    
                </DialogActions>
            </Dialog>
        </AuthenticatedLayout>
    );
};

export default Index;
