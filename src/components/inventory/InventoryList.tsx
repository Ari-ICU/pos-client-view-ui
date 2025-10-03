"use client";
import Link from "next/link";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Product } from "@/types/product.type";
import { useState } from "react";

interface InventoryListProps {
    products: Product[];
    language: "en" | "kh";
    onDelete: (id: number) => void;
    viewPath?: string;
    editPath?: string;
}

export default function InventoryList({
    products,
    language,
    onDelete,
    viewPath = "/dashboard/inventory/view",
    editPath = "/dashboard/inventory/edit",
}: InventoryListProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

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
                            <th className="px-4 py-3">{language === "en" ? "Actions" : "សកម្មភាព"}</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600">
                        {products.map((product, index) => (
                            <tr
                                key={product.id}
                                className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                            >
                                <td className="px-4 py-3">{product.id}</td>
                                <td className="px-4 py-3 text-xl">{product.image}</td>
                                <td className="px-4 py-3">{product.name[language]}</td>
                                <td className="px-4 py-3">{product.category[language]}</td>
                                <td className="px-4 py-3">${product.price.toFixed(2)}</td>
                                <td
                                    className={`px-4 py-3 font-medium ${product.stock < 10 ? "text-red-600" : "text-gray-800"}`}
                                >
                                    {product.stock}
                                </td>
                                <td className="px-4 py-3 flex gap-2">
                                    <Link href={`${viewPath}/${product.id}`} className="text-blue-600 hover:text-blue-900">
                                        <Eye className="h-4 w-4" />
                                    </Link>
                                    <Link href={`${editPath}/${product.id}`} className="text-green-600 hover:text-green-900">
                                        <Edit className="h-4 w-4" />
                                    </Link>
                                    <button onClick={() => setShowDeleteConfirm(product.id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="sm:hidden space-y-2">
                {products.map((product) => (
                    <div key={product.id} className="bg-white p-4 rounded-xl shadow flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{product.name[language]}</span>
                            <span className="text-xl">{product.image}</span>
                        </div>
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>{language === "en" ? "Category" : "ប្រភេទ"}: {product.category[language]}</span>
                            <span>{language === "en" ? "Stock" : "ស្តុក"}:
                                <span className={`${product.stock < 10 ? "text-red-600 font-semibold" : ""}`}>{product.stock}</span>
                            </span>
                        </div>
                        <div className="text-gray-800 font-semibold">
                            {language === "en" ? "Price" : "តម្លៃ"}: ${product.price.toFixed(2)}
                        </div>
                        <div className="flex gap-2 mt-2">
                            <Link href={`${viewPath}/${product.id}`} className="text-blue-600 hover:text-blue-900">
                                <Eye className="h-4 w-4" />
                            </Link>
                            <Link href={`${editPath}/${product.id}`} className="text-green-600 hover:text-green-900">
                                <Edit className="h-4 w-4" />
                            </Link>
                            <button onClick={() => setShowDeleteConfirm(product.id)} className="text-red-600 hover:text-red-900">
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {language === "en" ? "Are you sure you want to delete this product?" : "តើអ្នកប្រាកដថាចង់លុបផលិតផលនេះមែនទេ?"}
                        </h3>
                        <div className="flex justify-end space-x-3 mt-4">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                {language === "en" ? "Cancel" : "បោះបង់"}
                            </button>
                            <button
                                onClick={() => {
                                    onDelete(showDeleteConfirm);
                                    setShowDeleteConfirm(null);
                                }}
                                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
                            >
                                {language === "en" ? "Delete" : "លុប"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
