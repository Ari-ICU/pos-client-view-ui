"use client";

import { useLanguage } from "@/context/language.context";
import { Card, CardContent } from "@/components/ui/card";
import { Users, ShoppingCart, DollarSign, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { name: "Jan", sales: 400, orders: 240 },
    { name: "Feb", sales: 300, orders: 200 },
    { name: "Mar", sales: 500, orders: 278 },
    { name: "Apr", sales: 700, orders: 390 },
    { name: "May", sales: 600, orders: 320 },
    { name: "Jun", sales: 800, orders: 450 },
];

export default function DashboardAnalysis() {
    const { language } = useLanguage();

    const labels = {
        en: {
            sales: "Total Sales",
            customers: "Customers",
            orders: "Orders",
            revenue: "Revenue",
            chartTitle: "Sales & Orders Overview",
        },
        kh: {
            sales: "ការលក់សរុប",
            customers: "អតិថិជន",
            orders: "ការបញ្ជាទិញ",
            revenue: "ប្រាក់ចំណូល",
            chartTitle: "ទិដ្ឋភាពលក់ & បញ្ជាទិញ",
        },
    };

    return (
        <div className="p-6 space-y-6">
            {/* Top Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="shadow-sm rounded-2xl">
                    <CardContent className="flex items-center p-4 space-x-3">
                        <BarChart3 className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-sm text-gray-500">{labels[language].sales}</p>
                            <p className="text-xl font-bold">$12,400</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardContent className="flex items-center p-4 space-x-3">
                        <Users className="w-8 h-8 text-green-600" />
                        <div>
                            <p className="text-sm text-gray-500">{labels[language].customers}</p>
                            <p className="text-xl font-bold">1,245</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardContent className="flex items-center p-4 space-x-3">
                        <ShoppingCart className="w-8 h-8 text-orange-600" />
                        <div>
                            <p className="text-sm text-gray-500">{labels[language].orders}</p>
                            <p className="text-xl font-bold">856</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm rounded-2xl">
                    <CardContent className="flex items-center p-4 space-x-3">
                        <DollarSign className="w-8 h-8 text-purple-600" />
                        <div>
                            <p className="text-sm text-gray-500">{labels[language].revenue}</p>
                            <p className="text-xl font-bold">$34,890</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Chart */}
            <Card className="shadow-sm rounded-2xl">
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">{labels[language].chartTitle}</h2>
                    <div className="w-full h-80">
                        <ResponsiveContainer>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2} />
                                <Line type="monotone" dataKey="orders" stroke="#f97316" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
