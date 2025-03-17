import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { Chip, Avatar } from "@mui/material";
import { set } from "lodash";

const DropzoneProductImages = ({ setData,setSnackbarMessage,setSnackbarSeveryty,setSnackbarOpen }) => {
  const [files, setFiles] = useState([]);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("file[]", file); // Asegúrate de que el nombre del campo coincida con lo que el backend espera
    });

    try {
      const { data } = await axios.post(route("product.image"), formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
      });

      if (data.paths) {
        setData((prev) => ({
          ...prev,
          images_url: [...prev.images_url, ...data.paths],
        }));
        setFiles((prev) => [
          ...prev,
          ...acceptedFiles.map((file, index) => ({
            file,
            preview: URL.createObjectURL(file),
            url: data.paths[index],
          })),
        ]);
        setSnackbarMessage("Imagenes subidas correctamente");
        setSnackbarSeveryty("success"); 
        setSnackbarOpen(true);
       
      }
    } catch (error) {
      console.log(error.response.data.message);
      setSnackbarMessage(error.response.data.message);
      setSnackbarSeveryty("error");
      setSnackbarOpen(true);
    }
  };

  const handleRemoveFile = (fileToRemove) => {
    setFiles((prev) => prev.filter((file) => file !== fileToRemove));
    setData((prev) => ({
      ...prev,
      images_url: prev.images_url.filter((url) => url !== fileToRemove.url),
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:"image/jpeg, image/png, image/gif",
    maxFiles: 3,
  });

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })} style={{ border: "2px dashed #cccccc", padding: "20px", textAlign: "center", marginTop: "20px" }}>
        <input {...getInputProps()} />
        <p>Arrastra y suelta hasta 3 imágenes aquí, o haz clic para seleccionar archivos</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
        {files.map((file, index) => (
          <Chip
            key={index}
            avatar={<Avatar alt={file.file.name} src={file.preview} />}
            label={file.file.name}
            onDelete={() => handleRemoveFile(file)}
            style={{ margin: "5px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default DropzoneProductImages;