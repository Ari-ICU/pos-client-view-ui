"use client";

import { useLanguage } from "@/context/language.context";
import { customers } from "@/data/customer";

export default function CustomerList() {
    const { language } = useLanguage();

    return (
        <div className="">
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[600px]">
                    <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">{language === "en" ? "Name" : "ឈ្មោះ"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Email" : "អ៊ីមែល"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Phone" : "ទូរស័ព្ទ"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Type" : "ប្រភេទ"}</th>

                        </tr>
                    </thead>
                    <tbody className="text-gray-500">
                        {customers.map((customer, index) => (
                            <tr key={customer.id} className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                <td className="px-4 py-3 font-medium">{customer.id}</td>
                                <td className="px-4 py-3">{customer.name}</td>
                                <td className="px-4 py-3">{customer.email}</td>
                                <td className="px-4 py-3">{customer.phone}</td>
                                <td className="px-4 py-3">{customer.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
                {customers.map((customer) => (
                    <div key={customer.id} className="border rounded-xl p-3 bg-gray-50 shadow-sm flex flex-col gap-2">
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Name" : "ឈ្មោះ"}: <span className="font-medium">{customer.name}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Email" : "អ៊ីមែល"}: <span className="font-medium">{customer.email}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Phone" : "ទូរស័ព្ទ"}: <span className="font-medium">{customer.phone}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Type" : "ប្រភេទ"}: <span className="font-medium">{customer.type}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
