import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app/tools')({
  component: Tools,
});

function Tools() {
  return (
    <div className="page-wrap py-8">
      <div className="island-shell p-6">
        <h1>Tools</h1>
        <p>Metronome, note reference, keyboard explorer, and ear trainer will go here.</p>
      </div>
    </div>
  );
}
