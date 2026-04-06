import { createFileRoute, Link } from "@tanstack/react-router";
import { statusIcon } from "#/components/dashboard/statusIcon";
import { getModuleById } from "#/data/module";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute('/_app/modules/$moduleId/')({
    loader: async ({ params: { moduleId }, context: { queryClient } }) => {
        await queryClient.ensureQueryData({
            queryKey: ['module', moduleId],
            queryFn: () => getModuleById(moduleId),
        })
    },

    component: Index,
});


function Index() {
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
            <p>{currentModule.description}</p>
            <p>Status: {statusIcon[currentModule.status]}</p>
            <p>XP Reward: {currentModule.xpReward}</p>
            <Link to="/modules/$moduleId/lesson" params={{ moduleId }}>
                Start Lesson
            </Link>
        </div>
    );
}