import ProductCard from "./ProductCard";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  productImage: { image_url: string }[];
  store: {
    logo_url: string;
  };
};

type ProductSectionProps = {
  subtitle?: string;
  products: Product[];
};

export default function ProductusSection({
  subtitle,
  products = [],
}: ProductSectionProps) {
  return (
    <section className="mt-9 ml-16">
      <div className="flex items-end justify-between mb-6">
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-8">
            Produtos
          </h2>

          <span className="text-[#6A38F3] text-sm font-semibold">
            {subtitle}
          </span>
        </div>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-4">
        {products.length === 0 ? (
          <p className="text-[#737272] dark:text-gray-400">
            Nenhum produto cadastrado.
          </p>
        ) : (
          products.map((product) => {
            const primeiraImagem = product.productImage?.[0]?.image_url;

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                image_url={primeiraImagem}
                storeLogo={product.store?.logo_url}
                available={product.stock > 0}
              />
            );
          })
        )}
      </div>
    </section>
  );
}