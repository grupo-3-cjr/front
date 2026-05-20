import RatingCard from "./RatingCard"; 

type Rating = {
    avatar_url: string;
    name: string;
    text: string;
}

const Ratings: Rating[] = [
    {
        avatar_url: "/usuario.jpeg",
        name: "Endrick",
        text: "Endrick Moreira"
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
                    />
               ))}
            </div>
        </section>
    );
}