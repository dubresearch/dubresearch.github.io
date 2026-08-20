import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type DesignId = "catalogue" | "index" | "workbench";

const designs: { id: DesignId; shortLabel: string; label: string }[] = [
  { id: "catalogue", shortLabel: "A", label: "Models" },
  { id: "index", shortLabel: "B", label: "Index" },
  { id: "workbench", shortLabel: "C", label: "Stepper" },
];

export function DesignSwitcher({
  value,
  onValueChange,
}: {
  value: DesignId;
  onValueChange: (value: DesignId) => void;
}) {
  return (
    <aside className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-12 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <div className="hidden items-baseline gap-3 sm:flex">
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-foreground">
            Prototype view
          </span>
          <span className="text-[0.625rem] text-muted-foreground">
            Current+ picker variations
          </span>
        </div>

        <ToggleGroup
          aria-label="Choose a design candidate"
          value={[value]}
          onValueChange={(nextValue) => {
            const nextDesign = nextValue[0] as DesignId | undefined;
            if (nextDesign) onValueChange(nextDesign);
          }}
          variant="outline"
          spacing={0}
          size="sm"
          className="w-full sm:w-fit"
        >
          {designs.map((design) => (
            <ToggleGroupItem
              key={design.id}
              value={design.id}
              aria-label={`Show ${design.label} design`}
              className="flex-1 gap-1.5 px-3 sm:flex-none"
            >
              <span aria-hidden="true">{design.shortLabel}</span>
              <span className="hidden sm:inline">{design.label}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </aside>
  );
}
