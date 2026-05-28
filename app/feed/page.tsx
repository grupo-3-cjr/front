"use client"

import { useEffect, useState } from "react";

import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/feed/Hero";
import SearchBar from "@/components/feed/SearchBar"
import CategoryList from "@/components/feed/CategoryList"
import ProductsSection from "@/components/feed/ProductsSection"
import StoreSection from "@/components/feed/StoreSection"

export default function FeedPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        async function loadCategories() {
            const response = await fetch("http://localhost:3001/category")
            const data = await response.json();

            setCategories(data);
        }
      
        async function loadProducts() {
            const response = await fetch("http://localhost:3001/produtos");
            const data = await response.json();

            setProducts(data);
        }

        loadProducts();
        loadCategories();
    }, []);

    const filteredCategories = categories.filter((category) => 
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main>
            <FeedNavbar/>

            <Hero />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <CategoryList categories={filteredCategories} />

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