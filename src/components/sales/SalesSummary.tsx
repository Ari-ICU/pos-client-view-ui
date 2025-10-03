"use client";

import { sales } from "@/data/sales";
import { useLanguage } from "@/context/language.context";

export default function SalesSummary() {
    const { language } = useLanguage();

    const totalSales = sales.length;
    const totalRevenue = sales.reduce((sum, sale) => {
        const amount = parseFloat(sale.total.replace(/[$,]/g, ''));
        return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    const stats = [
        {
            label: language === "en" ? "Total Sales" : "ការលក់សរុប",
            value: totalSales,
        },
        {
            label: language === "en" ? "Total Revenue" : "ប្រាក់ចំណូលសរុប",
            value: `$${totalRevenue.toLocaleString()}`,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex flex-col items-start"
                >
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <h2 className="text-xl font-bold text-gray-800">
                        {stat.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}