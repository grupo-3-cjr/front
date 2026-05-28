"use client";

import { League_Spartan } from "next/font/google";
import { useState } from "react";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBack: ()=> void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
  onBack,
}: ChangePasswordModalProps) {
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  if (!isOpen) return null;

  const handleSalvar = async () => {
    // TODO: integrar com API
    console.log({ senhaAtual, novaSenha, confirmarSenha });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="relative bg-[#EDEDED] rounded-[40px] w-130 mx-4 h-160 px-8 py-10 flex flex-col items-center gap-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÃO VOLTAR */}
        <button
        onClick={onBack}
        className="absolute top-20 left-16 transition-all hover:[filter:invert(29%)_sepia(89%)_saturate(2000%)_hue-rotate(243deg)_brightness(95%)]"
        >
         <img src="/setinha.png" alt="Voltar" className="w-4 h-6" />
        </button>

        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute top-10 right-6 hover:opacity-60 transition-opacity"
        >
          <img src="/xmodal.png" alt="Fechar" className="w-6 h-6" />
        </button>

        {/* CHAVE */}
        <div className="mt-10 mb-2">
          <img src="/key.png" alt="Chave" className="w-50 h-35 object-contain" />
        </div>

        {/* INPUTS */}
        <input
          type="password"
          placeholder="Senha Antiga"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          className="w-75 h-11 px-4 mt-5 rounded-full bg-white text-black outline-none placeholder:text-gray-400"
        />
        <input
          type="password"
          placeholder="Nova Senha"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          className="w-75 h-11 px-4 rounded-full bg-white text-black outline-none placeholder:text-gray-400"
        />
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          className="w-75 h-11 px-4 rounded-full bg-white text-black outline-none placeholder:text-gray-400"
        />

        {/* BOTÃO */}
        <div className="flex flex-col items-center w-full gap-2 mt-14">
          <button
            onClick={handleSalvar}
            className={`${leagueSpartan.className} w-72 h-10 rounded-full bg-[#6A38F3] text-white text-lg font-normal hover:opacity-90 transition-opacity`}
          >
            Salvar Senha 
          </button>
        </div>
      </div>
    </div>
  );
}
