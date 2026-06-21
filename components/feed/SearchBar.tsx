import { Search } from "lucide-react";

type SearchBarProps = {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export default function SearchBar({
    searchTerm,
    setSearchTerm
}: SearchBarProps) {
    return (
        <div className="w-full flex justify-center sm:justify-end px-4 sm:px-8">
            <div className="w-full max-w-[520px] flex bg-white rounded-full px-6 py-1 items-center">
                <input type="text" placeholder="Procurar por..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} className="flex-1 outline-none text-base text-[#6A38F380]" />

                <Search className="text-purple-400 size={10}"/>
            </div> 
        </div>
    );
}