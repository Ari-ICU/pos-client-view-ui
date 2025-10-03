"use client";

import { sales } from "@/data/sales";
import { useLanguage } from "@/context/language.context";

interface SalesListProps {
    searchQuery: string;
    selectedFilter: string;
}

export default function SalesList({ searchQuery, selectedFilter }: SalesListProps) {
    const { language } = useLanguage();

    // Filter sales based on selected filter (simplified logic; adjust based on actual date logic)
    let filteredSales = sales;
    const now = new Date();
    if (selectedFilter === 'today') {
        const today = now.toISOString().split('T')[0];
        filteredSales = sales.filter(sale => sale.date.includes(today));
    } else if (selectedFilter === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        filteredSales = sales.filter(sale => {
            const saleDate = sale.date.split('/')[0]; // Adjust based on your date format
            return new Date(saleDate).getTime() >= new Date(weekAgo).getTime();
        });
    } else if (selectedFilter === 'month') {
        const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
        filteredSales = sales.filter(sale => {
            const saleDate = sale.date.split('/')[0]; // Adjust based on your date format
            return new Date(saleDate).getTime() >= new Date(monthAgo).getTime();
        });
    }

    // Search filter
    if (searchQuery) {
        filteredSales = filteredSales.filter(sale =>
            sale.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            sale.id.toString().includes(searchQuery)
        );
    }

    return (
        <div className="">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                    <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">{language === "en" ? "Sale ID" : "លេខការលក់"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Customer" : "អតិថិជន"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Total" : "សរុប"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Date" : "កាលបរិច្ឆេទ"}</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-500">
                        {filteredSales.map((sale, index) => (
                            <tr key={sale.id} className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                <td className="px-4 py-3 font-medium">{sale.id}</td>
                                <td className="px-4 py-3">{sale.customer}</td>
                                <td className="px-4 py-3">{sale.total}</td>
                                <td className="px-4 py-3">{sale.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredSales.length === 0 && (
                    <p className="text-center text-gray-500 py-4">No sales found.</p>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
                {filteredSales.map((sale) => (
                    <div key={sale.id} className="border rounded-xl p-3 bg-gray-50 shadow-sm">
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Sale ID" : "លេខការលក់"}: <span className="font-medium">{sale.id}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Customer" : "អតិថិជន"}: <span className="font-medium">{sale.customer}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Total" : "សរុប"}: <span className="font-medium">{sale.total}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Date" : "កាលបរិច្ឆេទ"}: <span className="font-medium">{sale.date}</span>
                        </p>
                    </div>
                ))}
                {filteredSales.length === 0 && (
                    <p className="text-center text-gray-500 py-4">{language === "en" ? "No sales found." : "រកឃើញការលក់ ០ លើក។"}</p>
                )}
            </div>
        </div>
    );
}
