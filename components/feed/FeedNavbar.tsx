"use client"

import { User, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Category = {
    id: number;
    name: string;
    parent_category_id: number | null;
}

export default function FeedNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false); 
    const router = useRouter();
    const [showCategories, setShowCategories] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        setMounted(true);

        const token = localStorage.getItem("token")
        setIsLoggedIn(!!token);


        async function loadCategories() {
            const response = await fetch("http://localhost:3001/category");

            if (!response.ok) return;

            const data = await response.json();

            const categoriasPrincipais = Array.isArray(data)
                ? data.filter((category: Category) => category.parent_category_id === null)
                : [];

            setCategories(categoriasPrincipais);
        }

        loadCategories();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/feed");
    };
    const handleIrParaMeuPerfil = () => {
        const token = localStorage.getItem("token");

        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const meuId = payload.sub; 
                router.push(`/usuario/${meuId}`);
            } catch (error) {
                handleLogout(); 
            }
        } else {
            router.push("/login");
        }
    };
    return (
        <nav className="bg-black text-white flex items-center justify-between sm:px-6 px-4 py-4">
            <Link href="/feed">
                <img src="/STOCK.IO.svg" alt="Logo Stock.io" className="sm:h-10 h-8 w-auto" />
            </Link>

            <div className="flex items-center gap-3 sm:gap-6 font-semibold text-xs sm:text-sm">
                <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="cursor-pointer">
                    <img src="/category.svg" className="h-5 sm:h-6 w-auto invert transition duration-200 hover:opacity-70"></img>
                </button>
                {showCategories && (
                    <div className="absolute right-40 top-10 bg-white rounded-lg shadow-lg min-w-[220px] z-50 max-h-[200px] overflow-y-auto">
                        {categories.map((category: any) => (
                            <Link
                                key={category.id}
                                href={`/categoria/${category.id}`}
                                className="block px-4 py-3 hover:bg-gray-100 text-[#6A38F3]"
                                onClick={() => setShowCategories(false)}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                )}
                {mounted && (
                    isLoggedIn ? (              
                        <>
                            <button 
                                onClick={handleIrParaMeuPerfil} 
                                className="cursor-pointer transition-colors hover:text-purple-600"
                            >
                                <User />
                            </button>
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
                                className="bg-purple-600 text-white px-3 sm:px-5 py-2 rounded-full transition-colors hover:bg-white hover:text-purple-600"
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