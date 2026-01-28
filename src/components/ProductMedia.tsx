import { useState } from "react";
import type { ProductImage } from "@/lib/shopify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface ProductMediaProps {
  images: ProductImage[];
}

export function ProductMedia({ images }: ProductMediaProps) {
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);

  return (
    <>
        <Carousel className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <button
                  type="button"
                  onClick={() => setExpandedImageIndex(index)}
                  className="aspect-video w-full overflow-hidden rounded-sm cursor-zoom-in"
                >
                  <img
                    src={image.url}
                    alt={image.altText || `Product image ${index + 1}`}
                    className="h-full w-full object-cover object-[center_20%] transition-transform duration-300 scale-115 hover:scale-125"
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

      <Dialog
        open={expandedImageIndex !== null}
        onOpenChange={(open) => !open && setExpandedImageIndex(null)}
      >
        <DialogContent
          className="max-w-[90vw] sm:max-w-[90vw] max-h-[90vh] p-0 bg-transparent ring-0"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">
            {expandedImageIndex !== null
              ? images[expandedImageIndex]?.altText ||
                `Product image ${expandedImageIndex + 1}`
              : "Product image"}
          </DialogTitle>
          {expandedImageIndex !== null && images[expandedImageIndex] && (
            <button
              type="button"
              onClick={() => setExpandedImageIndex(null)}
              className="cursor-zoom-out flex items-center justify-center"
            >
              <img
                src={images[expandedImageIndex].urlLarge}
                alt={
                  images[expandedImageIndex].altText ||
                  `Product image ${expandedImageIndex + 1}`
                }
                className="max-w-full max-h-[90vh] w-auto h-auto rounded-sm object-contain"
              />
            </button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
