import Link from "next/link";

type ProductCardProps = {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image_url: string;
  storeLogo: string;
};

export default function ProductCard({
  id,
  name,
  price,
  available,
  image_url,
  storeLogo,
}: ProductCardProps) {
  return (
    <Link href={`/produto/${id}`}>
      <article className="relative bg-white dark:bg-[#151515] w-[228px] h-[300px] rounded-[28px] overflow-hidden flex items-center justify-center flex-col transition-colors">
        <img
          src={storeLogo || "/globe.svg"}
          alt="Logo da loja"
          className="absolute top-2 right-4 w-14 h-14 rounded-full object-cover z-10"
        />

        <div className="h-[155px] flex items-center justify-center pt-2">
          <img
            src={image_url || "/semImagemProduto.jpg"}
            alt={name}
            className="w-[150px] h-[170px] object-contain"
          />
        </div>

        <div className="mt-2 flex flex-col items-start p-3">
          <span className="font-semibold text-black dark:text-white text-lg">
            {name}
          </span>

          <span className="font-semibold text-black dark:text-white text-xl">
            R$ {price}
          </span>

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