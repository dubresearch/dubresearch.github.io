const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;

const STOREFRONT_API_URL = `https://${SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;

export interface ProductImage {
  url: string;
  urlLarge: string;
  altText: string | null;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: {
    amount: string;
    currencyCode: string;
  };
}

export interface Product {
  id: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: ProductImage[];
  variants: ProductVariant[];
}

const PRODUCT_QUERY = `
  query GetFirstProduct {
    products(first: 1) {
      edges {
        node {
          id
          title
          description
          descriptionHtml
          images(first: 10) {
            edges {
              node {
                url(transform: { maxWidth: 800, maxHeight: 800 })
                urlLarge: url(transform: { maxWidth: 2000, maxHeight: 2000 })
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;

interface ShopifyResponse {
  data: {
    products: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          description: string;
          descriptionHtml: string;
          images: {
            edges: Array<{
              node: {
                url: string;
                urlLarge: string;
                altText: string | null;
              };
            }>;
          };
          variants: {
            edges: Array<{
              node: {
                id: string;
                title: string;
                price: {
                  amount: string;
                  currencyCode: string;
                };
              };
            }>;
          };
        };
      }>;
    };
  } | null;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: string[];
  }>;
}

export async function fetchProduct(): Promise<Product | null> {
  if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN || !SHOPIFY_STORE_DOMAIN) {
    console.error("Shopify credentials not configured");
    return null;
  }

  try {
    const response = await fetch(STOREFRONT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query: PRODUCT_QUERY }),
    });

    if (!response.ok) {
      throw new Error("HTTP error! status: " + response.status);
    }

    const json: ShopifyResponse = await response.json();
    const productNode = json.data?.products?.edges?.[0]?.node;

    if (!productNode) {
      return null;
    }

    return {
      id: productNode.id,
      title: productNode.title,
      description: productNode.description,
      descriptionHtml: productNode.descriptionHtml,
      images: productNode.images?.edges?.map((edge) => ({
        url: edge.node.url,
        urlLarge: edge.node.urlLarge,
        altText: edge.node.altText,
      })) ?? [],
      variants: productNode.variants?.edges?.map((edge) => edge.node) ?? [],
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export function getCheckoutUrl(variantId: string, quantity: number = 1): string {
  // Convert the GraphQL ID to the numeric ID for the checkout URL
  // GraphQL ID format: gid://shopify/ProductVariant/12345678
  const numericId = variantId.split("/").pop();
  return `https://${SHOPIFY_STORE_DOMAIN}/cart/${numericId}:${quantity}`;
}

export function formatPrice(amount: string, currencyCode: string): string {
  const numAmount = parseFloat(amount);
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode,
  }).format(numAmount);
}
