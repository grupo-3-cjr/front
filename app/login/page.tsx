"use client";
import { League_Spartan } from "next/font/google";
import { useState } from "react";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["300","400", "500", "600", "700"],
});


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    // O 'main' é o fundo da tela. 
    // 'bg-[#F5F5E9]' é a cor bege do fundo da imagem.
    <main className="flex h-screen w-screen overflow-hidden items-end justify-center bg-[#F6F3E4] font-sans">
      
      {/* Esse div organiza o lado esquerdo (logo/boneco) e o lado direito (card) */}
      <div className="flex w-full h-screen items-center justify-between px-6 md:px-12 lg:px-24"> 
        
        {/* LADO ESQUERDO: logo e imagem */}
        <div className="relative w-1/2 flex items-center justify-center">
        {/* AQUI ENTRA A LOGO EXPORTADA*/}
          <img
          src="/logo.png" 
          alt="Logo Stock.io" 
          className="absolute top-[-40px] left-[30px] w-[460px]" 
  />
          <img 
            src="/personagem.png" 
            alt="Personagem segurando caixa" 
            className="w-[400px] mt-[200px] ml-[-120px]" 
/>

        </div>

        {/* LADO DIREITO: O Card de Login preto */}
        <div className="w-[550px] h-[calc(100vh-111px)] bg-[#1A1A1A] rounded-t-[45px] p-10 text-white shadow-2xl self-end">
          <h2 className={`${leagueSpartan.className} text-4xl font-bold text-center mt-[70px] mb-10 uppercase tracking-widest text-[#F6F3E4]`}>
            Bem vindo de volta!
          </h2>

          <form className="flex flex-col items-center w-full gap-5">

          {/* Campo de Email */}
          <input 
         type="email" 
          placeholder="Email" 
         className="w-[450px] h-[45px] px-6 rounded-full bg-[#EBE9D4] text-black outline-none placeholder:text-gray-500"
          />

         {/* Campo de Senha */}
         <div className="w-[450px] relative">

         <input 
         type={showPassword ? "text" : "password"}
         placeholder="Senha" 
         className="w-full h-[45px] px-6 pr-14 rounded-full bg-[#EBE9D4] text-black outline-none placeholder:text-gray-500"
         />

        {/* Botão do olho pra esconder ou mostrar senha */}
        <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-6 top-1/2 -translate-y-1/2 cursor-pointer"
         >
         <img
         src="/olho.svg"
         alt="Mostrar senha"
         className="w-[20px] h-[20px]"
         />
         </button>
        


            </div>

            <button type="button" className="{`${leagueSpartan.className} text-[16px] text-center font-light text-[#FFFFF] hover:underline">
              Esqueceu sua senha?
            </button>

            {/* Botão Roxo */}
            <button className="w-[450px] h-[50px] bg-[#6A38F3] py-4 rounded-full font-bold text-lg uppercase hover:bg-opacity-90 transition-all flex items-center justify-center">
              Entrar
            </button>

            <p className={`${leagueSpartan.className} w-[450px] text-left text-[20px] tracking-wide font-light text-[#FFFFFF]`}>
             Não possui uma conta?

           <span className="text-[#6336FF] font-medium cursor-pointer hover:underline ml-1">
           Cadastre-se
          </span>
          </p>
          </form>
        </div>

      </div>
    </main>
  );
}