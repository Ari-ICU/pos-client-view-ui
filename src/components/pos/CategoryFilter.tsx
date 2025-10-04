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
        <div
            className="flex gap-2 mt-4 pb-2 overflow-x-auto hide-scrollbar"
            role="tablist"
            aria-label={language === 'en' ? 'Product categories' : 'ប្រភេទផលិតផល'}
        >
            {categories.map((category) => {
                const isSelected = selectedCategory.toLowerCase() === category.toLowerCase();
                const displayName = getCategoryName(category);

                return (
                    <button
                        key={category}
                        onClick={() => onCategoryChange(category)}
                        className={`px-4 py-2.5 text-sm font-medium rounded-full whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isSelected
                                ? 'bg-blue-600 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        role="tab"
                        aria-selected={isSelected}
                        aria-pressed={isSelected}
                    >
                        {displayName}
                    </button>
                );
            })}
        </div>
    );
}