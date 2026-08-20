import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ProductPurchaseLink } from "@/types/product";
import { ChevronDown, ExternalLink, ShoppingCart } from "lucide-react";

interface ProductHeaderProps {
  title: string;
  price: string;
  purchaseLinks: ProductPurchaseLink[];
  actionLabel?: string;
  menuItemSuffix?: string;
}

interface ShopRegionMenuProps {
  purchaseLinks: ProductPurchaseLink[];
  mobile?: boolean;
  label?: string;
  menuItemSuffix?: string;
}

export function ShopRegionMenu({
  purchaseLinks,
  mobile = false,
  label = "Buy from",
  menuItemSuffix = "store",
}: ShopRegionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const hasLinks = purchaseLinks.some((link) => link.href);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className={
        mobile ? "relative mt-4 md:hidden" : "relative hidden w-max md:block"
      }
    >
      <Button
        aria-expanded={isOpen}
        disabled={!hasLinks}
        onClick={() => setIsOpen((open) => !open)}
        size={mobile ? "xl" : "default"}
        style={
          isOpen
            ? {
                backgroundColor: "#ffffff",
                color: "#000000",
              }
            : undefined
        }
        variant="outline"
        className={cn(
          mobile
            ? "relative w-full justify-center border-foreground bg-transparent px-4 text-base text-foreground hover:!bg-foreground hover:!text-black"
            : "border-foreground text-foreground font-medium text-xs hover:!bg-foreground hover:!text-black md:text-sm",
        )}
      >
        <span className={mobile ? "flex items-center gap-2" : "contents"}>
          <ShoppingCart data-icon="inline-start" className="mr-0.5" />
          <span>{label}</span>
        </span>
        <ChevronDown
          data-icon="inline-end"
          className={mobile ? "absolute right-4" : ""}
        />
      </Button>

      {mobile ? (
        <div
          className={cn(
            "grid overflow-hidden transition-[grid-template-rows,opacity,margin-top] duration-150 ease-out",
            isOpen ? "mt-1 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0 overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-background">
            {purchaseLinks.map((link) => (
              <a
                key={link.region}
                href={link.href}
                className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2 text-sm last:border-b-0 hover:bg-muted"
              >
                <span>{[link.region, menuItemSuffix].filter(Boolean).join(" ")}</span>
                <ExternalLink data-icon="inline-end" className="size-3" />
              </a>
            ))}
          </div>
        </div>
      ) : isOpen ? (
        <div className="absolute left-0 top-full mt-1 w-full overflow-hidden rounded-md border border-border bg-popover text-popover-foreground shadow-lg ring-1 ring-background">
          {purchaseLinks.map((link) => (
            <a
              key={link.region}
              href={link.href}
              className="flex items-center justify-between gap-3 border-b border-border/60 px-3 py-2 text-sm last:border-b-0 hover:bg-muted"
            >
              <span>{[link.region, menuItemSuffix].filter(Boolean).join(" ")}</span>
              <ExternalLink data-icon="inline-end" className="size-3" />
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProductHeader({
  title,
  price,
  purchaseLinks,
  actionLabel,
  menuItemSuffix,
}: ProductHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      <h2 className="w-full text-left text-xl text-foreground md:w-auto">
        {title}
      </h2>

      <div className="flex w-full md:w-auto md:justify-end">
        <div className="inline-flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{price}</span>
          <ShopRegionMenu
            purchaseLinks={purchaseLinks}
            label={actionLabel}
            menuItemSuffix={menuItemSuffix}
          />
        </div>
      </div>
    </div>
  );
}
