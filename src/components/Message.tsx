"use client";

import { useEffect, useState } from "react";

interface MessageProps {
    type: "error" | "success" | "info" | "warning";
    text: string;
    autoHide?: boolean; 
    duration?: number; 
    onClose?: () => void; 
}

export default function Message({
    type,
    text,
    autoHide = true,
    duration = 4000,
    onClose,
}: MessageProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (autoHide) {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [autoHide, duration, onClose]);

    if (!visible) return null;

    const typeStyles = {
        error: "bg-red-50 border-red-200 text-red-700",
        success: "bg-green-50 border-green-200 text-green-700",
        info: "bg-blue-50 border-blue-200 text-blue-700",
        warning: "bg-yellow-50 border-yellow-200 text-yellow-700",
    };

    return (
        <div
            className={`mb-4 p-3 border ${typeStyles[type]} text-sm rounded-lg text-center font-medium flex justify-between items-center`}
        >
            <span>{text}</span>
            <button
                onClick={() => {
                    setVisible(false);
                    if (onClose) onClose();
                }}
                className="ml-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close message"
            >
                ✕
            </button>
        </div>
    );
}
