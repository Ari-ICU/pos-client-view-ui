'use client';

import { useLanguage } from '@/context/language.context';
import { Product } from '@/types/product.type';

interface ProductSummaryProps {
    products: Product[];
}

export default function ProductSummary({ products }: ProductSummaryProps) {
    const { language } = useLanguage();

    const totalProducts = products.length;
    const lowStock = products.filter((p) => p.stock < 10).length;

    const stats = [
        {
            label: language === "en" ? "Total Products" : "ផលិតផលសរុប",
            value: totalProducts,
        },
        {
            label: language === "en" ? "Low Stock Items" : "ផលិតផលស្តុកតិច",
            value: lowStock,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
                >
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h2 className="text-xl font-bold text-gray-800">{stat.value}</h2>
                </div>
            ))}
        </div>
    );
}
