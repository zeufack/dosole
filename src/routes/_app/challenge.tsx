import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app/challenge')({
  component: Challenge,
});

function Challenge() {
  return (
    <div className="page-wrap py-8">
      <div className="island-shell p-6">
        <h1>Timed Challenge</h1>
        <p>Speed drill with personal best tracking will go here.</p>
      </div>
    </div>
  );
}
