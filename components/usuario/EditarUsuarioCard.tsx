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
        position: "absolute",
        top: "300px",
        left: "1550px",
        backgroundColor: "#6c3cff",
        color: "white",
        border: "none",
        borderRadius: "50px",
        padding: "10px 90px",
        fontSize: "15px",
        cursor: "pointer"
        }}>
        Editar Perfil
    </button>
    )
}