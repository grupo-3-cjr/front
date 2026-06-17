import Link from "next/link";

type ProductCardProps = {
    id: number;
    name: string;
    description: string;
    price: string;
    image_url?: string;
    storeLogo?: string;
}

export default function ProductCard({
    id,
    name,
    description,
    price,
    image_url,
    storeLogo,
}: ProductCardProps) {
    return(
        <Link href={`/produto/${id}`}>

            <article className="relative bg-white w-[228px] h-[280px] rounded-[28px] overflow-hidden flex items-center justify-center flex-col">

                {/* {storeLogo && (
                    <img
                        src={storeLogo}
                        alt="Logo da loja"
                        className="absolute top-2 right-4 w-14 h-14 rounded-full object-cover z-10"
                    />
                )} */}

                <img
                    src={image_url || "/brownie.jpg"}
                    alt={name}
                    className="w-[150px] h-[170px] pt-8 object-contain -translate-y-12 z-5"
                />
                <img
                    src={storeLogo || "/brownie.jpg"}
                    alt="Logo da loja"
                    className="absolute top-2 right-4 w-14 h-14 rounded-full object-cover z-10"
                />
                <span className="font-semibold text-black text-lg -translate-y-8">{name}</span>

                <span className="font-semibold text-black text-lg -translate-y-7 truncate w-full text-center px-4 text-ellipsis">{description}</span>

                <span className="font-bold text-[#6A38F3] text-xl -translate-y-6">R$ {price}</span>
            </article>

        </Link>
    );
}