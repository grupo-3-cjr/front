import { User, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function FeedNavbar({ isLoggedIn = false }: { isLoggedIn?: boolean }) {

    return (
        <nav className="bg-black text-white flex items-center justify-between px-6 py-4">
           {/*Link para voltar a página feed */}
           <Link href="/feed">
               <Image className="flex items-center" width={100} height={40} src="/STOCK.IO.svg" alt="Logo do site" />
           </Link>
           
           <div className="flex items-center gap-6 font-semibold text-sm">

                {/*Logado*/}
                {isLoggedIn ? (               
                    <>
                        <span><User className="text-white" /></span>
                         <span><LogOut className="text-white" /></span>
                    </>
                ) : (   //  Não logado
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
               )}

            </div>
        </nav>
    )
}