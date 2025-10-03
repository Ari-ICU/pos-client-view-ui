"use client";

import CustomerList from "@/components/customers/CustomerList";
import CustomerHeader from "@/components/customers/CustomerHeader";
import CustomerSummary from "@/components/customers/CustomerSummary";


export default function CustomersPage() {

    return (
        <div className="sm:p-6 p-2 space-y-4">
            <CustomerHeader />

            <CustomerSummary />
            <CustomerList />
        </div>
    );
}
