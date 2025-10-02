'use client';

import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
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
            <div className="bg-red-500 text-white px-4 py-2 rounded flex items-center gap-2">
                <Trash2 size={16} />
                <span>{item.name[language]} {messages.remove[language]}</span>
            </div>,
            { duration: 3000 }
        );
    };

    const handleIncrease = () => {
        updateQuantity(item.id, 1);
        toast.custom(
            <div className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2">
                <Plus size={16} />
                <span>{item.name[language]} {messages.increase[language]}</span>
            </div>,
            { duration: 3000 }
        );
    };

    const handleDecrease = () => {
        if (item.quantity === 1) {
            handleRemove();
        } else {
            updateQuantity(item.id, -1);
            toast.custom(
                <div className="bg-yellow-500 text-white px-4 py-2 rounded flex items-center gap-2">
                    <Minus size={16} />
                    <span>{item.name[language]} {messages.decrease[language]}</span>
                </div>,
                { duration: 3000 }
            );
        }
    };

    return (
        <div className="bg-gray-50 rounded-lg p-3 flex gap-3">
            {/* Product Image */}
            {/* {item.image && (
                <img
                    src={item.image}
                    alt={item.name[language]}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded-lg"
                />
            )} */}
            {item.image && (
                <div className="flex relative items-center flex-shrink-0">
                    <p className='text-5xl'>{item.image}</p>
                </div>
            )}

            {/* Item Details */}
            <div className="flex-1 flex flex-col justify-between">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name[language]}</h3>
                        <p className="text-blue-600 font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-black gap-2">
                        <button onClick={handleDecrease} className="bg-gray-200 hover:bg-gray-300 rounded p-1">
                            <Minus size={16} />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button onClick={handleIncrease} className="bg-gray-200 hover:bg-gray-300 rounded p-1">
                            <Plus size={16} />
                        </button>
                    </div>
                    <span className="font-bold text-gray-800">
                        ${(item.price * item.quantity).toFixed(2)}
                    </span>
                </div>
            </div>
        </div>
    );
}
