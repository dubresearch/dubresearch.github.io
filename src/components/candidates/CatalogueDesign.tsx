import { useEffect, useState } from "react";
import { ProductMedia } from "@/components/ProductMedia";
import { ProductHeader, ShopRegionMenu } from "@/components/ProductHeader";
import { ProductTabs } from "@/components/ProductTabs";
import { ContactDialog } from "@/components/ContactDialog";
import { Footer } from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { product } from "@/content/product";
import fs2FrontPanel from "@/assets/products/fs2/fs2-front-panel.webp";
import type { Product } from "@/types/product";

type RangeProduct = {
  id: "sss1" | "fs2";
  model: string;
  shortName: string;
  actionLabel?: string;
  menuItemSuffix?: string;
  /** Sold directly: the buy button opens a contact form instead of store links. */
  contactForm?: boolean;
  details: Product;
};

const rangeProducts: RangeProduct[] = [
  {
    id: "sss1",
    model: "SSS1",
    shortName: "Sound System Siren",
    details: product,
  },
  {
    id: "fs2",
    model: "FS-2",
    shortName: "New machine",
    contactForm: true,
    details: {
      title: "FS-2",
      price: "£189 / €227",
      purchaseLinks: [],
      description: [
        "The FS-2 is an analog, stereo, multi-mode filter coupled with a spring reverb tank driver. This is designed to be an evolution of the passive altec filters, often paired with spring reverbs, used by many of the dub masters. The filters can be configured in stereo or mono (daisy chained) and filter types are low pass, band pass and high pass, with controls for cutoff and resonance.",
        "The filter section contains an LFO modulator which can be used to control the filter cutoff, with 6 waveforms to choose from, with controls for depth and rate.",
        "The spring reverb driver can be used to drive a wide range of spring reverb tanks, with controls for drive and dry/wet mix. The spring can either be configured in stereo “mix” or mono “full wet” modes. The USB-C power connector can also provide class compliant MIDI over usb, which provides control over all filter and modulation parameters (excluding spring controls).",
      ].join("\n\n"),
      specs: [
        "Analog 12db state variable filters",
        "3 filter types",
        "Stereo or mono configurations",
        "6 modulation waveforms",
        "Drives spring tanks of 8Ω to 800Ω",
        "3.5mm stereo audio I/O",
        "3.5mm mono spring tank I/O",
        "MIDI over USB",
        "USB-C powered (5V 1A)",
      ],
      shipping: "Launch timing and regional availability will be announced soon.",
      returns: "Full purchase and returns information will be available at launch.",
      downloads: [
        {
          label: "Download User Manual",
          href: "/FS2_MANUAL_V1.pdf",
        },
      ],
      images: [
        {
          url: fs2FrontPanel,
          urlLarge: fs2FrontPanel,
          altText: "FS-2 front panel",
        },
      ],
    },
  },
];

function getInitialProductId(): RangeProduct["id"] {
  return new URLSearchParams(window.location.search).get("product") === "fs2"
    ? "fs2"
    : "sss1";
}

function SignalPathProductPicker({ activeProductId, onSelect }: {
  activeProductId: RangeProduct["id"];
  onSelect: (productId: RangeProduct["id"]) => void;
}) {
  return (
    <nav aria-label="Choose a product" className="flex items-center gap-4">
      <span className="shrink-0 text-[0.5625rem] uppercase tracking-[0.16em] text-muted-foreground">
        Select product
      </span>
      <span aria-hidden="true" className="h-px min-w-4 flex-1 bg-border" />
      <div role="group" aria-label="Choose a product" className="flex shrink-0 items-center gap-4 sm:gap-5">
        {rangeProducts.map((rangeProduct) => {
          const selected = rangeProduct.id === activeProductId;

          return (
            <button
              key={rangeProduct.id}
              type="button"
              aria-pressed={selected}
              aria-label={`Show ${rangeProduct.model} ${rangeProduct.shortName}`}
              onClick={() => onSelect(rangeProduct.id)}
              className="group flex min-h-11 items-center gap-2 py-2 text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-1 focus-visible:ring-foreground/70 aria-pressed:text-foreground sm:min-h-0"
            >
              <span aria-hidden="true" className="relative flex size-2.5 items-center justify-center">
                <span className="absolute size-4 rounded-full bg-signal/0 blur-[3px] transition-colors group-aria-pressed:bg-signal/45" />
                <span className="relative size-2 rounded-full border border-muted-foreground/70 bg-background transition-colors group-aria-pressed:border-signal group-aria-pressed:bg-signal" />
              </span>
              <span className="text-xs tracking-[0.12em]">{rangeProduct.model}</span>
              {rangeProduct.id === "fs2" && (
                <span className="border border-signal bg-transparent px-[3px] py-px text-[0.4375rem] font-bold leading-none tracking-[0.1em] text-signal">
                  NEW
                </span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function CatalogueDesign() {
  const [activeProductId, setActiveProductId] =
    useState<RangeProduct["id"]>(getInitialProductId);
  const activeIndex = rangeProducts.findIndex(
    (rangeProduct) => rangeProduct.id === activeProductId,
  );
  const activeProduct = rangeProducts[activeIndex] ?? rangeProducts[0];

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("product", activeProductId);
    url.searchParams.delete("selector");
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
          <section className="mb-4">
            <SignalPathProductPicker activeProductId={activeProductId} onSelect={showProduct} />
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
                action={activeProduct.contactForm ? (
                  <ContactDialog productName={activeProduct.details.title} />
                ) : undefined}
              />
            </div>
            <ProductTabs product={activeProduct.details} />
            {activeProduct.contactForm ? (
              <ContactDialog productName={activeProduct.details.title} mobile />
            ) : (
              <ShopRegionMenu
                purchaseLinks={activeProduct.details.purchaseLinks}
                label={activeProduct.actionLabel}
                menuItemSuffix={activeProduct.menuItemSuffix}
                mobile
              />
            )}
          </div>

          <Separator className="mb-10 mt-10" />
          <Footer />
        </main>
      </div>
    </div>
  );
}
