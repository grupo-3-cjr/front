"use client"

import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FeedNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false); 
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/feed");
    };

    return (
        <button style={{
        backgroundColor: "#6c3cff",
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "10px 40px",
        fontSize: "clamp(13px, 1.5vw, 15px)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        width: "clamp(160px, 20vw, 220px)",
        }}>
        Editar Perfil
        </button>
    )
}