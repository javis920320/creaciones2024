import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import { FiFolder, FiMenu } from "react-icons/fi";
import {
    Drawer,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

export default function Sidebar({ listItems = [] }) {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const listIsIterable = listItems.length > 0;

    return (
        <div style={{ zIndex: 1 }}>
            {/* Botón para abrir/cerrar */}
            <Button onClick={toggleDrawer}>
                <FiMenu />
            </Button>

            {/* Drawer para el sidebar */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
                sx={{
                    "& .MuiDrawer-paper": {
                        minWidth: 300,
                        bgcolor: "background.default",
                        opacity: 0.95,
                    },
                }}
            >
                <List>
                    
                    {listIsIterable ? (
                        listItems.map(({ icon, name, path }, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={path}
                                    sx={{
                                        color: "text.primary",
                                        "&:hover": { bgcolor: "action.hover" },
                                    }}
                                >
                                    {icon && (
                                        <ListItemIcon sx={{ color: "text.secondary" }}>
                                            {icon || <FiFolder />}
                                        </ListItemIcon>
                                    )}
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    ) : (
                        <ListItem>
                            <ListItemText primary="No hay elementos para mostrar" />
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </div>
    );
}


