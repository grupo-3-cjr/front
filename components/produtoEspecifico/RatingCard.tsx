import { Pencil } from 'lucide-react';


type RatingCardProps = {
    avatar_url: string;
    name: string;
    text: string;
    rating?: number;
    rating?: number; 
    isOwner?: boolean; 
}

export default function RatingCard({avatar_url, name, text, rating = 5, isOwner = false}: RatingCardProps) {
    return(
        <article className="bg-[#F6F3E4] rounded-[28px] w-[700px] h-[220px] flex items-start px-8 gap-6 relative pt-8">
            
            {/* Foto à esquerda */}
            <img
                src={avatar_url || "/avatar-placeholder.png"}
                alt="foto do usuario"
                className="w-24 h-24 object-cover rounded-full flex-shrink-0"
            />

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