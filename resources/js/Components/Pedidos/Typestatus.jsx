import { Chip } from '@mui/material'
import React from 'react'

const TypeStatus = ({status}) => {
    let className = ""
    let text = ""   
    switch (status) {
        case "Pedido confirmado":
            className = "primary";
           
            break;
        case "Pedido creado":
            className = "primary";
            text = "En proceso";
            break;
        case "Empaquetado":
            className = "primary";
            break;
        case "Cancelado":    
        className="error"
        break;
        case "Pedido completado":
            className = "success";
            text = "success";
            break;
        case "Producción en curso":
            className = "primary";
            text = "En proceso";
            break;
        case "Control de calidad":
        default:
            className = "default";
            
            break;
    }   

  return (
   <Chip color={className}size='small' label={status}></Chip>
  )
}

export default TypeStatus