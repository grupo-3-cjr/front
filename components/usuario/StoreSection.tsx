import StoreCard from "./StoreCard"; 

type Store = {
    logo_url: string;
    name: string;
    description: string;
}

const stores: Store[] = [
    {
        logo_url: "/next.svg",
        name: "Next",
        description: "eletrônicos"
    },
];

export default function StoreFunction() {
    return (
        <section className="mt-11 ml-16">
            <section className="flex justify-between">
                <div className="flex items-end justify-between mb-6">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl text-black font-bold mb-8">Lojas</h2>
                    </div>
                </div>
            </section>


            <div className="flex gap-8px overflow-x-auto pb-4 gap-16">
                {stores.map((store) => (
                    <StoreCard
                        key={store.name}
                        logo_url={store.logo_url}
                        name={store.name}
                        description={store.description}
                    />
               ))}
            </div>
        </section>
    );
}