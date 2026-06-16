"use client"

import { useEffect, useState } from "react";
import UploadField from "./UploadField";
import { toast } from "react-toastify";

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
  const [perfilFile, setPerfilFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const response = await fetch("http://localhost:3001/category");
      const data = await response.json();
      setCategories(data);
    }

    fetchCategories();
  }, []);
  async function uploadSingleFile(file: File, token: string): Promise<string | null> {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:3001/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }, 
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.url;
    }
    return null;
  }

  async function handleUpdateStore() {
      const token = localStorage.getItem("token") || "";

      try {
        let finalStickerUrl = store.sticker_url;
        let finalLogoUrl = store.logo_url;
        let finalBannerUrl = store.banner_url;

        if (perfilFile || logoFile || bannerFile) {
          toast.info("Atualizando imagens da loja...", { autoClose: 2000 });
        }

        if (perfilFile) {
          const url = await uploadSingleFile(perfilFile, token);
          if (url) finalStickerUrl = url;
          else { toast.error("Falha ao atualizar a foto de perfil."); return; }
        }

        if (logoFile) {
          const url = await uploadSingleFile(logoFile, token);
          if (url) finalLogoUrl = url;
          else { toast.error("Falha ao atualizar a logo."); return; }
        }

        if (bannerFile) {
          const url = await uploadSingleFile(bannerFile, token);
          if (url) finalBannerUrl = url;
          else { toast.error("Falha ao atualizar o banner."); return; }
        }

        const response = await fetch(`http://localhost:3001/store/${store.id}`, {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,   
          },
          body: JSON.stringify({
            name, 
            category_id: Number(categoryId),
            description: store.description ?? "",
            logo_url: finalLogoUrl,
            banner_url: finalBannerUrl,
            sticker_url: finalStickerUrl,
            created_url: store.created_url,
          }),
        });

        if (response.ok) {
          toast.success("Loja atualizada com sucesso! ✨");
          onStoreUpdated();
          onClose();
        } else {
          const erro = await response.text();
          toast.error(`Erro ao atualizar: ${erro}`);
        }
      } catch (error) {
        console.error(error);
        toast.error("Erro interno ao atualizar a loja.");
      }
    }


  async function handleDeleteStore() {
      const confirmacao = window.confirm("Tem certeza que deseja deletar esta loja? Esta ação não pode ser desfeita e apagará todos os produtos vinculados.");
      if (!confirmacao) return;

      const token = localStorage.getItem("token") || "";

      try {
        const response = await fetch(`http://localhost:3001/store/${store.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` } 
        });

        if (response.ok) {
          toast.success("Loja deletada.");
          onStoreUpdated();
          onClose();
          
          setTimeout(() => {
              window.location.href = "/feed"; // Redireciona para o feed após a exclusão
          }, 1500);
        } else {
          toast.error("Erro ao deletar a loja.");
        }
      } catch (error) {
          toast.error("Erro de conexão ao deletar.");
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

          <UploadField 
                label="Anexe a foto de perfil de sua loja" 
                initialPreview={store.sticker_url}
                onFileSelect={(file) => setPerfilFile(file)} 
            />

            <UploadField 
                label="Anexe a logo em SVG de sua loja" 
                initialPreview={store.logo_url}
                onFileSelect={(file) => setLogoFile(file)} 
            />

            <UploadField 
                label="Anexe o banner de sua loja" 
                initialPreview={store.banner_url}
                onFileSelect={(file) => setBannerFile(file)} 
            />
            
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