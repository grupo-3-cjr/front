"use client"

import { useEffect, useState } from "react";

import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/categoriaEspecifica/Hero";
import SearchBar from "@/components/categoriaEspecifica/SearchBar" 

export default function categoryPage() {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <main>
            <FeedNavbar />
            <Hero />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">

                  <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                
            </section>
        </main>
    )

}