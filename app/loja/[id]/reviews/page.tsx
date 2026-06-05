"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FeedNavbar from "@/components/feed/FeedNavbar";
import RatingCard from "@/components/produtoEspecifico/RatingCard";
import api from "@/app/services/api";
import Link from "next/link";
import { Pencil, Plus } from "lucide-react";

type Store = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  logo_url: string;
  banner_url: string;
  category_id: number;
};

type Rating = {
  id: number;
  user: { name: string; profile_picture_url: string };
  rating: number;
  comment: string;
  user_id: number;
};

export default function ReviewsPage() {
  const params = useParams();
  const storeId = Number(params.id);

  const [store, setStore] = useState<Store | null>(null);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [avgRating, setAvgRating] = useState<string | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const isOwner = userId !== null && store !== null && userId === store.user_id;

  // Pega o userId do token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.sub);
      setIsLoggedIn(true);
    }
  }, []);

  // Busca dados
  useEffect(() => {
    if (!storeId) return;

    const fetchData = async () => {
      try {
        const storeRes = await api.get(`/store/${storeId}`);
        setStore(storeRes.data);

        const [categoryRes, ownerRes] = await Promise.all([
          api.get(`/category/${storeRes.data.category_id}`),
          api.get(`/user/${storeRes.data.user_id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
          }),
        ]);
        setCategoryName(categoryRes.data.name);
        setOwnerName(ownerRes.data.name);

        const ratingsRes = await api.get(`/store-ratings`);
        const storeRatings = ratingsRes.data.filter((r: any) => r.store_id === storeId);
        setRatings(storeRatings);

        if (storeRatings.length > 0) {
          const avg = (storeRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / storeRatings.length).toFixed(2);
          setAvgRating(avg);
        }
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <span className="text-white text-xl">Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <FeedNavbar />

      {/* HERO / BANNER */}
      {store && (
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
            <div className="absolute top-15 right-15 flex flex-col gap-3 z-10">
              <button className="w-12 h-12 bg-[#6A38F3] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg">
                <Pencil className="w-8 h-8" />
              </button>
              <button className="w-12 h-12 bg-[#6A38F3] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity shadow-lg">
                <Plus className="w-12 h-12" />
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
      )}

      {/* REVIEWS */}
      <div className="py-12 px-10">
        {/* Título */}
        <h1 className="text-5xl font-bold text-white text-center mb-2">
          Reviews e Comentários
        </h1>

        {/* Média e estrelas */}
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

        {/* Botão Adicionar Review — só aparece se logado */}
        {isLoggedIn && (
          <div className="flex justify-center mb-10">
            <button className="w-full max-w-2xl h-14 bg-[#6A38F3] rounded-full text-white text-xl font-semibold hover:opacity-90 transition-opacity">
              Adicionar Review
            </button>
          </div>
        )}

        {/* Lista de reviews */}
        <div className="flex flex-col items-center gap-6">
          {ratings.length === 0 ? (
            <span className="text-white text-lg">Nenhuma avaliação ainda.</span>
          ) : (
            ratings.map((rating) => (
              <RatingCard
                key={rating.id}
                avatar_url={rating.user.profile_picture_url || "/avatar-placeholder.png"}
                name={rating.user.name}
                text={rating.comment}
                rating={rating.rating}
                isOwner={userId === rating.user_id}
              />
            ))
          )}
        </div>
        </div>
      </div>
  );
}
