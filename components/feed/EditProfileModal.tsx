"use client";

import { League_Spartan } from "next/font/google";
import { useState, useRef, useEffect } from "react";
import api from "@/app/services/api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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
  const [avatarFile, setAvatarFile] = useState<File | null>(null); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [userId, setUserId] = useState< number | null> (null);
  const router = useRouter();

  useEffect(() => {
  // Pega o id do usuário e busca os dados do perfil
  const token = localStorage.getItem("token");
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    setUserId(payload.sub);
    api.get(`/user/${payload.sub}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setNome(res.data.name);
      setUsername(res.data.username);
      setEmail(res.data.email);
      if (res.data.profile_picture_url) {
          setAvatarPreview(res.data.profile_picture_url);
        }
      }).catch(() => {
        toast.error("Erro ao carregar dados do perfil");
      });
    }
}, []);
  

  if (!isOpen) return null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const tempUrl = URL.createObjectURL(file);
      setAvatarPreview(tempUrl); 
    }
  };

const handleSalvar = async () => {
    if (!userId) return;
    try {
      const token = localStorage.getItem("token");
      const headersBase = {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      };

      let finalAvatarUrl = avatarPreview;

      if (avatarFile) {
        toast.info("Fazendo upload da foto...", { autoClose: 2000 });
        const formData = new FormData();
        formData.append('file', avatarFile);

        const uploadResponse = await fetch('http://localhost:3001/upload', {
          method: 'POST',
          headers: headersBase, 
          body: formData
        });

        if (uploadResponse.ok) {
          const data = await uploadResponse.json();
          finalAvatarUrl = data.url; 
        } else {
          toast.error("Falha ao fazer upload da imagem.");
          return; 
        }
      }
      const payload: any = {
        name: nome,
        username: username,
        email: email,
      };

      if (finalAvatarUrl && finalAvatarUrl.startsWith('http')) {
        payload.profile_picture_url = finalAvatarUrl;
      }

      await api.patch(`/user/${userId}`, payload, {
        headers: { Authorization: `Bearer ${token}` } 
      });

      toast.success("Perfil atualizado com sucesso! ✨");
      onClose();
      
    
      setTimeout(() => {
        window.location.reload(); 
      }, 1500);

    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.message || "Erro ao atualizar perfil";
      toast.error(msg);
    }
  };
    
  

  const handleDeletarConta = async () => {
  if (!userId) return;
  try {
    const token = localStorage.getItem("token");
    await api.delete(`/user/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success("Conta deletada com sucesso!");
    localStorage.removeItem("token");
    router.push("/login");
  } catch (error: any) {
    const msg = error.response?.data?.message || "Erro ao deletar conta";
    toast.error(msg);
  }
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
     <ToastContainer theme="colored"/>
      <div
        className="relative bg-[#EDEDED] rounded-[40px] w-130 mx-4 h-160 px-8 py-10 flex flex-col items-center gap-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* BOTÃO FECHAR */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-10 right-6 hover:opacity-60 transition-opacity"
          
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
            className={`${leagueSpartan.className} cursor-pointer w-72 h-10 rounded-full border border-[#AF052A] text-[#AF052A] text-lg font-normal hover:bg-red-50 transition-colors`}
          >
            Deletar conta
          </button>

          <button
            onClick={onChangePassword}
            className={`${leagueSpartan.className} cursor-pointer w-72 h-10 rounded-full border border-[#6A38F3] text-[#6A38F3] text-lg font-normal hover:bg-purple-50 transition-colors`}
          >
            Alterar senha
          </button>

          <button
            onClick={handleSalvar}
            className={`${leagueSpartan.className} cursor-pointer w-72 h-10 rounded-full bg-[#6A38F3] text-white text-lg font-normal hover:opacity-90 transition-opacity`}
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
