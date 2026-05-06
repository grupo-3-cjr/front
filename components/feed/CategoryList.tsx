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

const categories =[
    { name: "Mercado", icon: ShoppingBasket },
    { name: "Farmácia", icon: Pill},
    { name: "Beleza", icon: Brush },
    { name: "Moda", icon: Shirt },
    { name: "Eletrônicos", icon: Laptop },
    { name: "Jogos", icon: Gamepad2 },
    { name: "Brinquedos", icon: ToyBrick},
    { name: "Casa", icon: House }
]

export default function CategoryList() {
    return (
        <section className="mt-8 ml-16">
            <h2 className="text-3xl text-black font-bold mb-8">Categoria</h2>

            <div className="flex gap-15 overflow-x-auto pb-4">
                {categories.map((category) => {
                    const Icon = category.icon;

                    return (
                        <button key={category.name} className="p-2 min-w-[115px] h-[115px] bg-white rounded-2xl flex flex-col items-center justify-center">

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