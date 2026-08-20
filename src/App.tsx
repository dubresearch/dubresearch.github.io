import { useEffect, useState } from "react";
import { CatalogueDesign } from "@/components/candidates/CatalogueDesign";
import { IndexDesign } from "@/components/candidates/IndexDesign";
import { WorkbenchDesign } from "@/components/candidates/WorkbenchDesign";
import { DesignSwitcher, type DesignId } from "@/components/DesignSwitcher";

const designComponents: Record<DesignId, typeof CatalogueDesign> = {
  catalogue: CatalogueDesign,
  index: IndexDesign,
  workbench: WorkbenchDesign,
};

function getInitialDesign(): DesignId {
  const design = new URLSearchParams(window.location.search).get("design");
  return design === "index" || design === "workbench" ? design : "catalogue";
}

function App() {
  const [design, setDesign] = useState<DesignId>(getInitialDesign);
  const ActiveDesign = designComponents[design];

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("design", design);
    window.history.replaceState({}, "", url);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [design]);

  return (
    <>
      <DesignSwitcher value={design} onValueChange={setDesign} />
      <div key={design} className="candidate-enter">
        <ActiveDesign />
      </div>
    </>
  );
}

export default App;
