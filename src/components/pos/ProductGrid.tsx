import React from 'react';
import Product from './Product';
import { Product as ProductType } from '@/types/product.type';

interface ProductGridProps {
    products: ProductType[];
    onAddToCart: (product: ProductType) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-screen overflow-y-auto">
            {products.map(product => (
                <Product key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}
