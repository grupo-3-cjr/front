import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  image_url: string;
  store: {
    logo_url: string;
  };
};

type ProductSectionProps = {
  subtitle?: string;
  products: Product[];
};

export default function ProductsSection({
  subtitle,
  products = [],
}: ProductSectionProps) {
  return (
    <section className="mt-9 ml-16">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
          {subtitle}
        </h2>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            available={product.stock > 0}
            image_url={product.image_url}
            storeLogo={product.store?.logo_url}
          />
        ))}
      </div>
    </section>
  );
}