"use client"

import { useEffect, useState } from "react";

import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/categoriaEspecifica/Hero";
import SearchBar from "@/components/categoriaEspecifica/SearchBar" 
import PrincipaisLojas from "@/components/categoriaEspecifica/PrincipaisLojas"
import StoreSection from "@/components/categoriaEspecifica/StoreSection"

type Store = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
}


export default function categoryPage() {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <main>
            <FeedNavbar />
            <Hero />

            <section className="bg-[#F6F3E4] min-h-screen py-4 pr-24">

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                
            </section>

            <PrincipaisLojas />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">


            </section>
            
        </main>
    )

}