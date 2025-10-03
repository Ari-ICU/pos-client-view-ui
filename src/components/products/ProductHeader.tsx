'use client';

import { Search } from 'lucide-react';
import { useLanguage } from '@/context/language.context';
import CategoryFilter from '@/components/CategoryFilter';
import { products } from '@/data/product';

interface ProductHeaderProps {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
}

export default function ProductHeader({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
}: ProductHeaderProps) {
    const { language } = useLanguage();

    const categories = ['All', ...Array.from(new Set(products.map(p => p.category.en)))];

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
                {language === 'en' ? 'Products' : 'ផលិតផល'}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto text-gray-600">
                {/* Search input */}
                <div className="relative w-full sm:w-64 text-gray-600">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={language === 'en' ? 'Search products...' : 'ស្វែងរកផលិតផល...'}
                        className="pl-9 pr-4 py-2 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Category Buttons */}
                <CategoryFilter
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                />
            </div>
        </div>
    );
}
