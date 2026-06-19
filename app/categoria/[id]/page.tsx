"use client"

import { useEffect, useState, use } from "react";

import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/categoriaEspecifica/Hero";
import SearchBar from "@/components/categoriaEspecifica/SearchBar" 
import PrincipaisLojas from "@/components/categoriaEspecifica/PrincipaisLojas"
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
    image_url: string;
    store: { logo_url: string };
}

export default function categoryPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);

    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [stores, setStores] = useState<Store[]>([]);

    const produtosMelhoresAvaliados = [...products];

    const produtosRecemAdicionados = [...products].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    useEffect(() => {
        if (!id) return;

        async function loadData() {
            const lojasRes = await fetch(`http://localhost:3001/store?categoria_id=${id}`);
            if (!lojasRes.ok) { setStores([]); setProducts([]); return; }

            const lojasData: Store[] = await lojasRes.json();
            setStores(Array.isArray(lojasData) ? lojasData : []);

            const produtosResults = await Promise.all(
                lojasData.map(loja =>
                    fetch(`http://localhost:3001/produtos?store_id=${loja.id}&search=${searchTerm}`)
                        .then(r => r.ok ? r.json() : [])
                        .then(d => Array.isArray(d) ? d.map((p: any) => ({
                            ...p,
                            image_url: p.productImage?.[0]?.image_url || null
                        })) : [])
                )
            );

            setProducts(produtosResults.flat());
        }

        loadData();
    }, [id, searchTerm]);

    return (
        <main>
            <FeedNavbar />
            <Hero />

            <section className="block w-full bg-[#F6F3E4] min-h-screen py-4">
                <div>
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
                </div>

                <GridePaginacao searchTerm={searchTerm} categoryId={id} />
            </section>

            <PrincipaisLojas stores={stores}/>

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
                <ProductsSection
                    subtitle="Mais Populares"
                    products={produtosMelhoresAvaliados}
                />

                <ProductsSection
                    subtitle="Recém adicionados"
                    products={produtosRecemAdicionados}
                />
            </section>
        </main>
    )
}