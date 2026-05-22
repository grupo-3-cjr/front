"use client";

import { League_Spartan } from "next/font/google";
import { useState, useRef } from "react";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onChangePassword: () => void;
}

export default function EditProfileModal({
  isOpen,
  onClose,
  onChangePassword,
}: EditProfileModalProps) {
  const [nome, setNome] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSalvar = async () => {
    // TODO: integrar com API
    console.log({ nome, username, email, avatarPreview });
  };

  const handleDeletarConta = async () => {
    // TODO: integrar com API
    console.log("Deletar conta");
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
        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="absolute top-10 right-6 hover:opacity-60 transition-opacity"
          
        ><img src="/xmodal.png" alt="Fechar" 
        className="w-6 h-6" />
          
        </button>

        {/* AVATAR */}
        <div className="relative mb-2">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-[#ccc]">
            <img
              src={avatarPreview ?? "/avatar-placeholder.png"}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 bg-white rounded-full p-1.5 hover:opacity-70 transition-opacity"
          >
            <img
            src="/camera.png"
            alt="Foto de perfil"
            className="w-9.5 h-9.5"
              
            ></img>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* INPUTS */}
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-75 h-11 px-4 mt-5 rounded-full bg-white text-black outline-none placeholder:text-gray-400"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-75 h-11 px-4 rounded-full bg-white text-black outline-none placeholder:text-gray-400"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-75 h-11 px-4 rounded-full bg-white text-black outline-none placeholder:text-gray-400"
        />

        {/* BOTÕES */}
        <div className="flex flex-col items-center w-full gap-2 mt-8">
          <button
            onClick={handleDeletarConta}
            className={`${leagueSpartan.className} w-72 h-10 rounded-full border border-[#AF052A] text-[#AF052A] text-lg font-semibold hover:bg-red-50 transition-colors`}
          >
            Deletar conta
          </button>

          <button
            onClick={onChangePassword}
            className={`${leagueSpartan.className} w-72 h-10 rounded-full border border-[#6A38F3] text-[#6A38F3] text-lg font-semibold hover:bg-purple-50 transition-colors`}
          >
            Alterar senha
          </button>

          <button
            onClick={handleSalvar}
            className={`${leagueSpartan.className} w-72 h-10 rounded-full bg-[#6A38F3] text-white text-lg font-semibold hover:opacity-90 transition-opacity`}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
