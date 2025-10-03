"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { products } from "@/data/product";
import { useLanguage } from "@/context/language.context";
import InventoryView from "@/components/inventory/InventoryView";

export default function ViewProductPage() {
    const params = useParams();
    const { language } = useLanguage();
    const t = {
        en: { back: "Back to Inventory" },
        kh: { back: "ត្រលប់ទៅផលិតផល" },
    };
    const id = params.id ? parseInt(params.id as string) : null;
    const product = id ? products.find(p => p.id === id) : null;

    if (!product) {
        return <div className="p-6 text-center text-gray-600">{language === "en" ? "Product not found" : "រកមិនឃើញផលិតផល"}.</div>;
    }

    return (
        <div className="sm:p-6 p-2 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/inventory"
                    className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t[language].back}
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">{product.name[language]}</h1>
            </div>

            {/* Product Details */}
            <InventoryView product={product} language={language} />
        </div>
    );
}
