import FeedNavbar from "@/components/feed/FeedNavbar";
import ProductusSection from "@/components/produtoEspecifico/ProductsSection";
import RatingSection from "@/components/produtoEspecifico/RatingSection";
 
 const melhoresAvaliados = [
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
];

 export default function produtoEspecifico() {
     return (
         <main>
             <FeedNavbar/>
             <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
                
                <RatingSection />
                <ProductusSection
                    subtitle="melhores avaliados"
                    products={melhoresAvaliados}
                />
             </section>
         </main>
     );
 }