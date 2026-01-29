import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductHeaderProps {
  title: string;
  price: string | null;
  onBuyNow: () => void;
}

export function ProductHeader({ title, price, onBuyNow }: ProductHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
      {/* Product Title */}
      <h2 className="w-full text-left text-xl text-foreground md:w-auto">
        {title}
      </h2>

      {/* Product Price & Buy Now Button */}
      <div className="flex w-full md:w-auto md:justify-end">
        <div className="inline-flex items-center gap-4">
          {price && <span className="text-sm text-muted-foreground">{price}</span>}

          <Button
            onClick={onBuyNow}
            size="default"
            variant="outline"
            className="hidden border-foreground text-foreground font-medium text-xs hover:!bg-foreground hover:!text-black md:inline-flex md:text-sm"
          >
            <ShoppingCart data-icon="inline-start" />
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
