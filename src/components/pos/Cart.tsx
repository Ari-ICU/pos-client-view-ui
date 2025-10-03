'use client';

import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import CartItem from './CartItem';
import CheckoutModal from './CheckoutModal';
import { useCart } from '@/context/cart.context';
import { useLanguage } from '@/context/language.context';

export default function Cart({ onCheckout }: { onCheckout: () => void }) {
    const { cart, subtotal, tax, total } = useCart();
    const { language } = useLanguage();
    const [showModal, setShowModal] = useState(false);

    const translations = {
        en: {
            currentOrder: 'Current Order',
            noItems: 'No items in cart',
            subtotal: 'Subtotal',
            tax: 'Tax (10%)',
            total: 'Total',
            checkout: 'Checkout',
            orderPlaced: `Order placed! Total: $${total.toFixed(2)}`,
            close: 'Close',
            payWithKHQR: 'Pay with KHQR',
        },
        kh: {
            currentOrder: 'ការបញ្ជាទិញ​បច្ចុប្បន្ន',
            noItems: 'មិនមានទំនិញនៅក្នុងរទេះ',
            subtotal: 'សរុប​ក្រៅពន្ធ',
            tax: 'ពន្ធ (10%)',
            total: 'សរុប',
            checkout: 'បញ្ជាទិញ',
            orderPlaced: `បានបញ្ជាទិញ! សរុប: $${total.toFixed(2)}`,
            close: 'បិទ',
            payWithKHQR: 'បង់ប្រាក់ដោយ KHQR',
        },
    };

    const t = translations[language];

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="w-full sm:w-96 bg-white shadow-lg flex flex-col top-0 sticky overflow-auto
            h-full sm:h-screen ">
            {/* Cart Header */}
            <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                    <ShoppingCart className="text-blue-600" size={24} />
                    <h2 className="text-xl font-bold text-gray-800">{t.currentOrder}</h2>
                    <span className="ml-auto bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                        {totalItems}
                    </span>
                </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                    <div className="text-center text-gray-400 mt-20">
                        <ShoppingCart size={64} className="mx-auto mb-4 opacity-50" />
                        <p>{t.noItems}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {cart.map(item => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Cart Summary */}
            <div className="border-t p-4 bg-gray-50">
                <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-gray-600">
                        <span>{t.subtotal}</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>{t.tax}</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xl font-bold text-gray-800 pt-2 border-t">
                        <span>{t.total}</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    disabled={cart.length === 0}
                    className={`w-full py-3 rounded-lg font-bold text-white transition-colors ${cart.length === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {t.checkout}
                </button>
            </div>

            {/* Checkout Modal */}
            {showModal && (
                <CheckoutModal
                    total={total}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
