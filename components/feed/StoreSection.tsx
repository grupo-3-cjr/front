import StoreCard from "./StoreCard"; 

type Store = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
}

type StoreSectionProps = {
    stores: Store[];
}

export default function StoreSection({
    stores,
}:StoreSectionProps) {
    return (
        <section className="mt-11 px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                <h2 className="text-3xl sm:text-4xl text-black font-bold">
                    Lojas
                </h2>

                <div className="w-full sm:max-w-[520px] h-10 flex bg-white rounded-full px-4 items-center">
                    <input
                        type="text"
                        placeholder="filtros"
                        className="flex-1 outline-none text-sm sm:text-base text-[#6A38F380]"
                    />

                    <select className="outline-none text-sm sm:text-base text-purple-400 bg-transparent" />
                </div>

            </div>

            <div className="flex overflow-x-auto pb-3 gap-8">
                {stores.map((store) => (
                    <StoreCard
                        key={store.id}
                        id={store.id}
                        logo_url={store.logo_url}
                        name={store.name}
                        description={store.description}
                    />
                ))}
            </div>
        </section>
    );
}