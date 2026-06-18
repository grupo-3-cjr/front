import Link from "next/link";

type StoreCardProps = {
    id: number;
    logo_url: string;
    name: string;
    description: string;
}

export default function StoreCard({id, logo_url, name, description}: StoreCardProps) {
    return(
        <Link href={`/loja/${id}`} key={id}>

            <article className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-full w-[150px] h-[150px] flex items-center justify-center gap-6">
                <img
                    src={logo_url || "/semImagemProduto.jpg"} 
                    alt={`Logo da loja ${name}`}
                    className="w-full h-full object-cover rounded-full"
                />
            </div>

            <span className="text-[#000000] font-light text-2xl">{name}</span>
            <span className="text-[#6A38F3]">{description}</span>
        </article>

        </Link>
    );
}