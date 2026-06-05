import Link from "next/link";

type ProductCardProps = {
    id: number;
    name: string;
    image: string;
    description?: string; 
    price?: string;   
    storeLogo?: string;
}

export default function ProductCard({id, name, image, description, price, storeLogo}: ProductCardProps) {
    console.log(`Card do ${name} recebeu o preço:`, price);

    return(
        <Link href={`/produto/${id}`} className="block group">   {/* redireciona */}

        <article className="min-w-[228px] h-[280px] bg-white rounded-[28px] relative overflow-hidden flex items-center justify-center flex-col">
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
                <span className="font-semibold text-black text-lg line-clamp-1" title={name}>
                    {name}
                </span>
                
                {/* Renderiza o preço se ele existir */}
                {price && (
                    <span className="font-bold text-[#6A38F3] text-base mt-1">
                        {price}
                    </span>
                )}
            </div>
            
        </article>
        </Link>
    );
}