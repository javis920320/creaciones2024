import { Button } from "@mui/material";
import React from "react";
import SecondaryButton from "./SecondaryButton";

const ClientSelected = ({ client }) => {
    return (
 
        <div className="my-5">
          <header>
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Información de cliente</h2>
          </header>
          <body className="text-gray-700 dark:text-gray-200">
           
            <p className="flex items-center mb-2">
              <span className="font-medium mr-2">Nombre:</span>
              {client.full_name}
            </p>
            <p className="flex items-center mb-2">
              <span className="font-medium mr-2">DNI :</span>
              {client.identification_number}
            </p>
            <p className="flex items-center mb-2">
              <span className="font-medium mr-2">Telefono :</span>
              {client.phone}
            </p>
           
          </body>


        </div>
      )
    
};

export default ClientSelected;
