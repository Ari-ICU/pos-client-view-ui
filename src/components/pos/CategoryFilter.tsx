'use client';

import { useLanguage } from '@/context/language.context';
import { products } from '@/data/product';

interface CategoryFilterProps {
    categories: string[]; // category keys (English)
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
}: CategoryFilterProps) {
    const { language } = useLanguage();

    // Helper to get category name in current language
    const getCategoryName = (category: string) => {
        if (category === 'All') return language === 'en' ? 'All' : 'ទាំងអស់';
        const product = products.find(
            (p) => p.category.en === category || p.category.kh === category
        );
        return product?.category[language] || category;
    };

    return (
        <div className="flex gap-2 mt-4 overflow-x-auto">
            {categories.map((category) => {
                const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
                const displayName = getCategoryName(category);

                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                            isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        aria-pressed={isSelected}
                    >
                        {displayName}
                    </button>
                );
            })}
        </div>
    );
}
