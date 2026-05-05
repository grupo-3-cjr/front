
"use client"; // para ter interatividade com ocultar e exibir a senha
import { useState } from "react";
import "tailwindcss";
import Image from 'next/image';
import { Eye,EyeOff } from 'lucide-react'; //emojis para mostrar ou ocultar a senha

export default function Cadastro() {

  const [mostrarSenha, setMostrarSenha] = useState(false); // bool para mostrar ou ocultar a senha do form Senha
  const [mostrarSenhaConfirmada, setMostrarSenhaConfirmada] = useState(false); // bool para mostrar ou ocultar a senha do form  Confirmar Senha

  return (

      <div className="min-h-screen bg-[#f3f0e1] flex px-8 md:px-16 lg:px-24">
        
            {/*a div que vai organizar o lado esquerdo com formulario e o lado direito com as imagens*/}
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-2 ">
            

              {/*O Formulário no lado esquerdo*/} 
            <div className="w-full md:w-[80%] xl:w-[45%] bg-[#171918] rounded-t-[40px] p-10 lg:p-30 flex flex-col">

                  {/*O titulo */} 
                <h1 className="text-[#f3f0e1] text-5xl font-bold text-center mb-12 tracking-wide">
                    CRIE SUA CONTA
                </h1>
                  {/*Realização do fomulario*/} 
                <form className="flex flex-col gap-5">
                  {/*Form para o nome*/}
                  <div className="relative w-full">
                      <input
                        type="text" 
                        placeholder="Nome Completo" 
                        className ="w-full bg-[#f3f0e1] text-slate-800 placeholder-slate-400 rounded-full px-6 py-4 "
                      />
                  </div> 
                    {/*Form para o username*/}
                  <div className="relative w-full">
                      <input
                        type="text" 
                        placeholder="Username" 
                        className ="w-full bg-[#f3f0e1] text-slate-800 placeholder-slate-400 rounded-full px-6 py-4 "
                      />
                  </div>
                  {/*Form para o email*/}  
                  <div className="relative w-full">
                    <input
                      type="email" 
                      placeholder="Email" 
                      className ="w-full bg-[#f3f0e1] text-slate-800 placeholder-slate-400 rounded-full px-6 py-4  "
                      />                   
                  </div>
                    {/*Form para o senha*/}  
                    <div className="relative w-full">
                        <input
                            type={mostrarSenha ? "text" : "password"}
                            placeholder="Senha"
                            className="bg-[#f3f0e1] text-slate-800 placeholder-gray-400 px-6 py-3 rounded-full w-full outline-none pr-12"
                        />
                        {/*Logica de apertar o olho para exibir ou ocultar a senha*/}  
                        <button
                            type="button"
                            onClick={() => setMostrarSenha(!mostrarSenha)}     
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
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
                            className="bg-[#f3f0e1] text-slate-800 placeholder-gray-400 px-6 py-3 rounded-full w-full outline-none pr-12"
                        />
                          {/*Logica de apertar o olho para exibir ou ocultar a senha*/}  
                          <button
                              type="button"
                              onClick={() => setMostrarSenhaConfirmada(!mostrarSenhaConfirmada)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
                          >
                            {/* Se mostrarSenha for true, mostra o olho riscado. Se for false, mostra o olho normal */}
                            {mostrarSenhaConfirmada ? (
                              <EyeOff size={20} strokeWidth={1} />
                            ) : (
                              <Eye size={20} strokeWidth={1} />
                            )}
                        </button>
                    </div>

                </form>
              </div>

              {/*A imagem e o titulo no lado direito*/}
            <div className="hidden md:flex w-full md:w-[75%] flex-col items-end justify-center self-start gap-2.5">
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


