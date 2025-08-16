"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isTokenValid } from "../lib/auth";

export function useProtectedRoute() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!isTokenValid(token)) {
            router.replace("/login");
        }
    }, [router]);
}
