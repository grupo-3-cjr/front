import Link from "next/link";

type ProductCardProps = {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
}

export default function ProductCard({
    id,
    name,
    price,
    available
}: ProductCardProps) {
    return(
        <Link href={`/produto/${id}`}>

            <article className="w-[228px] h-[300px] bg-white relative rounded-[28px] overflow-hidden flex items-center justify-center flex-col">

                {/* <img
                    src={storeLogo || "/globe.svg"}
                    alt="Logo da loja"
                    className="absolute top-2 right-4 w-14 h-14 rounded-full object-cover z-10"
                /> */}

                <div className="h-[155px] flex items-center justify-center pt-2">
                    <img
                        src="/brownie.jpg"
                        alt={name}
                        className="w-[150px] h-[170px] object-contain z-5"
                    />
                </div>

                <div className="mt-2 flex flex-col items-start p-3">
                    <span className="font-semibold text-black text-lg">{name}</span>

                    <span className="font-semibold text-black text-xl">R$ {price}</span>

                    <p className={available ? "pb-2 text-[#AACC00] text-sm font-semibold" : "pb-2 text-red-500 text-sm font-semibold pb-2"}>
                        {available ? "DISPONÍVEL" : "INDISPONÍVEL"}
                    </p>
                </div>
            </article>

        </Link>
    );
}