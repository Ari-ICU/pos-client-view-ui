"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { sales } from "@/data/sales";
import { products } from "@/data/product";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Dynamic badge counts
    const today = new Date().toISOString().split("T")[0];
    const salesCount = sales.filter((s) => s.date.includes(today)).length;
    const lowStockCount = products.filter((p) => p.stock < 10).length;

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                salesCount={salesCount}
                lowStockCount={lowStockCount}
            />
            <div className="flex-1 flex flex-col lg:ml-64">
                <Topbar onMenuClick={() => setIsOpen(true)} />
                <main className="p-6 flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
