export interface ProductImage {
  url: string;
  urlLarge: string;
  altText: string;
}

export interface ProductDownload {
  label: string;
  href: string;
}

export interface ProductPurchaseLink {
  region: string;
  href: string;
}

export interface Product {
  title: string;
  price: string;
  purchaseLinks: ProductPurchaseLink[];
  description: string;
  specs: string[];
  shipping: string;
  returns: string;
  downloads: ProductDownload[];
  images: ProductImage[];
}
