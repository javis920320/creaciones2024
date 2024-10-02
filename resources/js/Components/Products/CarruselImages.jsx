import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CarruselImages = ({ images = [] }) => {
    const CustomPrevArrow = (props) => {
        const { className, onClick } = props;
        return (
            <button
                onClick={onClick}
                className={`${className} absolute left-0 z-10 bg-gray-800 hover:bg-gray-600 p-2 rounded-full text-white`}
                style={{ transform: "translateY(-50%)" }}
            >
                <FiChevronLeft className="w-5 h-5" />
            </button>
        );
    };

    const CustomNextArrow = (props) => {
        const { className, onClick } = props;
        return (
            <button
                onClick={onClick}
                className={`${className} absolute right-0 z-10 bg-gray-800 hover:bg-gray-600 p-2 rounded-full text-white`}
                style={{ transform: "translateY(-50%)" }}
            >
                <FiChevronRight className="w-5 h-5" />
            </button>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,  // Mostrar solo una imagen
        slidesToScroll: 1,  // Desplazar solo una imagen a la vez
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
{images.length>0?"Varias Imagenes":"SIn Imagenes"}
        <Slider {...settings}>
            {images.map((image, index) => (
                <div key={index} className="px-2">
                    <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg shadow-lg"
                    />
                </div>
            ))}
        </Slider>
    </div>

    );
};

export default CarruselImages;
