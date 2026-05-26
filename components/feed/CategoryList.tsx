import {
  ShoppingBasket,
  Pill,
  Brush,
  Shirt,
  Laptop,
  Gamepad2,
  ToyBrick,
  House,
} from "lucide-react";

type Category = {
    id: number;
    name: string;
    parent_category_id: number | null;
}

type CategoryListProps = {
    categories: Category[];
}

const iconMap: Record<string, any> = {
  Mercado: ShoppingBasket,
  Farmácia: Pill,
  Beleza: Brush,
  Moda: Shirt,
  Eletrônicos: Laptop,
  Jogos: Gamepad2,
  Brinquedos: ToyBrick,
  Casa: House,
}

export default function CategoryList({
    categories,
}: CategoryListProps) {
    return (
        <section className="mt-8 ml-16">
            <h2 className="text-3xl text-black font-bold mb-8">Categoria</h2>

            <div className="flex gap-15 overflow-x-auto pb-4">
                {categories.map((category) => {
                    const Icon = iconMap[category.name] || ShoppingBasket;

                    return (
                        <button key={category.id} className="p-2 min-w-[115px] h-[115px] bg-white rounded-2xl flex flex-col items-center justify-center">

                            <Icon size={30} className="text-[#6C3BFF]" />
                            <span className="text-black text-sm font-medium">
                                {category.name}
                            </span>
                        </button>
                    );
                })}
            </div>
        </section>
    );
}