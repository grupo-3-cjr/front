import ProductCard from "./ProductCard";

type Product = {
    name: string;
    image: string;
    storeLogo: string;
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
                    <h2 className="text-3xl text-black font-bold mb-8">Produtos</h2>
                    <span className="text-[#6A38F3] text-sm font-semibold">{subtitle}</span>
                </div>
            </div>

            <div className="flex gap-8 overflow-x-auto pb-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.name}
                        name={product.name}
                        image={product.image}
                        storeLogo={product.storeLogo}
                    />
                ))}
            </div>
        </section>
    );
}