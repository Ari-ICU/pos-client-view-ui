"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Globe } from "lucide-react";
import Message from "@/components/Message";
import { useLanguage } from "@/context/language.context";

export default function LoginForm() {
    const { language, switchLanguage } = useLanguage();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const text = {
        en: {
            welcome: "Welcome Back 👋",
            signIn: "Sign in to your POS Dashboard",
            email: "Email Address",
            emailPlaceholder: "manager@example.com",
            password: "Password",
            passwordPlaceholder: "••••••••",
            forgotPassword: "Forgot password?",
            signInBtn: "Sign In",
            needAccount: "Need an account?",
            createAccount: "Create an account",
            errorEmpty: "Please enter your email and password to sign in.",
        },
        kh: {
            welcome: "ស្វាគមន៍ត្រឡប់មកវិញ 👋",
            signIn: "ចូលទៅកាន់ផ្ទាំងគ្រប់គ្រង POS របស់អ្នក",
            email: "អាសយដ្ឋានអ៊ីមែល",
            emailPlaceholder: "manager@example.com",
            password: "ពាក្យសម្ងាត់",
            passwordPlaceholder: "••••••••",
            forgotPassword: "ភ្លេចពាក្យសម្ងាត់?",
            signInBtn: "ចូល",
            needAccount: "ត្រូវការគណនីមែនទេ?",
            createAccount: "បង្កើតគណនី",
            errorEmpty: "សូមបញ្ចូលអ៊ីមែល និងពាក្យសម្ងាត់របស់អ្នកដើម្បីចូល។",
        },
    };

    const t = text[language];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError(t.errorEmpty);
            return;
        }
        setError("");
        console.log("Login submitted:", { email, password });
        // TODO: Call login API
    };

    return (
        <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl p-8 transform transition-all hover:shadow-3xl relative">
            {/* Language Switch */}
            <button
                type="button"
                onClick={switchLanguage}
                className="absolute top-4 right-4 flex items-center space-x-1 px-2 py-1 border rounded-lg border-gray-300 text-gray-600 hover:text-gray-800 focus:outline-none"
            >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
            </button>

            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 text-center">{t.welcome}</h1>
            <p className="text-center text-gray-500 mb-8">{t.signIn}</p>

            {error && <Message type="error" text={error} />}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-gray-600">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">{t.email}</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t.emailPlaceholder}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                        autoComplete="username"
                        required
                    />
                </div>

                <div className="text-gray-600">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">{t.password}</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t.passwordPlaceholder}
                            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                            autoComplete="current-password"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-end">
                    <Link href="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                        {t.forgotPassword}
                    </Link>
                </div>

                <button type="submit" className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {t.signInBtn}
                </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
                {t.needAccount}{" "}
                <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition duration-150 ease-in-out">
                    {t.createAccount}
                </Link>
            </p>
        </div>
    );
}
