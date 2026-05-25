"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type DescriptionData = {
    subtitle: string;
    text: string;
    ingredients: string;
    allergens: string[];
};

type ProductDetailsProps = {
    title: string;
    rating: number;
    reviewsCount: number;
    category: string;
    stock: number;
    price: string;
    images: string[];
    storeLogo: string;
    description: DescriptionData;
};

export default function ProductDetailsSection({
    title,
    rating,
    reviewsCount,
    category,
    stock,
    price,
    images,
    storeLogo,
    description
}: ProductDetailsProps) {

    const [mainImage, setMainImage] = useState(images[0]);
    
    const router = useRouter();

    return (
        <div className="relative flex flex-col lg:flex-row gap-12 w-full max-w-6xl mx-auto pl-8 mb-12 ml-20 mr-0">
             
              {/* Botão para voltar */}
            <button 
                onClick={() => router.back()}
                className="absolute -left-10 top-2 text-7xl font-bold text-black hover:text-gray-600 transition"
            >
                &lt;
            </button>

            {/*Lado esquerdo das imagens */}
            <div className="flex gap-4 w-full lg:w-[45%]"> 
                <div className="flex flex-col gap-4">
                    {/*Miniaturas imagens */}
                    {images.map((imgUrl, index) => (
                        <div 
                            key={index} 
                            onClick={() => setMainImage(imgUrl)}
                            className={`bg-white rounded-2xl p-2 w-20 h-20 flex items-center justify-center shadow-sm cursor-pointer transition-all hover:ring-2 hover:ring-purple-500 ${mainImage === imgUrl ? 'ring-2 ring-purple-600' : ''}`}
                        >
                            <img src={imgUrl} alt={`Miniatura ${index + 1}`} className="object-contain max-h-full" />
                        </div>
                    ))}
                </div>
                {/* Imagem maior(selecionada)*/}
                <div className="bg-white rounded-3xl flex-1 flex items-center justify-center p-8 relative shadow-sm">
                    
                    <img src={mainImage} alt={title} className="w-full max-w-sm object-contain" />
                    {/*miniatua da logo */}
                    <img 
                        src={storeLogo} 
                        alt="Logo da Loja" 
                        className="absolute top-6 right-6 w-12 h-12 rounded-full object-cover shadow-md z-10 bg-white"
                    />
                </div>
            </div>

            {/* Lado Direito do texto */}
            <div className="flex flex-col w-full lg:w-[55%]">
                
                <h1 className="text-4xl font-bold text-black mb-2">{title}</h1>
                
                <div className="flex items-center gap-4 text-sm1 mb-5">
                    <span className="flex items-center text-yellow-500">
                        ★ <span className="text-gray-600 ml-1">{rating} | {reviewsCount} reviews</span>
                    </span>
                    <span className="text-purple-600 font-medium">{category}</span>
                    <span className="text-purple-600 font-medium">{stock} disponíveis</span>
                </div>

                <div className=" text-black text-5xl font-semibold mb-5">
                    {price}
                </div>

                <div className="text-black">
                    <h3 className="font-bold text-lg mb-2">Descrição</h3>
                    <p className="text-sm font-semibold text-gray-500 mb-2 uppercase">{description.subtitle}</p>
                    
                    <div className="text-sm space-y-4 text-gray-800 leading-relaxed">
                        <p>{description.text}</p>
                        <p className="font-semibold text-gray-500 mb-2 uppercase">Ingredientes</p>
                        <p>{description.ingredients}</p>
                        <div className="pt-2 text-xs text-gray-500">
                            {description.allergens.map((allergen, index) => (
                                <p key={index}>{allergen}</p>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
}