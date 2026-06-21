import Link from "next/link";

type ProductCardProps = {
  id: number;
  name: string;
  image: string;
  description?: string;
  price?: string;
  storeLogo?: string;
  available: boolean;
};

export default function ProductCard({
  id,
  name,
  image,
  description,
  price,
  storeLogo,
  available,
}: ProductCardProps) {
  console.log(`Card do ${name} recebeu o preço:`, price);

  return (
    <Link href={`/produto/${id}`} className="block group">
      <article className="min-w-[228px] h-[280px] bg-white dark:bg-[#151515] rounded-[28px] relative overflow-hidden flex items-center justify-center flex-col transition-colors">
        {storeLogo && (
          <img
            src={storeLogo}
            alt="Logo da loja"
            className="absolute top-2 right-4 w-14 h-14 rounded-full object-cover z-10"
          />
        )}

        <img
          src={image}
          alt={name}
          className="w-[150px] h-[170px] pt-8 object-contain -translate-y-12 z-5"
        />

        <div className="flex flex-col items-center justify-center w-full px-4 text-center -translate-y-2">
          <span
            className="font-semibold text-black dark:text-white text-lg line-clamp-1"
            title={name}
          >
            {name}
          </span>

          {price && (
            <span className="font-semibold text-black dark:text-white text-base mt-1">
              {price}
            </span>
          )}

          <p
            className={
              available
                ? "text-[#AACC00] text-sm font-semibold pb-2"
                : "text-red-500 text-sm font-semibold pb-2"
            }
          >
            {available ? "DISPONÍVEL" : "INDISPONÍVEL"}
          </p>
        </div>
      </article>
    </Link>
  );
}