"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language.context";

export default function DashboardNotFound() {
    const { language } = useLanguage();

    const labels = {
        en: {
            title: "Page Not Found",
            description: "The dashboard page you are looking for does not exist.",
            button: "Go Back to Dashboard",
        },
        kh: {
            title: "មិនមានទំព័រ",
            description: "ទំព័រផ្ទាំងគ្រប់គ្រងដែលអ្នកកំពុងស្វែងរក មិនមានទេ។",
            button: "ត្រឡប់ទៅផ្ទាំងគ្រប់គ្រង",
        },
    };

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                {labels[language].title}
            </h2>
            <p className="text-gray-500 mb-6">{labels[language].description}</p>
            <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                {labels[language].button}
            </Link>
        </div>
    );
}
