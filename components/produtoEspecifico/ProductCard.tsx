type ProductCardProps = {
    name: string;
    image: string;
    storeLogo?: string;
}

export default function ProductCard({name, image, storeLogo}: ProductCardProps) {
    return(
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

            <span className="font-semibold text-black text-lg -translate-y-8">{name}</span>
            
        </article>
    );
}