"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language.context";

export default function NotFound() {
    const { language } = useLanguage();

    const text = {
        en: {
            title: "Page Not Found",
            description:
                "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
            button: "Go Back Home",
        },
        kh: {
            title: "មិនមានទំព័រ",
            description:
                "ទំព័រដែលអ្នកកំពុងស្វែងរកអាចត្រូវបានលុប ផ្លាស់ប្តូរឈ្មោះ ឬមិនអាចប្រើបានបណ្តោះអាសន្ន។",
            button: "ត្រឡប់ទៅទំព័រដើម",
        },
    };

    const { title, description, button } = text[language];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            {/* Optional illustration */}
            <svg
                className="w-48 h-48 mb-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 17v-2a4 4 0 014-4h4M9 17H5a2 2 0 01-2-2V7a2 2 0 012-2h4l5 5h4a2 2 0 012 2v4l-5 5H9z"
                />
            </svg>

            <h1 className="text-7xl font-extrabold text-gray-800 mb-4">404</h1>
            <h2 className="text-3xl font-semibold text-gray-700 mb-4">{title}</h2>
            <p className="text-gray-500 mb-6 max-w-md">{description}</p>
            <Link
                href="/dashboard"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
                {button}
            </Link>
        </div>
    );
}
