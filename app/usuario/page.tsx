'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { League_Spartan } from "next/font/google";
import Image from 'next/image';
import { User } from "lucide-react";
import ProductsSection from "@/components/feed/ProductsSection";
import StoreSection from "@/components/usuario/StoreSection";
import RatingSection from "@/components/usuario/RatingSection";

const meusprodutos = [
    {
        name: "Brownie",
        image: "/brownie.jpg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Bola",
        image: "/bola.jpeg",
        storeLogo: "/globe.svg"
    },
        {
        name: "Quadro",
        image: "/quadro.jpeg",
        storeLogo: "/globe.svg"
    },
    {
        name: "Brownie",
        image: "/brownie.jpg",
        storeLogo: "/globe.svg"
    },
]; 

/*const response = await api.get('/me', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});*/



export default function Usuario() {
  return (
    <div className="min-h-screen">
      
      {/* Hero escuro com navbar */}
      <div className="relative bg-black h-56">
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4">

          <Image className="flex items-center" width={100} height={40} src="/STOCK.IO.svg" alt="Logo do site" />
          

          <div className="flex gap-4">
            <button>LOGIN</button>
            <button className="bg-purple-600 rounded-full px-5 py-2">CADASTRE-SE</button>
          </div>
        </nav>

        <button className="absolute left-20 bottom-0 text-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="90" 
            height="90" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Avatar sobreposto entre hero e conteúdo */}
        <div className="absolute -bottom-15 left-45 w-50 h-50 rounded-full border-4 border-[#F6F3E4] overflow-hidden">
         {/* <img src={User.profile_picture} alt={User.name} className="w-full h-full object-cover" />*/}
        </div>
      </div>

      {/* Conteúdo bege */}
      <div className="bg-[#F6F3E4] pt-20 px-6">
       {/* <h1 className="text-3xl font-bold">{user.name}</h1> */}
        {/* <p className="text-gray-500">@ {User.username}</p> */}
        {/* <p className="text-gray-500">✉ {User.email}</p> */}

        <h2 className="text-xl font-bold mt-8 mb-4">Produtos</h2>

        <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
            <ProductsSection 
            products={meusprodutos}
            />
            <StoreSection/>
            <RatingSection/>
              
        </section>
        
      </div>

    </div>
  );
}
