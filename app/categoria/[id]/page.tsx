"use client"

import { useEffect, useState } from "react";

import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/categoriaEspecifica/Hero";
import SearchBar from "@/components/categoriaEspecifica/SearchBar" 
import PrincipaisLojas from "@/components/categoriaEspecifica/PrincipaisLojas"
import StoreSection from "@/components/categoriaEspecifica/StoreSection"
import GridePaginacao from "@/components/categoriaEspecifica/GridePaginacao"
import ProductsSection from "@/components/categoriaEspecifica/ProductsSection"

type Store = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
}

type Product = {
    id: number;
    store_id: number;
    category_id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
}


export default function categoryPage({ params }: { params: { id: string } }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const { id } = params;

    const produtosMelhoresAvaliados = [...products];

    const produtosRecemAdicionados = [...products].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    useEffect(() => {
        async function loadProducts() {
            const response = await fetch(
                `http://localhost:3001/produtos?search=${searchTerm}`
            );

            if (!response.ok) {
                setProducts([]);
                return;
            }

            const data = await response.json();

            setProducts(Array.isArray(data) ? data : []);
        }

        loadProducts();
    }, [searchTerm]);

    return (
        <main>
            <FeedNavbar />
            <Hero />

            <section className="block w-full bg-[#F6F3E4] min-h-screen py-4 ">
                <div>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>

                <GridePaginacao searchTerm={searchTerm} categoryId={params.id} />
                
            </section>

            <PrincipaisLojas />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">

                <ProductsSection
                    subtitle="melhores avaliados"
                    products={produtosMelhoresAvaliados}
                />

                <ProductsSection
                    subtitle="recém adicionados"
                    products={produtosRecemAdicionados}
                />

            </section>
            
        </main>
    )

}