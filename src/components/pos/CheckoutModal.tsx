'use client';

import React, { useEffect, useState } from 'react';
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
    en: { payWithKHQR: 'Pay with KHQR' },
    kh: { payWithKHQR: 'បង់ប្រាក់ដោយ KHQR' },
};

// Example KHQR payload generator
const generateKHQRPayload = (amount: number, txId?: string) => {
    return `KHQR://pay?amount=${amount.toFixed(2)}${txId ? `&txId=${txId}` : ''}`;
};

// Mock payment check function
const checkPaymentStatus = async (txId: string) => {
    return new Promise<{ status: 'pending' | 'paid' }>((resolve) => {
        setTimeout(() => resolve({ status: 'paid' }), 10000);
    });
};

export default function CheckoutModal({ total, onClose, name = 'thoeun ratha', txId = '12345' }: CheckoutModalProps) {
    const { language } = useLanguage();
    const t = translations[language];
    const [status, setStatus] = useState<'pending' | 'paid'>('pending');

    useEffect(() => {
        let interval: number;

        if (status === 'pending') {
            interval = window.setInterval(async () => {
                const result = await checkPaymentStatus(txId);
                if (result.status === 'paid') {
                    setStatus('paid');
                    clearInterval(interval);
                    onClose(); // auto-close modal when payment is done
                }
            }, 3000); // check every 3 seconds
        }

        return () => clearInterval(interval);
    }, [status, txId, onClose]);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden w-80 flex flex-col items-center">
                {/* Red header */}
                <div className="bg-red-600 w-full p-4 flex justify-between items-center">
                    <span className="text-white font-bold text-lg">KHQR</span>
                    <button onClick={onClose} className="text-white hover:text-gray-200">
                        <X size={20} />
                    </button>
                </div>

                {/* Info */}
                <div className="w-full p-4 flex flex-col items-center">
                    <p className="text-black font-medium text-center">{name}</p>
                    <p className="text-2xl text-gray-700 font-bold my-2">${total.toFixed(2)}</p>
                    <div className="bg-white p-4 rounded shadow">
                        <QRCode value={generateKHQRPayload(total, txId)} size={180} />
                    </div>
                    <p className="mt-4 text-gray-700 font-medium">{t.payWithKHQR}</p>
                    {status === 'pending' && <p className="mt-2 text-sm text-gray-500">Waiting for payment...</p>}
                </div>
            </div>
        </div>
    );
}
