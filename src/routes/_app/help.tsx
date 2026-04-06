import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute('/_app/help')({
  component: Help,
});

function Help() {
  return (
    <div className="page-wrap py-8">
      <div className="island-shell p-6">
        <h1>Help & FAQ</h1>
        <p>Frequently asked questions and support resources will go here.</p>
      </div>
    </div>
  );
}
