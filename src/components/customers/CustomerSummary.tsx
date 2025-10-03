"use client";

import { customers } from "@/data/customer";
import { useLanguage } from "@/context/language.context";

export default function CustomerSummary() {
    const { language } = useLanguage();

    const totalCustomers = customers.length;
    const vipCustomers = customers.filter(c => c.type === "VIP").length;

    const stats = [
        {
            label: language === "en" ? "Total Customers" : "អតិថិជនសរុប",
            value: totalCustomers,
        },
        {
            label: language === "en" ? "VIP Customers" : "អតិថិជន VIP",
            value: vipCustomers,
        },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.map(stat => (
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
