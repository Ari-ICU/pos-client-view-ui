'use client';

import { Product as ProductType } from '@/types/product.type';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/context/language.context';
import { useCallback } from 'react';

interface ProductProps {
    product: ProductType;
    onAddToCart: (product: ProductType) => void;
}

export default function Product({ product, onAddToCart }: ProductProps) {
    const { language } = useLanguage();

    const handleAddToCart = useCallback(() => {
        onAddToCart(product);

        toast.custom(
            (t) => (
                <div className="bg-green-500 text-white px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg animate-in slide-in-from-bottom duration-300">
                    <Plus size={18} />
                    <span>
                        {product.name?.[language] || product.name?.en || 'Product'}{' '}
                        {language === 'en' ? 'added to cart' : 'បានបន្ថែមទៅក្នុងកន្ត្រក'}
                    </span>
                </div>
            ),
            { duration: 2500 }
        );
    }, [onAddToCart, product, language]);

    const displayName = product.name?.[language] || product.name?.en || 'Unnamed Product';
    const displayCategory = product.category?.[language] || product.category?.en || '';
    const displayImage = product.image || '📦';

    return (
        <button
            onClick={handleAddToCart}
            aria-label={`Add ${displayName} to cart`}
            className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 hover:border-gray-200 flex flex-col h-full"
        >
            {/* Product Image / Emoji */}
            <div className="text-4xl mb-3 text-center h-16 flex items-center justify-center">
                {displayImage}
            </div>

            {/* Product Name */}
            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 text-sm">
                {displayName}
            </h3>

            {/* Price */}
            <p className="text-blue-600 font-bold text-lg mt-auto mb-2">
                ${product.price.toFixed(2)}
            </p>

            {/* Category Tag */}
            {displayCategory && (
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full inline-block w-fit">
                    {displayCategory}
                </span>
            )}
        </button>
    );
}