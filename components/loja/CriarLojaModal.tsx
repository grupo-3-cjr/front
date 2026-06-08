"use client"

import UploadField from "./UploadField";
import { useEffect, useState } from "react";

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
    } ,[]);

    useEffect(() => {
        async function fetchCategories() {
            const response = await fetch ("http://localhost:3001/category");
            const data = await response.json();

            setCategories(data);
        }

        fetchCategories();
    }, []);

    async function handleCreateStore() {
        if (!user) {
            console.log("Usuário não encontrado");
            return;
        }
        
        const response = await fetch("http://localhost:3001/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                category_id: Number(categoryId),
                name,
                description: "",
                logo_url: "logo.svg",
                banner_url: "banner.png",
                sticker_url: "sticker.png",
                created_url: "created.png",
            }),

        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
            onStoreCreated();
            onClose();
        }
    }

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center">
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

                <UploadField label="Anexe a foto de perfil de sua loja" />

                <UploadField label="Anexe a logo em SVG de sua loja" />

                <UploadField label="Anexe o banner de sua loja" />

                <button onClick={handleCreateStore} className="bg-[#6A38F3] text-white rounded-full w-64 h-8 mt-2 cursor-pointer">
                    Adicionar
                </button>
            </div>
        </section>
    )
}