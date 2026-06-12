import { useState } from "react";
import StoreCard from "./StoreCard"; 
import CriarLojaModal from "@/components/loja/CriarLojaModal";

type Store = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
};

type StoreSectionProps = {
    stores: Store[];
    showAddButton?: boolean;
    onAddStore?: () => void;
};

export default function StoreFunction({ 
    stores,
    showAddButton = true,
    onAddStore,
}: StoreSectionProps) {
    return (
        <section className="mt-10 ml-16">
            <section className="flex justify-between">
                <div className="flex items-end justify-between mb-6 w-full">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl text-black font-bold mb-8">Lojas</h2>
                    </div>

                    {showAddButton && (
                        <button className="bg-[#6A38F3] text-white rounded-full p-2 flex items-baseline items-center mb-8 cursor-pointer" onClick={onAddStore}>
                            <img src="/botao_criar_loja.png" alt="Adicionar Loja" className="w-4 h-4" />
                        </button>
                    )}
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