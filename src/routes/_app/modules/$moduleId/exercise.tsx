import { createFileRoute, Link } from "@tanstack/react-router";
import { getModuleById } from "#/data/module";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";


export const Route = createFileRoute('/_app/modules/$moduleId/exercise')({
    loader: async ({ params: { moduleId }, context: { queryClient } }) => {
        await queryClient.ensureQueryData({
            queryKey: ['module', moduleId],
            queryFn: () => getModuleById(moduleId),
        })
    },
    component: Exercise,
});

function Exercise() {
    const { moduleId } = Route.useParams();
    const [showFeedback, setShowFeedback] = useState(false)
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
            <h1>Exercise</h1>
            <p>Module: {currentModule.title}</p>
            <p>This is the exercise screen.</p>
            <button onClick={() => setShowFeedback(true)} className="mt-4 px-4 py-2 bg-[var(--lagoon-deep)] text-white rounded">
                Submit Exercise
            </button>
            {showFeedback && (
                <div>
                    <p>Great job!</p>
                    <Link to="/modules/$moduleId/results" params={{ moduleId }}>Continue</Link>
                    <button onClick={() => setShowFeedback(false)}>Try Again</button>
                </div>
            )}
            <Link to="/modules/$moduleId/lesson" params={{ moduleId }} className="mt-4 inline-block text-[var(--lagoon-deep)]">
                ← Back to Lesson
            </Link>
        </div>
    );
}