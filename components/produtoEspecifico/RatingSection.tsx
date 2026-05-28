import RatingCard from "./RatingCard"; 

type Rating = {
    avatar_url: string;
    name: string;
    text: string;
    rating?: number; 
    isOwner?: boolean; 
}

const Ratings: Rating[] = [
    {
        avatar_url: "/usuario.jpeg",
        name: "Endrick",
        text: "Vou fazer o gol na copa",
        isOwner: false,
        rating: 1
    },
    {
        avatar_url: "/usuario.jpeg",
        name: "Joao Marcos",
        text: "Vou fazer o gol na copa"
    },

        {
        avatar_url: "/usuario.jpeg",
        name: "Neymar junior",
        text: "Vou fazer o gol na copa"
    },
];


export default function RatingFunction() {
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
                {Ratings.map((rating) => (
                    <RatingCard
                        key={rating.name}
                        avatar_url={rating.avatar_url}
                        name={rating.name}
                        text={rating.text}
                        rating={rating.rating}
                        isOwner={rating.isOwner}
                    />
               ))}
            </div>
        </section>
    );
}