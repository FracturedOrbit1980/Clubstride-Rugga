import { DrillEditor } from "@/components/drills/drill-editor";
import { PageHeader } from "@/components/layout/page-header";

export const metadata = { title: "Drill editor" };

export default function DrillEditorPage() {
  return (
    <div className="min-w-0 max-w-full overflow-x-hidden">
      <PageHeader
        className="editor-title"
        title="Drill editor and animator toolkit"
        description="The tools sit to the left of the pitch. Undo and redo are there too. Player and opponent colours are at the bottom, and each player is a mannequin."
      />
      <DrillEditor />
    </div>
  );
}
