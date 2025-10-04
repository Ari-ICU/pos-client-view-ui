"use client";

import DashboardAnalysis from "@/components/dashboard/DashboardAnalysis";
import { useLanguage } from "@/context/language.context";

export default function DashboardPage() {
    const { language } = useLanguage();

    const labels = {
        en: {
            overview: "Overview",
            welcome: "Welcome to your dashboard 🚀",
        },
        kh: {
            overview: "ទិដ្ឋភាពទូទៅ",
            welcome: "សូមស្វាគមន៍មកកាន់ផ្ទាំងគ្រប់គ្រងរបស់អ្នក 🚀",
        },
    };

    return (
        <div>
            <h1 className="text-2xl text-gray-800 font-bold">
                {labels[language].overview}
            </h1>
            <p className="mt-2 text-gray-600">{labels[language].welcome}</p>
            <DashboardAnalysis />
        </div>
    );
}
