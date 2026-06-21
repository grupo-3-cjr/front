type StoreCardProps = {
  logo_url: string;
  name: string;
  description: string;
};

export default function StoreCard({
  logo_url,
  name,
  description,
}: StoreCardProps) {
  return (
    <article className="bg-white dark:bg-[#151515] rounded-[28px] min-w-[400px] h-[180px] flex items-center justify-between px-10 transition-colors">
      <div className="flex flex-col gap-1">
        <span className="text-black dark:text-white font-light text-4xl">
          {name}
        </span>

        <span className="text-[#6A38F3] dark:text-[#B99CFF] text-2xl">
          {description}
        </span>
      </div>

      <img
        src={logo_url}
        alt="Logo da loja"
        className="w-36 h-36 object-cover rounded-full"
      />
    </article>
  );
}