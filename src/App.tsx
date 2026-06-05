import { Separator } from "@/components/ui/separator";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductHeader, ShopRegionMenu } from "@/components/ProductHeader";
import { ProductTabs } from "@/components/ProductTabs";
import { Footer } from "@/components/Footer";
import { product } from "@/content/product";

function App() {
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
              purchaseLinks={product.purchaseLinks}
            />
          </div>
          <ProductTabs product={product} />
          <ShopRegionMenu purchaseLinks={product.purchaseLinks} mobile />

          <Separator className="mt-10 mb-10" />

          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
