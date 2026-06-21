"use client";

import { useState } from "react";
import StoreCard from "./StoreCard";
import StoreFilter from "./StoreFilter";

type Store = {
  id: number;
  logo_url: string;
  name: string;
  description: string;
  category_id: number;
};

type Category = {
  id: number;
  name: string;
  parent_category_id: number | null;
};

type StoreSectionProps = {
  stores: Store[];
  categories: Category[];
};

export default function StoreSection({
  stores,
  categories,
}: StoreSectionProps) {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  const filteredStores = selectedCategoryIds.length
    ? stores.filter((store) =>
        selectedCategoryIds.includes(store.category_id)
      )
    : stores;

  return (
    <section className="mt-11 ml-16">
      <section className="flex justify-between items-center mb-6">
        <div className="flex items-end gap-4">
          <div className="flex items-baseline gap-2">
            <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
              Lojas
            </h2>
          </div>
        </div>

        <div className="flex justify-end">
          <StoreFilter
            categories={categories}
            selectedCategoryIds={selectedCategoryIds}
            setSelectedCategoryIds={setSelectedCategoryIds}
          />
        </div>
      </section>

      <div className="flex overflow-x-auto pb-4 gap-16">
        {filteredStores.map((store) => (
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