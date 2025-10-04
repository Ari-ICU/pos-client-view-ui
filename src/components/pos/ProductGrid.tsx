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
            <div className="text-center text-gray-500 py-10" suppressHydrationWarning>
                No products available
            </div>
        );
    }

    return (
        <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-screen overflow-y-auto"
            suppressHydrationWarning
        >
            {products.map((product) => (
                <Product
                    key={product.id || product.name?.en} // fallback for missing IDs
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    );
}

// ✅ `React.memo` prevents re-rendering unless products or onAddToCart change
export default memo(ProductGridComponent);
