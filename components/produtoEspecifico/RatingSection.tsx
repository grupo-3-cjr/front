import RatingCard from "./RatingCard"; 

export type Rating = {
    id?: string | number; 
    avatar_url: string;
    name: string;
    text: string;
    rating?: number; 
    isOwner?: boolean; 
}
type RatingSectionProps = {
    ratingComments: Rating[];
}

export default function RatingSection({ ratingComments }: RatingSectionProps) {
    return (
        <section className="mt-11 ml-16">
            <section className="flex justify-between">
                <div className="flex items-end justify-between mb-6">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl text-black font-bold mb-8">Avaliações</h2>
                    </div>
                </div>
            </section>


            <div className="flex gap-8px overflow-x-auto pb-4 gap-16">
                {ratingComments && ratingComments.length > 0 ? (
                    ratingComments.map((rating, index) => (
                        <RatingCard
                            key={rating.id || index} 
                            avatar_url={rating.avatar_url}
                            name={rating.name}
                            text={rating.text}
                            rating={rating.rating}
                            isOwner={rating.isOwner}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 font-light text-lg">
                        Nenhuma avaliação para este produto ainda.
                    </p>
                )}
            </div>
        </section>
    );
}