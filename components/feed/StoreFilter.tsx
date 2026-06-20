"use client";
import { useState, useRef, useEffect } from "react";

import {
  ChevronDown,
  ChevronUp,
  ShoppingBasket,
  Pill,
  Brush,
  Shirt,
  Laptop,
  Gamepad2,
  ToyBrick,
  House,
  Tag,
  Gpu,
} from "lucide-react";

type Category = {
  id: number;
  name: string;
  parent_category_id: number | null;
};

const iconMap: Record<string, any> = {
  Mercado: ShoppingBasket,
  Farmácia: Pill,
  Beleza: Brush,
  Moda: Shirt,
  Eletrônicos: Laptop,
  Jogos: Gamepad2,
  Brinquedos: ToyBrick,
  Casa: House,
  Tecnologia: Gpu,
};

type StoreFilterProps = {
  categories: Category[];
  selectedCategoryIds: number[];
  setSelectedCategoryIds: (ids: number[]) => void;
};

export default function StoreFilter({
  categories,
  selectedCategoryIds,
  setSelectedCategoryIds,
}: StoreFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

function selectCategory(id: number) {
    setSelectedCategoryIds(
      selectedCategoryIds.includes(id) ? [] : [id]
    );
  }

  return (
    <div className="relative w-[520px]" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="cursor-pointer w-full h-9 flex items-center justify-between bg-white rounded-full px-4 text-[#6A38F380] text-m outline-none"
      >
        filtros
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-2 w-full bg-white rounded-3xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl text-black font-medium">filtros</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            >
              <ChevronUp size={16} className="text-[#6A38F3]" />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {categories.map(({ id, name }) => {
              const Icon = iconMap[name] ?? Tag;
              const checked = selectedCategoryIds.includes(id);
              return (
                <label
                  key={id}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    checked={checked}
                    onChange={() => selectCategory(id)}
                    className="w-4 h-4 border-2 border-[#6A38F3] accent-[#6A38F3]"
                  />
                  <span className="text-black text-base">{name}</span>
                  <Icon size={16} className="text-[#6A38F3] ml-auto" />
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}