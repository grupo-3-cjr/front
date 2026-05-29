"use client"

import { useEffect, useState } from "react";

import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/feed/Hero";
import SearchBar from "@/components/feed/SearchBar"
import CategoryList from "@/components/feed/CategoryList"
import ProductsSection from "@/components/feed/ProductsSection"
import StoreSection from "@/components/feed/StoreSection"

type Category = {
    id: number;
    name: string;
    parent_category_id: number | null;
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

type Store = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
}

export default function FeedPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function loadCategories() {
            const response = await fetch(
                `http://localhost:3001/category?search=${searchTerm}`
            );
            const data = await response.json();

            setCategories(data);
        }
      
        async function loadProducts() {
            const response = await fetch(
                `http://localhost:3001/produtos?search=${searchTerm}`
            );
            const data = await response.json();

            setProducts(data);
        }

        async function loadStores() {
            const response = await fetch(
                `http://localhost:3001/store?search=${searchTerm}`
            );
            const data = await response.json();

            setStores(data);
        }

        loadProducts();
        loadCategories();
        loadStores();
    }, [searchTerm]);

    const produtosMelhoresAvaliados = [...products];

    const produtosMaisBaratos = [...products].sort(
        (a, b) => Number(a.price) - Number(b.price)
    );

    const produtosRecemAdicionados = [...products].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
        <main>
            <FeedNavbar/>

            <Hero />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
                
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <CategoryList categories={categories} />

                <ProductsSection
                    subtitle="melhores avaliados"
                    products={produtosMelhoresAvaliados}
                />

                <ProductsSection
                    subtitle="mais baratos"
                    products={produtosMaisBaratos}
                />

                <ProductsSection
                    subtitle="recém adicionados"
                    products={produtosRecemAdicionados}
                />

                <StoreSection stores={stores} />

            </section>
        </main>
    );
}