"use client";
import { useEffect, useState } from "react";
import FeedNavbar from "@/components/feed/FeedNavbar";
import ProductusSection from "@/components/produtoEspecifico/ProductsSection";
import ProductDetailsSection from "@/components/produtoEspecifico/ProductDetailsSection";
import RatingSection from "@/components/produtoEspecifico/RatingSection";
 





 const ProdutosLoja = [
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
        name: "retangulo",
        image: "/quadro.jpeg",
        storeLogo: "/globe.svg"
    },
            {
        name: "triangulo",
        image: "/quadro.jpeg",
        storeLogo: "/globe.svg"
    },
];

const produtoAtual = {
    title: "Garrafa da copa",
    rating: 4.99,
    reviewsCount: 99,
    category: "Mercado",
    stock: 90,
    price: "R$299.99",
    images: [
        "/brownie.jpg",
        "/quadro.jpeg", 
        "/bola.jpeg",
        "/globe.svg"
    ],
    isOwner: true,
    isLoggedIn: true,
    storeLogo: "/globe.svg",
    description: {
        subtitle: "Garrafa da copa 1 Litro",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras felis dolor, sollicitudin vel porttitor at, cursus ac justo. Nulla pharetra vitae sapien at efficitur. Maecenas in lobortis dui. Cras interdum malesuada turpis, quis euismod ex efficitur at. Pellentesque venenatis porta nulla, in interdum mauris tempus ac. Integer a erat metus. Proin lacinia ligula id mauris luctus, a venenatis neque venenatis. Praesent et mauris vel mauris dapibus placerat. Nullam rutrum laoreet ipsum, auctor consequat metus posuere ac. Vestibulum tempor sapien sed lacus semper, ac aliquet nibh blandit. Etiam gravida neque vestibulum tortor pellentesque tristique. Praesent nisi nulla, scelerisque bibendum odio in, auctor molestie libero. Integer ac semper velit. Phasellus ac sodales orci. Nullam egestas arcu sem, et aliquam lacus malesuada eu.",
        ingredients: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sollicitudin sem erat, at tristique leo rutrum quis. In eu blandit, ",
        allergens: [
            "CONTÉM ÁGUA.",
            "CONTÉM GARRAFA.",
            "ALÉRGICOS: CONTÉM OVO."
        ]
    }

};


 export default function produtoEspecifico() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

     return (
         <main>
             <FeedNavbar />
             <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">

            <ProductDetailsSection 
                    title={produtoAtual.title}
                    rating={produtoAtual.rating}
                    reviewsCount={produtoAtual.reviewsCount}
                    category={produtoAtual.category}
                    stock={produtoAtual.stock}
                    price={produtoAtual.price}
                    images={produtoAtual.images}
                    storeLogo={produtoAtual.storeLogo}
                    description={produtoAtual.description}
                    isOwner = {false}
                    isLoggedIn = {isLoggedIn}
                />
                
                <RatingSection  />

                <ProductusSection
                    subtitle="Da mesma loja"
                    products={ProdutosLoja}
                />
             </section>
         </main>
     );
 }