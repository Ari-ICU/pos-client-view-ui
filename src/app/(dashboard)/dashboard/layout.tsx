"use client";

import { ReactNode, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="flex-1 flex flex-col lg:ml-64">
                <Topbar onMenuClick={() => setIsOpen(true)} />
                <main className="p-6 flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
