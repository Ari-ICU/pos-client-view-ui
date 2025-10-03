'use client';

import { useLanguage } from '@/context/language.context';
import { Product } from '@/types/product.type';

interface ProductListProps {
    products: Product[]; // already filtered
}

export default function ProductList({ products }: ProductListProps) {
    const { language } = useLanguage();

    return (
        <div className="space-y-4">
            {/* Desktop / tablet table */}
            <div className="hidden sm:block bg-white rounded-xl shadow overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[700px]">
                    <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Image</th>
                            <th className="px-4 py-3">{language === "en" ? "Name" : "ឈ្មោះ"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Category" : "ប្រភេទ"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Price" : "តម្លៃ"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Stock" : "ស្តុក"}</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {products.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                            >
                                <td className="px-4 py-3">{product.id}</td>
                                <td className="px-4 py-3 text-xl">{product.image}</td>
                                <td className="px-4 py-3">{product.name[language]}</td>
                                <td className="px-4 py-3">{product.category[language]}</td>
                                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                                <td
                                    className={`px-4 py-3 font-medium ${
                                        product.stock < 10 ? "text-red-600" : "text-gray-800"
                                    }`}
                                >
                                    {product.stock}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-2">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white p-4 rounded-xl shadow flex flex-col gap-2"
                    >
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{product.name[language]}</span>
                            <span className="text-xl">{product.image}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>{language === "en" ? "Category" : "ប្រភេទ"}: {product.category[language]}</span>
                            <span>{language === "en" ? "Stock" : "ស្តុក"}:
                                <span className={`${product.stock < 10 ? "text-red-600" : ""}`}>{product.stock}</span>
                            </span>
                        </div>
                        <div className="text-gray-800 font-semibold">
                            {language === "en" ? "Price" : "តម្លៃ"}: ${product.price.toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
