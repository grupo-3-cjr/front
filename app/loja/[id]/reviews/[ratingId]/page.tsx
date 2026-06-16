"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FeedNavbar from "@/components/feed/FeedNavbar";
import api from "@/app/services/api";
import { Pencil } from "lucide-react";
import { League_Spartan } from "next/font/google";
import EditarAvaliacaoLoja from "@/app/modais/EditarAvaliacaoLoja";
import EditarComentarioModal from "@/components/comentario/EditarComentarioModal";


const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

type Rating = {
  id: number;
  user: { name: string; profile_picture_url: string };
  rating: number;
  comment: string;
  user_id: number;
  createdAt: string;
};

type Comment = {
  id: number;
  user_id: number;
  content: string;
  createdAt: string;
  user: { name: string; profile_picture_url: string };
};

type Store = {
  id: number;
  user_id: number;
};

export default function ComentariosPage() {
  const params = useParams();
  const router = useRouter();
  const storeId = Number(params.id);
  const ratingId = Number(params.ratingId);
  const [rating, setRating] = useState<Rating | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [store, setStore] = useState<Store | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [novoComentario, setNovoComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [comentarioEditando, setComentarioEditando] = useState<number | null>(null);

  const isOwnerOfRating = userId !== null && rating !== null && userId === rating.user_id;
  const isStoreOwner = userId !== null && store !== null && userId === store.user_id;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserId(payload.sub);
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (!storeId || !ratingId) return;

    const fetchData = async () => {
      try {
        const ratingRes = await api.get(`/store-ratings/${ratingId}`);
        setRating(ratingRes.data);

        const storeRes = await api.get(`/store/${storeId}`);
        setStore(storeRes.data);

        const commentsRes = await api.get(`/comments?store_rating_id=${ratingId}`);
        setComments(commentsRes.data);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId, ratingId]);

  const handleEnviarComentario = async () => {
    if (!novoComentario.trim()) return;
    setEnviando(true);

    try {
      const token = localStorage.getItem("token");
      await api.post(`/comments`, {
        user_id: userId,
        store_rating_id: ratingId,
        product_rating_id: 1,
        content: novoComentario,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const commentsRes = await api.get(`/comments?store_rating_id=${ratingId}`);
      setComments(commentsRes.data);
      setNovoComentario("");
    } catch (error) {
      console.error("Erro ao enviar comentário", error);
    } finally {
      setEnviando(false);
    }
  };

  const formatarTempo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutos = Math.floor(diff / 60000);
    if (minutos < 60) return `${minutos}min`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `${horas}h`;
    return `${Math.floor(horas / 24)}d`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <span className={`${leagueSpartan.className} text-white text-xl`}>Carregando...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F6F3E4]">
      <FeedNavbar />

      {/* TOPO PRETO */}
      <div className="bg-black px-10 py-8 relative">

        {/* Canetinha — só aparece pro dono da avaliação */}
        {isOwnerOfRating && (
  <>
    <button
      onClick={() => setModalEdicaoAberto(true)}
      className="absolute top-6 right-16 text-white hover:opacity-70 transition-opacity"
    >
      <Pencil className="w-6 h-6" />
    </button>
    {modalEdicaoAberto && (
      <EditarAvaliacaoLoja
        storeName={store?.name ?? ""}
        onClose={() => setModalEdicaoAberto(false)}
        onSubmit={async (rating, texto) => {
          const token = localStorage.getItem("token");
          await api.patch(`/store-ratings/${ratingId}`,
            { rating, comment: texto },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setModalEdicaoAberto(false);
          const ratingRes = await api.get(`/store-ratings/${ratingId}`);
          setRating(ratingRes.data);
        }}
        onDelete={async () => {
          const token = localStorage.getItem("token");
          await api.delete(`/store-ratings/${ratingId}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          router.back();
        }}
      />
    )}
  </>
)}

        {rating && (
          <>
            {/* Info do avaliador + botão voltar na mesma linha */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => router.back()}
                className="text-[#F6F3E4] text-5xl hover:opacity-70 transition-opacity flex-shrink-0"
              >
                {"<"}
              </button>
              <img
                src={rating.user.profile_picture_url || "/avatar-placeholder.png"}
                alt={rating.user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex items-center gap-3">
                <span className={`${leagueSpartan.className} text-[#F6F3E4] font-normal text-[30px]`}>
                  {rating.user.name}
                </span>
                <span className={`${leagueSpartan.className} text-[#F6F3E4] font-medium text-sm`}>
                  {formatarTempo(rating.createdAt)}
                </span>
              </div>
              {/* Estrelas */}
              <div className="flex gap-1 ml-auto mr-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < rating.rating ? "text-3xl text-[#FFEB3A]" : "text-3xl text-gray-600"}>★</span>
                ))}
              </div>
            </div>

            {/* Texto da avaliação */}
            <p className={`${leagueSpartan.className} text-[#F6F3E4] font-extralight text-[25px] leading-relaxed ml-8`}>
              {rating.comment}
            </p>
          </>
        )}
      </div>

      {/* COMENTÁRIOS */}
      <div className="px-16 py-8 mb-32">
        <div className="border-l-2 border-gray-300 pl-8 flex flex-col gap-8">
          {comments.length === 0 ? (
            <span className={`${leagueSpartan.className} text-black font-extralight text-base`}>
              Nenhum comentário ainda.
            </span>
          ) : (
            comments.map((comment) => (
  <div key={comment.id} className="flex gap-4 items-start">
    <img
      src={comment.user.profile_picture_url || "/avatar-placeholder.png"}
      alt={comment.user.name}
      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
    />
    <div className="flex flex-col flex-1">
      <div className="flex items-center gap-2">
        <span className={`${leagueSpartan.className} text-black font-normal text-xl`}>
          {comment.user.name}
        </span>
        <span className={`${leagueSpartan.className} text-black font-extralight text-sm`}>
          {formatarTempo(comment.createdAt)}
        </span>
        {store && comment.user_id === store.user_id && (
          <span className={`${leagueSpartan.className} text-[#6A38F3] text-xs font-normal`}>
            dono da loja
          </span>
        )}
      </div>
      <span className={`${leagueSpartan.className} text-black font-extralight text-lg`}>
        {comment.content}
      </span>
    </div>
    {/* Canetinha — só aparece pro dono do comentário */}
    {userId === comment.user_id && (
  <>
    <button
      onClick={() => setComentarioEditando(comment.id)}
      className="text-black hover:opacity-70 transition-opacity flex-shrink-0"
    >
      <Pencil className="w-4 h-4" />
    </button>
    {comentarioEditando === comment.id && (
      <EditarComentarioModal
        onClose={() => setComentarioEditando(null)}
      />
    )}
  </>
)}
  </div>
))
          )}
        </div>
      </div>

      {/* CAMPO DE COMENTÁRIO — só aparece se logado */}
      {isLoggedIn && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#F6F3E4] px-10 py-15 border-t border-gray-200">
          <div className="flex items-center gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={novoComentario}
              onChange={(e) => setNovoComentario(e.target.value)}
              placeholder="Adicionar comentário"
              className={`${leagueSpartan.className} flex-1 h-12 px-6 rounded-full bg-white text-black outline-none font-light placeholder:text-gray-400 border border-gray-200`}
              onKeyDown={(e) => e.key === "Enter" && handleEnviarComentario()}
            />
            <button
              onClick={handleEnviarComentario}
              disabled={enviando || !novoComentario.trim()}
              className="text-[#6A38F3] disabled:opacity-40 hover:opacity-70 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
