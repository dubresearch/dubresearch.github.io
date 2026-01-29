import { useEffect, useMemo, useState } from "react";
import type { ProductImage } from "@/lib/shopify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ProductMediaProps {
  images: ProductImage[];
}

type DisplayImage = {
  key: string;
  url: string;
  urlLarge: string;
  altText?: string;
};

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);

    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);

    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

function normalizeImages(images: ProductImage[]): DisplayImage[] {
  if (!images.length) return [];

  return images.map((image, index) => ({
    key: `${image.url}-${index}`,
    url: image.url,
    urlLarge: image.urlLarge ?? image.url,
    altText: image.altText ?? undefined,
  }));
}

function getAltText(image: DisplayImage, index: number) {
  return image.altText?.trim() || `Product image ${index + 1}`;
}

function MediaCarousel({
  images,
  onImageClick,
  setApi,
  aspectClassName = "aspect-square",
  carouselClassName,
  contentClassName,
  itemClassName,
  buttonClassName,
  imageClassName,
}: {
  images: DisplayImage[];
  onImageClick: (index: number) => void;
  setApi?: (api: CarouselApi) => void;
  aspectClassName?: string;
  carouselClassName?: string;
  contentClassName?: string;
  itemClassName?: string;
  buttonClassName?: string;
  imageClassName?: string;
}) {
  return (
    <Carousel className={cn("w-full", carouselClassName)} setApi={setApi}>
      <CarouselContent className={cn("-ml-0", contentClassName)}>
        {images.map((image, index) => (
          <CarouselItem key={image.key} className={cn("pl-0", itemClassName)}>
            <button
              type="button"
              onClick={() => onImageClick(index)}
              className={cn(
                aspectClassName,
                "w-full overflow-hidden rounded-md cursor-zoom-in",
                buttonClassName
              )}
            >
              <img
                src={image.url}
                alt={getAltText(image, index)}
                className={cn(
                  "h-full w-full object-cover object-[center_20%] transition-transform duration-300 scale-110 hover:scale-125",
                  imageClassName
                )}
              />
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

function DesktopMediaCarousel({
  images,
  selectedIndex,
  onImageClick,
  onThumbnailClick,
  setApi,
  onPrev,
  onNext,
  canScrollPrev,
  canScrollNext,
}: {
  images: DisplayImage[];
  selectedIndex: number;
  onImageClick: (index: number) => void;
  onThumbnailClick: (index: number) => void;
  setApi: (api: CarouselApi) => void;
  onPrev: () => void;
  onNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}) {
  const [thumbApi, setThumbApi] = useState<CarouselApi | null>(null);
  const hasMultipleImages = images.length > 1;

  useEffect(() => {
    if (!thumbApi) return;
    thumbApi.scrollTo(selectedIndex);
  }, [thumbApi, selectedIndex]);

  return (
    <div className="hidden md:flex flex-col gap-4">
      <div className="relative">
        <MediaCarousel
          images={images}
          onImageClick={onImageClick}
          setApi={setApi}
          aspectClassName="aspect-[16/9]"
        />
      </div>
      {hasMultipleImages && (
        <div className="relative flex items-center">
          <button
            type="button"
            onClick={onPrev}
            disabled={!canScrollPrev}
            aria-label="Previous image"
            className="absolute -left-8 top-1/2 -translate-y-1/2 inline-flex h-16 w-8 items-center justify-center text-white/80 transition hover:text-white disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <Carousel
            className="w-full"
            opts={{ align: "center", containScroll: "trimSnaps" }}
            setApi={setThumbApi}
          >
            <CarouselContent className="-ml-3 justify-start">
              {images.map((image, index) => (
                <CarouselItem
                  key={image.key}
                  className="pl-3 basis-1/4"
                >
                  <button
                    type="button"
                    onClick={() => onThumbnailClick(index)}
                    aria-label={`View ${getAltText(image, index)}`}
                    aria-current={index === selectedIndex}
                    data-active={index === selectedIndex}
                    className="group relative w-full overflow-hidden rounded-md border border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 data-[active=true]:border-white"
                  >
                    <div className="aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={image.url}
                        alt={getAltText(image, index)}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <button
            type="button"
            onClick={onNext}
            disabled={!canScrollNext}
            aria-label="Next image"
            className="absolute -right-8 top-1/2 -translate-y-1/2 inline-flex h-16 w-8 items-center justify-center text-white/80 transition hover:text-white disabled:opacity-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}

function MobileMediaCarousel({
  images,
  selectedIndex,
  onImageClick,
  setApi,
}: {
  images: DisplayImage[];
  selectedIndex: number;
  onImageClick: (index: number) => void;
  setApi: (api: CarouselApi) => void;
}) {
  const hasMultipleImages = images.length > 1;

  return (
    <div className="flex flex-col gap-3 md:hidden">
      <div className="relative">
        <MediaCarousel
          images={images}
          onImageClick={onImageClick}
          setApi={setApi}
          aspectClassName="aspect-[16/10]"
        />
        {hasMultipleImages && (
          <div
            className="pointer-events-none absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center justify-center gap-2"
            aria-hidden="true"
          >
            {images.map((image, index) => (
              <span
                key={`${image.key}-dot`}
                data-active={index === selectedIndex}
                className="h-1.5 w-1.5 rounded-full bg-white/60 shadow-[0_1px_4px_rgba(0,0,0,0.6)] transition-all duration-200 data-[active=true]:bg-white data-[active=true]:scale-125"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MediaLightbox({
  image,
  altText,
  open,
  onOpenChange,
}: {
  image: DisplayImage | null;
  altText: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[90vw] sm:max-w-[90vw] max-h-[90vh] p-0 bg-transparent ring-0 flex items-center justify-center"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">{altText}</DialogTitle>
        {image && (
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-zoom-out flex items-center justify-center w-full h-full"
          >
            <img
              src={image.urlLarge}
              alt={altText}
              className="max-w-full max-h-[90vh] w-auto h-auto rounded-sm object-contain"
            />
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function ProductMedia({ images }: ProductMediaProps) {
  const displayImages = useMemo(() => normalizeImages(images), [images]);
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [desktopApi, setDesktopApi] = useState<CarouselApi | null>(null);
  const [mobileApi, setMobileApi] = useState<CarouselApi | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    const api = isDesktop ? desktopApi : mobileApi;
    if (!api) return;

    const handleSelect = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    handleSelect();
    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [desktopApi, isDesktop, mobileApi]);

  useEffect(() => {
    if (selectedIndex === null) return;

    const inactiveApi = isDesktop ? mobileApi : desktopApi;
    if (!inactiveApi) return;

    inactiveApi.scrollTo(selectedIndex);
  }, [desktopApi, isDesktop, mobileApi, selectedIndex]);

  if (!displayImages.length) return null;

  const handleThumbnailClick = (index: number) => {
    desktopApi?.scrollTo(index);
  };

  const handlePrev = () => {
    desktopApi?.scrollPrev();
  };

  const handleNext = () => {
    desktopApi?.scrollNext();
  };

  const lightboxAlt =
    expandedIndex !== null && displayImages[expandedIndex]
      ? getAltText(displayImages[expandedIndex], expandedIndex)
      : "Product image";

  return (
    <>
      <DesktopMediaCarousel
        images={displayImages}
        selectedIndex={selectedIndex}
        onImageClick={setExpandedIndex}
        onThumbnailClick={handleThumbnailClick}
        setApi={setDesktopApi}
        onPrev={handlePrev}
        onNext={handleNext}
        canScrollPrev={canScrollPrev}
        canScrollNext={canScrollNext}
      />
      <MobileMediaCarousel
        images={displayImages}
        selectedIndex={selectedIndex}
        onImageClick={setExpandedIndex}
        setApi={setMobileApi}
      />
      <MediaLightbox
        image={expandedIndex !== null ? displayImages[expandedIndex] : null}
        altText={lightboxAlt}
        open={expandedIndex !== null}
        onOpenChange={(open) => !open && setExpandedIndex(null)}
      />
    </>
  );
}
