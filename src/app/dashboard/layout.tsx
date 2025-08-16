'use client'

import Sidebar from "@/app/components/Sidebar";
import { useProtectedRoute } from "../../../hooks/useProtectedRoute";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    useProtectedRoute();

    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <main className="flex-1 p-6">
                {children}
            </main>
        </div>
    );
}
