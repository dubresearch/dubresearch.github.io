import { useState } from "react";
import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { getCheckoutUrl, formatPrice } from "@/lib/shopify";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Download } from "lucide-react";

function App() {
  const { product, loading, error } = useShopifyProduct();
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);

  const handleBuyNow = () => {
    if (product && product.variants.length > 0) {
      const checkoutUrl = getCheckoutUrl(product.variants[0].id);
      window.location.href = checkoutUrl;
    }
  };

  const price =
    product && product.variants.length > 0
      ? formatPrice(
          product.variants[0].price.amount,
          product.variants[0].price.currencyCode
        )
      : null;

  return (
    <div className="noise-bg min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-8">
        {/* Header - mb-20 controls space below header */}
        <header className="mb-20 mt-12 text-center">
          <h1 className="font-title text-4xl tracking-wider text-foreground md:text-5xl">
            DUB RESEARCH
          </h1>
        </header>

        {/* Main Content */}
        <main>
          {loading && (
            <div className="py-20 text-center text-muted-foreground">
              Loading...
            </div>
          )}

          {error && (
            <div className="py-20 text-center text-destructive">
              Failed to load product. Please try again later.
            </div>
          )}

          {product && (
            <>
              {/* Product Title */}
              <h2 className="mb-4 text-center text-xl text-foreground">
                {product.title}
              </h2>

              {/* Product Image Carousel */}
              <div className="mb-8 px-2">
                <Carousel className="w-full">
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <button
                          type="button"
                          onClick={() => setExpandedImageIndex(index)}
                          className="aspect-video w-full overflow-hidden rounded-sm cursor-zoom-in"
                        >
                          <img
                            src={image.url}
                            alt={image.altText || `Product image ${index + 1}`}
                            className="h-full w-full object-cover object-[center_15%] transition-transform duration-300 hover:scale-105"
                          />
                        </button>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              {/* Expanded Image Dialog */}
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
                      ? product.images[expandedImageIndex]?.altText ||
                        `Product image ${expandedImageIndex + 1}`
                      : "Product image"}
                  </DialogTitle>
                  {expandedImageIndex !== null && product.images[expandedImageIndex] && (
                    <button
                      type="button"
                      onClick={() => setExpandedImageIndex(null)}
                      className="cursor-zoom-out flex items-center justify-center"
                    >
                      <img
                        src={product.images[expandedImageIndex].urlLarge}
                        alt={
                          product.images[expandedImageIndex].altText ||
                          `Product image ${expandedImageIndex + 1}`
                        }
                        className="max-w-full max-h-[90vh] w-auto h-auto rounded-sm object-contain"
                      />
                    </button>
                  )}
                </DialogContent>
              </Dialog>

              {/* Tabs and Buy Section */}
              <div className="mb-8">
                <Tabs defaultValue="description">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
                    <TabsList variant="line">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="specs">Specs</TabsTrigger>
                      <TabsTrigger value="shipping">Shipping</TabsTrigger>
                      <TabsTrigger value="returns">Returns</TabsTrigger>
                      <TabsTrigger value="downloads">Downloads</TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-4">
                      {price && (
                        <span className="text-sm text-foreground">{price}</span>
                      )}
                      <Button
                        onClick={handleBuyNow}
                        size="default"
                        variant="outline"
                        className="border-foreground text-foreground font-medium hover:!bg-foreground/10 text-sm"
                      >
                        <ShoppingCart data-icon="inline-start" />
                        Buy Now
                      </Button>
                    </div>
                  </div>

                  <TabsContent value="description" className="pt-4">
                    <div className="px-1">
                      <div
                        className="prose prose-invert prose-sm max-w-none text-foreground font-thin"
                        dangerouslySetInnerHTML={{
                          __html: product.descriptionHtml,
                        }}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="specs" className="pt-4">
                    <div className="px-1">
                      <ul className="space-y-2 text-foreground font-thin">
                        <li>- 5 LFO types</li>
                        <li>- 4 waveforms</li>
                        <li>- Built in delay</li>
                        <li>- Save presets</li>
                        <li>- Micro-USB powered</li>
                        <li>- 3.5mm stereo output</li>
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="shipping" className="pt-4">
                    <div className="px-1">
                      <p className="text-foreground font-thin">
                        We are open Tuesday – Friday. Orders ship within 1–2
                        business days.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="returns" className="pt-4">
                    <div className="px-1">
                      <p className="text-foreground font-thin">
                        Returns accepted within 14 days of delivery.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="downloads" className="pt-4">
                    <div className="px-1">
                        <a
                          href="/SSS1_UserManual_V1.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-foreground underline underline-offset-4 hover:text-muted-foreground font-thin"
                        >
                          <Download className="size-3.5" />
                          Download User Manual
                        </a>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </>
          )}

          {/* Separator - my-x or mt-x / mb-x controls vertical spacing around separator */}
          <Separator className="mt-12 mb-20" />

          {/* Footer Sections */}
          <footer className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
            {/* About Us */}
            <section className="md:justify-self-end">
              <h3 className="mb-4 text-base font-semibold text-foreground">
                About Us
              </h3>
              <p className="text-sm font-thin text-foreground">
                We are a small independent company. We aim to provide you with
                quality, affordable, interesting audio devices. So we can pay
                our rent.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h3 className="mb-4 text-base font-semibold text-foreground">
                Contact
              </h3>
              <div className="space-y-1 text-sm font-thin text-foreground">
                <p>
                  Email: researchdub[at]gmail.com
                </p>
                <p>Location: Bristol, UK</p>
              </div>
            </section>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
