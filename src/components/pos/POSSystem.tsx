'use client';

import { useState } from 'react';
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

    const filteredProducts = products.filter((p) => {
        const nameMatches = p.name[language].toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatches =
            selectedCategory === 'All'
                ? true
                : p.category.en === selectedCategory; // Use the consistent EN key for filtering
        return nameMatches && categoryMatches;
    });

    const handleCheckout = () => {
        if (total > 0) {
            alert(
                language === 'en'
                    ? `Order placed! Total: $${total.toFixed(2)}`
                    : `បានបញ្ជាទិញ! សរុប: $${total.toFixed(2)}`
            );
            clearCart();
        }
    };

    return (
        <div className="flex flex-col md:flex-row bg-gray-100">
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

            {/* Right Panel: Cart - HIDDEN ON MOBILE (md breakpoint is 768px by default) */}
            <div 
                className="
                    hidden md:block 
                    w-full md:w-96 
                    border-t md:border-t-0 md:border-l border-gray-200 bg-white
                "
            >
                <Cart onCheckout={handleCheckout} />
            </div>
        </div>
    );
}