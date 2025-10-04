'use client';

import React, { memo } from 'react';
import Product from './Product';
import { Product as ProductType } from '@/types/product.type';

interface ProductGridProps {
    products: ProductType[];
    onAddToCart: (product: ProductType) => void;
}

function ProductGridComponent({ products, onAddToCart }: ProductGridProps) {
    if (!products?.length) {
        return (
            <div className="text-center text-gray-500 py-16 px-4">
                <p className="text-lg">No products available</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 max-h-[calc(100vh-140px)] overflow-y-auto">
            {products.map((product) => (
                <Product
                    key={product.id || product.name?.en || Math.random()} // Better fallback
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}

export default memo(ProductGridComponent);