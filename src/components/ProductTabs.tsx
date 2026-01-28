import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const activeTabLabel =
    tabItems.find((tab) => tab.value === activeTab)?.label ?? "Select section";
  const handleSelectChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <div className="mb-2 md:hidden">
        <Select value={activeTab} onValueChange={handleSelectChange}>
          <SelectTrigger className="!h-8 w-full justify-between border-foreground !bg-transparent text-foreground text-sm font-medium">
            <SelectValue className="text-red-400">
              {activeTabLabel}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {tabItems.map((tab) => (
              <SelectItem key={tab.value} value={tab.value}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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

      <TabsContent value="description">
        <div
          className="prose prose-invert prose-sm max-w-none text-foreground font-thin"
          dangerouslySetInnerHTML={{
            __html: descriptionHtml,
          }}
        />
      </TabsContent>

      <TabsContent value="specs">
        <ul className="list-inside list-disc space-y-2 text-foreground font-thin">
          <li>5 LFO types</li>
          <li>4 waveforms</li>
          <li>Built in delay</li>
          <li>Save presets</li>
          <li>Micro-USB powered</li>
          <li>3.5mm stereo output</li>
        </ul>
      </TabsContent>

      <TabsContent value="shipping">
        <p className="text-foreground font-thin">
          We are open Tuesday – Friday. Orders ship within 1–2 business days.
        </p>
      </TabsContent>

      <TabsContent value="returns">
        <p className="text-foreground font-thin">
          Returns accepted within 14 days of delivery.
        </p>
      </TabsContent>

      <TabsContent value="downloads">
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
