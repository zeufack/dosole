import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/onboarding/')({
    component: OnboardingWelcome,
});

function OnboardingWelcome() {
    return (
        <div>
            <h1>Welcome to Onboarding</h1>
            <p>This is the welcome screen for the onboarding process.</p>
        </div>
    );
}