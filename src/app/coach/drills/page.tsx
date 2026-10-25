import { DrillLibrary } from "@/components/drills/drill-library";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Drills" };

export default function CoachDrillsPage() {
  return (
    <div>
      <PageHeader
        title="Session drills"
        description="Pick an age group, then a skill level. Read what the players do before you open the drill."
      />
      <DrillLibrary />
    </div>
  );
}
