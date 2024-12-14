import React from "react";

const Alert = ({ type = "error", message, onClose }) => {
    const getAlertStyles = () => {
        switch (type) {
            case "error":
                return "bg-red-100 text-red-800 border-red-400";
            case "success":
                return "bg-green-100 text-green-800 border-green-400";
            case "warning":
                return "bg-yellow-100 text-yellow-800 border-yellow-400";
            case "info":
                return "bg-blue-100 text-blue-800 border-blue-400";
            default:
                return "bg-gray-100 text-gray-800 border-gray-400";
        }
    };

    return (
        <div
            className={`border-l-4 p-4 rounded mb-4 ${getAlertStyles()}`}
            role="alert"
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-xl font-bold px-2 text-gray-600 hover:text-gray-900"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default Alert;
