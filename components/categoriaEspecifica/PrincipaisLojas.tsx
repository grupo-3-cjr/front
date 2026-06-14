import StoreSection from "@/components/categoriaEspecifica/StoreSection"
import { useState, useEffect } from "react";

type Store = {
  id: number; 
  logo_url: string;
  name: string;
  description: string;
}

export default function PrincipaisLojas() {

  const [stores, setStores] = useState<Store[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadStores();
  }, []);

  async function loadStores() {
          const response = await fetch(`http://localhost:3001/store?search=${searchTerm}`);
  
          if (!response.ok) {
              setStores([]);
              return;
          }
  
          const data = await response.json();
          setStores(Array.isArray(data) ? data : []);
      }

  return (
      <div className="bg-black py-12 px-10">
        <div className="relative flex items-center justify-start px-10 mb-2">
          <h2 className="text-2xl font-bold text-white">
            Principais Lojas  
          </h2>

        </div>

        <StoreSection stores={stores} />
  
      </div>
  )
}