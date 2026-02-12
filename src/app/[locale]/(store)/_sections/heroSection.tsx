import CarouselComponent from "@/components/common/Carousel";

const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {/* Carousel */}
      <div className="col-span-2">
        <CarouselComponent />
      </div>
      <div>d</div>
      <div>d</div>
    </section>
  );
};

export default HeroSection;
