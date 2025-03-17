import React, { useState } from "react";
import {
    Drawer,
    Box,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
    IconButton,
    Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FiSidebar } from "react-icons/fi";
import Entidadform from "@/Components/Entidades/Entidadform";
import { BusAlertSharp, Business } from "@mui/icons-material";
import Programasform from "../Entidades/Programasform";
//import OtroFormulario from '@/Components/OtroFormulario'; // Importa otros formularios según sea necesario

const FormDrawer = () => {
    return (
        <div>
            <Accordion sx={{ width: "100%" }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{ display: "flex", justifyContent: "space-between", justifyItems:"center", gap:2 }}   
                >
                    <IconButton edge={"start"}><Business/></IconButton>
                     <Typography color="primary" sx={{marginLeft:2}}>    Entidades</Typography> 
                    
                </AccordionSummary>
                <AccordionDetails>
                    <Entidadform />
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                     <IconButton edge={"start"}><Business/></IconButton>
                     <Typography color="primary" sx={{marginLeft:2}}>    Programas</Typography> 
                </AccordionSummary>
                <AccordionDetails> <Programasform/></AccordionDetails>
            </Accordion>
        </div>
    );
};

export default FormDrawer;
