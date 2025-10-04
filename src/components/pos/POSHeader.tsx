'use client';

import { useState } from 'react';
import { Search, Globe, ShoppingCart, X } from 'lucide-react';
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
            cart: 'Cart',
            close: 'Close',
        },
        kh: {
            title: 'ប្រព័ន្ធលក់',
            searchPlaceholder: 'ស្វែងរកផលិតផល...',
            switchBtn: 'EN',
            cart: 'កន្ត្រក',
            close: 'បិទ',
        },
    };

    const t = translations[language];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 p-4 sticky top-0 z-0">
            {/* Top Row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <h1 className="text-xl font-bold text-gray-800">{t.title}</h1>

                <div className="flex items-center gap-2">
                    {/* Language Toggle */}
                    <button
                        onClick={switchLanguage}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
                        aria-label={language === 'en' ? 'Switch to Khmer' : 'Switch to English'}
                    >
                        <Globe size={16} />
                        <span className="font-medium">{t.switchBtn}</span>
                    </button>

                    {/* Mobile Cart Button */}
                    <button
                        className="sm:hidden relative p-2 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                        onClick={() => setMobileCartOpen(true)}
                        aria-label={`${t.cart} (${totalItems} items)`}
                    >
                        <ShoppingCart size={20} />
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {totalItems}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="text-gray-400" size={20} />
                </div>
                <input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    aria-label={t.searchPlaceholder}
                />
            </div>

            {/* Category Filter */}
            <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={onCategoryChange}
            />

            {/* Mobile Cart Drawer */}
            {mobileCartOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-50 sm:hidden"
                    onClick={() => setMobileCartOpen(false)}
                >
                    <div
                        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h2 className="text-lg font-semibold text-gray-800">{t.cart}</h2>
                            <button
                                onClick={() => setMobileCartOpen(false)}
                                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
                                aria-label={t.close}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <Cart onCheckout={() => setMobileCartOpen(false)} />
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}