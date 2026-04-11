import { Metronome } from "#/components/Tools/Metronome";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app/tools')({
  component: Tools,
});

function Tools() {
  return (
    <div className="page-wrap py-8">
      <div className="island-shell p-6">
        <h1>Tools</h1>
        <Metronome />
      </div>
    </div>
  );
}
