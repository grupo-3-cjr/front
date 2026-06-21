"use client";

import { useState, useEffect } from "react";
import { Pen, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import AvaliacaoProduto from "@/app/modais/AvaliacaoProduto";
import EditProductModal from "./editProductModal";

type DescriptionData = {
  subtitle: string;
  text: string;
  ingredients?: string;
  allergens?: string[];
};

type ProductDetailsProps = {
  id: number;
  title: string;
  storeId: number;
  rating: number;
  reviewsCount: number;
  category: string;
  parentCategoryId: number;
  stock: number;
  price: string;
  images: string[];
  storeLogo: string;
  description: DescriptionData;
  isLoggedIn: boolean;
  isOwner: boolean;
  productId: number;
};

export default function ProductDetailsSection({
  id,
  title,
  rating,
  reviewsCount,
  category,
  parentCategoryId,
  stock,
  price,
  images = [],
  storeLogo,
  storeId,
  description,
  isLoggedIn,
  isOwner,
  productId,
}: ProductDetailsProps) {
  const [mainImage, setMainImage] = useState(
    images.length > 0 ? images[0] : "/globe.svg"
  );
  const [modalAberto, setModalAberto] = useState(false);
  const [produto, setProduto] = useState<any | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3001/produtos/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduto(data);
      });
  }, [productId]);

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  const handleAvaliar = async (rating: number, texto: string) => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token!.split(".")[1]));
    const userId = payload.sub;

    await fetch(`http://localhost:3001/product-ratings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        product_id: produto?.id,
        rating,
        comment: texto,
      }),
    });

    setModalAberto(false);
  };

  return (
    <>
      <div className="relative flex flex-col lg:flex-row gap-10 w-full max-w-8xl mx-auto pl-8 mb-12 ml-20 mr-0 text-black dark:text-white">
        <button
          onClick={() => router.back()}
          className="cursor-pointer absolute -left-10 top-2 text-7xl font-bold text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition"
        >
          &lt;
        </button>

        <div className="flex gap-5 w-full lg:w-[50%]">
          <div className="flex flex-col gap-5">
            {images.map((imgUrl, index) => (
              <div
                key={index}
                onClick={() => setMainImage(imgUrl)}
                className={`bg-white dark:bg-[#151515] rounded-2xl p-2 w-30 h-38 flex items-center justify-center shadow-sm cursor-pointer transition-all hover:ring-2 hover:ring-purple-500 ${
                  mainImage === imgUrl ? "ring-2 ring-purple-600" : ""
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Miniatura ${index + 1}`}
                  className="object-contain max-h-full"
                />
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#151515] rounded-3xl flex-1 min-h-150 flex items-center justify-center p-8 relative shadow-sm transition-colors">
            <img
              src={mainImage}
              alt={title}
              className="w-full max-w-sm object-contain"
            />

            <a
              href={`/loja/${storeId}`}
              target="_blank"
              rel="noopener noreferrer"
              title="Visitar loja"
            >
              <img
                src={storeLogo}
                alt="Logo da Loja"
                className="absolute top-6 right-6 w-16 h-16 rounded-full object-cover shadow-md z-10 bg-white"
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-[60%] py-4">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-5xl font-bold text-black dark:text-white">
              {title}
            </h1>

            {isLoggedIn && isOwner && (
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="cursor-pointer w-10 h-10 bg-[#6A38F3] rounded-full flex items-center justify-center text-white hover:bg-purple-800 transition-colors shadow-sm"
                title="Editar Produto"
              >
                <Pen className="w-6 h-6" />
              </button>
            )}

            {isLoggedIn && !isOwner && (
              <>
                <button
                  onClick={() => setModalAberto(true)}
                  className="cursor-pointer w-10 h-10 bg-[#C6E700] rounded-full flex items-center justify-center text-white hover:bg-[#a2cf18] transition-colors shadow-sm"
                  title="Avaliar Produto"
                >
                  <Star className="w-7 h-7" fill="currentColor" />
                </button>

                {modalAberto && (
                  <AvaliacaoProduto
                    productName={produto?.name ?? "Carregando..."}
                    productId={produto?.id ?? 0}
                    onClose={() => setModalAberto(false)}
                    onSubmit={handleAvaliar}
                  />
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-4 text-sm1 mb-5">
            <span className="flex items-center text-yellow-500">
              ★{" "}
              <span className="text-gray-600 dark:text-gray-300 ml-1">
                {rating} | {reviewsCount} reviews
              </span>
            </span>

            <span className="text-purple-600 dark:text-[#B99CFF] font-medium">
              {category}
            </span>

            <span className="text-purple-600 dark:text-[#B99CFF] font-medium">
              {stock} disponíveis
            </span>
          </div>

          <div className="text-black dark:text-white text-5xl font-semibold mb-5">
            {price}
          </div>

          <div className="text-black dark:text-white">
            <h3 className="font-bold text-xl mb-2">Descrição</h3>

            <p className="text-lg font-semibold text-gray-500 dark:text-gray-300 mb-2 uppercase">
              {description.subtitle}
            </p>

            <div className="text-base space-y-4 text-gray-800 dark:text-gray-300 leading-relaxed">
              <p>{description.text}</p>
            </div>
          </div>
        </div>
      </div>

      {isEditModalOpen && produto && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          productId={produto.id}
          parentCategoryId={produto.category?.parent_category_id}
          initialData={{
            title: produto.name,
            category: produto.category?.name ?? "",
            description: produto.description,
            price: produto.price,
            stock: produto.stock,
            images:
              produto.productImage?.map((img: any) => img.image_url) || [],
          }}
        />
      )}
    </>
  );
}