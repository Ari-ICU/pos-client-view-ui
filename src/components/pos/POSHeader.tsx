'use client';

import { useState } from 'react';
import { Search, Globe, ShoppingCart } from 'lucide-react';
import CategoryFilter from './CategoryFilter';
import { useLanguage } from '@/context/language.context';
import { useCart } from '@/context/cart.context';
import Cart from './Cart';

interface POSHeaderProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
    categories: string[];
}

export default function POSHeader({
    searchTerm,
    onSearchChange,
    selectedCategory,
    onCategoryChange,
    categories,
}: POSHeaderProps) {
    const { language, switchLanguage } = useLanguage();
    const { cart } = useCart();
    const [mobileCartOpen, setMobileCartOpen] = useState(false);

    const translations = {
        en: {
            title: 'POS System',
            searchPlaceholder: 'Search products...',
            switchBtn: 'ខ្មែរ',
        },
        kh: {
            title: 'ប្រព័ន្ធលក់',
            searchPlaceholder: 'ស្វែងរកផលិតផល...',
            switchBtn: 'EN',
        },
    };

    const t = translations[language];

    return (
        <div className="bg-white shadow-sm p-3 sm:p-4 top-0 sticky">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{t.title}</h1>

                <div className="flex items-center gap-2">
                    {/* Mobile Cart Icon */}
                    <button
                        className="sm:hidden relative p-2 rounded-lg text-gray-600 bg-gray-200 hover:bg-gray-300"
                        onClick={() => setMobileCartOpen(!mobileCartOpen)}
                    >
                        <ShoppingCart size={20} />
                        {cart.length > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                                {cart.reduce((sum, item) => sum + item.quantity, 0)}
                            </span>
                        )}
                    </button>

                    {/* Language Switch */}
                    <button
                        onClick={switchLanguage}
                        className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700"
                    >
                        <Globe size={16} />
                        {t.switchBtn}
                    </button>
                </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full text-gray-700 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Categories */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
            />

            {/* Mobile Cart Drawer */}
            {mobileCartOpen && (
                <div className="fixed inset-0 bg-black/40 z-40">
                    <div className="absolute right-0 top-0 w-full h-full bg-white shadow-lg p-4 flex flex-col z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold text-gray-800">Cart</h2>
                            <button
                                className="text-gray-500 hover:text-gray-800"
                                onClick={() => setMobileCartOpen(false)}
                            >
                                ✕
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <Cart onCheckout={() => setMobileCartOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
