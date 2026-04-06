import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app/achievements')({
  component: Achievements,
});

function Achievements() {
  return (
    <div className="page-wrap py-8">
      <div className="island-shell p-6">
        <h1>Achievements</h1>
        <p>All earned and locked badges will go here.</p>
      </div>
    </div>
  );
}
