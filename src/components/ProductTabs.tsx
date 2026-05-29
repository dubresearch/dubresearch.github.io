import { useState, type ComponentProps } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/types/product";
import { Download } from "lucide-react";

interface ProductTabsProps {
  product: Product;
}

const tabItems = [
  { value: "description", label: "Description" },
  { value: "specs", label: "Specs" },
  { value: "shipping", label: "Shipping" },
  { value: "returns", label: "Returns" },
  { value: "downloads", label: "Downloads" },
];

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("description");
  type AccordionValue = ComponentProps<typeof Accordion>["value"];
  type AccordionOnValueChange = NonNullable<
    ComponentProps<typeof Accordion>["onValueChange"]
  >;
  const [openAccordion, setOpenAccordion] = useState<AccordionValue>([]);
  const handleAccordionChange: AccordionOnValueChange = (value) => {
    const normalizedValue = Array.isArray(value)
      ? value.slice(-1)
      : value
      ? [value]
      : [];
    setOpenAccordion(normalizedValue);
    const nextValue = normalizedValue[0];
    if (typeof nextValue === "string" && nextValue.length > 0) {
      setActiveTab(nextValue);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="md:hidden">
        <Accordion
          value={openAccordion}
          onValueChange={handleAccordionChange}
          className="border-0"
        >
          {tabItems.map((tab) => (
            <AccordionItem key={tab.value} value={tab.value}>
              <AccordionTrigger className="px-0 text-foreground aria-expanded:text-red-400">
                {tab.label}
              </AccordionTrigger>
              <AccordionContent className="px-0">
                {tab.value === "description" && (
                  <p className="text-foreground font-thin">
                    {product.description}
                  </p>
                )}

                {tab.value === "specs" && (
                  <SpecsList specs={product.specs} />
                )}

                {tab.value === "shipping" && (
                  <p className="text-foreground font-thin">
                    {product.shipping}
                  </p>
                )}

                {tab.value === "returns" && (
                  <p className="text-foreground font-thin">
                    {product.returns}
                  </p>
                )}

                {tab.value === "downloads" && (
                  <DownloadsList downloads={product.downloads} />
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mb-2 hidden md:flex">
        <TabsList variant="line" className="w-full justify-start">
          {tabItems.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="description" className="hidden md:block">
        <p className="text-foreground font-thin">{product.description}</p>
      </TabsContent>

      <TabsContent value="specs" className="hidden md:block">
        <SpecsList specs={product.specs} />
      </TabsContent>

      <TabsContent value="shipping" className="hidden md:block min-h-[80px]">
        <p className="text-foreground font-thin">{product.shipping}</p>
      </TabsContent>

      <TabsContent value="returns" className="hidden md:block min-h-[80px]">
        <p className="text-foreground font-thin">{product.returns}</p>
      </TabsContent>

      <TabsContent value="downloads" className="hidden md:block min-h-[80px]">
        <DownloadsList downloads={product.downloads} />
      </TabsContent>
    </Tabs>
  );
}

function SpecsList({ specs }: { specs: string[] }) {
  return (
    <ul className="flex list-inside list-disc flex-col gap-2 text-foreground font-thin">
      {specs.map((spec) => (
        <li key={spec}>{spec}</li>
      ))}
    </ul>
  );
}

function DownloadsList({ downloads }: { downloads: Product["downloads"] }) {
  return (
    <div className="flex flex-col gap-2">
      {downloads.map((download) => (
        <a
          key={download.href}
          href={download.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-foreground font-thin underline underline-offset-4 hover:text-muted-foreground"
        >
          <Download data-icon="inline-start" />
          {download.label}
        </a>
      ))}
    </div>
  );
}
