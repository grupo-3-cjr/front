"use client"

import { useState, useEffect } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  available: boolean;
  image_url: string;
  store_logo: string;
}

type GridePaginacaoProps = {
  categoryId: string;
  searchTerm: string;
};

const ITEMS_PER_PAGE = 15;

export default function ProductGrid({
  categoryId, searchTerm
}: GridePaginacaoProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const filteredProducts = products.filter((products) => 
    products.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    async function loadProducts() {
      const response = await fetch(`http://localhost:3001/produtos?categoria_id=${categoryId}`);
      if (!response.ok) {
        setProducts([]);
        return;
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    }
    loadProducts();
  }, [currentPage]);

  return (
    <div className="px-10 py-8">
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', padding: '32px 40px'}}>
        {filteredProducts.map((product) => (
          <div key={product.id} className="w-full h-[380px] bg-white rounded-[28px] relative overflow-hidden flex items-center justify-center flex-col">
            <div className="flex-1 flex items-center justify-center">
              <img src={product.image_url} alt={product.name} className="max-h-[180px] object-contain" />
            </div>
            <p className="font-bold text-lg">{product.name}</p>
            <p className="font-semibold">R${Number(product.price).toFixed(2)}</p>
            <p className={product.available ? "text-[#AACC00] text-sm font-semibold" : "text-red-500 text-sm font-semibold"}>
              {product.available ? "DISPONÍVEL" : "INDISPONÍVEL"}
            </p>
          </div>
        ))}
      </div>

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