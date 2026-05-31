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
    stores
}:StoreSectionProps) {
    return (
        <section className="mt-11 ml-16">
            <section className="flex justify-between">
                <div className="flex items-end justify-between mb-6">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl text-black font-bold mb-8">Lojas</h2>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="w-[520px] h-9 flex bg-white rounded-full px-4 items-center">
                        <input type="text" placeholder="filtros" className="flex-1 outline-none text-m text-[#6A38F380]" />

                        <select className="text-purple-400 size={16}"/>
                    </div> 
                </div>
            </section>


            <div className="flex overflow-x-auto pb-4 gap-16">
                {stores.map((store) => (
                    <StoreCard
                        key={store.id}
                        logo_url={store.logo_url}
                        name={store.name}
                        description={store.description}
                    />
                ))}
            </div>
        </section>
    );
}