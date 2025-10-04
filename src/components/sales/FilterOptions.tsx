'use client';

import { useLanguage } from '@/context/language.context';
import { useState } from 'react';

interface FilterOption {
    key: string;
    label: { en: string; kh: string };
}

interface FilterOptionsProps {
    filters: FilterOption[];
    selectedFilter: string;
    onFilterChange: (filterKey: string) => void;
}

export default function FilterOptionsDropdown({
    filters,
    selectedFilter,
    onFilterChange,
}: FilterOptionsProps) {
    const { language } = useLanguage();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const selectedLabel =
        filters.find((f) => f.key === selectedFilter)?.label[language] || '';

    return (
        <div className="relative w-40">
            {/* Dropdown Button */}
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-3 py-2 text-left border rounded-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
            >
                {selectedLabel}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filters.map((filter) => (
                        <li key={filter.key}>
                            <button
                                className={`block w-full px-3 py-2 text-left text-sm ${selectedFilter === filter.key
                                        ? 'bg-blue-600 text-white'
                                        : 'hover:bg-gray-100'
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
    );
}
