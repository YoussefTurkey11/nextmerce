"use client";
import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

const ScrollUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-15 md:bottom-6 z-1000 right-4 sm:right-10 bg-primary text-background dark:text-foreground p-3 rounded-full shadow-lg transition-opacity duration-300 cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUp size={20} />
    </button>
  );
};

export default ScrollUp;
