"use client"

import UploadField from "./UploadField";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Category = {
    id: number;
    name: string;
    parent_category_id?: number | null;
}

type CriarLojaModalProps = {
    onClose: () => void;
    onStoreCreated: () => void;
};

type User = {
    id: number;
    name: string;
    email: string;
}

export default function CriarLojaModal({ onClose, onStoreCreated }: CriarLojaModalProps) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const [perfilFile, setPerfilFile] = useState<File | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);

    useEffect(() => {
        async function fetchUser() {
            const token = localStorage.getItem("token");

            if (!token) return;

            const response = await fetch("http://localhost:3001/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) return;

            const data = await response.json();
            setUser(data);
        }

        fetchUser();
    }, []);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch ("http://localhost:3001/category");
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
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data.url;
        }
        return null;
    }
    async function handleCreateStore() {
        if (!user) {
            toast.warn("Usuário não identificado.");
            return;
        }
        if (!name || !categoryId) {
            toast.warn("Preencha o nome e a categoria da loja.");
            return;
        }

        const token = localStorage.getItem("token") || "";

        try {
            // Strings padrão 
            let finalStickerUrl = "sticker.png";
            let finalLogoUrl = "logo.svg";
            let finalBannerUrl = "banner.png";

            if (perfilFile || logoFile || bannerFile) {
                toast.info("Enviando imagens da loja para a nuvem...", { autoClose: 2000 });
            }

            if (perfilFile) {
                const url = await uploadSingleFile(perfilFile, token);
                if (url) finalStickerUrl = url;
                else { toast.error("Falha ao enviar a foto de perfil."); return; }
            }

            if (logoFile) {
                const url = await uploadSingleFile(logoFile, token);
                if (url) finalLogoUrl = url;
                else { toast.error("Falha ao enviar o logotipo."); return; }
            }

            if (bannerFile) {
                const url = await uploadSingleFile(bannerFile, token);
                if (url) finalBannerUrl = url;
                else { toast.error("Falha ao enviar o banner."); return; }
            }

            const response = await fetch("http://localhost:3001/store", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    user_id: user.id,
                    category_id: Number(categoryId),
                    name,
                    description: "",
                    logo_url: finalLogoUrl,
                    banner_url: finalBannerUrl,
                    sticker_url: finalStickerUrl, 
                    created_url: "",
                }),
            });

            if (response.ok) {
                toast.success("Sua loja foi criada com sucesso! 🎉");
                onStoreCreated();
                onClose();
            } else {
                const erro = await response.text();
                toast.error(`Erro ao criar loja: ${erro}`);
            }

        } catch (error) {
            console.error("Erro no fluxo de criação da loja:", error);
            toast.error("Erro interno de conexão.");
        }
    }

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center  bg-black/40 backdrop-blur-sm">
            <div className="relative flex flex-col items-center z-50 bg-[#EDEDED] w-[550px] max-w-[90vw] min-h-[650px] gap-4 rounded-xl">
                <h1 className="text-black font-League Spartan font-bold text-2xl pt-4">Adicionar Loja</h1>

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
                    onFileSelect={(file) => setPerfilFile(file)} 
                />

                <UploadField 
                    label="Anexe a logo em SVG de sua loja" 
                    onFileSelect={(file) => setLogoFile(file)} 
                />

                <UploadField 
                    label="Anexe o banner de sua loja" 
                    onFileSelect={(file) => setBannerFile(file)} 
                />
                <button onClick={handleCreateStore} className="bg-[#6A38F3] text-white rounded-full w-64 h-8 mt-2 cursor-pointer">
                    Adicionar
                </button>
            </div>
        </section>
    )
}