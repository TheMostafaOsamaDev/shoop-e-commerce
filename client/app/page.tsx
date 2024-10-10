import MainCarousel from "@/components/carousel/MainCarousel";
import TopSellingProductCard from "@/components/TopSellingProductCard";
import OurProducts from "../components/OurProducts";

export default function Home() {
  return (
    <div className="container">
      <section className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-5 items-center">
        <MainCarousel
          className="overflow-hidden rounded-main"
          height="h-[480px]"
        />
        <TopSellingProductCard height="h-[380px]  !h-[480px]" />
      </section>

      {/* TODO: Add popular products */}
      {/* TODO: Add popular categories */}

      {/* Out Products */}

      <OurProducts />
    </div>
  );
}
