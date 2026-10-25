import { DrillForm } from "@/components/admin/drill-form";
import { DrillLibrary } from "@/components/drills/drill-library";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Drill library" };

export default function AdminDrillsPage() {
  return (
    <div>
      <PageHeader
        title="Official drill library"
        description="Pick an age and a skill level. Add drills, mark them official, and set the block time."
      />
      <DrillForm />
      <DrillLibrary manageMode showStopwatch />
    </div>
  );
}
