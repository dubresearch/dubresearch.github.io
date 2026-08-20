import { product } from "@/content/product";

export type CatalogProduct = {
  id: string;
  model: string;
  name: string;
  fullName: string;
  price: string;
  status: "Available" | "Coming soon";
  sequence: string;
  description: string;
  features: string[];
  image: string;
  alt: string;
  actionHref: string;
};

const [heroImage, studioImage, frontImage] = product.images;

export const catalogProducts: CatalogProduct[] = [
  {
    id: "sss1",
    model: "SSS1",
    name: "Sound System Siren",
    fullName: product.title,
    price: product.price,
    status: "Available",
    sequence: "01",
    description:
      "A hands-on digital siren with four save slots, sculptable modulation and a built-in delay.",
    features: ["4 waveforms", "5 LFO types", "Built-in delay"],
    image: heroImage?.url ?? studioImage?.url ?? "",
    alt: heroImage?.altText ?? "SSS1 Sound System Siren",
    actionHref: "https://eu.elevatorsound.com/product/dub-research-sound-system-siren/",
  },
  {
    id: "dly1",
    model: "DLY1",
    name: "Dub Delay Unit",
    fullName: "DLY1 'Dub Delay Unit'",
    price: "Price TBA",
    status: "Coming soon",
    sequence: "02",
    description:
      "A performance delay concept built for fast feedback rides, springy repeats and controlled chaos.",
    features: ["Tap / free time", "Drive circuit", "Preset recall"],
    image: studioImage?.url ?? frontImage?.url ?? heroImage?.url ?? "",
    alt: "Placeholder photography for the upcoming DLY1 Dub Delay Unit",
    actionHref: "mailto:researchdub@gmail.com?subject=DLY1%20release%20list",
  },
];
