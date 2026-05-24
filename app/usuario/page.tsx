'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { League_Spartan } from "next/font/google";
import Image from 'next/image';
import { User } from "lucide-react";
import ProductsSection from "@/components/feed/ProductsSection";
import StoreSection from "@/components/usuario/StoreSection";
import RatingSection from "@/components/usuario/RatingSection";
import FeedNavbar from "@/components/feed/FeedNavbar";
import EditarUsuarioCard from "@/components/usuario/EditarUsuarioCard";

const meusprodutos = [
    { name: "Brownie", image: "/brownie.jpg", storeLogo: "/globe.svg" },
    { name: "Bola", image: "/bola.jpeg", storeLogo: "/globe.svg" },
    { name: "Quadro", image: "/quadro.jpeg", storeLogo: "/globe.svg" },
    { name: "Brownie", image: "/brownie.jpg", storeLogo: "/globe.svg" },
];

export default function Usuario() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="min-h-screen">

      {/* Navbar */}
      <div className="relative bg-black h-56">
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4"></nav>

        <FeedNavbar />

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
          <img src="usuario.jpeg" alt={User.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Conteúdo bege */}
      <div className="bg-[#F6F3E4] pt-17 px-6">

        {/* Botão Editar Perfil — só aparece se logado */}
        {isLoggedIn && (
          <div className="flex justify-end pr-6 pt-4">
            <EditarUsuarioCard />
          </div>
        )}

        <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
          <ProductsSection products={meusprodutos} />
          <StoreSection />
          <RatingSection />
        </section>

      </div>

    </div>
  );
}