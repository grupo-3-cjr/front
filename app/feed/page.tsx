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

type Store = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
}

const melhoresAvaliados = [
    {
        name: "Brownie",
        image: "/brownie.jpg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Bola",
        image: "/bola.jpeg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Quadro",
        image: "/quadro.jpeg",
        storeLogo: "/globe.svg"
    },
];

const maisBaratos = [
    {
        name: "Brownie",
        image: "/brownie.jpg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Bola",
        image: "/bola.jpeg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Quadro",
        image: "/quadro.jpeg",
        storeLogo: "/globe.svg"
    },
];

const recemAdicionados = [
    {
        name: "Brownie",
        image: "/brownie.jpg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Bola",
        image: "/bola.jpeg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Quadro",
        image: "/quadro.jpeg",
        storeLogo: "/globe.svg"
    },
];

export default function FeedPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [stores, setStores] = useState<Store[]>([]);

    useEffect(() => {
        async function loadCategories() {
            const response = await fetch("http://localhost:3001/category")
            const data = await response.json();

            setCategories(data);
        }

        async function loadStores() {
            const response = await fetch("http://localhost:3001/store")
            const data = await response.json();

            setStores(data);
        }

        loadCategories();
        loadStores();
    }, [])

    return (
        <main>
            <FeedNavbar/>

            <Hero />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
                <SearchBar />

                <CategoryList categories={categories} />

                <ProductsSection
                    subtitle="melhores avaliados"
                    products={melhoresAvaliados}
                />
                <ProductsSection
                    subtitle="mais baratos"
                    products={maisBaratos}
                />
                <ProductsSection
                    subtitle="recém adicionados"
                    products={recemAdicionados}
                />
                <StoreSection stores={stores} />
            </section>
        </main>
    );
}