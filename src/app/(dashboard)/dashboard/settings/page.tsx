"use client";

import SettingsHeader from "@/components/settings/SettingsHeader";
import SettingsForm from "@/components/settings/SettingsForm";

export default function SettingsPage() {
    return (
        <div className="sm:p-6 p-2 space-y-6">
            <SettingsHeader
                title="Settings"
                description="Update your profile information and application preferences."
            />

            <SettingsForm />
        </div>
    );
}
