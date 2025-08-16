"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Image, Wand2, LogOut } from "lucide-react";

export default function Sidebar() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    return (
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
            <div className="p-6 text-4xl font-bold border-b border-gray-700">
                INBest
            </div>
            <nav className="flex-1 p-4 space-y-2">
                <Link 
                    href="/dashboard" 
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 hover:cursor-pointer"
                >
                    <Wand2 size={20} />
                    <span className="font-bold">Aplicar efectos</span>
                </Link>
                <Link 
                    href="/dashboard/images" 
                    className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700 hover:cursor-pointer"
                >
                    <Image size={20} />
                    <span className="font-bold">Historial de imágenes</span>
                </Link>
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-red-600 hover:cursor-pointer"
                >
                    <LogOut size={20} />
                    <span className="font-bold">Cerrar sesión</span>
                </button>
            </nav>
        </aside>
    );
}
