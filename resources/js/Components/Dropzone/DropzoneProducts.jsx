import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";

const DropzoneProducts = ({ setData,setSnackbarMessage, setSnackbarOpen ,setSnackbarSeverity  }) => {
    const onDrop = useCallback(async (acceptedFiles) => {
        const formData = new FormData();
        acceptedFiles.forEach((file) => {
            formData.append("file[]", file);
        });

        try {
            const response = await axios.post(route("product.image"), formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });
            if (response.data.message) {
                setSnackbarMessage(response.data.message+" guarda para ver  los cambios ");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
            }

            if (response.data.paths) {
                setData((prev) => ({
                    ...prev,
                    images_url: response.data.paths,
                }));
            }

        } catch (error) {
            console.error("Error uploading files:", error);
        }
    }, [setData]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/jpeg, image/png, image/gif",
        maxFiles: 3,
    });

    return (
        <Box
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-4 text-center ${isDragActive ? "border-blue-500" : "border-gray-300"}`}
        >
            
            <input {...getInputProps()} />
            <Typography variant="body1">
                {isDragActive ? "Suelta los archivos aquí..." : "Arrastra y suelta tus imágenes aquí, o haz clic para seleccionar archivos"}
            </Typography>
            <Button variant="contained" color="primary" className="mt-2">
                Seleccionar archivos
            </Button>
        </Box>
    );
};

export default DropzoneProducts;