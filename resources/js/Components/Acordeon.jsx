import React, { useState } from "react";

const Acordeon = ({ title = "Sin asignación", children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex w-full flex-col gap-4 overflow-hidden">
            <div
                className="flex flex-col items-start justify-start rounded-lg border border-slate-200 bg-white p-3 hover:cursor-pointer hover:bg-gray-50"
                onClick={toggleAccordion} // Alternar al hacer clic
            >
                <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#1D4ED8"
                            strokeWidth="1.5"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-300 ease-in-out ${
                                isOpen ? "rotate-90" : ""
                            }`}
                        >
                            <path
                                d="M11 16L15 12L11 8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            ></path>
                            <circle cx="12" cy="12" r="9"></circle>
                        </svg>
                        <p className="font-medium">{title}</p>
                    </div>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transition-transform duration-300 ease-in-out ${
                            isOpen ? "rotate-180" : ""
                        }`}
                    >
                        <path d="M5.83325 8.33325L9.99992 12.4999L14.1666 8.33325"></path>
                    </svg>
                </div>
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="mt-2 text-slate-600 text-xs w-full">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default Acordeon;

