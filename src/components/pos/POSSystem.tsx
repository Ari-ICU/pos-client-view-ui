'use client';

import { useState, useMemo } from 'react';
import { products } from '@/data/product';
import POSHeader from './POSHeader';
import ProductGrid from './ProductGrid';
import Cart from './Cart';
import { useCart } from '@/context/cart.context';
import { useLanguage } from '@/context/language.context';

export default function POSSystemPage() {
    const { addToCart, clearCart, total } = useCart();
    const { language } = useLanguage();

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Food', 'Beverages', 'Desserts'];

    // ✅ FIXED: Added proper dependencies to useMemo
    const filteredProducts = useMemo(() => {
        return products.filter((p) => {
            const name = (p.name?.[language] || p.name?.en || '').toLowerCase();
            const matchesSearch = name.includes(searchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === 'All' || p.category?.en === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory, language]); // ← Critical: include all dependencies

    const handleCheckout = () => {
        if (total > 0) {
            const message =
                language === 'en'
                    ? `Order placed! Total: $${total.toFixed(2)}`
                    : `បានបញ្ជាទិញ! សរុប: $${total.toFixed(2)}`;
            alert(message);
            clearCart();
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100 min-h-screen">
            {/* Left Panel: Products */}
            <div className="flex-1 flex flex-col">
                <POSHeader
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    categories={categories}
                />
                <div className="flex-1 overflow-y-auto p-4">
                    <ProductGrid products={filteredProducts} onAddToCart={addToCart} />
                </div>
            </div>

            {/* Right Panel: Cart (Desktop only) */}
            <div className="hidden md:block w-96 border-l border-gray-200 bg-white">
                <Cart onCheckout={handleCheckout} />
            </div>
        </div>
    );
}