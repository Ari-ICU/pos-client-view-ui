"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/context/language.context";
import { useState } from "react";

export default function CustomerHeader() {
    const { language } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedType, setSelectedType] = useState("all");

    const typeOptions = [
        { key: "all", label: { en: "All Types", kh: "ប្រភេទទាំងអស់" } },
        { key: "regular", label: { en: "Regular", kh: "ធម្មតា" } },
        { key: "vip", label: { en: "VIP", kh: "VIP" } },
    ];

    const selectedLabel =
        typeOptions.find((opt) => opt.key === selectedType)?.label[language] || "";

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-800">
                {language === "en" ? "Customers" : "អតិថិជន"}
            </h1>

            {/* Search + Dropdown */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto text-gray-600">
                {/* Search Box */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={
                            language === "en"
                                ? "Search customers..."
                                : "ស្វែងរកអតិថិជន..."
                        }
                        className="pl-9 pr-4 py-2 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Custom Dropdown */}
                <div className="relative w-full sm:w-40">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="w-full px-3 py-2 text-left border rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
                    >
                        {selectedLabel}
                    </button>

                    {dropdownOpen && (
                        <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                            {typeOptions.map((opt) => (
                                <li key={opt.key}>
                                    <button
                                        className={`block w-full px-3 py-2 text-left text-sm ${
                                            selectedType === opt.key
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-100"
                                        }`}
                                        onClick={() => {
                                            setSelectedType(opt.key);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        {opt.label[language]}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
