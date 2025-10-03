"use client";
import { useParams } from "next/navigation";
import AddEditProductPage from "@/components/inventory/AddEditProductPage";
import { products } from "@/data/product";
import { Product } from "@/types/product.type";

export default function EditProductPage() {
    const { id } = useParams();
    const product = products.find(p => p.id === Number(id));

    if (!product) return <p className="p-6">Product not found</p>;

    const handleSave = (updatedProduct: Product) => {
        const index = products.findIndex(p => p.id === product.id);
        products[index] = { ...updatedProduct, id: product.id };
    };

    return <AddEditProductPage product={product} onSave={handleSave} />;
}
