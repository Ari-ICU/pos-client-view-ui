"use client";

import { useState } from "react";
import ReportsList from "@/components/reports/ReportsList";
import ReportsHeader, { FilterOption } from "@/components/reports/ReportsHeader";
import { Report } from "@/types/report.type";

const reportsData: Report[] = [
    { id: 1, title: "Monthly Sales Report", date: "2025-10-03", author: "Admin" },
    { id: 2, title: "Inventory Status", date: "2025-10-02", author: "Admin" },
    { id: 3, title: "Quarterly Review", date: "2025-09-30", author: "Admin" },
];

const filters: FilterOption[] = [
    { key: 'today', label: { en: 'Today', kh: 'ថ្ងៃនេះ' } },
    { key: 'week', label: { en: 'This Week', kh: 'សប្ដាហ៍នេះ' } },
    { key: 'month', label: { en: 'This Month', kh: 'ខែនេះ' } },
];

export default function ReportsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFilter, setSelectedFilter] = useState<'today' | 'week' | 'month'>('today');

    return (
        <div className="sm:p-6 p-2 space-y-6">
            {/* Header Section */}
            <ReportsHeader
                filters={filters}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Reports List */}
            <ReportsList reports={reportsData} searchQuery={searchQuery} />
        </div>
    );
}
