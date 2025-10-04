'use client';

import { useCart } from '@/context/cart.context';
import { useLanguage } from '@/context/language.context';

export default function PrintRecipes() {
    const { cart, subtotal, tax, total } = useCart();
    const { language } = useLanguage();

    const translations = {
        en: {
            title: 'Order Summary',
            subtotal: 'Subtotal',
            tax: 'Tax (10%)',
            total: 'Total',
            item: 'Item',
            quantity: 'Qty',
            price: 'Price',
        },
        kh: {
            title: 'សង្ខេបការបញ្ជាទិញ',
            subtotal: 'សរុបក្រៅពន្ធ',
            tax: 'ពន្ធ (10%)',
            total: 'សរុប',
            item: 'ទំនិញ',
            quantity: 'ចំនួន',
            price: 'តម្លៃ',
        },
    };

    const t = translations[language];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t.title}</h2>

            <table className="w-full border-collapse mb-4">
                <thead>
                    <tr className="border-b">
                        <th className="text-left p-2">{t.item}</th>
                        <th className="text-center p-2">{t.quantity}</th>
                        <th className="text-right p-2">{t.price}</th>
                    </tr>
                </thead>
                <tbody>
                    {cart.map(item => (
                        <tr key={item.id} className="border-b">
                            <td className="p-2">{item.name[language]}</td>
                            <td className="text-center p-2">{item.quantity}</td>
                            <td className="text-right p-2">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="text-right space-y-1 mb-4">
                <div>
                    {t.subtotal}: ${subtotal.toFixed(2)}
                </div>
                <div>
                    {t.tax}: ${tax.toFixed(2)}
                </div>
                <div className="font-bold text-lg">
                    {t.total}: ${total.toFixed(2)}
                </div>
            </div>

            <button
                onClick={handlePrint}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Print
            </button>
        </div>
    );
}
