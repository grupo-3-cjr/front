"use client"

import { useEffect, useState } from "react";
import UploadField from "./UploadField";

type Store = {
  id: number;
  name: string;
  category_id: number;
  description: string;
  logo_url: string;
  banner_url: string;
  sticker_url: string;
  created_url: string;
};

type Category = {
  id: number;
  name: string;
  parent_category_id?: number | null;
};

type EditarLojaProps = {
  store: Store;
  onClose: () => void;
  onStoreUpdated: () => void;
};

export default function EditarLoja({
  store,
  onClose,
  onStoreUpdated,
}: EditarLojaProps) {
  const [name, setName] = useState(store.name);
  const [categoryId, setCategoryId] = useState(String(store.category_id));
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:3001/category");
      const data = await response.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);

  async function handleUpdateStore() {
    const response = await fetch(`http://localhost:3001/store/${store.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name, 
        category_id: Number(categoryId),
        description: store.description ?? "",
        logo_url: store.logo_url,
        banner_url: store.banner_url,
        sticker_url: store.sticker_url,
        created_url: store.created_url,
      }),
    });

    if (response.ok) {
      onStoreUpdated();
      onClose();
    }
  }

  async function handleDeleteStore() {
    const response = await fetch(`http://localhost:3001/store/${store.id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      onStoreUpdated();
      onClose();
    }
  }

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center  bg-black/40 backdrop-blur-sm">
        <div className="relative flex flex-col items-center z-50 bg-[#EDEDED] w-[550px] max-w-[90vw] min-h-[650px] gap-4 rounded-xl">
            <h1 className="text-black font-League Spartan font-bold text-2xl pt-4">Editar Loja</h1>

            <button onClick={onClose} className="absolute top-4 right-6 cursor-pointer">
                <img src="/x.png" alt="Fechar modal" className="text-black w-6 h-6"></img>
            </button>

            <input className="bg-white rounded-full p-2 w-96 h-8 px-5 text-xs outline-none text-black" type="text" placeholder="Nome da loja" 
                value={name} onChange={(e) => setName(e.target.value)}
            />

            <select className="bg-white rounded-full px-5 h-8 text-xs outline-none w-96 pr-2 text-black cursor-pointer"
                value={categoryId} onChange={(e) => setCategoryId(e.target.value)}     
            >
                <option value="">Categoria</option>
                
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <UploadField label="Anexe a foto de perfil de sua loja" />

            <UploadField label="Anexe a logo em SVG de sua loja" />

            <UploadField label="Anexe o banner de sua loja" />

            <button onClick={handleDeleteStore} className="bg-[#FF0000] text-white rounded-full w-64 h-8 mt-2 cursor-pointer">
                Deletar
            </button>

            <button onClick={handleUpdateStore} className="bg-[#6A38F3] text-white rounded-full w-64 h-8 mt-2 mb-4 cursor-pointer">
                Salvar
            </button>
        </div>
    </section>
  );
}