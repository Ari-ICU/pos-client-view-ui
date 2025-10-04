'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { X } from 'lucide-react';
import QRCode from 'react-qr-code';
import { useLanguage } from '@/context/language.context';

interface CheckoutModalProps {
    total: number;
    onClose: () => void;
    name?: string;
    txId?: string;
}

const translations = {
    en: {
        payWithKHQR: 'Pay with KHQR',
        waiting: 'Waiting for payment...',
        paymentReceived: 'Payment received!',
        close: 'Close',
    },
    kh: {
        payWithKHQR: 'បង់ប្រាក់ដោយ KHQR',
        waiting: 'កំពុងរង់ចាំការបង់ប្រាក់...',
        paymentReceived: 'បានទទួលការបង់ប្រាក់!',
        close: 'បិទ',
    },
};

// Generate KHQR payload (real-world format may vary)
const generateKHQRPayload = (amount: number, txId?: string) => {
    return `KHQR://pay?amount=${amount.toFixed(2)}${txId ? `&txId=${encodeURIComponent(txId)}` : ''}`;
};

// Mock payment check – replace with real API in production
const checkPaymentStatus = async (txId: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    // In real app: return fetch(`/api/payment-status/${txId}`);
    return { status: Math.random() > 0.7 ? 'paid' : 'pending' } as const;
};

export default function CheckoutModal({
    total,
    onClose,
    name = 'Thoeun Ratha',
    txId = 'TX' + Date.now().toString(36).toUpperCase(),
}: CheckoutModalProps) {
    const { language } = useLanguage();
    const t = translations[language];
    const [status, setStatus] = useState<'idle' | 'pending' | 'paid' | 'error'>('pending');
    const [showSuccess, setShowSuccess] = useState(false);

    // Handle payment polling
    const pollPaymentStatus = useCallback(async () => {
        if (!txId) return;

        try {
            const result = await checkPaymentStatus(txId);
            if (result.status === 'paid') {
                setStatus('paid');
                setShowSuccess(true);
                setTimeout(() => {
                    onClose();
                }, 1500);
            }
        } catch (err) {
            console.error('Payment check failed:', err);
            setStatus('error');
        }
    }, [txId, onClose]);

    // Start polling on mount
    useEffect(() => {
        if (status !== 'pending') return;

        const interval = window.setInterval(pollPaymentStatus, 3000);
        pollPaymentStatus(); // check immediately

        return () => clearInterval(interval);
    }, [status, pollPaymentStatus]);

    const handleClose = () => {
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-xs sm:max-w-sm flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-red-600 px-5 py-4 flex justify-between items-center">
                    <span className="text-white font-bold text-lg tracking-wide">KHQR</span>
                    <button
                        onClick={handleClose}
                        className="text-white hover:text-red-100 transition-colors"
                        aria-label={t.close}
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col items-center">
                    <div className="text-center mb-4">
                        <p className="text-gray-800 font-medium">{name}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">${total.toFixed(2)}</p>
                    </div>

                    {/* QR Code Container */}
                    <div className="bg-gray-50 p-4 rounded-xl mb-4">
                        <QRCode
                            value={generateKHQRPayload(total, txId)}
                            size={200}
                            bgColor="#f9fafb"
                            fgColor="#1f2937"
                            className="rounded-lg"
                        />
                    </div>

                    <p className="text-gray-700 font-medium mb-2">{t.payWithKHQR}</p>

                    {/* Status Indicator */}
                    {status === 'paid' && showSuccess && (
                        <div className="mt-3 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium animate-pulse">
                            {t.paymentReceived}
                        </div>
                    )}

                    {status === 'pending' && (
                        <p className="mt-2 text-sm text-gray-500 flex items-center gap-1.5">
                            <span className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></span>
                            {t.waiting}
                        </p>
                    )}

                    {status === 'error' && (
                        <p className="mt-2 text-sm text-red-600">Failed to verify payment</p>
                    )}
                </div>
            </div>
        </div>
    );
}