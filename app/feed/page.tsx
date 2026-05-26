"use client"

import { useEffect, useState } from "react";

import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/feed/Hero";
import SearchBar from "@/components/feed/SearchBar"
import CategoryList from "@/components/feed/CategoryList"
import ProductsSection from "@/components/feed/ProductsSection"
import StoreSection from "@/components/feed/StoreSection"

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

export default function FeedPage() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        async function loadProducts() {
            const response = await fetch("http://localhost:3001/produtos");
            const data = await response.json();

            setProducts(data);
        }

        loadProducts();
    }, []);

    return (
        <main>
            <FeedNavbar/>
            <Hero />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
                <SearchBar />
                <CategoryList />
                <ProductsSection
                    subtitle="melhores avaliados"
                    products={products}
                />
                <ProductsSection
                    subtitle="mais baratos"
                    products={products}
                />
                <ProductsSection
                    subtitle="recém adicionados"
                    products={products}
                />
                <StoreSection />
            </section>
        </main>
    );
}