import { createFileRoute, Link } from "@tanstack/react-router";
import { getModuleById } from "#/data/module";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute('/_app/modules/$moduleId/lesson')({
  loader: async ({ params: { moduleId }, context: { queryClient } }) => {
    await queryClient.ensureQueryData({
      queryKey: ['module', moduleId],
      queryFn: () => getModuleById(moduleId),
    });
  },
  component: Lesson,
});

function Lesson() {
  const { moduleId } = Route.useParams();
  const { data: currentModule } = useSuspenseQuery({
    queryKey: ['module', moduleId],
    queryFn: () => getModuleById(moduleId),
  });

  if (!currentModule) {
    return (
      <div>
        <h1>Module Not Found</h1>
        <p>The module with ID "{moduleId}" does not exist.</p>
      </div>
    );
  }

  return (
    <div className="island-shell p-6">
      <h1>{currentModule.title}</h1>
      <div>
        <p>Lesson content will go here. VexFlow notation coming soon.</p>
      </div>
      <Link to="/modules/$moduleId/exercise" params={{ moduleId }}>
        Go to Exercise
      </Link>
      <Link to="/modules/$moduleId" params={{ moduleId }}>
        ← Back to module
      </Link>
    </div>
  );
}
