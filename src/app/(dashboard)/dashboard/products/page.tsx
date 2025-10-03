'use client';

import { useState, useMemo } from 'react';
import ProductHeader from "@/components/products/ProductHeader";
import ProductSummary from "@/components/products/ProductSummary";
import ProductList from "@/components/products/ProductList";
import { products } from "@/data/product";

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Filter products based on search + category
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategory === 'All' || product.category.en === selectedCategory;
            const matchesSearch =
                product.name.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.name.kh.includes(searchQuery);
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="sm:p-6 p-2 space-y-6">
            <ProductHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <ProductSummary products={filteredProducts} />
            <ProductList products={filteredProducts} />
        </div>
    );
}
