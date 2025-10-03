"use client";


interface SettingsHeaderProps {
    title: string;
    description?: string;
}

export default function SettingsHeader({ title, description }: SettingsHeaderProps) {

    return (
        <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">
                {title}
            </h1>
            {description && (
                <p className="text-gray-500 text-sm mt-1">
                    {description}
                </p>
            )}
        </div>
    );
}
