import { drop } from "lodash";
import React, { useEffect } from "react";

const DropzoneProducts = ({setData}) => {
    useEffect(() => {
        Dropzone.autoDiscover = false;

        const dropzone = new Dropzone("#dropzone", {
            dictDefaultMessage: "Sube aquí tu imagen",
            acceptedFiles: ".jpg,.jpeg,.png,.gif",
            addRemoveLinks: true,
            dictRemoveFile: "Quitar archivo",
            maxFiles: 3,
            uploadMultiple: true,
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        });

       
         dropzone.on("success",(file,response)=>{

             if(response.paths){
                setData((prev) => ({
                    ...prev,
                    images_url: response.paths
                  }));
             }
              //document.querySelector('[name="images"]').value=JSON.stringify(response.paths)

         })

        return () => {
            dropzone.destroy(); // Limpiar la instancia de Dropzone cuando se desmonte el componente
        };
    }, []);
    return (
        <form
            id="dropzone"
            action={route("product.image")}
            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center"
            method="post"
            enctype="multipart/form-data"
        >
            <input
                type="hidden"
                name="_token"
                value={document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")}
            />
        </form>
    );
};

export default DropzoneProducts;
