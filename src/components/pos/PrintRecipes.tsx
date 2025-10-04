'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/cart.context';
import { useLanguage } from '@/context/language.context';
import { format } from 'date-fns';

export default function PrintRecipes() {
    const { cart, subtotal, tax, total } = useCart();
    const { language } = useLanguage();

    // Client-only state
    const [receiptData, setReceiptData] = useState<{
        id: string;
        date: string;
    } | null>(null);

    useEffect(() => {
        // Only runs on client
        const now = new Date();
        const id = `ORD-${now.getTime().toString().slice(-6)}`;
        const date = format(now, language === 'en' ? 'MMM dd, yyyy HH:mm' : 'dd/MM/yyyy HH:mm');
        setReceiptData({ id, date });
    }, [language]);

    const translations = {
        en: {
            title: 'ORDER RECEIPT',
            storeName: 'Delicious Bistro',
            address: '123 Food Street, Phnom Penh',
            phone: 'Tel: +855 12 345 678',
            receiptNo: 'Receipt No:',
            date: 'Date:',
            subtotal: 'Subtotal',
            tax: 'Tax (10%)',
            total: 'TOTAL',
            item: 'Item',
            quantity: 'Qty',
            price: 'Price',
            print: 'Print Receipt',
            thankYou: 'Thank you for your order!',
            allPricesIn: 'All prices in USD',
        },
        kh: {
            title: 'វិក្កយបត្រ',
            storeName: 'រស់ជាតិ ភោជនីយដ្ឋាន',
            address: 'ផ្លូវអាហារ លេខ 123, ភ្នំពេញ',
            phone: 'ទូរសព្ទ: +855 12 345 678',
            receiptNo: 'លេខវិក្កយបត្រ:',
            date: 'កាលបរិច្ឆេទ:',
            subtotal: 'សរុបក្រៅពន្ធ',
            tax: 'ពន្ធ (10%)',
            total: 'សរុប',
            item: 'ទំនិញ',
            quantity: 'ចំនួន',
            price: 'តម្លៃ',
            print: 'បោះពុម្ពវិក្កយបត្រ',
            thankYou: 'អរគុណសម្រាប់ការបញ្ជាទិញ!',
            allPricesIn: 'តម្លៃទាំងអស់គិតជាដុល្លារ',
        },
    };

    const t = translations[language];

    const handlePrint = () => window.print();

    return (
        <div className="p-6 max-w-lg mx-auto print:p-4 print:max-w-none bg-white">
            <div className="text-center mb-6 print:mb-5">
                <h1 className="text-2xl font-bold text-gray-900 print:text-xl tracking-wide">
                    {t.title}
                </h1>
                <div className="mt-1 w-16 h-px bg-gray-300 mx-auto print:hidden"></div>

                {/* Store info (static, safe for SSR) */}
                <div className="mt-3 text-gray-700 space-y-0.5 text-sm">
                    <div className="font-semibold">{t.storeName}</div>
                    <div>{t.address}</div>
                    <div>{t.phone}</div>
                </div>

                {/* Receipt metadata — only show when client is ready */}
                {receiptData ? (
                    <div className="mt-3 flex justify-between text-xs text-gray-600 max-w-xs mx-auto">
                        <div className="text-left">
                            <div>{t.receiptNo}</div>
                            <div>{t.date}</div>
                        </div>
                        <div className="text-right font-mono">
                            <div>#{receiptData.id}</div>
                            <div>{receiptData.date}</div>
                        </div>
                    </div>
                ) : (
                    // Optional: show loading skeleton or nothing during SSR
                    <div className="mt-3 h-10"></div>
                )}
            </div>

            {/* Order Table */}
            <table className="w-full border-collapse mb-5 print:mb-4">
                <thead>
                    <tr className="border-b border-gray-300 print:border-gray-400">
                        <th className="text-left py-2 px-2 text-xs font-semibold text-gray-700 print:text-[10px] print:py-1.5 uppercase tracking-wide">
                            {t.item}
                        </th>
                        <th className="text-center py-2 px-2 text-xs font-semibold text-gray-700 print:text-[10px] print:py-1.5 uppercase tracking-wide">
                            {t.quantity}
                        </th>
                        <th className="text-right py-2 px-2 text-xs font-semibold text-gray-700 print:text-[10px] print:py-1.5 uppercase tracking-wide">
                            {t.price}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map((item) => (
                        <tr key={item.id} className="border-b border-gray-100 print:border-gray-300">
                            <td className="py-2.5 px-2 text-gray-800 print:py-2 print:text-[11px] break-words">
                                {item.name[language]}
                            </td>
                            <td className="text-center py-2.5 px-2 text-gray-700 font-medium print:py-2 print:text-[11px]">
                                {item.quantity}
                            </td>
                            <td className="text-right py-2.5 px-2 text-gray-800 font-medium print:py-2 print:text-[11px]">
                                ${(item.price * item.quantity).toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Totals Summary */}
            <div className="mb-6 print:mb-5">
                <div className="flex justify-between py-1 text-gray-600 print:text-[11px]">
                    <span>{t.subtotal}</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-1 text-gray-600 print:text-[11px]">
                    <span>{t.tax}</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 mt-2 border-t border-gray-300 print:border-gray-400 print:pt-1.5">
                    <span className="text-lg font-bold text-gray-900 print:text-base">{t.total}</span>
                    <span className="text-lg font-bold text-gray-900 print:text-base">${total.toFixed(2)}</span>
                </div>
                <div className="text-center mt-1 text-xs text-gray-500 print:text-[10px] italic">
                    {t.allPricesIn}
                </div>
            </div>

            {/* Print Button (screen only) */}
            <div className="text-center print:hidden">
                <button
                    onClick={handlePrint}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-6 rounded-lg shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {t.print}
                </button>
            </div>

            {/* Print-only footer */}
            <div className="hidden print:block text-center text-sm text-gray-700 font-medium mt-4 pt-3 border-t border-gray-300">
                {t.thankYou}
            </div>
        </div>
    );
}