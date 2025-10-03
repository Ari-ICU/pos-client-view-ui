
'use client'

import { useState } from "react";
import InventoryList from "@/components/inventory/InventoryList";
import InventoryHeader from "@/components/inventory/InventoryHeader";
import { products } from "@/data/product";
import { useLanguage } from "@/context/language.context";

export default function ProductsPage() {
    const { language } = useLanguage();
    const [productList, setProductList] = useState(products);
    const [searchTerm, setSearchTerm] = useState('');


    const handleDelete = (id: number) => {
        setProductList(productList.filter(p => p.id !== id));
    };

    return (
        <div className="sm:p-6 p-2">
            <InventoryHeader
                titleKey={language === "en" ? "Inventory" : "ផលិតផល"}
                addUrl="/dashboard/inventory/create"
                onSearch={(term) => setSearchTerm(term)}
                onExport={() => console.log("Export clicked")}
            />

            <InventoryList
                products={productList}
                language={language}
                onDelete={handleDelete}
            />
        </div>
    );
}
