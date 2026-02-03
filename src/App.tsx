import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { getCheckoutUrl, formatPrice } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductHeader } from "@/components/ProductHeader";
import { ProductTabs } from "@/components/ProductTabs";
import { Footer } from "@/components/Footer";
import { ShoppingCart } from "lucide-react";

const BUY_NOW_OVERRIDE_URL = import.meta.env.VITE_BUY_NOW_URL;
const USE_SHOPIFY_CHECKOUT = import.meta.env.VITE_USE_SHOPIFY_CHECKOUT === "true";

function App() {
  const { product, loading, error } = useShopifyProduct();

  const handleBuyNow = () => {
    if (USE_SHOPIFY_CHECKOUT && product && product.variants.length > 0) {
      const checkoutUrl = getCheckoutUrl(product.variants[0].id);
      window.location.href = checkoutUrl;
      return;
    }

    if (BUY_NOW_OVERRIDE_URL) {
      // Temporary override: redirect Buy Now to non-Shopify URL during exclusivity period.
      window.location.href = BUY_NOW_OVERRIDE_URL;
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
      <div className="mx-auto max-w-3xl px-5 md:px-10 lg:px-0 mb-8">

        {/* Header - mb-20 controls space below header */}
        <header className="text-center mb-8 mt-8 md:mt-12 md:mb-16">
          <h1 className="font-title text-4xl tracking-widest text-foreground md:text-6xl">
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
                <ProductMedia images={product.images} />
                <div className="mb-2 mt-4 md:mb-2 md:mt-6">
                  <ProductHeader
                    title={product.title}
                    price={price}
                    onBuyNow={handleBuyNow}
                  />
                </div>
                <ProductTabs descriptionHtml={product.descriptionHtml} />
                <Button
                  onClick={handleBuyNow}
                  size="xl"
                  className="mt-4 w-full bg-white text-black text-base md:hidden"
                >
                  <ShoppingCart data-icon="inline-start" />
                  Buy Now
                </Button>
              </>
            )}

          {/* Separator - my-x or mt-x / mb-x controls vertical spacing around separator */}
          <Separator className="mt-10 mb-10" />

          <Footer/>
        </main>
      </div>
    </div>
  );
}

export default App;
