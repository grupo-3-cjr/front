import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex justify-end">
            <div className="w-[520px] flex bg-white rounded-full px-6 py-0.5 items-center">
                <input type="text" placeholder="Procurar por..." className="flex-1 outline-none text-sm text-[#6A38F380]" />

                <Search className="text-purple-400 size={10}"/>
            </div> 
        </div>
    );
}