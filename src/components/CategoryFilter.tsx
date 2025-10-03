'use client';

import { useLanguage } from '@/context/language.context';
import { products } from '@/data/product';

interface CategoryFilterProps {
    categories: string[]; // Category keys in English
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
        <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            {categories.map((category) => (
                <option key={category} value={category}>
                    {getCategoryName(category)}
                </option>
            ))}
        </select>
    );
}
