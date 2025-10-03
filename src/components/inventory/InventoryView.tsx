"use client";
import { Product } from "@/types/product.type";

interface ProductViewProps {
    product: Product;
    language: "en" | "kh";
}

export default function InventoryView({ product, language }: ProductViewProps) {
    return (
        <div className="space-y-4">
            {/* Desktop / tablet */}
            <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                    <tbody className="text-gray-600">
                        <tr className="border-t bg-white hover:bg-gray-50">
                            <th className="px-4 py-3 text-gray-500">#</th>
                            <td className="px-4 py-3">{product.id}</td>
                        </tr>
                        <tr className="border-t bg-gray-50 hover:bg-gray-100">
                            <th className="px-4 py-3 text-gray-500">{language === "en" ? "Image" : "រូបភាព"}</th>
                            <td className="px-4 py-3 text-2xl">{product.image}</td>
                        </tr>
                        <tr className="border-t bg-white hover:bg-gray-50">
                            <th className="px-4 py-3 text-gray-500">{language === "en" ? "Name" : "ឈ្មោះ"}</th>
                            <td className="px-4 py-3">{product.name[language]}</td>
                        </tr>
                        <tr className="border-t bg-gray-50 hover:bg-gray-100">
                            <th className="px-4 py-3 text-gray-500">{language === "en" ? "Category" : "ប្រភេទ"}</th>
                            <td className="px-4 py-3">{product.category[language]}</td>
                        </tr>
                        <tr className="border-t bg-white hover:bg-gray-50">
                            <th className="px-4 py-3 text-gray-500">{language === "en" ? "Price" : "តម្លៃ"}</th>
                            <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                        </tr>
                        <tr className="border-t bg-gray-50 hover:bg-gray-100">
                            <th className="px-4 py-3 text-gray-500">{language === "en" ? "Stock" : "ស្តុក"}</th>
                            <td className={`px-4 py-3 font-medium ${product.stock < 10 ? "text-red-600" : "text-gray-800"}`}>
                                {product.stock}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden bg-white p-4 rounded-xl shadow space-y-2">
                <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">{product.name[language]}</span>
                    <span className="text-2xl">{product.image}</span>
                </div>
                <div className="text-gray-600 text-sm">
                    <div>{language === "en" ? "Category" : "ប្រភេទ"}: {product.category[language]}</div>
                    <div>{language === "en" ? "Stock" : "ស្តុក"}:
                        <span className={`${product.stock < 10 ? "text-red-600 font-semibold" : ""}`}>{product.stock}</span>
                    </div>
                    <div className="text-gray-800 font-semibold">
                        {language === "en" ? "Price" : "តម្លៃ"}: ${product.price.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
}
