import { Pencil } from 'lucide-react';
import { useState, useEffect } from 'react';
import EditarAvaliacaoProduto from "@/app/modais/EditarAvaliacaoProduto"
import { toast } from 'react-toastify';
import Link from 'next/link'

type RatingCardProps = {
    avatar_url: string;
    name: string;
    text: string;
    rating?: number;
    isOwner?: boolean; 
    ratingId?: number;
    userId: number;
}

export default function RatingCard({avatar_url, name, text, rating = 5, isOwner = false, ratingId, userId}: RatingCardProps) {

    const [modalAberto, setModalAberto] = useState(false);

    const handleAvaliar = async (rating: number, texto: string) => {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token!.split('.')[1]));
        const userId = payload.sub; 
        const responseAvaliar = await fetch(`http://localhost:3001/product-ratings/${ratingId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({comment: texto, rating}),
        })
            if (responseAvaliar.ok) {
                toast.success("Comentario realizado com sucesso! ✨");
                setModalAberto(false);
                setTimeout(() => window.location.reload(), 1500);
            } else{
                toast.error("Erro ao realizar comentário.");
            }
    };

    const deleteAvaliar = async () => {
        const token = localStorage.getItem("token");
        const payload = JSON.parse(atob(token!.split('.')[1]));
        const userId = payload.sub;
        const responseDeletar = await fetch(`http://localhost:3001/product-ratings/${ratingId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        if (responseDeletar.ok) {
               toast.success("Comentario deletado com sucesso! ✨");
                setModalAberto(false);
                setTimeout(() => window.location.reload(), 1500);
            } else{
                toast.error("Erro ao realizar comentário.");
            }
    }

    return(
        <article className="bg-white rounded-[28px] w-[400px] md:w-[600px] lg:w-[700px] shrink-0 min-h-[220px] flex items-start px-6 md:px-8 gap-4 md:gap-6 relative py-8 overflow-hidden">
            
            {/* Foto à esquerda ${userId */}
            <Link href={`/usuario/${userId}`} className="flex-shrink-0 transition-transform ">
                <img
                    src={avatar_url || "/semFotoPerfil.jpg"}
                    alt="foto do usuario"
                    className="w-24 h-24 object-cover rounded-full flex-shrink-0"
                />
          </Link>
            {/* Nome e texto no meio */}
             <div className="flex flex-col gap-1 flex-1 items-start pt-2">
                <div className="flex items-center gap-3">
                    <span className="text-black font-semibold text-3xl line-clamp-2">{name}</span>

                </div>
                
               <p className="font-spartan-light text-black text-base line-clamp-4">
                    {text}
                </p> 
            </div>

            {/* Estrelas e "ver mais" à direita */}
            <div className="flex flex-col items-end justify-between h-full pt-1 py-6">
                <div className="flex gap-1 items-center">
                    {Array.from({length: 5}).map((_, i) => (
                        <span key={i} className={i < rating ? "text-3xl text-yellow-400" : "text-3xl text-gray-300"}>★</span>
                    ))}
                    
                    {/* mostra o botão de editar apenas se for o dono da avaliação */}
                    {isOwner && (
                        <>
                        <button onClick={() => setModalAberto(true)} className="w-8 h-8 bg-[#6B46C1] rounded-full flex items-center justify-center text-white hover:bg-purple-800 transition-colors shadow-sm" title="Editar sua avaliação">
                            <Pencil className="w-4 h-4" />
                        </button>
                        {modalAberto && (
                            <EditarAvaliacaoProduto 
                             onClose={() => setModalAberto(false)}
                             onSubmit={handleAvaliar}
                             onDelete={deleteAvaliar}
                            />
                            )}
                            </>
                        )}
                </div>
                <span className="text-[#6A38F3] text-sm cursor-pointer">ver mais</span>
            </div>

        </article>
    );
}