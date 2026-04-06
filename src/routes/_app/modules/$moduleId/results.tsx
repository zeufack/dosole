import { createFileRoute, Link } from "@tanstack/react-router";
import { getModuleById } from "#/data/module";
import { useProgressStore } from "#/store/progress";
import { useEffect } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";


export const Route = createFileRoute('/_app/modules/$moduleId/results')({
    loader: async ({ params: { moduleId }, context: { queryClient } }) => {
        await queryClient.ensureQueryData({
            queryKey: ['module', moduleId],
            queryFn: () => getModuleById(moduleId),
        })
    },
    component: Result,
});

function Result() {
    const { moduleId } = Route.useParams();
    const { data: currentModule } = useSuspenseQuery({
        queryKey: ['module', moduleId],
        queryFn: () => getModuleById(moduleId),
    });
    const { addXp } = useProgressStore();
    useEffect(() => {
        if (currentModule) addXp(currentModule.xpReward)
    }, []);

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
            <h1>Results</h1>
            <p>Module: {currentModule.title}</p>
            <p>This is the results screen. Feedback and scoring will go here.</p>
            <p>Score: 85%</p>
            <p>XP Earned: {currentModule.xpReward}</p>
            <Link to="/dashboard" className="mt-4 inline-block text-[var(--lagoon-deep)]">
                Back to Dashboard
            </Link>
            <Link to="/modules/$moduleId/exercise" params={{ moduleId }} className="mt-4 inline-block text-[var(--lagoon-deep)]">
                Retry Exercise
            </Link>
        </div>
    );
}