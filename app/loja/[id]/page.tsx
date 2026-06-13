"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FeedNavbar from "@/components/feed/FeedNavbar";
import RatingCard from "@/components/produtoEspecifico/RatingCard";
import CreateProductModal from '@/components/produtoEspecifico/createProductModal'
import api from "@/app/services/api";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import EditarLoja from "@/components/loja/EditarLojaModal";
import EditProductModal from "@/components/produtoEspecifico/editProductModal";

// Tipos
type Store = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  logo_url: string;
  banner_url: string;
  category_id: number;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  productImage: { image_url: string }[];
};

type Rating = {
  id: number;
  user: { name: string; profile_picture_url: string };
  rating: number;
  comment: string;
  user_id: number;
};

const PRODUCTS_PER_PAGE = 15;

export default function LojaPage() {
  const params = useParams();
  const storeId = Number(params.id);

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const isOwner = userId !== null && store !== null && userId === store.user_id;

  // Pega o userId do token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(Number(payload.sub));
    }
  }, []);

  // Busca dados da loja, produtos e avaliações
  useEffect(() => {
    if (!storeId) return;

    const fetchData = async () => {
      try {
        const [storeRes, productsRes] = await Promise.all([
          api.get(`/store/${storeId}`),
          api.get(`/produtos?store_id=${storeId}`),
        ]);
        setStore(storeRes.data);
        setProducts(productsRes.data);

        const ratingsRes = await api.get(`/store-ratings`);
        const storeRatings = ratingsRes.data.filter((r: any) => r.store_id === storeId);
        setRatings(storeRatings);

        // Busca categoria
        const categoryRes = await api.get(`/category/${storeRes.data.category_id}`);
        setCategoryName(categoryRes.data.name);

        // Busca dono
        const ownerRes = await api.get(`/user/${storeRes.data.user_id}`);
        setOwnerName(ownerRes.data.name);

        // TODO: buscar ratings quando rota estiver disponível
        // const ratingsRes = await api.get(`/store/${storeId}/ratings`);
        // setRatings(ratingsRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados da loja", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  // Paginação
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  // Média das avaliações
  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length).toFixed(2)
      : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3E4]">
        <span className="text-black text-xl">Carregando...</span>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3E4]">
        <span className="text-black text-xl">Loja não encontrada.</span>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-[#F6F3E4]">
      <FeedNavbar />

      {/* HERO / BANNER */}
      <div className="relative w-full h-[420px] bg-black overflow-hidden">
        {store.banner_url ? (
          <img
            src={store.banner_url}
            alt="Banner da loja"
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-gray-800 to-black" />
        )}

        {/* Botões do dono */}
      {isOwner && (
              <div className="absolute top-16 right-16 flex flex-col gap-3 z-20">
              <button
              onClick={() => setIsEditModalOpen(true)}
              className="w-12 h-12 bg-[#6A38F3] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg"
            >
              <Pencil className="w-8 h-8" />
            </button>
              <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-12 h-12 bg-[#6A38F3] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg"
              >
              <Plus className="w-8 h-8" />
            </button>
          </div>
        )}

        {/* Info da loja */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-[#F6F3E4] z-10">
        <div className="flex flex-col">
        <h1 className="text-7xl font-bold">{store.name}</h1>
        <p className="text-xl mt-1 font-light">{categoryName}</p>
        {avgRating && (
        <div className="flex gap-1 justify-end">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-3xl ${i < Math.round(Number(avgRating)) ? "text-yellow-400" : "text-gray-500"}`}
          >
            ★
          </span>
        ))}
      </div>
        )}
    </div>
    </div>
        

        {/* Nome do dono */}
        <div className="absolute bottom-4 right-16 text-white text-sm z-10">
        by <span className="underline cursor-pointer">{ownerName}</span>
        </div>
      </div>

      {/* PRODUTOS MELHOR AVALIADOS */}
      <div className="bg-[#F6F3E4] px-10 py-10">
        <h2 className="text-3xl font-bold text-black mb-6">
          Produtos <span className="text-base font-normal text-black">melhor avaliados</span>
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {products.slice(0, 5).map((product) => (
            <article
              key={product.id}
              className="min-w-[200px] bg-white rounded-[24px] p-4 flex flex-col items-center gap-2 shadow-sm"
            >
              <img
                src={product.productImage?.[0]?.image_url ?? "/placeholder.png"}
                alt={product.name}
                className="w-32 h-32 object-contain"
              />
              <span className="font-semibold text-black text-base text-center">{product.name}</span>
            </article>
          ))}
        </div>
      </div>

      {/* REVIEWS */}
      {ratings.length > 0 && (
        <div className="bg-black py-12 px-10">
          <div className="relative flex items-center justify-center mb-2">
        <h2 className="text-5xl font-bold text-white">
         Reviews e Comentários
        </h2>
         <Link href={`/loja/${storeId}/reviews`} className="absolute right-0 mt-80 text-[#6A38F3] text-base font-semibold hover:underline">
         ver mais
         </Link>
        </div>

          {avgRating && (
            <div className="flex flex-col items-center mb-8">
              <span className="text-white text-6xl font-bold">{avgRating}</span>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-5xl ${i < Math.round(Number(avgRating)) ? "text-yellow-400" : "text-gray-600"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-6 overflow-x-auto pb-4">
            {ratings.map((rating) => (
              <RatingCard
                key={rating.id}
                avatar_url={rating.user.profile_picture_url || "/avatar-placeholder.png"}
                name={rating.user.name}
                text={rating.comment}
                rating={rating.rating}
                isOwner={userId === rating.user_id}
              />
            ))}
          </div>
        </div>
      )}

      {/* TODOS OS PRODUTOS */}
      <div className="bg-[#F6F3E4] px-10 py-10">
        <h2 className="text-3xl font-bold text-black mb-6">
          Produtos <span className="text-base font-normal text-black">de {store.name.toLowerCase()}</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {paginatedProducts.map((product) => (
            <article
              key={product.id}
              className="relative bg-white rounded-[24px] p-4 flex flex-col items-center gap-2 shadow-sm"
            >

              {isOwner && (
                <button
                  type="button"
                  onClick={() => setEditProduct(product)}
                  className="absolute top-3 right-3 bg-[#6A38F3] hover:bg-[#5a28e3] text-white rounded-full w-8 h-8 flex items-center justify-center z-20 cursor-pointer"
                >
                  ✎
                </button>
              )}

              <img
                src={product.productImage?.[0]?.image_url ?? "/placeholder.png"}
                alt={product.name}
                className="w-32 h-32 object-contain"
              />
              <span className="font-semibold text-black text-base text-center">{product.name}</span>
              <span className="font-bold text-[#6A38F3] text-lg">R$ {product.price}</span>
              <span className={`text-xs font-semibold ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                {product.stock > 0 ? "DISPONÍVEL" : "INDISPONÍVEL"}
              </span>
            </article>
          ))}
        </div>

        {/* PAGINAÇÃO */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="text-black text-xl disabled:opacity-30"
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full text-sm font-semibold ${
                  currentPage === i + 1
                    ? "bg-[#6A38F3] text-white"
                    : "text-black hover:text-[#6A38F3]"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="text-black text-xl disabled:opacity-30"
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
      <CreateProductModal
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        storeId={store.id}
        parentCategoryId={store.category_id}
    />


    {isEditModalOpen && store && (
      <EditarLoja
        store={store}
        onClose={() => setIsEditModalOpen(false)}
        onStoreUpdated={async () => {
          const response = await api.get(`/store/${storeId}`);
          setStore(response.data);
          setIsEditModalOpen(false);
        }}
      />
    )};

    {editProduct && (
            <EditProductModal
                isOpen={true}
                onClose={() => setEditProduct(null)}
                productId={editProduct.id}
                parentCategoryId={editProduct.category?.parent_category_id}
                initialData={{
                  title: editProduct.name,
                  category: editProduct.category?.name ?? "",
                  description: editProduct.description,
                  price: editProduct.price,
                  stock: editProduct.stock,

                  images: editProduct.productImage?.map((img: any) => img.image_url) || []
                }}
            />
          )}

    
   </> 
  );
}
