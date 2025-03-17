import React from 'react'

import { customerTypes } from "@/data/mockData";
import { Button, ButtonGroup } from '@mui/material';
import { Label, LabelImportant } from '@mui/icons-material';
const ButtonsSector = ({setSectorSelected}) => {
    //crea metodo para obtener iconnos para cada sector
    const getIcons = (sector) => {
        switch (sector) {
            case 'universidad':
                return '🎓';

            case 'empresa':
                return '🏢';
            case 'colegio':
                return '🏛️';
            case 'particular':
                return '🏥';
            default:
                return '❓';
        }
    }

    const handleClick=(e)=>{
    

        setSectorSelected((prev)=>({
            ...prev,
            sector:e.currentTarget.textContent  
        }))    

    }
   
    
    return (
        <div>
          
            <h2>Sector</h2>
            {customerTypes.map((sector, index) => (
                
                <ButtonGroup size="large" aria-label="Large button group" key={index}>

                    
                    {/* <Button size='large' onClick={handleClick} startIcon={getIcons(sector)}> {sector}</Button> */}
                    <Button size='large' onClick={handleClick} > {sector}</Button>
                </ButtonGroup>
            ))}
        </div>
    );
}

export default ButtonsSector
