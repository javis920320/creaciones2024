import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Box, Card, Container, List, ListItem, ListItemButton, ListItemText, Paper, Tab, Tabs } from "@mui/material";
import Checkbox from "@/Components/Checkbox";

const Index = ({auth}) => {

 const [roles,setRoles]=useState([
    {name:"Administrador"},
    {name:"Operario"},
    {name:"Corte"},
    {name:"Ventas"},
    {name:"Visitante"}
 ])

  return (
    <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Roles y Permisos 
                </h2>
            }
        >
            <Head title="Roles y permisos" />

            <Container sx={{ marginTop: "4px",display:"flex" , gap:"1rem"}}>
                <Card sx={{width:"300px"}}>
                    <List>
                        {roles.map(({name})=>
                        < ListItemButton>
                            
                            <ListItemText>{name}</ListItemText>

                        </ListItemButton>)}

                    </List>
                </Card>
                <Card sx={{width:800}}>
                   Modulos de Acceso
                   <h1>Usuarios</h1>
                   crear
                   <Checkbox></Checkbox>
                   Editar
                   <Checkbox></Checkbox>
                   ELiminar
                   <Checkbox></Checkbox>
                   <Checkbox></Checkbox>
                    <h1>Clientes</h1>
                    <h1>Produtos</h1>
                    <h1>Empleados</h1>
                    <h1>Reportes</h1>
                    <h1>Roles</h1>

                </Card>
            </Container>
        </AuthenticatedLayout>
    );
  
}

export default Index