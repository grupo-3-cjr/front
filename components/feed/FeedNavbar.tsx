"use client"

import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation"; // 1. Importado usePathname

export default function FeedNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // 2. Instanciado o usePathname

    useEffect(() => {
        setMounted(true); 
        
        // 3. Criada uma função para verificar o token
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        checkAuth();

        // (Opcional, mas recomendado) Escuta se o localStorage mudou em outra aba
        window.addEventListener("storage", checkAuth);

        return () => window.removeEventListener("storage", checkAuth);
        
    }, [pathname]); // 4. Colocado o pathname como dependência!

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/feed");
    };

    return (
        <nav className="bg-black text-white flex items-center justify-between px-6 py-4">
            {/* Link para voltar a página feed */}
            <Link href="/feed">
                <Image className="flex items-center" width={100} height={40} src="/STOCK.IO.svg" alt="Logo do site" />
            </Link>
            
            <div className="flex items-center gap-6 font-semibold text-sm">
                {/* logica do logado e deslogado*/}
                {mounted && (
                    isLoggedIn ? (              
                        <>
                            {/* logo User */}
                            <Link href="/perfil" className="transition-colors hover:text-purple-600">
                                <User />
                            </Link>

                            {/* deslogar */}
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