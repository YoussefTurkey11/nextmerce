"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

type ProductGalleryProps = {
  imageCover: string;
  images: string[];
};

export default function ProductGallery({
  imageCover,
  images,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false);

  const [emblaRef] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  return (
    <div className="grid md:grid-cols-[100px_1fr] gap-4">
      {/* Thumbnails */}
      <div className="hidden md:block">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex flex-col gap-3">
            {images.length > 0
              ? images.map((img, index) =>
                  img ? (
                    <button
                      key={index}
                      onClick={() => onThumbClick(index)}
                      className={`relative w-20 h-20 rounded-md overflow-hidden border 
                      ${selectedIndex === index ? "border-primary" : "border-muted"}`}
                    >
                      <Image
                        src={img}
                        alt="thumb"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ) : null,
                )
              : null}
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div
        className="relative aspect-square w-full h-full rounded-lg overflow-hidden cursor-zoom-in bg-ring/10"
        onClick={() => setOpen(true)}
      >
        {imageCover.length > 0 && imageCover ? (
          <Image
            src={imageCover}
            alt="product"
            fill
            className="object-contain"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Lightbox with Zoom */}
      {images.length > 0 ? (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={images.filter(Boolean).map((img) => ({ src: img }))}
          index={selectedIndex}
          plugins={[Zoom]}
        />
      ) : null}
    </div>
  );
}
