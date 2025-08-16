'use client'

import UploadForm from "@/app/components/UploadForm";
import { Wand2 } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="grid place-items-center h-screen">
            <div className="p-10 border-2 border-amber-50 rounded-2xl">
                <h1 className="text-2xl font-bold mb-4 flex items-center">
                    <Wand2 size={20}  className="mr-3"/>
                    Aplicar efecto
                </h1>
                <UploadForm />
            </div>
        </div>
    );
}
