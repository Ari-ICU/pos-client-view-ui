"use client";

import SalesHeader from "@/components/sales/SalesHeader";
import SalesList from "@/components/sales/SalesList";
import SalesSummary from "@/components/sales/SalesSummary";

import { useState } from 'react';

const filters = [
    { key: 'today', label: { en: 'Today', kh: 'ថ្ងៃនេះ' } },
    { key: 'week', label: { en: 'This Week', kh: 'សប្ដាហ៍នេះ' } },
    { key: 'month', label: { en: 'This Month', kh: 'ខែនេះ' } },
];

export default function SalesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('today');

    return (
        <div className="sm:p-6 p-2 space-y-6">
            {/* Header Section */}
            <SalesHeader
                filters={filters}
                selectedFilter={selectedFilter}
                onFilterChange={setSelectedFilter}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
            />

            {/* Sales Summary */}
            <SalesSummary />

            {/* Sales Table/List */}
            <SalesList searchQuery={searchQuery} selectedFilter={selectedFilter} />
        </div>
    );
}