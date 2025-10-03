'use client';

import { useLanguage } from '@/context/language.context';

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

    return (
        <select
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {filters.map((filter) => (
                <option key={filter.key} value={filter.key}>
                    {filter.label[language]}
                </option>
            ))}
        </select>
    );
}
