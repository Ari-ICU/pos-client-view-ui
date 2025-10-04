"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface Settings {
    username: string;
    email: string;
    notifications: boolean;
}

interface SettingsContextType {
    settings: Settings;
    updateSettings: (newSettings: Partial<Settings>) => void;
}

const defaultSettings: Settings = {
    username: "",
    email: "",
    notifications: true,
};

const SettingsContext = createContext<SettingsContextType>({
    settings: defaultSettings,
    updateSettings: () => { },
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("appSettings");
            return saved ? JSON.parse(saved) : defaultSettings;
        }
        return defaultSettings;
    });

    const updateSettings = (newSettings: Partial<Settings>) => {
        setSettings((prev) => {
            const updated = { ...prev, ...newSettings };
            localStorage.setItem("appSettings", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
