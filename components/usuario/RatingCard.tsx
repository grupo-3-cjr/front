import { Pencil } from 'lucide-react';
import Link from 'next/link';
type RatingCardProps = {
    avatar_url: string;
    name: string;
    text: string;
    rating?: number;
    isOwner?: boolean;
    ratingId?: number;
    storeId?: number;
}

export default function RatingCard({avatar_url, name, text, rating = 5, isOwner = false, ratingId, storeId}: RatingCardProps) {
    return(
        <article className="bg-white rounded-[28px] w-[400px] md:w-[600px] lg:w-[700px] shrink-0 min-h-[220px] flex items-start px-6 md:px-8 gap-4 md:gap-6 relative py-8 overflow-hidden">
            
            <img
                src={avatar_url || "/avatar-placeholder.png"}
                alt="foto do usuario"
                className="w-40 h-40 object-cover rounded-full flex-shrink-0"
            />

            <div className="flex flex-col gap-1 flex-1 items-start pt-2">
                <span className="text-black font-semibold text-4xl">{name}</span>
                <span className="font-spartan-light text-black text-base line-clamp-4">{text}</span>
            </div>

            <div className="flex flex-col items-end justify-between h-full pt-1 py-6">
                <div className="flex gap-1">
                       {Array.from({length: 5}).map((_, i) => (
                        <span key={i} className={i < rating ? "text-3xl text-yellow-400" : "text-3xl text-gray-300"}>★</span>
                    ))}
                    {isOwner && (
                        <button className="w-8 h-8 bg-[#6B46C1] rounded-full flex items-center justify-center text-white hover:bg-purple-800 transition-colors shadow-sm">
                            <Pencil className="w-4 h-4" />
                        </button>
                    )}
                </div>
                {ratingId && storeId ? (
                    <Link href={`/loja/${storeId}/reviews/${ratingId}`} className="text-[#6A38F3] text-sm cursor-pointer hover:underline">
                        ver mais
                    </Link>
                ) : (
                    <span className="text-[#6A38F3] text-sm cursor-pointer">ver mais</span>
                )}
            </div>

        </article>
    );
}