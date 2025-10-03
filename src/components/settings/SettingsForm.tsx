"use client";

import { useLanguage } from "@/context/language.context";
import { useSettings } from "@/context/settings.context";

export default function SettingsForm() {
    const { language } = useLanguage();
    const { settings, updateSettings } = useSettings();

    const handleSave = () => {
        alert(language === "en" ? "Settings saved!" : "ការកំណត់បានរក្សាទុក!");
    };

    return (
        <form className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-medium text-gray-700">
                    {language === "en" ? "Profile Settings" : "ការកំណត់ប្រូហ្វាយ"}
                </h2>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        {language === "en" ? "Username" : "ឈ្មោះប្រើប្រាស់"}
                    </label>
                    <input
                        type="text"
                        value={settings.username}
                        onChange={(e) => updateSettings({ username: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        {language === "en" ? "Email" : "អ៊ីមែល"}
                    </label>
                    <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSettings({ email: e.target.value })}
                        className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* App Preferences */}
            <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
                <h2 className="text-lg font-medium text-gray-700">
                    {language === "en" ? "App Preferences" : "ចំណូលចិត្តកម្មវិធី"}
                </h2>

                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={(e) => updateSettings({ notifications: e.target.checked })}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        id="notifications"
                    />
                    <label htmlFor="notifications" className="text-sm text-gray-600">
                        {language === "en" ? "Enable notifications" : "បើកការជូនដំណឹង"}
                    </label>
                </div>
            </div>

            {/* Save Button */}
            <div>
                <button
                    type="button"
                    onClick={handleSave}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {language === "en" ? "Save Settings" : "រក្សាទុកការកំណត់"}
                </button>
            </div>
        </form>
    );
}
