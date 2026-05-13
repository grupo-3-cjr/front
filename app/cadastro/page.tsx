"use client"; // para ter interatividade com usuário

import { useState } from "react";
import Link  from "next/link";
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react'; // Para colocar o emoji do olho

import { useFormik } from 'formik'; // para facilitar na validação do formulário
import { toast, ToastContainer } from 'react-toastify'; //para realizar notificações eficientes
import 'react-toastify/dist/ReactToastify.css'; // para exibir a notificação
import { postUser } from '@/api'; // Importando a função do api.ts
import * as yup from 'yup';

const passwordRules= /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/; // Define qual formato da senha


const validationSchema = yup.object().shape({ //define as regras de validação dos inputs
  name: yup.string()
    .required('O nome é obrigatório'),
  email: yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: yup.string()
    .min(4, 'A senha deve ter no mínimo 4 caracteres')
    .max(20, 'A senha deve ter no máximo 20 caracteres')
    .matches(passwordRules, 'Senha muito fraca (use maiúsculas, minúsculas e números/símbolos)')
    .required('A senha é obrigatória'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirme sua senha'),
  username: yup.string()
    .optional(), // é opcional
});


export default function Cadastro() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaConfirmada, setMostrarSenhaConfirmada] = useState(false);

 const formik = useFormik({ // Define os valores iniciais do formulário
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,

  onSubmit: async (values, { resetForm }) => {
    try {
      const { confirmPassword, ...userData } = values; // remove o campo confirmar Senha antes de enviar para o back
      await postUser(userData);
      
    toast.success("Conta criada com sucesso! 🎉");
    resetForm(); //limpar o formulário após ter dado certo

    } catch (error: any) {
      const messages = error.response?.data?.message;
      if (Array.isArray(messages)) {
        messages.forEach((msg: string) => toast.error(msg));
      } else {
        toast.error("Erro ao criar conta.");
      }
    }
  },
});

  return (
    <div className="min-h-screen w-full bg-[#F6F3E4] flex justify-center items-end px-4 md:px-8 overflow-hidden">
      {/*exibe notificão sobre o cadastro */}
      <ToastContainer  
        position="top-right"
        autoClose={3000}
        theme="colored" 
      />
      {/*DIV que divide o formulário e as imagens  */}
      <div className="w-full max-w-375 flex flex-row items-end justify-between gap-10 lg:gap-20 xl:gap-35">
        
        {/* o lado esquerdo que está o Formulário*/}
        <div className="w-full md:w-[55%] lg:w-[70%] max-w-187.5 bg-[#171918] rounded-t-[40px] pt-30 pb-15 px-10 sm:px-14 lg:px-20 flex flex-col justify-center">
          
          <h2 className="text-[#F6F3E4] text-4xl lg:text-5xl font-spartan font-extrabold text-center mb-15 tracking-wide">
            CRIE SUA CONTA
          </h2>

          {/* Forms onde vão ser inseridas as informações  */}
          <form  onSubmit={formik.handleSubmit} className="flex flex-col gap-3 w-full">
            
            {/* Input Nome  */}
            <div className="w-full">
              <input
                  name="name"
                  type="text"
                  placeholder="Nome Completo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="w-full bg-[#F6F3E4] text-black placeholder-[#858585] font-spartan font-light text-lg lg:text-xl rounded-full px-8 py-4 outline-none transition-all focus:ring-2 focus:ring-[#7b42ff]"
              />
                {formik.touched.name && formik.errors.name && (
                  <span className="text-red-500 text-sm mt-1 ml-6 font-medium">{formik.errors.name}</span>
                )}
            </div>

            {/* Input Username */}
            <div className="w-full">
              <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="w-full bg-[#F6F3E4] text-black placeholder-[#858585] font-spartan font-light text-lg lg:text-xl rounded-full px-8 py-4 outline-none transition-all focus:ring-2 focus:ring-[#7b42ff]"
              />
            </div>

            {/* Input Email */}
            <div className="w-full">
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-[#F6F3E4] text-black placeholder-[#858585] font-spartan font-light text-lg lg:text-xl rounded-full px-8 py-4 outline-none transition-all focus:ring-2 focus:ring-[#7b42ff]"
              />
            </div>

            {/* Input Senha */}
            <div className="relative w-full">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha"
                className="w-full bg-[#F6F3E4] text-black placeholder-[#858585] font-spartan font-light text-lg lg:text-xl px-8 py-4 rounded-full outline-none pr-14 transition-all focus:ring-2 focus:ring-[#7b42ff]"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#858585] hover:text-gray-800 transition-colors"
              >
                {mostrarSenha ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            {/* Input Confirmar Senha */}
            <div className="relative w-full">
              <input
                type={mostrarSenhaConfirmada ? "text" : "password"}
                placeholder="Confirmar Senha"
                className="w-full bg-[#F6F3E4] text-black placeholder-[#858585] font-spartan font-light text-lg lg:text-xl px-8 py-4 rounded-full outline-none pr-14 transition-all focus:ring-2 focus:ring-[#7b42ff]"
              />
              <button
                type="button"
                onClick={() => setMostrarSenhaConfirmada(!mostrarSenhaConfirmada)}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-[#858585] hover:text-gray-800 transition-colors"
              >
                {mostrarSenhaConfirmada ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            {/* Botão Principal  */}
            <button
              type="button"
              className="mt-10 w-full bg-[#7b42ff] hover:bg-[#6834d4] text-white font-spartan font-bold text-xl py-4 rounded-full transition-all transform hover:scale-[1.02] tracking-wider"
            >
              CRIAR CONTA
            </button>
          </form>

          {/* Link Login */}
          <p className="mt-8 text-slate-300 text-xl text-left pl-2 font-spartan font-light">
              Já possui uma conta?   <Link href="/login" className="text-[#8854ff] hover:underline font-spartan font-semibold">
              Login
            </Link>
          </p>
        </div>

        {/* Lado direito onde está as imagens */}
        <div className="hidden md:flex w-[45%] lg:w-[40%] max-w-187.5 flex-col items-center justify-end pb-0">
          
          {/* Logo */}
          <div className="w-full flex justify-center mb-8">
            <Image
              src="/LogoStock.io.png"
              alt="Logo da Stock.io"
              width={421}
              height={267}
              className="w-56 lg:w-72 xl:w-100 h-auto object-contain"
              priority
            />
          </div>

          {/* Mascote  */}
          <div className="w-full flex justify-center">
            <Image
              src="/mascoteStack.png"
              alt="Mascote verde da Stock.io"
              width={497}
              height={1129}
              className="w-auto h-auto max-h-[70vh] object-contain"
              priority
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}