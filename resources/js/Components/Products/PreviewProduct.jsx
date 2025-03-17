import React from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css'; // Asegúrate de importar el CSS

const PreviewProduct = ({ images }) => {
    return (
        <PhotoProvider>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                    <PhotoView key={index} src={image.image_path}>
                        <img 
                            src={image.image_path} 
                            alt={`Preview ${index}`} 
                            className="w-full h-auto cursor-pointer"
                        />
                    </PhotoView>
                ))}
            </div>
        </PhotoProvider>
       

    );
};

export default PreviewProduct;

