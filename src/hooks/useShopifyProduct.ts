import { useState, useEffect } from "react";
import { fetchProduct, type Product } from "@/lib/shopify";

interface UseShopifyProductResult {
  product: Product | null;
  loading: boolean;
  error: Error | null;
}

export function useShopifyProduct(): UseShopifyProductResult {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProduct() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchProduct();
        if (!cancelled) {
          setProduct(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error("Failed to fetch product"));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      cancelled = true;
    };
  }, []);

  return { product, loading, error };
}
