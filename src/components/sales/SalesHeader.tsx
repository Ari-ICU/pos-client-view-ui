import { Search } from 'lucide-react';
import { useLanguage } from '@/context/language.context';
import FilterOptions from '@/components/sales/FilterOptions';

interface Filter {
    key: string;
    label: { en: string; kh: string };
}

interface SalesHeaderProps {
    filters: Filter[];
    selectedFilter: string;
    onFilterChange: (filter: string) => void;
    searchValue: string;
    onSearchChange: (query: string) => void;
}

export default function SalesHeader({ 
    filters, 
    selectedFilter, 
    onFilterChange, 
    searchValue, 
    onSearchChange 
}: SalesHeaderProps) {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Sales' : 'ការលក់'}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto text-gray-600">
                {/* Search Input */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-600" />
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={language === 'en' ? 'Search sales...' : 'ស្វែងរកការលក់...'}
                        className="pl-9 pr-4 py-2 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Filter Buttons */}
                <FilterOptions
                    filters={filters}
                    selectedFilter={selectedFilter}
                    onFilterChange={onFilterChange}
                />
            </div>
        </div>
    );
}