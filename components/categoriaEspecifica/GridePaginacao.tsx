"use client"

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  image_url: string;
  store_logo: string;
}

const ITEMS_PER_PAGE = 15;

const mockProducts: Product[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: "Produto " + (i + 1),
  price: 999.99,
  available: i % 3 !== 1,
  image_url: "",
  store_logo: "",
}));

export default function ProductGrid() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(mockProducts.length / ITEMS_PER_PAGE);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = mockProducts.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="px-10 py-8">
      {/* Grid */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px'}} className="px-10 py-8">
        {currentProducts.map((product) => (
            <div key={product.id} className="w-full h-[280px] bg-white rounded-[28px] relative overflow-hidden flex items-center justify-center flex-col">
            <div className="flex-1 flex items-center justify-center">
                <img src={product.image_url} alt={product.name} className="max-h-[180px] object-contain" />
            </div>
            <p className="font-bold text-lg">{product.name}</p>
            <p className="font-semibold">R${product.price.toFixed(2)}</p>
            <p className={product.available ? "text-[#AACC00] text-sm font-semibold" : "text-red-500 text-sm font-semibold"}>
                {product.available ? "DISPONÍVEL" : "INDISPONÍVEL"}
            </p>
            </div>
        ))}
        </div>

      {/* Paginação */}
      <div className="flex items-center justify-center gap-4 mt-10 text-xl font-bold">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-30"
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "text-black" : "text-gray-400"}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-30"
        >
          {">"}
        </button>
      </div>
    </div>
  );
}