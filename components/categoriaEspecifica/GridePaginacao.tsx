"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/categoriaEspecifica/ProductCard";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: number;
  createdAt: string;
  storeLogo: string;
};

type GridePaginacaoProps = {
  categoryId: string;
  searchTerm: string;
  selectedSubcategoryId: string | null;
  sortBy: "default" | "price" | "rating" | "recent";
};

const ITEMS_PER_PAGE = 15;

export default function ProductGrid({
  categoryId,
  searchTerm,
  selectedSubcategoryId,
  sortBy,
}: GridePaginacaoProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) =>
      selectedSubcategoryId
        ? p.category_id === Number(selectedSubcategoryId)
        : true
    );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") {
      return Number(a.price) - Number(b.price);
    }

    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }

    return 0;
  });

  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    async function loadProducts() {
      const lojasRes = await fetch(
        `http://localhost:3001/store?categoria_id=${categoryId}`
      );

      if (!lojasRes.ok) {
        setProducts([]);
        return;
      }

      const lojas = await lojasRes.json();

      if (!Array.isArray(lojas) || lojas.length === 0) {
        setProducts([]);
        return;
      }

      const resultados = await Promise.all(
        lojas.map((loja: { id: number }) =>
          fetch(`http://localhost:3001/produtos?store_id=${loja.id}`)
            .then((r) => (r.ok ? r.json() : []))
            .then((d) =>
              Array.isArray(d)
                ? d.map((p: any) => ({
                    ...p,
                    image_url: p.productImage?.[0]?.image_url || null,
                    storeLogo: p.store?.logo_url || "/globe.svg",
                  }))
                : []
            )
        )
      );

      const total = resultados.flat();

      setProducts(total);
      setTotalPages(Math.ceil(total.length / ITEMS_PER_PAGE));
    }

    loadProducts();
  }, [categoryId]);

  useEffect(() => {
    setTotalPages(Math.ceil(sortedProducts.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [searchTerm, selectedSubcategoryId, sortBy, products]);

  return (
    <div className="px-10 py-8 bg-[#F6F3E4] text-black dark:bg-[#050505] dark:text-white">
      <div className="grid grid-cols-5 gap-4 px-10 py-8">
        {paginatedProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description=""
            price={String(product.price)}
            image_url={product.image_url}
            storeLogo={product.storeLogo}
            available={Number(product.stock) > 0}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-10 mt-10 text-4xl font-bold">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="cursor-pointer text-[#bdbdbd] disabled:text-black disabled:opacity-30 dark:text-gray-400 dark:disabled:text-white"
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`cursor-pointer transition ${
              currentPage === page
                ? "text-black dark:text-white"
                : "text-[#bdbdbd] dark:text-gray-500 hover:text-[#6A38F3] dark:hover:text-[#B99CFF]"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="cursor-pointer text-[#bdbdbd] disabled:text-black disabled:opacity-30 dark:text-gray-400 dark:disabled:text-white"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}