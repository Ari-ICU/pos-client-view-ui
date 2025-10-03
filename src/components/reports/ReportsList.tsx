"use client";

import { useLanguage } from "@/context/language.context";
import { Report } from "@/types/report.type";

interface ReportsListProps {
    reports: Report[];
    searchQuery: string;
}

export default function ReportsList({ reports, searchQuery }: ReportsListProps) {
    const { language } = useLanguage();

    // Search filter
    let filteredReports = reports;
    if (searchQuery) {
        filteredReports = reports.filter(r =>
            r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.id.toString().includes(searchQuery)
        );
    }

    // Export CSV
    const exportCSV = () => {
        const headers = ["ID", "Title", "Author", "Date"];
        const rows = filteredReports.map(r => [r.id, r.title, r.author, r.date]);

        const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "reports.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="">
            {/* Export Button */}
            <div className="flex justify-end mb-2">
                <button
                    onClick={exportCSV}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                >
                    {language === "en" ? "Export CSV" : "នាំចេញ CSV"}
                </button>
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                    <thead className="bg-gray-100 text-gray-800 uppercase text-xs">
                        <tr>
                            <th className="px-4 py-3">{language === "en" ? "Report ID" : "លេខរបាយការណ៍"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Title" : "ចំណងជើង"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Author" : "អ្នកនិពន្ធ"}</th>
                            <th className="px-4 py-3">{language === "en" ? "Date" : "កាលបរិច្ឆេទ"}</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-500">
                        {filteredReports.map((report, index) => (
                            <tr key={report.id} className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                                <td className="px-4 py-3 font-medium">{report.id}</td>
                                <td className="px-4 py-3">{report.title}</td>
                                <td className="px-4 py-3">{report.author}</td>
                                <td className="px-4 py-3">{report.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredReports.length === 0 && (
                    <p className="text-center text-gray-500 py-4">{language === "en" ? "No reports found." : "រកមិនឃើញរបាយការណ៍ទេ។"}</p>
                )}
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
                {filteredReports.map((report) => (
                    <div key={report.id} className="border rounded-xl p-3 bg-gray-50 shadow-sm">
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Report ID" : "លេខរបាយការណ៍"}: <span className="font-medium">{report.id}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Title" : "ចំណងជើង"}: <span className="font-medium">{report.title}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Author" : "អ្នកនិពន្ធ"}: <span className="font-medium">{report.author}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {language === "en" ? "Date" : "កាលបរិច្ឆេទ"}: <span className="font-medium">{report.date}</span>
                        </p>
                    </div>
                ))}
                {filteredReports.length === 0 && (
                    <p className="text-center text-gray-500 py-4">{language === "en" ? "No reports found." : "រកមិនឃើញរបាយការណ៍ទេ។"}</p>
                )}
            </div>
        </div>
    );
}
