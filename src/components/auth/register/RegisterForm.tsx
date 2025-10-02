"use client";

import { useState } from "react";
import { Eye, EyeOff, Globe } from "lucide-react";
import Message from "@/components/Message";
import { useLanguage } from "@/context/language.context";

export default function RegisterForm() {
    const { language, switchLanguage } = useLanguage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("cashier");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const text = {
        en: {
            title: "Register New Cashier",
            subtitle: "Only admins can create cashier accounts",
            email: "Email Address",
            emailPlaceholder: "cashier@example.com",
            password: "Password",
            passwordPlaceholder: "••••••••",
            confirmPassword: "Confirm Password",
            role: "Role",
            cashier: "Cashier",
            manager: "Manager",
            register: "Register Cashier",
            registering: "Registering...",
            errorFill: "Please fill in all fields.",
            errorEmail: "Please enter a valid email address.",
            errorPassword: "Passwords do not match.",
            success: (email: string) => `Cashier ${email} registered successfully!`,
        },
        kh: {
            title: "ចុះបញ្ជីអ្នកគិតលុយថ្មី",
            subtitle: "គ្រាន់តែអ្នកគ្រប់គ្រងអាចបង្កើតគណនីអ្នកគិតលុយបាន",
            email: "អាសយដ្ឋានអ៊ីមែល",
            emailPlaceholder: "cashier@example.com",
            password: "ពាក្យសម្ងាត់",
            passwordPlaceholder: "••••••••",
            confirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់",
            role: "តួនាទី",
            cashier: "អ្នកគិតលុយ",
            manager: "អ្នកគ្រប់គ្រង",
            register: "ចុះបញ្ជីអ្នកគិតលុយ",
            registering: "កំពុងចុះបញ្ជី...",
            errorFill: "សូមបំពេញទាំងអស់ប្រអប់។",
            errorEmail: "សូមបញ្ចូលអ៊ីមែលត្រឹមត្រូវ។",
            errorPassword: "ពាក្យសម្ងាត់មិនផ្គូផ្គង។",
            success: (email: string) => `អ្នកគិតលុយ ${email} បានចុះបញ្ជីដោយជោគជ័យ!`,
        },
    };

    const t = text[language];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email || !password || !confirmPassword) {
            setError(t.errorFill);
            return;
        }

        if (!email.includes("@")) {
            setError(t.errorEmail);
            return;
        }

        if (password !== confirmPassword) {
            setError(t.errorPassword);
            return;
        }

        setIsLoading(true);

        try {
            // TODO: Call your backend API
            console.log("Registering cashier:", { email, password, role });
            await new Promise((resolve) => setTimeout(resolve, 1000));

            setMessage(t.success(email));
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setRole("cashier");
        } catch {
            setError("Failed to register cashier. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative">
            {/* Language Switch */}
            <button
                type="button"
                onClick={switchLanguage}
                className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 border rounded-lg border-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">{t.title}</h1>
            <p className="text-center text-gray-500 mb-8">{t.subtitle}</p>

            {error && <Message type="error" text={error} />}
            {message && <Message type="success" text={message} />}

            <form onSubmit={handleSubmit} className="space-y-6 text-gray-600">
                {/* Email */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t.email}</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                        required
                        disabled={isLoading}
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t.password}</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.passwordPlaceholder}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Confirm Password */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t.confirmPassword}</label>
                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder={t.passwordPlaceholder}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                            required
                            disabled={isLoading}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                            {showConfirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Role */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{t.role}</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                        disabled={isLoading}
                    >
                        <option value="cashier">{t.cashier}</option>
                        <option value="manager">{t.manager}</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition duration-200 ease-in-out"
                >
                    {isLoading ? t.registering : t.register}
                </button>
            </form>
        </div>
    );
}
