"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  image_url: string;
  store_logo: string;
}

type GridePaginacaoProps = {
  categoryId: string;
  searchTerm: string;
};

const ITEMS_PER_PAGE = 15;

export default function ProductGrid({ categoryId, searchTerm }: GridePaginacaoProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    async function loadProducts() {
      const lojasRes = await fetch(`http://localhost:3001/store?categoria_id=${categoryId}`);
      if (!lojasRes.ok) { setProducts([]); return; }

      const lojas = await lojasRes.json();
      if (!Array.isArray(lojas) || lojas.length === 0) { setProducts([]); return; }

      const resultados = await Promise.all(
        lojas.map((loja: { id: number }) =>
          fetch(`http://localhost:3001/produtos?store_id=${loja.id}`)
            .then(r => r.ok ? r.json() : [])
            .then(d => Array.isArray(d) ? d.map((p: any) => ({
              ...p,
              image_url: p.productImage?.[0]?.image_url || null
            })) : [])
        )
      );

      const total = resultados.flat();
      setProducts(total);
      setTotalPages(Math.ceil(total.length / ITEMS_PER_PAGE));
    }

    loadProducts();
  }, [categoryId]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="px-10 py-8">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', padding: '32px 40px' }}>
        {paginatedProducts.map((product) => (
          <Link href={`/produto/${product.id}`} key={product.id}>
            <div className="w-full h-[380px] bg-white rounded-[28px] relative overflow-hidden flex items-center justify-center flex-col">
              <div className="h-[100px] flex items-center justify-center">
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  style={{ width: '250px', height: '250px', objectFit: 'contain' }} 
                />
              </div>
              <p className="font-bold text-lg">{product.name}</p>
              <p className="font-semibold">R${Number(product.price).toFixed(2)}</p>
              <p style={{ color: Number(product.stock) > 0 ? '#4ecc00' : '#ee0e0e' }}>
                {Number(product.stock) > 0 ? "DISPONÍVEL" : "INDISPONÍVEL"}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-center gap-10 mt-10 text-4xl font-bold">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="disabled:opacity-30"
          style={{ color: currentPage === 1 ? '#000000' : '#bdbdbd' }}
        >{"<"}</button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            style={{ color: currentPage === page ? '#000000' : '#bdbdbd' }}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="disabled:opacity-30"
          style={{ color: currentPage === totalPages ? '#000000' : '#bdbdbd' }}
        >{">"}</button>
      </div>
    </div>
  );
}