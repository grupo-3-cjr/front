"use client"

import { User, LogOut } from "lucide-react";
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
        <nav className="bg-black text-white flex items-center justify-between px-6 py-4">
            <Link href="/feed">
                <img src="/STOCK.IO.svg" alt="Logo Stock.io" className="h-10 w-auto" />
            </Link>

            <div className="flex items-center gap-6 font-semibold text-sm">
                <Link href="" className="transition-colors hover:text-purple-600">
                    <img src="/category.svg" className="h-6 w-auto invert transition duration-200 hover:opacity-70"></img>
                </Link>
                {mounted && (
                    isLoggedIn ? (              
                        <>
                            <Link href="/usuario" className="transition-colors hover:text-purple-600">
                                <User />
                            </Link>
                            <button
                                className="group cursor-pointer transition-colors hover:text-red-600"
                                onClick={handleLogout}
                            >
                                <LogOut/>
                            </button>
                        </>
                    ) : (  
                        <>
                            <Link href="/login" className="transition-colors hover:text-purple-600">
                                LOGIN
                            </Link>
                            <Link
                                href="/cadastro"
                                className="bg-purple-600 text-white px-5 py-2 rounded-full transition-colors hover:bg-white hover:text-purple-600"
                            >
                                CADASTRE-SE
                            </Link>
                        </>
                    )
                )}
            </div>
        </nav>
    );
}