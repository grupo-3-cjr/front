import Link from "next/link";

type StoreCardProps = {
  id: number;
  logo_url: string;
  name: string;
  description: string;
};

export default function StoreCard({
  id,
  logo_url,
  name,
  description,
}: StoreCardProps) {
  return (
    <Link href={`/loja/${id}`}>
      <article className="flex flex-col items-center justify-center">
        <div className="bg-white dark:bg-[#151515] rounded-full w-[150px] h-[150px] flex items-center justify-center overflow-hidden transition-colors">
          <img
            src={logo_url}
            alt="Logo da loja"
            className="w-full h-full object-cover"
          />
        </div>

        <span className="text-white font-light text-2xl mt-2">
          {name}
        </span>

        <span className="text-[#6A38F3]">
          {description}
        </span>
      </article>
    </Link>
  );
}