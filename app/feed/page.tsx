import FeedNavbar from "@/components/feed/FeedNavbar";
import Hero from "@/components/feed/Hero";
import SearchBar from "@/components/feed/SearchBar"
import CategoryList from "@/components/feed/CategoryList"
import ProductsSection from "@/components/feed/ProductsSection"

export default function FeedPage() {
    return (
        <main>
            <FeedNavbar/>
            <Hero />

            <section className="bg-[#F6F3E4] min-h-screen py-8 pr-24">
                <SearchBar />
                <CategoryList />
                <ProductsSection />
            </section>
        </main>
    );
}