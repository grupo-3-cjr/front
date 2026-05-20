type RatingCardProps = {
    avatar_url: string;
    name: string;
    text: string;
}

export default function StoreCard({avatar_url, name, text}: RatingCardProps) {
    return(
         <article className="bg-white rounded-[28px] w-[700px] h-[220px] flex items-center justify-between px-10">
            
            <div className="flex flex-col gap-1">
                <span className="text-black font-light text-6xl">{name}</span>
                <span className="text-[#6A38F3] text-2xl">{text}</span>
            </div>

            <img
                src={avatar_url}
                alt="foto do usuario"
                className="w-24 h-24 object-contain rounded-full"
            />

        </article>
    );
}