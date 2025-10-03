"use client";

import Image from "next/image";
import { Menu, Bell, Globe } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/language.context";

interface TopbarProps {
    onMenuClick: () => void;
    userName?: string;
    userAvatar?: string;
    pendingOrders?: number;
}

export default function Topbar({
    onMenuClick,
    userName = "John Doe",
    userAvatar = "https://via.placeholder.com/40",
    pendingOrders = 0,
}: TopbarProps) {
    const { language, switchLanguage } = useLanguage();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isLangOpen, setLangOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const langRef = useRef<HTMLDivElement>(null);

    const labels = {
        en: { profile: "Profile", logout: "Logout", dashboard: "POS Dashboard" },
        kh: { profile: "ប្រវត្តិអ្នកប្រើ", logout: "ចាកចេញ", dashboard: "ផ្ទាំងគ្រប់គ្រង POS" },
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="flex items-center justify-between bg-white px-6 py-3 shadow-md sticky top-0 z-0">
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={onMenuClick}
                aria-label={labels[language].dashboard}
            >
                <Menu className="h-6 w-6 text-gray-600" />
            </button>

            <span className="sr-only">{labels[language].dashboard}</span>
            <span></span>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Notification */}
                <div className="relative group">
                    <Bell className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    {pendingOrders > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full transition-transform group-hover:scale-110">
                            {pendingOrders}
                        </span>
                    )}
                    <span className="absolute -top-6 right-0 hidden text-xs text-gray-700 group-hover:block bg-white border border-gray-200 px-2 py-1 rounded shadow">
                        {pendingOrders} pending orders
                    </span>
                </div>

                {/* Language Dropdown */}
                <div className="relative" ref={langRef}>
                    <button
                        onClick={() => setLangOpen(!isLangOpen)}
                        className="flex items-center space-x-1 px-3 py-1 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <Globe className="h-4 w-4" />
                        <span className="text-sm font-medium">{language.toUpperCase()}</span>
                    </button>
                    {isLangOpen && (
                        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                            {["en", "kh"].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => { switchLanguage(); setLangOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 ${language === lang ? "font-semibold bg-gray-50" : ""
                                        }`}
                                >
                                    {lang.toUpperCase()}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <span className="text-gray-600 font-medium">{userName}</span>
                        <Image
                            src={userAvatar}
                            alt="User Avatar"
                            width={40}
                            height={40}
                            className="rounded-full border border-gray-300"
                        />
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn">
                            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                {labels[language].profile}
                            </button>
                            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                                {labels[language].logout}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
