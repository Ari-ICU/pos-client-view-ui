"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "rounded-xl border bg-white text-gray-800 shadow-sm",
                className
            )}
            {...props}
        />
    );
}

export function CardContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("p-4", className)} {...props} />
    );
}
