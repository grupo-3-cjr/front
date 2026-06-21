"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FeedNavbar from "@/components/feed/FeedNavbar";
import RatingCard from "@/components/loja/RatingCard";
import CreateProductModal from "@/components/produtoEspecifico/createProductModal";
import api from "@/app/services/api";
import { Pencil, Plus } from "lucide-react";
import Link from "next/link";
import EditarLoja from "@/components/loja/EditarLojaModal";
import EditProductModal from "@/components/produtoEspecifico/editProductModal";

type Store = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  logo_url: string;
  banner_url: string;
  category_id: number;
  sticker_url: string;
  created_url: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  productImage: { image_url: string }[];
  productRating: { rating: number }[];
  category?: {
    name: string;
    parent_category_id: number;
  };
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

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(Number(payload.sub));
    }
  }, []);

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
        const storeRatings = ratingsRes.data.filter(
          (r: any) => r.store_id === storeId
        );
        setRatings(storeRatings);

        const categoryRes = await api.get(
          `/category/${storeRes.data.category_id}`
        );
        setCategoryName(categoryRes.data.name);

        const ownerRes = await api.get(`/user/${storeRes.data.user_id}`);
        setOwnerName(ownerRes.data.name);
      } catch (error) {
        console.error("Erro ao carregar dados da loja", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const avgRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, rating) => sum + rating.rating, 0) /
          ratings.length
        ).toFixed(2)
      : null;

  const produtosComMedia = [...products].map((product) => {
    const productRatings = product.productRating || [];

    const media =
      productRatings.length > 0
        ? productRatings.reduce((sum, rating) => sum + rating.rating, 0) /
          productRatings.length
        : 0;

    return { ...product, mediaRating: media };
  });

  const produtosMelhorAvaliados = [...produtosComMedia]
    .sort((a, b) => b.mediaRating - a.mediaRating)
    .slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3E4] dark:bg-[#050505]">
        <span className="text-black dark:text-white text-xl">
          Carregando...
        </span>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6F3E4] dark:bg-[#050505]">
        <span className="text-black dark:text-white text-xl">
          Loja não encontrada.
        </span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#F6F3E4] text-black dark:bg-[#050505] dark:text-white">
        <FeedNavbar />

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

          {isOwner && (
            <div className="absolute top-16 right-16 flex flex-col gap-3 z-20">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="cursor-pointer w-12 h-12 bg-[#6A38F3] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg"
              >
                <Pencil className="w-8 h-8" />
              </button>

              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="cursor-pointer w-12 h-12 bg-[#6A38F3] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg"
              >
                <Plus className="w-8 h-8" />
              </button>
            </div>
          )}

          <div className="absolute inset-0 flex flex-col items-center justify-center text-[#F6F3E4] z-10">
            <div className="flex flex-col">
              <h1 className="text-7xl font-bold">{store.name}</h1>
              <p className="text-xl mt-1 font-light">{categoryName}</p>

              {avgRating && (
                <div className="flex gap-1 justify-end">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`text-3xl ${
                        i < Math.round(Number(avgRating))
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="absolute bottom-4 right-16 text-white text-sm z-10">
            by{" "}
            <Link
              href={`/usuario/${store.user_id}`}
              className="underline cursor-pointer hover:text-purple-400 transition-colors"
            >
              {ownerName}
            </Link>
          </div>
        </div>

        <div className="bg-[#F6F3E4] dark:bg-[#050505] px-10 py-10">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
            Produtos{" "}
            <span className="text-base font-normal text-black dark:text-gray-300">
              melhor avaliados
            </span>
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {produtosMelhorAvaliados.map((product) => (
              <Link href={`/produto/${product.id}`} key={product.id}>
                <article className="w-[228px] h-[300px] bg-white dark:bg-[#151515] rounded-[24px] p-4 flex flex-col items-center gap-2 shadow-sm transition">
                  <img
                    src={
                      product.productImage?.[0]?.image_url ?? "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-[150px] h-[170px] object-contain z-5"
                  />

                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold text-black dark:text-white text-base">
                      {product.name}
                    </span>

                    <span className="font-semibold text-black dark:text-white text-xl">
                      R$ {product.price}
                    </span>

                    <p
                      className={
                        product.stock > 0
                          ? "pb-2 text-[#AACC00] text-sm font-semibold"
                          : "text-red-500 text-sm font-semibold pb-2"
                      }
                    >
                      {product.stock > 0 ? "DISPONÍVEL" : "INDISPONÍVEL"}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-black py-12 px-10">
          <div className="relative flex items-center justify-center mb-2">
            <h2 className="text-5xl font-bold text-white">
              Reviews e Comentários
            </h2>

            <Link
              href={`/loja/${storeId}/reviews`}
              className="absolute right-0 mt-80 text-[#6A38F3] text-base font-semibold hover:underline"
            >
              ver mais
            </Link>
          </div>

          {avgRating ? (
            <div className="flex flex-col items-center mb-8">
              <span className="text-white text-6xl font-bold">
                {avgRating}
              </span>

              <div className="flex gap-1 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-5xl ${
                      i < Math.round(Number(avgRating))
                        ? "text-[#FFEB3A]"
                        : "text-gray-600"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white text-xl text-center mb-8">
              Ainda não há avaliações para esta loja.
            </p>
          )}

          {ratings.length > 0 && (
            <div className="flex gap-6 overflow-x-auto pb-4">
              {ratings.map((rating) => (
                <RatingCard
                  key={rating.id}
                  avatar_url={
                    rating.user.profile_picture_url ||
                    "/avatar-placeholder.png"
                  }
                  name={rating.user.name}
                  text={rating.comment}
                  rating={rating.rating}
                  isOwner={userId === rating.user_id}
                  ratingId={rating.id}
                  storeId={storeId}
                />
              ))}
            </div>
          )}
        </div>

        <div className="bg-[#F6F3E4] dark:bg-[#050505] px-10 py-10">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">
            Produtos{" "}
            <span className="text-base font-normal text-black dark:text-gray-300">
              de {store.name.toLowerCase()}
            </span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {paginatedProducts.map((product) => (
              <Link href={`/produto/${product.id}`} key={product.id}>
                <article className="relative bg-white dark:bg-[#151515] rounded-[24px] p-4 flex flex-col items-center gap-2 shadow-sm w-[228px] h-[300px] transition">
                  {isOwner && (
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        setEditProduct(product);
                      }}
                      className="absolute top-3 right-3 bg-[#6A38F3] hover:bg-[#5a28e3] text-white rounded-full w-8 h-8 flex items-center justify-center z-20 cursor-pointer"
                    >
                      ✎
                    </button>
                  )}

                  <img
                    src={
                      product.productImage?.[0]?.image_url ?? "/placeholder.png"
                    }
                    alt={product.name}
                    className="w-[150px] h-[170px] object-contain z-5"
                  />

                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold text-black dark:text-white text-base">
                      {product.name}
                    </span>

                    <span className="font-semibold text-black dark:text-white text-lg">
                      R$ {product.price}
                    </span>

                    <span
                      className={`pb-2 text-sm font-semibold ${
                        product.stock > 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {product.stock > 0 ? "DISPONÍVEL" : "INDISPONÍVEL"}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-10">
              <button
                onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                disabled={currentPage === 1}
                className="text-black dark:text-white text-xl disabled:opacity-30 cursor-pointer"
              >
                {"<"}
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-full text-sm font-semibold cursor-pointer ${
                    currentPage === i + 1
                      ? "bg-[#6A38F3] text-white"
                      : "text-black dark:text-white hover:text-[#6A38F3] dark:hover:text-[#B99CFF]"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((page) => Math.min(totalPages, page + 1))
                }
                disabled={currentPage === totalPages}
                className="text-black dark:text-white text-xl disabled:opacity-30 cursor-pointer"
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
      )}

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
            images:
              editProduct.productImage?.map((img: any) => img.image_url) || [],
          }}
        />
      )}
    </>
  );
}