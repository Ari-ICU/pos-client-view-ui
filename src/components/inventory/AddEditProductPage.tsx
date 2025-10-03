"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Image as ImageIcon, DollarSign } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/language.context";
import { Product } from "@/types/product.type";

interface AddEditProductPageProps {
    product?: Product;
    onSave: (product: Product) => void;
}

const pageLabels = {
    en: {
        addProduct: "Add Product",
        editProduct: "Edit Product",
        productName: "Product Name",
        price: "Price",
        category: "Category",
        stock: "Stock",
        image: "Image (Emoji)",
        save: "Save",
        cancel: "Cancel",
        backToProducts: "Back to Inventory",
        success: "Product saved successfully!",
        en: "English",
        kh: "Khmer",
    },
    kh: {
        addProduct: "បន្ថែមផលិតផល",
        editProduct: "កែប្រែផលិតផល",
        productName: "ឈ្មោះផលិតផល",
        price: "តម្លៃ",
        category: "ប្រភេទ",
        stock: "ស្តុក",
        image: "រូបភាព (Emoji)",
        save: "រក្សាទុក",
        cancel: "បោះបង់",
        backToProducts: "ត្រលប់ទៅផលិតផល",
        success: "បានរក្សាទុកផលិតផលដោយជោគជ័យ!",
        en: "អង់គ្លេស",
        kh: "ខ្មែរ",
    },
};

const categories = [
    { value: 'food', label: { en: 'Food', kh: 'អាហារ' } },
    { value: 'beverages', label: { en: 'Beverages', kh: 'ភេសជ្ជៈ' } },
    { value: 'desserts', label: { en: 'Desserts', kh: 'បង្អែម' } },
];

export default function AddEditProductPage({ product, onSave }: AddEditProductPageProps) {
    const router = useRouter();
    const { language } = useLanguage();
    const t = pageLabels[language];
    const isEdit = !!product;

    // Toggle state: 'en' or 'kh'
    const [formLang, setFormLang] = useState<"en" | "kh">("en");

    const [formData, setFormData] = useState<Product>({
        id: product?.id || 0,
        name: product?.name || { en: "", kh: "" },
        price: product?.price || 0,
        category: product?.category || { en: "", kh: "" },
        image: product?.image || "",
        stock: product?.stock || 0,
    });

    const [successMessage, setSuccessMessage] = useState("");


    const handleSave = () => {
        onSave(formData);
        setSuccessMessage(t.success);
        setTimeout(() => router.push("/dashboard/inventory"), 1200);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6 text-gray-600">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Link
                    href="/dashboard/inventory"
                    className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {t.backToProducts}
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">
                    {isEdit ? t.editProduct : t.addProduct}
                </h1>
            </div>

            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg animate-fade-in">
                    {successMessage}
                </div>
            )}

            {/* Language Toggle */}
            <div className="flex gap-2">
                <button
                    className={`px-4 py-2 rounded-lg border ${formLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setFormLang('en')}
                >
                    {t.en}
                </button>
                <button
                    className={`px-4 py-2 rounded-lg border ${formLang === 'kh' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
                    onClick={() => setFormLang('kh')}
                >
                    {t.kh}
                </button>
            </div>

            {/* Form */}
            <div className="bg-gray-50 rounded-lg shadow-sm p-6 space-y-6">
                {/* Name */}
                <div className="space-y-2">
                    <label className="block text-sm text-gray-600">{t.productName} ({formLang.toUpperCase()})</label>
                    <input
                        type="text"
                        value={formData.name[formLang]}
                        onChange={(e) =>
                            setFormData({ ...formData, name: { ...formData.name, [formLang]: e.target.value } })
                        }
                        placeholder={formLang === 'en' ? 'English' : 'ខ្មែរ'}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Price & Stock */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.price}</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })
                                }
                                className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-600 mb-1">{t.stock}</label>
                        <input
                            type="number"
                            min="0"
                            value={formData.stock}
                            onChange={(e) =>
                                setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })
                            }
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">{t.category} ({formLang.toUpperCase()})</label>
                    <select
                        value={categories.find(c => c.label[formLang] === formData.category[formLang])?.value || ''}
                        onChange={(e) => {
                            const cat = categories.find(c => c.value === e.target.value);
                            if (cat) setFormData({ ...formData, category: cat.label });
                        }}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">{t.category}</option>
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label[formLang]}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">{t.image}</label>
                    <div className="relative">
                        <ImageIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="e.g., 🍔"
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    {formData.image && <span className="text-3xl mt-2 block">{formData.image}</span>}
                </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3">
                <Link
                    href="/dashboard/inventory"
                    className="px-6 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    {t.cancel}
                </Link>
                <button
                    onClick={handleSave}
                    disabled={!formData.name.en || !formData.category.en || formData.price <= 0}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                >
                    <Save className="h-5 w-5 mr-2" /> {t.save}
                </button>
            </div>
        </div>
    );
}
