import { User, LogOut } from "lucide-react";
import Image from "next/image";

export default function FeedNavbar() {
    return (
        <nav className="bg-black text-white flex items-center justify-between px-6 py-4">
            <Image className="flex items-center" width={100} height={40} src="/STOCK.IO.svg" alt="Logo do site" />

            <div className="flex gap-6 text-xl">
                <span><User className="text-white" /></span>
                <span><LogOut className="text-white" /></span>
            </div>
        </nav>
    )
}