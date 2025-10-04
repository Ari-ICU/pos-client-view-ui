'use client';

import { useLanguage } from "@/context/language.context";
import { products } from "@/data/product";
import { useState } from "react";

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
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Helper to get category name in current language
    const getCategoryName = (category: string) => {
        if (category === "All") return language === "en" ? "All" : "ទាំងអស់";
        const product = products.find(
            (p) => p.category.en === category || p.category.kh === category
        );
        return product?.category[language] || category;
    };

    const selectedLabel = getCategoryName(selectedCategory);

    return (
        <div className="relative w-40">
            {/* Dropdown Button */}
            <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full px-3 py-2 text-left border rounded-lg bg-gray-200 hover:bg-gray-300 focus:outline-none"
            >
                {selectedLabel}
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                    {categories.map((category) => (
                        <li key={category}>
                            <button
                                className={`block w-full px-3 py-2 text-left text-sm ${
                                    selectedCategory === category
                                        ? "bg-blue-600 text-white"
                                        : "hover:bg-gray-100"
                                }`}
                                onClick={() => {
                                    onCategoryChange(category);
                                    setDropdownOpen(false);
                                }}
                            >
                                {getCategoryName(category)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
