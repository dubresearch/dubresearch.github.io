import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductHeader, ShopRegionMenu } from "@/components/ProductHeader";
import { ProductTabs } from "@/components/ProductTabs";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { product } from "@/content/product";
import type { Product } from "@/types/product";

type RangeProduct = {
  id: "sss1" | "dly1";
  sequence: string;
  model: string;
  shortName: string;
  status: "Available now" | "Coming soon";
  actionLabel?: string;
  menuItemSuffix?: string;
  details: Product;
};

const rangeProducts: RangeProduct[] = [
  {
    id: "sss1",
    sequence: "01",
    model: "SSS1",
    shortName: "Sound System Siren",
    status: "Available now",
    details: product,
  },
  {
    id: "dly1",
    sequence: "02",
    model: "DLY1",
    shortName: "Dub Delay Unit",
    status: "Coming soon",
    actionLabel: "Get updates",
    menuItemSuffix: "",
    details: {
      title: "DLY1 'Dub Delay Unit'",
      price: "Coming soon",
      purchaseLinks: [
        {
          region: "Join the release list",
          href: "mailto:researchdub@gmail.com?subject=DLY1%20release%20list",
        },
      ],
      description:
        "The DLY1 is a hands-on performance delay built for feedback rides, deep repeats and controlled chaos. This second machine is a placeholder concept for the prototype, showing how a new product can live in the existing Dub Research design without turning the site into a conventional catalogue.",
      specs: [
        "Tap and free delay time",
        "Saturating feedback path",
        "Stereo input and output",
        "Saveable performance settings",
        "USB-C powered",
      ],
      shipping: "Launch timing and regional availability will be announced soon.",
      returns: "Full purchase and returns information will be available at launch.",
      downloads: [
        {
          label: "Join the DLY1 release list",
          href: "mailto:researchdub@gmail.com?subject=DLY1%20release%20list",
        },
      ],
      images: [...product.images.slice(1), product.images[0]].filter(Boolean),
    },
  },
];

function getInitialProductId(): RangeProduct["id"] {
  return new URLSearchParams(window.location.search).get("product") === "dly1"
    ? "dly1"
    : "sss1";
}

export type ProductPickerVariant = "models" | "index" | "stepper";

function ProductPicker({ activeProductId, onSelect, variant }: {
  activeProductId: RangeProduct["id"];
  onSelect: (productId: RangeProduct["id"]) => void;
  variant: ProductPickerVariant;
}) {
  const activeIndex = rangeProducts.findIndex(({ id }) => id === activeProductId);
  const activeProduct = rangeProducts[activeIndex] ?? rangeProducts[0];

  if (variant === "stepper") {
    const previousProduct = rangeProducts[(activeIndex - 1 + rangeProducts.length) % rangeProducts.length];
    const nextProduct = rangeProducts[(activeIndex + 1) % rangeProducts.length];
    return (
      <nav aria-label="Choose a product" className="flex items-center justify-between border-y border-border py-3">
        <Button variant="ghost" size="sm" onClick={() => onSelect(previousProduct.id)} className="px-0 text-muted-foreground">
          <ArrowLeft data-icon="inline-start" />{previousProduct.model}
        </Button>
        <div className="text-center">
          <p className="text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">Machine {activeProduct.sequence} / 02</p>
          <p className="mt-1 text-sm text-foreground">{activeProduct.model} <span className="hidden text-muted-foreground sm:inline">'{activeProduct.shortName}'</span></p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onSelect(nextProduct.id)} className="px-0 text-muted-foreground">
          {nextProduct.model}<ArrowRight data-icon="inline-end" />
        </Button>
      </nav>
    );
  }

  return (
    <nav aria-label="Choose a product">
      {variant === "index" && (
        <div className="mb-3 flex items-center justify-between text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
          <span>Product index</span><span>01—02</span>
        </div>
      )}
      <ToggleGroup aria-label="Choose a product" value={[activeProductId]}
        onValueChange={(value) => {
          const productId = value[0] as RangeProduct["id"] | undefined;
          if (productId) onSelect(productId);
        }}
        variant="default" spacing={variant === "models" ? 4 : 0}
        className={variant === "models" ? "justify-center" : "w-full border-y border-border"}
      >
        {rangeProducts.map((rangeProduct) => (
          <ToggleGroupItem key={rangeProduct.id} value={rangeProduct.id}
            aria-label={`Show ${rangeProduct.model} ${rangeProduct.shortName}`}
            className={variant === "models"
              ? "h-auto rounded-none border-b border-transparent px-1 py-2 text-muted-foreground data-[state=on]:border-signal data-[state=on]:bg-transparent data-[state=on]:text-foreground"
              : "h-auto flex-1 rounded-none border-r border-border px-4 py-3 last:border-r-0 data-[state=on]:bg-muted/60"}
          >
            <span className="text-[0.625rem] text-muted-foreground">{rangeProduct.sequence}</span>
            <span>{rangeProduct.model}</span>
            {variant === "index" && <span className="hidden text-muted-foreground sm:inline">'{rangeProduct.shortName}'</span>}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </nav>
  );
}

export function CatalogueDesign({ pickerVariant = "models" }: { pickerVariant?: ProductPickerVariant }) {
  const [activeProductId, setActiveProductId] =
    useState<RangeProduct["id"]>(getInitialProductId);
  const activeIndex = rangeProducts.findIndex(
    (rangeProduct) => rangeProduct.id === activeProductId,
  );
  const activeProduct = rangeProducts[activeIndex] ?? rangeProducts[0];

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("product", activeProductId);
    window.history.replaceState({}, "", url);
  }, [activeProductId]);

  const showProduct = (productId: RangeProduct["id"], scroll = false) => {
    setActiveProductId(productId);
    if (scroll) {
      window.requestAnimationFrame(() => {
        document
          .getElementById("product-detail")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <div className="noise-bg min-h-screen bg-background">
      <div className="relative mx-auto mb-8 max-w-3xl px-5 md:px-10 lg:px-0">
        <header className="mb-8 mt-8 text-center md:mb-14 md:mt-12">
          <h1 className="font-title text-4xl tracking-widest text-foreground md:text-6xl">
            DUB RESEARCH
          </h1>
        </header>

        <main>
          <section className="mb-8 md:mb-10">
            <ProductPicker activeProductId={activeProductId} onSelect={showProduct} variant={pickerVariant} />
          </section>

          <div id="product-detail" key={activeProduct.id} className="candidate-enter scroll-mt-16">
            <ProductMedia images={activeProduct.details.images} />
            <div className="mb-2 mt-4 md:mt-6">
              <ProductHeader
                title={activeProduct.details.title}
                price={activeProduct.details.price}
                purchaseLinks={activeProduct.details.purchaseLinks}
                actionLabel={activeProduct.actionLabel}
                menuItemSuffix={activeProduct.menuItemSuffix}
              />
            </div>
            <ProductTabs product={activeProduct.details} />
            <ShopRegionMenu
              purchaseLinks={activeProduct.details.purchaseLinks}
              label={activeProduct.actionLabel}
              menuItemSuffix={activeProduct.menuItemSuffix}
              mobile
            />
          </div>

          <Separator className="mb-10 mt-10" />
          <Footer />
        </main>
      </div>
    </div>
  );
}
