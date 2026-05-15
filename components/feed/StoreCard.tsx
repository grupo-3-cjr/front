type StoreCardProps = {
    logo_url: string;
    name: string;
    description: string;
}

export default function StoreCard({logo_url, name, description}: StoreCardProps) {
    return(
        <article className="flex flex-col justify-center items-center">
            <div className="bg-white rounded-full w-[150px] h-[150px] flex items-centerm justify-center gap-6">
                <img
                    src={logo_url}
                    alt="Logo da loja"
                    className="w-24 h-[150px] object-contain"
                />
            </div>

            <span className="text-[#000000] font-light text-2xl">{name}</span>
            <span className="text-[#6A38F3]">{description}</span>
        </article>
    );
}