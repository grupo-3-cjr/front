"use client"
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

type CriarLojaModalProps = {
    onClose: () => void;
};

export default function AlterarSenhaModal({ onClose }: CriarLojaModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleUpdatePassword() {
        if (!email) {
            toast.error("E-mail não informado!");
            return;
        }

        if (!password) {
            toast.error("Senha não informada!");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("As senhas não coincidem!");
            return;
        }
        
        try {
            const response = await fetch("http://localhost:3001/user/recover-password", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),

            });

            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || "Erro ao atualizar senha");
                return;
            }

            toast.success(data.message || "Senha atualizada com sucesso!");
            onClose();
        } catch (error) {
            alert("Não foi possível conectar ao servidor.")
        }
    }

    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative flex flex-col items-center z-50 bg-[#EDEDED] w-[500px] max-w-[90vw] min-h-[300px] gap-4 rounded-xl">
                <h1 className="text-black font-League Spartan font-bold text-2xl pt-4">Alterar Senha</h1>

                <button onClick={onClose} className="absolute top-4 right-6 cursor-pointer">
                    <img src="/x.png" alt="Fechar modal" className="text-black w-6 h-6"></img>
                </button>

                <input className="bg-white rounded-full p-2 w-96 h-8 px-5 text-xs outline-none text-black" type="text" placeholder="Digite seu e-mail"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />

                <input className="bg-white rounded-full p-2 w-96 h-8 px-5 text-xs outline-none text-black" type="password" placeholder="Nova senha"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />

                <input className="bg-white rounded-full p-2 w-96 h-8 px-5 text-xs outline-none text-black" type="password" placeholder="Confirme a nova senha"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button onClick={handleUpdatePassword} className="bg-[#6A38F3] text-white rounded-full w-64 h-8 mt-2 cursor-pointer hover:bg-[#5a2dc1]">
                    Salvar Senha
                </button>
            </div>
        </section>
    )
}