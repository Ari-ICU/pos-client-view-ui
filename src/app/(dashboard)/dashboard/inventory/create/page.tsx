"use client";
import AddEditProductPage from "@/components/inventory/AddEditProductPage";
import { products } from "@/data/product";
import { Product } from "@/types/product.type";

export default function CreateProductPage() {
    const handleSave = (newProduct: Product) => {
        const productToAdd = { ...newProduct, id: Date.now() };
        products.push(productToAdd);
    };

    return <AddEditProductPage onSave={handleSave} />;
}
