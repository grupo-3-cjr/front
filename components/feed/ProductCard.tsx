type ProductCardProps = {
    name: string;
    description: string;
    price: string;
}

export default function ProductCard({
    name,
    description,
    price
}: ProductCardProps) {
    return(
        <article className="min-w-[228px] h-[280px] bg-white rounded-[28px] relative overflow-hidden flex items-center justify-center flex-col">

            {/* {storeLogo && (
                <img
                    src={storeLogo}
                    alt="Logo da loja"
                    className="absolute top-2 right-4 w-14 h-14 rounded-full object-cover z-10"
                />
            )} */}

            <img
                src="/brownie.jpg"
                alt={name}
                className="w-[150px] h-[170px] pt-8 object-contain -translate-y-12 z-5"
            />

            <span className="font-semibold text-black text-lg -translate-y-8">{name}</span>

            <span className="font-semibold text-black text-lg -translate-y-7">{description}</span>

            <span className="font-bold text-[#6A38F3] text-xl -translate-y-6">R$ {price}</span>
        </article>
    );
}