type RatingCardProps = {
    avatar_url: string;
    name: string;
    text: string;
    rating?: number; // de 1 a 5
}

export default function RatingCard({avatar_url, name, text, rating = 5}: RatingCardProps) {
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
                <span className="text-black font-semibold text-4xl">{name}</span>
                <span className="text-gray-500 text-sm">{text}</span>
            </div>

            {/* Estrelas e "ver mais" à direita */}
            <div className="flex flex-col items-end justify-between h-full pt-1 py-6">
                <div className="flex gap-1">
                    {Array.from({length: 5}).map((_, i) => (
                        <span key={i} className={i < rating ? "text-2xl text-yellow-400" : "text-gray-300"}>★</span>
                    ))}
                </div>
                <span className="text-[#6A38F3] text-sm cursor-pointer">ver mais</span>
            </div>

        </article>
    );
}