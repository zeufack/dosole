import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app/settings')({
  component: Settings,
});

function Settings() {
  return (
    <div className="page-wrap py-8">
      <div className="island-shell p-6">
        <h1>Settings</h1>
        <p>Theme toggle, sound settings, and progress reset will go here.</p>
      </div>
    </div>
  );
}
