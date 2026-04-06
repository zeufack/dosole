import { createFileRoute } from "@tanstack/react-router";


export const Route = createFileRoute('/onboarding/motivation')({
    component: OnboardingMotivation,
});


function OnboardingMotivation() {
    return (
        <div>
            <h1>Onboarding Motivation</h1>
            <p>This is the motivation screen for the onboarding process.</p>
        </div>
    );
}