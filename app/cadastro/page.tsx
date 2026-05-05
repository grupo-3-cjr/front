
"use client"; // para ter interatividade com ocultar e exibir a senha
import { useState } from "react";
import "tailwindcss";
import Image from 'next/image';
import { Eye,EyeOff } from 'lucide-react'; //emojis para mostrar ou ocultar a senha

export default function Cadastro() {

  const [mostrarSenha, setMostrarSenha] = useState(false); // bool para mostrar ou ocultar a senha do form Senha
  const [mostrarSenhaConfirmada, setMostrarSenhaConfirmada] = useState(false); // bool para mostrar ou ocultar a senha do form  Confirmar Senha

  return (

      <div className="min-h-screen bg-[#F6F3E4] flex px-8 md:px-16 lg:px-24">
        
            {/*a div que vai organizar o lado esquerdo com formulario e o lado direito com as imagens*/}
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-3 mt-20">
            

              {/*O Formulário no lado esquerdo*/} 
            <div className="w-full md:w-[80%] xl:w-[45%] bg-[#171918] rounded-t-[40px] items-center justify-center p-10 lg:p-31 flex flex-col ml-25">

                  {/*O titulo */} 
                <h2 className="text-[#F6F3E4] text-4xl font-spartan font-extrabold text-center mb-12 tracking-wide">
                    CRIE SUA CONTA
                </h2>
                  {/*Realização do fomulario*/} 
                <form className="flex flex-col gap-3 ">
                  {/*Form para o nome*/}
                  <div className="relative w-full ">
                      <input
                        type="text" 
                        placeholder="Nome Completo" 
                        className ="w-full  bg-[#F6F3E4] text-[black] placeholder-[#858585] font-spartan font-light text-xl rounded-full px-6 py-2 "
                      />
                  </div> 
                    {/*Form para o username*/}
                  <div className="relative w-full">
                      <input
                        type="text" 
                        placeholder="Username" 
                        className ="w-full bg-[#F6F3E4] text-[black] placeholder-[#858585]  font-spartan font-light text-xl  rounded-full px-6 py-2 "
                      />
                  </div>
                  {/*Form para o email*/}  
                  <div className="relative w-full">
                    <input
                      type="email" 
                      placeholder="Email" 
                      className ="w-full bg-[#F6F3E4] text-[black] placeholder-[#858585] font-spartan font-light text-xl  rounded-full px-6 py-2 "
                      />                   
                  </div>
                    {/*Form para o senha*/}  
                    <div className="relative w-full">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                            className="bg-[#F6F3E4] text-[black] placeholder-[#858585] font-spartan font-light text-xl  px-6 py-2 rounded-full w-full outline-none pr-12"
                        />
                        {/*Logica de apertar o olho para exibir ou ocultar a senha*/}  
                        <button
                            type="button"
                            onClick={() => setMostrarSenha(!mostrarSenha)}     
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#858585] hover:text-gray-800 transition-colors"
                          >
                            {/* Se mostrarSenha for true, mostra o olho riscado. Se for false, mostra o olho normal */}
                            {mostrarSenha ? (
                              <EyeOff size={20} strokeWidth={1} />
                            ) : (
                              <Eye size={20} strokeWidth={1} />
                            )}
                        </button>
                    </div>
                    {/*Form para confirmar senha*/}  
                    <div className="relative w-full">
                        <input
                            type={mostrarSenhaConfirmada ? "text" : "password"}
                            placeholder="Confirmar Senha"
                            className="bg-[#F6F3E4] text-[black] placeholder-[#858585]  font-spartan font-light text-xl  px-6 py-2 rounded-full w-full outline-none pr-12"
                        />
                          {/*Logica de apertar o olho para exibir ou ocultar a senha*/}  
                          <button
                              type="button"
                              onClick={() => setMostrarSenhaConfirmada(!mostrarSenhaConfirmada)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#858585] hover:text-gray-800 transition-colors"
                          >
                            {/* Se mostrarSenha for true, mostra o olho riscado. Se for false, mostra o olho normal */}
                            {mostrarSenhaConfirmada ? (
                              <EyeOff size={20} strokeWidth={1} />
                            ) : (
                              <Eye size={20} strokeWidth={1} />
                            )}
                        </button>
                    </div>
                    {/* Botão Principal */}
                    <button 
                        type="button" 
                        className="mt-4 w-full bg-[#7b42ff] hover:bg-[#6834d4] text-white font-bold text-lg py-3 rounded-full transition-colors tracking-wider"
                      >
                        CRIAR CONTA
                    </button>
                </form>
                  {/* Link de Login */}
                <p className="mt-4 text-slate-300 text-sm text-left pl-2">
                  Já possui uma conta? 
                  <a href="login" className="text-[#6a38f3] hover:underline font-semibold"> Login</a>
                </p>
              </div>

              {/*A imagem e o titulo no lado direito*/}
            <div className="hidden md:flex w-full md:w-[75%] flex-col items-end justify-center self-start gap-2.5 mr-25">
                       {/* Imagem da logo no lado direito */}     
                          <Image 
                            src="/LogoStock.io.png" 
                            alt="Logo da Stock.io"
                            width={421}
                            height={267}
                            className="w-60.5 lg:w-107.5 h-auto object-contain"
                            priority
                          />
                        {/* imagem do mascote embaixo da logo */}
                        <Image 
                            src="/mascoteStack.png" 
                            alt="Mascote verde da Stock.io"
                            width={497}
                            height={1129}
                            className="max-h-[75vh] w-auto object-contain"
                            priority
                          />
            </div>

          </div>
      </div>
  );
}


