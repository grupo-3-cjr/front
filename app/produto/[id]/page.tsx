"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import FeedNavbar from "@/components/feed/FeedNavbar";
import ProductusSection from "@/components/produtoEspecifico/ProductsSection";
import ProductDetailsSection from "@/components/produtoEspecifico/ProductDetailsSection";
import RatingSection from "@/components/produtoEspecifico/RatingSection";
 

export default function ProdutoEspecifico(){
    const params = useParams();
    const productId = params?.id

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [produtoAtual, setProdutoAtual] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [produtosLoja, setProdutosLoja] = useState([]);


    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const token = localStorage.getItem("token");
                let loggedUserId = null;
                if (token) {
                    setIsLoggedIn(true);
                    
                    //  Decodificando o token para descobrir quem está logado
                    try {
                        const payload = JSON.parse(atob(token.split('.')[1]));
                        loggedUserId = Number(payload.sub); 
                    } catch (e) {
                        console.error("Erro ao decodificar o token", e);
                    }
                }

                const headers = token ? { Authorization: `Bearer ${token}` } : {};

                // requisição para o back
                const response = await fetch(`http://localhost:3001/produtos/${productId}`, { headers });
                if (!response.ok) {
                    const textoErro = await response.text();
                    console.error("Status:", response.status);
                    console.error(" Texto erro:", textoErro);
                    setIsLoading(false);
                    return; 
                }

                const produtoPrisma = await response.json();

                if (produtoPrisma) {
                    //Calculando a média de avaliações 
                    const totalRatings = produtoPrisma.productRating?.length || 0; 
                    const somaRatings = produtoPrisma.productRating?.reduce((acc, curr) => acc + curr.rating, 0) || 0;
                    const mediaRating = totalRatings > 0 ? (somaRatings / totalRatings).toFixed(2) : 0;

                    // transformando no formato que a tela pede
                    const produtoFormatado = {
                        id: produtoPrisma.id,
                        title: produtoPrisma.name,
                        rating: Number(mediaRating),
                        reviewsCount: totalRatings,
                        category: produtoPrisma.category?.name || "Sem categoria",
                        stock: produtoPrisma.stock,
                        price: `R$ ${Number(produtoPrisma.price).toFixed(2)}`,
                        images: produtoPrisma.productImage?.map(img => img.image_url) || [],
                        storeLogo: produtoPrisma.store?.logo_url || "/globe.svg",
                        isOwner: loggedUserId === produtoPrisma.store?.user_id,
                        
                        
                        // descrição
                        description: {
                            subtitle: produtoPrisma.name,
                            text: produtoPrisma.description, 
                            ingredients: "", // vazio por enquanto 
                            allergens: []    // vazio por enquanto 
                        },

                        ratings: produtoPrisma.productRating?.map((avaliacao) => ({
                        id: avaliacao.id,
                        // Navega até o usuário para pegar a foto e o nome
                        avatar_url: avaliacao.user?.profile_picture_url || "/globe.svg", 
                        name: avaliacao.user?.name || "Usuário",
                        text: avaliacao.comment, 
                        rating: avaliacao.rating,
                       isOwner: loggedUserId === avaliacao.user_id
                    })) || []
                    };

                    setProdutoAtual(produtoFormatado);

                    const produtosRes = await fetch(`http://localhost:3001/produtos`, { headers });
                    const todosProdutos = await produtosRes.json();

                    if (Array.isArray(todosProdutos)) {
                        const produtosFiltrados = todosProdutos
                            // Pega só os da mesma loja 
                            .filter(p => p.store_id === produtoPrisma.store_id && p.id !== produtoPrisma.id)
                            // Formata 
                            .map(p => ({
                                id: p.id,
                                name: p.name,
                                description: p.description,
                                price: `R$ ${Number(p.price).toFixed(2)}`,
                                stock: p.stock,
                                image: p.productImage && p.productImage.length > 0 ? p.productImage[0].image_url : "https://placehold.co/400x400?text=Sem+Foto"
                            }));

                        setProdutosLoja(produtosFiltrados);
                    }

                }
            } catch (error) {
                console.error("Erro ao buscar produto:", error);
            } finally {
                setIsLoading(false);
            }
        };
        
       if (productId) {
            fetchProduto();
        }
    }, [productId]);

    if (isLoading) return <p>Carregando...</p>;
    if (!produtoAtual) return <p>Produto não encontrado.</p>;
    
     return (
         <main>
             <FeedNavbar />
             <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">

            <ProductDetailsSection 
                    id ={produtoAtual.id}
                    title={produtoAtual.title} 
                    rating={produtoAtual.rating}
                    reviewsCount={produtoAtual.reviewsCount}
                    category={produtoAtual.category}
                    stock={produtoAtual.stock}
                    price={produtoAtual.price}
                    images={produtoAtual.images}
                    storeLogo={produtoAtual.storeLogo}
                    description={produtoAtual.description}
                    isOwner={produtoAtual.isOwner} 
                    isLoggedIn={isLoggedIn}
                    productId={productId}
                />
                
                <RatingSection 
                ratingComments={produtoAtual.ratings} 
                productId={productId}
                />

                <ProductusSection
                    subtitle="Da mesma loja"
                    products={produtosLoja}
                />
             </section>
         </main>
     );
 }