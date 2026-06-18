'use client'

import React, { useState, useEffect } from "react";
import ProductsSection from "@/components/feed/ProductsSection";
import StoreSection from "@/components/usuario/StoreSection";
import RatingSection from "@/components/usuario/RatingSection";
import FeedNavbar from "@/components/feed/FeedNavbar";
import EditarUsuarioCard from "@/components/usuario/EditarUsuarioCard";
import CriarLojaModal from "@/components/loja/CriarLojaModal";
import { useRouter } from "next/navigation";

interface UserData {
  id: number;
  name: string;
  username: string;
  email: string;
  profile_picture_url?: string;
}

export default function Usuario() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [ratingComments, setRatingComments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  async function loadStores() {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token!.split('.')[1]));
    const userIdNumber = payload.sub;

    const response = await fetch(`http://localhost:3001/store?user_id=${userIdNumber}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!response.ok) { setStores([]); return; }
    const data = await response.json();
    setStores(Array.isArray(data) ? data : []);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userIdNumber = payload.sub;
    setIsLoggedIn(!!token);

    Promise.all([
      fetch(`http://localhost:3001/user/${userIdNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()),
      fetch(`http://localhost:3001/produtos?user_id=${userIdNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()),
      fetch(`http://localhost:3001/store?user_id=${userIdNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()),
      fetch(`http://localhost:3001/store-ratings?user_id=${userIdNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()),
      fetch(`http://localhost:3001/product-ratings?user_id=${userIdNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()),
]).then(([userData, productsData, storesData, storeRatings, productRatings]) => {
  setUser(userData);
  setProducts(Array.isArray(productsData) ? productsData : []);
  setStores(Array.isArray(storesData) ? storesData : []);
  setRatingComments([
    ...(Array.isArray(storeRatings) ? storeRatings : []),
    ...(Array.isArray(productRatings) ? productRatings : []),
  ]);
});        
}, []); 

  return (
    <>
      <div className="min-h-screen">

        {/* Navbar */}
        <div className="relative bg-black h-56">
          <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4"></nav>

          <FeedNavbar />

          <button className="absolute left-20 bottom-0 text-white cursor-pointer" onClick={() => router.push("/feed")}>
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
          {user && (
            <div className="absolute -bottom-25 left-45 w-50 h-50 rounded-full border-4 border-[#F6F3E4] overflow-hidden">
              <img 
                src={user.profile_picture_url || "/usuario.jpeg"}
                alt={user.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
        </div>

        {/* Conteúdo bege */}
        <div className="bg-[#F6F3E4] pt-5 px-6">

          {user && (
            <div className="ml-16 pt-20 pb-4 pl-30 flex justify-between">
              <div>
                <h1 className="text-3xl font-bold text-black">{user.name}</h1>
                <p className="text-gray-500 text-sm mt-1">@ {user.username}</p>
                <p className="text-gray-500 text-sm mt-1">✉ {user.email}</p>
              </div>

              {isLoggedIn && <EditarUsuarioCard />}
            </div>
          )} 

          <section className="bg-[#F6F3E4] min-h-screen pr-24">
            <ProductsSection products={products} />
            <StoreSection 
              stores={stores}
              showAddButton
              onAddStore={() => setOpenModal(true)}
            />
            {user && <RatingSection 
            ratingComments={ratingComments} 
            userId={user?.id}
            userName={user.name}
            userAvatar={user.profile_picture_url || "/usuario.jpeg"}/> }
          </section>

        </div>

      </div>

      {openModal && (
        <CriarLojaModal
            onClose={() => setOpenModal(false)}
            onStoreCreated={async () => {
              await loadStores();
              setOpenModal(false);
            }}
        />
      )}

    </>
  );
}