"use client";
import Link from "next/link";
import { Plus, Search, Download } from "lucide-react";
import { useLanguage } from "@/context/language.context";

interface InventoryHeaderProps {
    titleKey: string; // key for translation, e.g., "Products"
    addUrl?: string; // link for add button
    onSearch?: (term: string) => void;
    onFilter?: () => void;
    onExport?: () => void;
}

export default function InventoryHeader({
    titleKey,
    addUrl,
    onSearch,
    onExport,
}: InventoryHeaderProps) {
    const { language } = useLanguage();

    const labels = {
        en: {
            add: "Add",
            searchPlaceholder: "Search...",
            filter: "Filter",
            export: "Export",
        },
        kh: {
            add: "បន្ថែម",
            searchPlaceholder: "ស្វែងរក...",
            filter: "តម្រង",
            export: "នាំចេញ",
        },
    };

    const t = labels[language];

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{titleKey}</h1>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Search */}
                {onSearch && (
                    <div className="relative flex-1 text-gray-400">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            onChange={(e) => onSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                )}

                {/* Export */}
                {onExport && (
                    <button
                        onClick={onExport}
                        className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <Download className="h-4 w-4 mr-2" />
                        {t.export}
                    </button>
                )}

                {/* Add Button */}
                {addUrl && (
                    <Link
                        href={addUrl}
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        {t.add}
                    </Link>
                )}
            </div>
        </div>
    );
}
