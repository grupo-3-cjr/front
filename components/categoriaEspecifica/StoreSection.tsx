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
            <div className="flex overflow-x-auto pb-4 gap-16">
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
    );
}