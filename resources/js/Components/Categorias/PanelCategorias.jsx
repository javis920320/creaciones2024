import {
    Card,
    Input,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    TextField,
    Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { FiCornerLeftUp } from "react-icons/fi";

import useCategorias from "@/hooks/useCategorias";
import { update } from "lodash";
function useSerch() {
    const [search, updateSearch] = useState("");
    const[error,setError]=useState(null);
    const isFirstInput = useRef(true);
    


    useEffect(() => {
      if(isFirstInput.current){
        isFirstInput.current=search===""
        return;
      }

      if(search===""){
        setError("No se puede buscar una categoria vacia")
        return
      }

      if(search.match(/^\d+$/)){
        setError("No se puede buscar una categoria con numero")
        return
      }

      if(search.length<3){
        setError("la busqueda debe tener al menos 3 caracteres")
        return
      }
      setError(null)

    }, [search]);
    return { search, updateSearch,error };
}

const PanelCategorias = () => {
    const { search, updateSearch } = useSerch();
    const { categoriaSerch, findCategoria } = useCategorias({ search });
    const isrenderizable = categoriaSerch.length > 0;

    const handleChange = (e) => {
      const newserch=e.target.value
      updateSearch(newserch)
        //findCategoria(e.target.value);
    };

    return (
        <Card
            variant="outlined"
            sx={{ maxWidth: 350, margin: 2, padding: 2, maxHeight: 400 }}
        >
            <TextField
                name="categoriaserch"
                size="small"
                fullWidth
                label="Search Category"
                onChange={handleChange}
            ></TextField>
            {JSON.stringify(categoriaSerch)}

            <MenuList>
                {isrenderizable ? (
                    categoriaSerch.map(({ nameCategory }) => (
                        <MenuItem>
                            <ListItemIcon>
                                <FiCornerLeftUp></FiCornerLeftUp>
                            </ListItemIcon>
                            <ListItemText>{nameCategory}</ListItemText>
                            <Typography
                                variant="body2"
                                sx={{ color: "GrayText" }}
                            >
                                {" "}
                                ⌘X
                            </Typography>
                        </MenuItem>
                    ))
                ) : (
                    <li>No renderizable</li>
                )}
            </MenuList>
        </Card>
    );
};

export default PanelCategorias;
