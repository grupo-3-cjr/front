import { Pencil } from 'lucide-react';

type RatingCardProps = {
    avatar_url: string;
    name: string;
    text: string;
    rating?: number; // de 1 a 5
    isOwner?: boolean; 
}

export default function RatingCard({avatar_url, name, text, rating = 5, isOwner = false}: RatingCardProps) {
    return(
        <article className="bg-white rounded-[28px] w-[700px] h-[220px] flex items-start px-8 gap-6 relative pt-8">
            
            {/* Foto à esquerda */}
            <img
                src={avatar_url}
                alt="foto do usuario"
                className="w-40 h-40 object-cover rounded-full flex-shrink-0"
            />

            {/* Nome e texto no meio */}
             <div className="flex flex-col gap-1 flex-1 items-start pt-2">
                <div className="flex items-center gap-3">
                    <span className="text-black font-semibold text-4xl">{name}</span>

                </div>
                
                <span className="font-spartan-light text-black text-base">{text}</span> {/* Corrigi "text-x" para "text-base" ou o tamanho que preferir */}
            </div>

            {/* Estrelas e "ver mais" à direita */}
            <div className="flex flex-col items-end justify-between h-full pt-1 py-6">
                <div className="flex gap-1">
                    {Array.from({length: 5}).map((_, i) => (
                        <span key={i} className={i < rating ? "text-2xl text-yellow-400" : "text-2xl text-gray-300"}>★</span>
                    ))}
                    {/* Renderiza o botão de editar apenas se for o dono da avaliação */}
                    {isOwner && (
                        <button className="w-8 h-8 bg-[#6B46C1] rounded-full flex items-center justify-center text-white hover:bg-purple-800 transition-colors shadow-sm" title="Editar sua avaliação">
                            <Pencil className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <span className="text-[#6A38F3] text-sm cursor-pointer">ver mais</span>
            </div>

        </article>
    );
}