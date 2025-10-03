"use client";

import { Search } from "lucide-react";
import { useLanguage } from "@/context/language.context";

export default function CustomerHeader() {
    const { language } = useLanguage();

    return (
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-800">
                {language === "en" ? "Customers" : "អតិថិជន"}
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto text-gray-600">
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder={
                            language === "en"
                                ? "Search customers..."
                                : "ស្វែងរកអតិថិជន..."
                        }
                        className="pl-9 pr-4 py-2 border rounded-lg text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <select className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto focus:ring-2 focus:ring-blue-500">
                    <option value="all">
                        {language === "en" ? "All Types" : "ប្រភេទទាំងអស់"}
                    </option>
                    <option value="regular">
                        {language === "en" ? "Regular" : "ធម្មតា"}
                    </option>
                    <option value="vip">
                        {language === "en" ? "VIP" : "VIP"}
                    </option>
                </select>
            </div>
        </div>
    );
}
