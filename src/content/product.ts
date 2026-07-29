import type { Product, ProductImage } from "@/types/product";

const productImageModules = import.meta.glob<string>(
  "../assets/products/sss1/*.{avif,jpeg,jpg,png,webp}",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
);

function labelFromFilename(path: string) {
  const filename = path.split("/").pop() ?? "product image";
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function imageSortRank(path: string) {
  const filename = path.split("/").pop()?.toLowerCase() ?? "";
  if (filename === "img_2724.webp") return 0;
  if (filename.endsWith(".webp")) return 1;
  return 2;
}

const images: ProductImage[] = Object.entries(productImageModules)
  .sort(([a], [b]) => {
    const rankDifference = imageSortRank(a) - imageSortRank(b);
    if (rankDifference !== 0) return rankDifference;

    return a.localeCompare(b, undefined, { numeric: true });
  })
  .map(([path, url], index) => ({
    url,
    urlLarge: url,
    altText: labelFromFilename(path) || `SSS1 product image ${index + 1}`,
  }));

export const product: Product = {
  title: "SSS1 'Sound System Siren'",
  price: "\u00a3159 / \u20ac189",
  purchaseLinks: [
    {
      region: "UK",
      href: import.meta.env.VITE_BUY_NOW_URL,
    },
    {
      region: "EU",
      href: "https://eu.elevatorsound.com/product/dub-research-sound-system-siren/",
    },
  ],
  description:
    "The SSS1 is a siren FX machine, an extension on the concept of the original NJD siren inna year 3000 style. Siren sounds can be sculpted, saved, triggered and sent to the built in delay. Whilst traditional siren sounds can easily be sculpted, this device will give you further ability to create new and interesting siren sounds, from soft and delicate, to harsh and destructive. The siren is unashamedly digital in design, but with some analog bits along the way. I hope this siren will continue to keep moving sound system fwd!",
  specs: [
    "5 LFO types",
    "4 waveforms",
    "Built in delay",
    "Save presets",
    "Micro-USB powered",
    "3.5mm stereo output",
  ],
  shipping:
    "We are open Tuesday - Friday. Orders ship within 1-2 business days.",
  returns: "Returns accepted within 14 days of delivery.",
  downloads: [
    {
      label: "Download User Manual",
      href: "/SSS1_UserManual_V1.pdf",
    },
    ...(__SSS1_RP2350_FIRMWARE_AVAILABLE__
      ? [
          {
            label: "Download Firmware v2 (RP2350)",
            href: "/sss1_v2_firmware_RP2350.uf2",
          },
        ]
      : []),
    ...(__SSS1_RPI_FIRMWARE_AVAILABLE__
      ? [
          {
            label: "Download Firmware v2 (RPI)",
            href: "/sss1_v2_firmware_RPI.uf2",
          },
        ]
      : []),
  ],
  images,
};
