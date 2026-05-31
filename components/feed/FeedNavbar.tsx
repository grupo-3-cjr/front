"use client"

import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";

export default function FeedNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [mounted, setMounted] = useState(false); 
    const router = useRouter();
    const [openEdit, setOpenEdit] = useState(false);
    const [openPassword, setOpenPassword] = useState(false);

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
            {/* Link para voltar a página feed */}
            <Link href="/feed">
                <img src="/STOCK.IO.svg" alt="Logo Stock.io" className="h-10 w-auto" />
            </Link>

            <div className="flex items-center gap-6 font-semibold text-sm">
                {/* logica do logado e deslogado*/}
                {mounted && (
                    isLoggedIn ? (              
                        <>
                            {/* logo User */}
                            <button 
                            onClick={() => setOpenEdit(true)}
                             className="transition-colors hover:text-purple-600">
                                <User />
                            </button>
                            
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
            <EditProfileModal
            isOpen= {openEdit}
            onClose={() => setOpenEdit(false)}
            onChangePassword={()=> {
                setOpenEdit(false);
                setOpenPassword(true);
            }}
            />

            <ChangePasswordModal
            isOpen = {openPassword}
            onClose={() => setOpenPassword(false)}
            onBack={() => {
                setOpenPassword(false);
                setOpenEdit(true);
            }}
            />
        </nav>
    );

}