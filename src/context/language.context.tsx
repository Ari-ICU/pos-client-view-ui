'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'kh';

interface LanguageContextType {
    language: Language;
    switchLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('en');

    // Load language from localStorage on mount
    useEffect(() => {
        const storedLang = localStorage.getItem('language') as Language;
        if (storedLang) {
            setLanguageState(storedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('language', lang); // persist selection
    };

    const switchLanguage = () => {
        const newLang = language === 'en' ? 'kh' : 'en';
        setLanguage(newLang);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Hook for easier access
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
