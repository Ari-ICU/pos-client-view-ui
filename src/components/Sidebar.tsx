"use client";

import Link from "next/link";
import { X, Home, ShoppingCart, Box, Users, ClipboardList, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language.context";
import { useRef, useEffect } from "react";

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    salesCount?: number;
    lowStockCount?: number;
}

const menuLabels = {
    en: {
        dashboard: "Dashboard",
        sales: "Sales",
        products: "Products",
        customers: "Customers",
        inventory: "Inventory",
        reports: "Reports",
        settings: "Settings",
    },
    kh: {
        dashboard: "ផ្ទាំងគ្រប់គ្រង",
        sales: "ការលក់",
        products: "ផលិតផល",
        customers: "អតិថិជន",
        inventory: "ស្តុកទំនិញ",
        reports: "របាយការណ៍",
        settings: "ការកំណត់",
    },
};

const titles = {
    en: "POS System",
    kh: "ប្រព័ន្ធ POS",
};

export default function Sidebar({ isOpen, setIsOpen, salesCount = 0, lowStockCount = 0 }: SidebarProps) {
    const pathname = usePathname();
    const { language } = useLanguage();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const navItems = [
        { key: "dashboard", href: "/dashboard", icon: Home },
        { key: "sales", href: "/dashboard/sales", icon: ShoppingCart, badge: salesCount },
        { key: "products", href: "/dashboard/products", icon: Box },
        { key: "customers", href: "/dashboard/customers", icon: Users },
        { key: "inventory", href: "/dashboard/inventory", icon: ClipboardList, badge: lowStockCount },
        { key: "reports", href: "/dashboard/reports", icon: ClipboardList },
        { key: "settings", href: "/dashboard/settings", icon: Settings },
    ];

    // Close sidebar on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, setIsOpen]);

    return (
        <aside
            ref={sidebarRef}
            className={`fixed inset-y-0 left-0 transform bg-white w-64 shadow-lg transition-transform lg:translate-x-0 z-50 ${
                isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
        >
            {/* Top Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b bg-blue-50">
                <h1 className="text-xl font-bold text-blue-600">{titles[language]}</h1>
                <button className="lg:hidden" onClick={() => setIsOpen(false)}>
                    <X className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    const label = menuLabels[language][item.key as keyof typeof menuLabels.en];

                    return (
                        <Link
                            key={item.key}
                            href={item.href}
                            className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
                                isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <Icon className={`h-5 w-5 ${isActive ? "text-white" : "text-gray-500"}`} />
                                <span>{label}</span>
                            </div>
                            {item.badge && (
                                <span
                                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                        isActive ? "bg-white text-blue-600" : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Info */}
            <div className="absolute bottom-0 w-full px-6 py-4 border-t bg-blue-50">
                <p className="text-xs text-gray-500">
                    {language === "en" ? "Logged in as" : "ចូលក្នុងនាម"}{" "}
                    <span className="font-semibold text-gray-700">Admin</span>
                </p>
            </div>
        </aside>
    );
}
