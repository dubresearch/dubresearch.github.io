import { useState, type ComponentProps } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download } from "lucide-react";

interface ProductTabsProps {
  descriptionHtml: string;
}

export function ProductTabs({ descriptionHtml }: ProductTabsProps) {
  const tabItems = [
    { value: "description", label: "Description" },
    { value: "specs", label: "Specs" },
    { value: "shipping", label: "Shipping" },
    { value: "returns", label: "Returns" },
    { value: "downloads", label: "Downloads" },
  ];
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
                  <div
                    className="prose prose-invert prose-sm max-w-none text-foreground font-thin"
                    dangerouslySetInnerHTML={{
                      __html: descriptionHtml,
                    }}
                  />
                )}

                {tab.value === "specs" && (
                  <ul className="list-inside list-disc space-y-2 text-foreground font-thin">
                    <li>5 LFO types</li>
                    <li>4 waveforms</li>
                    <li>Built in delay</li>
                    <li>Save presets</li>
                    <li>Micro-USB powered</li>
                    <li>3.5mm stereo output</li>
                  </ul>
                )}

                {tab.value === "shipping" && (
                  <p className="text-foreground font-thin">
                    We are open Tuesday – Friday. Orders ship within 1–2 business
                    days.
                  </p>
                )}

                {tab.value === "returns" && (
                  <p className="text-foreground font-thin">
                    Returns accepted within 14 days of delivery.
                  </p>
                )}

                {tab.value === "downloads" && (
                  <a
                    href="/SSS1_UserManual_V1.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-foreground font-thin underline underline-offset-4 hover:text-muted-foreground"
                  >
                    <Download className="size-3.5" />
                    Download User Manual
                  </a>
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
        <div
          className="prose prose-invert prose-sm max-w-none text-foreground font-thin"
          dangerouslySetInnerHTML={{
            __html: descriptionHtml,
          }}
        />
      </TabsContent>

      <TabsContent value="specs" className="hidden md:block">
        <ul className="list-inside list-disc space-y-2 text-foreground font-thin">
          <li>5 LFO types</li>
          <li>4 waveforms</li>
          <li>Built in delay</li>
          <li>Save presets</li>
          <li>Micro-USB powered</li>
          <li>3.5mm stereo output</li>
        </ul>
      </TabsContent>

      <TabsContent value="shipping" className="hidden md:block min-h-[80px]">
        <p className="text-foreground font-thin">
          We are open Tuesday – Friday. Orders ship within 1–2 business days.
        </p>
      </TabsContent>

      <TabsContent value="returns" className="hidden md:block min-h-[80px]">
        <p className="text-foreground font-thin">
          Returns accepted within 14 days of delivery.
        </p>
      </TabsContent>

      <TabsContent value="downloads" className="hidden md:block min-h-[80px]">
        <a
          href="/SSS1_UserManual_V1.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-foreground font-thin underline underline-offset-4 hover:text-muted-foreground"
        >
          <Download className="size-3.5" />
          Download User Manual
        </a>
      </TabsContent>
    </Tabs>
  );
}
