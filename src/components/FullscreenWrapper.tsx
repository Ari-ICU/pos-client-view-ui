"use client";

import { useEffect } from "react";

export default function FullscreenWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        if (document.documentElement.requestFullscreen && "displayMode" in navigator) {
            if (navigator.displayMode === "fullscreen" || navigator.displayMode === "standalone") {
                document.documentElement.requestFullscreen().catch((err) => {
                    console.log(`Error entering fullscreen: ${err.message}`);
                });
            }
        }
    }, []);

    return <>{children}</>;
}