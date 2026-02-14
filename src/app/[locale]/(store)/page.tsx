import CategoriesSection from "./_sections/categoriesSection";
import HeroSection from "./_sections/heroSection";
import NewArrivalSection from "./_sections/newArrivalSection";

const Store = () => {
  return (
    <main className="container mx-auto">
      <HeroSection />
      <CategoriesSection />
      <NewArrivalSection />
    </main>
  );
};

export default Store;
