import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app/review')({
  component: Review,
});

function Review() {
  return (
    <div className="page-wrap py-8">
      <div className="island-shell p-6">
        <h1>Review Checkpoint</h1>
        <p>Mixed exercises from recent modules will go here.</p>
      </div>
    </div>
  );
}
