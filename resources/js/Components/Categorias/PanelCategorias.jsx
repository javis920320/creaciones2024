import React, { useState } from 'react';
import { Card, TextField, MenuList, MenuItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import { FiCornerLeftUp } from 'react-icons/fi';
import useCategorias from '@/hooks/useCategorias';
import { Link } from '@inertiajs/react';
import { EditRoadSharp } from '@mui/icons-material';
import { LucidePencil } from '@/Icons/Pencil';
import useProducto from '@/hooks/useProducto';

const PanelCategorias = ({setCategorysFilter, categorysFilter}) => {
  const [search, setSearch] = useState('');
 
  const { categorias, categoriaSearch, loading, error } = useCategorias({ search });
  const handleClick = (categoria) => {
  setCategorysFilter((prev) =>
    prev.includes(categoria)
      ? prev.filter((cat) => cat !== categoria)
      : [...prev, categoria]
  );  
  }

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const isrenderizable = categoriaSearch.length > 0;

  return (
   /*  <Card sx={{ height: 400, overflow: 'auto' }}>     */ 
   <>      
      <TextField
        name="categoriaserch"
        size="small"
        fullWidth
        label="Search Category"
        onChange={handleChange}
      />
 
    <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 2 }}>
      <a href={route("categoria.index")} style={{ textDecoration: 'none', color: 'blue' }}>
        Crear nueva categoría
      </a>
    </Box>
    
        <MenuList>
          {isrenderizable ? (
            categoriaSearch.map(({ id, nameCategory }) => (
              <MenuItem key={id} onClick={()=>handleClick(id)} selected={categorysFilter.includes(id)}>  
                <Typography variant="body2" sx={{ color: 'GrayText',mr:2 }}>
                  
                  <Link href={route("categoria.edit",id)}><LucidePencil/></Link>
                  
                </Typography>
                {/* <ListItemIcon>
                  <FiCornerLeftUp />
                </ListItemIcon> */}
                <ListItemText>{nameCategory}</ListItemText>
                
                <Typography variant="body2" sx={{ color: 'GrayText' }}>
                  ⌘X
                </Typography>
              </MenuItem>
            ))
          ) : (
            <li>No renderizable</li>
          )}
        </MenuList>
      
    {/* </Card> */}
    </>
  );
};

export default PanelCategorias;