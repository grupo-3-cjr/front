import ProductCard from "./ProductCard";

type Product = {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
    image: string;
}
type ProductSectionProps = {
    subtitle?: string;
    products: Product[];
}

export default function ProductusSection({subtitle, products}: ProductSectionProps) {
    return (
        <section className="mt-9 ml-16">
            <div className="flex items-end justify-between mb-6">
                <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl text-black font-bold mb-8">Da mesma loja</h2>
                </div>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id} 
                        name={product.name}
                        description={product.description}
                        price={product.price} 
                        image={product.image}
                        available={product.stock > 0}
                    />
                ))}
            </div>
        </section>
    );
}