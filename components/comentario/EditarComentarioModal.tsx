"use client"

import { useEffect, useState } from "react";

type EditarComentarioModalProps = {
    commentId: number;
    initialContent: string;
    onClose: () => void;
    onUpdated: () => void;
};

export default function EditarComentarioModal({
    commentId,
    initialContent,
    onClose,
    onUpdated,
 }: EditarComentarioModalProps) {
    const [content, setContent] = useState(initialContent);

    async function handleUpdate() {
        const token = localStorage.getItem("token");

        const response = await fetch(`http://localhost:3001/comments/${commentId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                content,
            }),
        });

        if (!response.ok) {
            console.log("Erro ao atualizar o comentário.");
            return;
        }

        onUpdated();
        onClose();
    }
    return (
        <section className="flex justify-center items-center fixed inset-0 z-50">
            <div className="relative flex flex-col items-center z-50 bg-[#EDEDED] min-w-[1250px] min-h-[650px] gap-4 rounded-xl">
                <button onClick={onClose} className="absolute top-4 right-6 cursor-pointer">
                    <img src="/x.png" alt="Fechar modal" className="text-black w-6 h-6"></img>
                </button>

                <textarea placeholder="Comentário" value={content} onChange={(e) => setContent(e.target.value)} className="flex bg-white p-2 rounded-2xl h-[450px] w-[1100px] outline-none mt-20 text-black"></textarea>

                <button onClick={handleUpdate} className="bg-[#6A38F3] hover:bg-[#5a28e3] text-white rounded-full w-md h-8 mt-2 mb-4 outline-none cursor-pointer">
                    Avaliar
                </button>
            </div>
        </section>
    );
}