type StoreCardProps = {
    logo_url: string;
    name: string;
    description: string;
}

export default function StoreCard({logo_url, name, description}: StoreCardProps) {
    return(
        <article className="bg-white rounded-[28px] w-[700px] h-[220px] flex items-center justify-between px-10">
            
            <div className="flex flex-col gap-1">
                <span className="text-black font-light text-6xl">{name}</span>
                <span className="text-[#6A38F3] text-2xl">{description}</span>
            </div>

            <img
                src={logo_url}
                alt="Logo da loja"
                className="w-24 h-24 object-contain"
            />

        </article>
    );
}