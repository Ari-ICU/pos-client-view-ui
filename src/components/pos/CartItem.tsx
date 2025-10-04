'use client';

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/context/cart.context';
import { CartItem as CartItemType } from '@/types/cart.type';
import { toast } from 'react-hot-toast';
import { useLanguage } from '@/context/language.context';

interface Props {
    item: CartItemType;
}

export default function CartItem({ item }: Props) {
    const { updateQuantity, removeFromCart } = useCart();
    const { language } = useLanguage();

    const messages = {
        remove: { en: 'removed from cart', kh: 'បានយកចេញពីរទេះ' },
        increase: { en: 'quantity increased', kh: 'បរិមាណបានបន្ថែម' },
        decrease: { en: 'quantity decreased', kh: 'បរិមាណបានកាត់បន្ថយ' },
    };

    const handleRemove = () => {
        removeFromCart(item.id);
        toast.custom(
            (t) => (
                <div className="bg-red-500 text-white px-4 py-2.5 rounded-lg flex items-center gap-2.5 shadow-lg animate-in slide-in-from-right duration-300">
                    <Trash2 size={18} />
                    <span>{item.name[language]} {messages.remove[language]}</span>
                </div>
            ),
            { duration: 3000 }
        );
    };

    const handleIncrease = () => {
        updateQuantity(item.id, 1);
        toast.custom(
            (t) => (
                <div className="bg-green-500 text-white px-4 py-2.5 rounded-lg flex items-center gap-2.5 shadow-lg animate-in slide-in-from-right duration-300">
                    <Plus size={18} />
                    <span>{item.name[language]} {messages.increase[language]}</span>
                </div>
            ),
            { duration: 3000 }
        );
    };

    const handleDecrease = () => {
        if (item.quantity === 1) {
            handleRemove();
        } else {
            updateQuantity(item.id, -1);
            toast.custom(
                (t) => (
                    <div className="bg-yellow-500 text-white px-4 py-2.5 rounded-lg flex items-center gap-2.5 shadow-lg animate-in slide-in-from-right duration-300">
                        <Minus size={18} />
                        <span>{item.name[language]} {messages.decrease[language]}</span>
                    </div>
                ),
                { duration: 3000 }
            );
        }
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex gap-3">
            {/* Product Image / Emoji */}
            {item.image && (
                <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center text-2xl rounded-lg bg-gray-50">
                    {item.image}
                </div>
            )}

            {/* Item Details */}
            <div className="flex-1 min-w-0">
                {/* Header: Name, Price, Remove */}
                <div className="flex justify-between items-start mb-2">
                    <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 truncate">{item.name[language]}</h3>
                        <p className="text-blue-600 font-medium mt-0.5">${item.price.toFixed(2)}</p>
                    </div>
                    <button
                        onClick={handleRemove}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1.5 transition-colors"
                        aria-label={`Remove ${item.name[language]} from cart`}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Footer: Quantity Controls + Line Total */}
                <div className="flex items-center justify-between mt-2">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDecrease}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                            aria-label="Decrease quantity"
                        >
                            <Minus size={16} strokeWidth={2} />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-800">{item.quantity}</span>
                        <button
                            onClick={handleIncrease}
                            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                            aria-label="Increase quantity"
                        >
                            <Plus size={16} strokeWidth={2} />
                        </button>
                    </div>

                    {/* Line Total */}
                    <span className="font-bold text-gray-900 min-w-[60px] text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}