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

type Category = {
    id: number;
    name: string;
    parent_category_id: number | null;
};

export default function categoryPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = use(params);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [stores, setStores] = useState<Store[]>([]);
    const [nameCategory, setNameCategory] = useState("");

    const [subcategories, setSubcategories] = useState<Category[]>([]);
    const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<"" | "default" | "price" | "rating" | "recent">("");

    const produtosMelhoresAvaliados = [...products];

    const produtosRecemAdicionados = [...products].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    useEffect(() => {
        if (!id) return;

        async function loadData() {
            const categoriaRes = await fetch(`http://localhost:3001/category/${id}`);

            if (categoriaRes.ok) {
                const categoriaData = await categoriaRes.json();
                setNameCategory(categoriaData.name);
            }

            const categoriasRes = await fetch(`http://localhost:3001/category`);

            if (categoriasRes.ok) {
                const categoriasData: Category[] = await categoriasRes.json();

                const subcategoriaDaCategoria = categoriasData.filter (
                    (category) => category.parent_category_id === Number(id)
                );

                setSubcategories(subcategoriaDaCategoria);
            }

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


    const filteredProducts = selectedSubcategoryId
        ? products.filter (
            (product) => product.category_id === Number(selectedSubcategoryId)
        )
        : products;

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === "price") {
            return Number(a.price) - Number(b.price);
        }

        if (sortBy === "recent") {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }

        return 0;
    });


    return (
        <main>
            <FeedNavbar />
            <Hero />

            <section className="bg-[#F6F3E4] px-20 pt-10">
                <h1 className="font-bold text-black text-5xl text-center">
                    {nameCategory|| "Categoria"}
                </h1>
            </section>

            <div className="bg-[#F6F3E4]">
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            </div>

            <section className="bg-[#F6F3E4] px-20 pt-8 flex items-center gap-6">
                {subcategories.slice(0, 4).map((subcategory) => (
                    <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategoryId(String(subcategory.id))}
                    className={`cursor-pointer px-6 py-2 rounded-full text-xl ${
                        selectedSubcategoryId === String(subcategory.id)
                        ? "bg-[#6A38F3] text-white"
                        : "bg-white text-[#B99CFF]"
                    }`}
                    >
                    {subcategory.name}
                    </button>
                ))}

                {subcategories.length > 4 && (
                    <button
                        onClick={() => setSelectedSubcategoryId(null)}
                        className="cursor-pointer px-6 py-2 rounded-full text-xl bg-white text-[#B99CFF]"
                    >
                        Outros
                    </button>
                )}

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="cursor-pointer bg-white rounded-full py-2 px-30 text-[#B99CFF] ml-auto text-xl outline-none"
                >
                    <option value="" disabled>
                        Ordenar por
                    </option>
                    <option value="default">Padrão</option>
                    <option value="price">Preço</option>
                    <option value="rating">Avaliação</option>
                    <option value="recent">Mais recente</option>
                </select>
            </section>

            <section className="block w-full bg-[#F6F3E4] min-h-screen py-4">
                <GridePaginacao searchTerm={searchTerm} categoryId={id} selectedSubcategoryId={selectedSubcategoryId}
  sortBy={sortBy} />
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