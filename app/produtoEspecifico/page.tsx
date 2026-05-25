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
    storeLogo: "/globe.svg",
    description: {
        subtitle: "Garrafa da copa 1 Litro",
        text: "garrafa vem com agua",
        ingredients: "agua, tampa, garrafa, ",
        allergens: [
            "CONTÉM ÁGUA.",
            "CONTÉM GARRAFA.",
            "ALÉRGICOS: CONTÉM OVO."
        ]
    }
};

 export default function produtoEspecifico() {
     return (
         <main>
             <FeedNavbar/>
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
                />
                
                <RatingSection />

                <ProductusSection
                    subtitle="Da mesma loja"
                    products={ProdutosLoja}
                />
             </section>
         </main>
     );
 }