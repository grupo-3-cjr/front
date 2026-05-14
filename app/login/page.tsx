"use client";

import { League_Spartan } from "next/font/google";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = toast.loading("Verificando credenciais...");
    try {
      const response = await axios.post("http://localhost:3000/login", { email, password });
      toast.update(id, { render: "Login realizado com sucesso!", type: "success", isLoading: false, autoClose: 3000 });
      localStorage.setItem("token", response.data.token);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Erro ao fazer login";
      toast.update(id, { render: msg, type: "error", isLoading: false, autoClose: 3000 });
    }
  };


  return (
    <main className="flex min-h-screen w-full bg-[#F6F3E4] font-sans items-center justify-center overflow-hidden">
      <ToastContainer theme="colored" />

      {/* Container principal */}
      <div className="flex w-full max-w-[1440px] h-screen items-center justify-between px-4 md:px-8 xl:px-20 relative gap-6 xl:gap-12">

        {/* LADO ESQUERDO */}
        <div className="hidden lg:flex flex-col items-start justify-between h-full flex-1 relative min-w-0">

          {/* LOGO */}
          <img
            src="/logo.png"
            alt="Logo"
            className="w-[300px] xl:w-[420px] h-auto ml-2 xl:ml-10 mt-[-10px] xl:mt-[-25px] z-20"
          />

          {/* PERSONAGEM */}
          <img
            src="/personagem.png"
            alt="Personagem"
            className="w-[260px] xl:w-[400px] h-auto ml-2 xl:ml-10 mb-[4vh] xl:mb-[6vh] z-10"
          />
        </div>

        {/* CARD PRETO */}
        <div className="w-full max-w-[550px] xl:w-[40vw] h-auto lg:h-[calc(100vh-80px)] bg-[#1A1A1A] rounded-[45px] lg:rounded-b-none p-6 md:p-8 xl:p-10 text-white shadow-2xl flex flex-col justify-center lg:justify-start self-center lg:self-end flex-shrink-0">

          {/* TÍTULO */}
          <h2
            className={`${leagueSpartan.className} text-[24px] md:text-[30px] xl:text-[38px] font-bold text-center mb-8 xl:mb-10 uppercase tracking-widest text-[#F6F3E4] lg:mt-[50px] xl:mt-[70px] whitespace-nowrap w-full`}
          >
            Bem vindo de volta!
          </h2>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col items-center w-full gap-5">

            {/* EMAIL */}
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Email"
              className="w-full h-[45px] px-6 rounded-full bg-[#EBE9D4] text-black outline-none"
            />

            {/* SENHA */}
            <div className="w-full relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-[45px] px-6 pr-14 rounded-full bg-[#EBE9D4] text-black outline-none"
              />

              {/* OLHO */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2"
              >
                <img
                  src="/olho.svg"
                  alt="olho"
                  className="w-5 h-5"
                />
              </button>

            </div>

            {/* ESQUECEU SENHA */}
            <button
              type="button"
              className={`${leagueSpartan.className} underline text-[15px] xl:text-base font-light text-white`}
            >
              Esqueceu sua senha?
            </button>

            {/* BOTÃO */}
            <button className="w-full h-[55px] bg-[#6A38F3] rounded-full font-bold text-base xl:text-lg uppercase"
              type="submit"
            >
              Entrar
            </button>

            {/* CADASTRO */}
            <p
              className={`${leagueSpartan.className} text-center text-[16px] xl:text-lg font-light mt-4`}
            >
              Não possui uma conta?

              <span className="text-[#6336FF] font-medium cursor-pointer ml-2">
                Cadastre-se
              </span>
            </p>

          </form>
        </div>

      </div>
    </main>
  );
}