"use client";

import { useLanguage } from "@/context/language.context";
import { useState } from "react";

export interface FilterOption {
    key: 'today' | 'week' | 'month';
    label: { en: string; kh: string };
}

interface ReportsHeaderProps {
    filters: FilterOption[];
    selectedFilter: 'today' | 'week' | 'month';
    onFilterChange: (key: 'today' | 'week' | 'month') => void;
    searchValue: string;
    onSearchChange: (value: string) => void;
}

export default function ReportsHeader({
    filters,
    selectedFilter,
    onFilterChange,
    searchValue,
    onSearchChange,
}: ReportsHeaderProps) {
    const { language } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const selectedLabel = filters.find(f => f.key === selectedFilter)?.label[language];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-gray-700">
            {/* Search Input */}
            <input
                type="text"
                placeholder={language === "en" ? "Search reports..." : "ស្វែងរករបាយការណ៍..."}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-3 pr-4 py-2 border rounded-lg text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Dropdown Filter */}
            <div className="relative w-40">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-full px-3 py-2 text-left border rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none"
                >
                    {selectedLabel}
                </button>

                {dropdownOpen && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                        {filters.map((filter) => (
                            <li key={filter.key}>
                                <button
                                    className={`block w-full px-3 py-2 text-left text-sm ${
                                        selectedFilter === filter.key
                                            ? "bg-blue-600 text-white"
                                            : "hover:bg-gray-100"
                                    }`}
                                    onClick={() => {
                                        onFilterChange(filter.key);
                                        setDropdownOpen(false);
                                    }}
                                >
                                    {filter.label[language]}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
