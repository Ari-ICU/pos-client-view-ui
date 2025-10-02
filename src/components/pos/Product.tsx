'use client';

import { Product as ProductType } from '@/types/product.type';
import { toast } from 'react-hot-toast';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/context/language.context';

interface ProductProps {
    product: ProductType;
    onAddToCart: (product: ProductType) => void;
}

export default function Product({ product, onAddToCart }: ProductProps) {
    const { language } = useLanguage();

    const handleAddToCart = () => {
        onAddToCart(product);

        toast.custom(
            <div className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
                <Plus size={16} />
                <span>{product.name[language]} added to cart</span>
            </div>,
            { duration: 3000 }
        );
    };

    return (
        <button
            onClick={handleAddToCart}
            className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition-shadow text-left"
        >
            <div className="text-5xl mb-2 text-center">{product.image}</div>
            <h3 className="font-semibold text-gray-800 mb-1">{product.name[language]}</h3>
            <p className="text-blue-600 font-bold text-lg">${product.price.toFixed(2)}</p>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
                {product.category[language]}
            </span>
        </button>
    );
}
