import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductHeader } from "@/components/ProductHeader";
import { ProductTabs } from "@/components/ProductTabs";
import { Footer } from "@/components/Footer";
import { product } from "@/content/product";
import { ShoppingCart } from "lucide-react";

function App() {
  const handleBuyNow = () => {
    if (product.buyUrl) {
      window.location.href = product.buyUrl;
    }
  };

  return (
    <div className="noise-bg min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-5 md:px-10 lg:px-0 mb-8">
        <header className="text-center mb-8 mt-8 md:mt-12 md:mb-16">
          <h1 className="font-title text-4xl tracking-widest text-foreground md:text-6xl">
            DUB RESEARCH
          </h1>
        </header>

        <main>
          <ProductMedia images={product.images} />
          <div className="mb-2 mt-4 md:mb-2 md:mt-6">
            <ProductHeader
              title={product.title}
              price={product.price}
              onBuyNow={handleBuyNow}
              hasBuyUrl={Boolean(product.buyUrl)}
            />
          </div>
          <ProductTabs product={product} />
          <Button
            onClick={handleBuyNow}
            disabled={!product.buyUrl}
            size="xl"
            className="mt-4 w-full bg-white text-base text-black md:hidden"
          >
            <ShoppingCart data-icon="inline-start" />
            Buy Now
          </Button>

          <Separator className="mt-10 mb-10" />

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
