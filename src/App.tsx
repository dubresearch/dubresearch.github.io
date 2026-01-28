import { useShopifyProduct } from "@/hooks/useShopifyProduct";
import { getCheckoutUrl, formatPrice } from "@/lib/shopify";
import { Separator } from "@/components/ui/separator";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductHeader } from "@/components/ProductHeader";
import { ProductTabs } from "@/components/ProductTabs";
import { Footer } from "@/components/Footer";

function App() {
  const { product, loading, error } = useShopifyProduct();

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
      <div className="mx-auto max-w-3xl px-2 py-8">
        {/* Header - mb-20 controls space below header */}
        <header className="text-center mb-16">
          <h1 className="font-title text-4xl tracking-wider text-foreground md:text-6xl">
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
                <div className="mb-2 mt-6">
                  <ProductHeader
                    title={product.title}
                    price={price}
                    onBuyNow={handleBuyNow}
                  />
                </div>
                <ProductTabs descriptionHtml={product.descriptionHtml} />
              </>
            )}

          {/* Separator - my-x or mt-x / mb-x controls vertical spacing around separator */}
          <Separator className="mt-8 mb-16" />

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
