import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/Footer";
import type { CatalogProduct } from "@/content/catalog";
import { cn } from "@/lib/utils";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" className="group inline-flex items-center gap-3" aria-label="Dub Research home">
      <img src="/dr.svg" alt="" className="size-8 rounded-sm ring-1 ring-foreground/20 transition group-hover:ring-foreground/60" />
      <span
        className={cn(
          "font-title uppercase tracking-[0.16em] text-foreground",
          compact ? "text-base" : "text-xl sm:text-2xl",
        )}
      >
        Dub Research
      </span>
    </a>
  );
}

export function SiteNav({ count = "02" }: { count?: string }) {
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-5 text-[0.625rem] uppercase tracking-[0.15em] text-muted-foreground sm:gap-7">
      <a href="#products" className="transition-colors hover:text-foreground">
        Products <span className="text-signal">({count})</span>
      </a>
      <a href="#support" className="hidden transition-colors hover:text-foreground sm:inline">
        Support
      </a>
      <a href="#about" className="hidden transition-colors hover:text-foreground sm:inline">
        About
      </a>
    </nav>
  );
}

export function ProductStatus({ status }: { status: CatalogProduct["status"] }) {
  return (
    <Badge variant={status === "Available" ? "default" : "outline"}>
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          status === "Available" ? "bg-signal" : "bg-muted-foreground",
        )}
      />
      {status}
    </Badge>
  );
}

export function ProductAction({ product, label = "View machine" }: { product: CatalogProduct; label?: string }) {
  return (
    <Button
      render={<a href={product.actionHref} target={product.actionHref.startsWith("http") ? "_blank" : undefined} rel={product.actionHref.startsWith("http") ? "noreferrer" : undefined} />}
      variant="outline"
      size="lg"
      className="w-full justify-between sm:w-auto"
    >
      {label}
      <ArrowUpRight data-icon="inline-end" />
    </Button>
  );
}

export function SharedFooter() {
  return (
    <div id="about">
      <Separator className="mb-10" />
      <Footer />
      <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[0.625rem] uppercase tracking-[0.12em] text-muted-foreground">
        <span>Dub Research — Bristol, UK</span>
        <span>Independent audio devices since 2020</span>
      </div>
    </div>
  );
}
