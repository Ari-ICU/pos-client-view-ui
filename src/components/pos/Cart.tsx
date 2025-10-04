'use client';

import { ShoppingCart } from 'lucide-react';
import { usePathname } from 'next/navigation';
import CartItem from './CartItem';
import CheckoutModal from './CheckoutModal';
import { useCart } from '@/context/cart.context';
import { useLanguage } from '@/context/language.context';

export default function Cart({ onCheckout }: { onCheckout: () => void }) {
    const { cart, subtotal, tax, total, showModal, setShowModal } = useCart();
    const { language } = useLanguage();
    const pathname = usePathname();
    const isCustomerViewsRoute = pathname.includes('/customer-views');

    const handlePrintRecipes = () => {
        try {
            window.open('/print-recipes', '_blank');
        } catch (error) {
            console.error('Failed to open print recipes:', error);
            alert('Unable to open print recipes. Please try again.');
        }
    };

    const translations = {
        en: {
            currentOrder: 'Your Order',
            noItems: 'Your cart is empty',
            subtotal: 'Subtotal',
            tax: 'Tax (10%)',
            total: 'Total',
            checkout: 'Proceed to Checkout',
            orderPlaced: `Order placed! Total: $${total.toFixed(2)}`,
            close: 'Close',
            payWithKHQR: 'Pay with KHQR',
            printRecipes: 'Print Recipes',
        },
        kh: {
            currentOrder: 'ការបញ្ជាទិញរបស់អ្នក',
            noItems: 'រទេះរបស់អ្នកទទេ',
            subtotal: 'សរុបក្រៅពន្ធ',
            tax: 'ពន្ធ (10%)',
            total: 'សរុប',
            checkout: 'បន្តទៅកាន់ការបញ្ជាទិញ',
            orderPlaced: `បានបញ្ជាទិញ! សរុប: $${total.toFixed(2)}`,
            close: 'បិទ',
            payWithKHQR: 'បង់ប្រាក់ដោយ KHQR',
            printRecipes: 'បោះពុម្ពរូបមន្ត',
        },
    };

    const t = translations[language];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="w-full sm:w-96 bg-white shadow-xl flex flex-col top-0 sticky overflow-hidden h-full sm:h-screen border-l border-gray-200">
            {/* Cart Header */}
            <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-full">
                            <ShoppingCart className="text-blue-600" size={20} />
                        </div>
                        <h2 className="text-lg font-semibold text-gray-800">{t.currentOrder}</h2>
                    </div>
                    <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                        {totalItems}
                    </span>
                </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12 text-gray-500">
                        <div className="p-3 bg-gray-100 rounded-full mb-4">
                            <ShoppingCart size={32} className="text-gray-400" />
                        </div>
                        <p className="text-gray-600 font-medium">{t.noItems}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                )}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 p-5 bg-gray-50">
                <div className="space-y-2 mb-5">
                    <div className="flex justify-between text-gray-600">
                        <span>{t.subtotal}</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>{t.tax}</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                        <span>{t.total}</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <div className="space-y-3">
                    {!isCustomerViewsRoute && (
                        <>
                            <button
                                onClick={() => setShowModal(true)}
                                disabled={cart.length === 0}
                                aria-label={t.checkout}
                                aria-disabled={cart.length === 0}
                                className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm ${cart.length === 0
                                        ? 'bg-gray-300 cursor-not-allowed opacity-80'
                                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md focus:ring-blue-500'
                                    }`}
                            >
                                {t.checkout}
                            </button>

                            {cart.length > 0 && (
                                <button
                                    onClick={handlePrintRecipes}
                                    aria-label={t.printRecipes}
                                    className="w-full py-3 px-4 rounded-xl font-semibold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                >
                                    {t.printRecipes}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Checkout Modal */}
            {showModal && (
                <CheckoutModal total={total} onClose={() => setShowModal(false)} />
            )}
        </div>
    );
}