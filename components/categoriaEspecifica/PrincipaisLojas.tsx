import StoreSection from "@/components/categoriaEspecifica/StoreSection"

type Store = {
  id: number; 
  logo_url: string;
  name: string;
  description: string;
}

type PrincipaisLojasProps = {
  stores: Store[];
}

export default function PrincipaisLojas({ stores }: PrincipaisLojasProps) {
  return (
    <div className="bg-black py-12 px-10">
      <div className="relative flex items-center justify-start px-10 mb-2">
        <h2 className="text-2xl font-bold text-white">
          Principais Lojas  
        </h2>
      </div>

      <div className="px-10 mt-10">
        <StoreSection stores={stores} />
      </div>
    </div>
  )
}