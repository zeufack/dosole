import { useProgressStore } from "#/store/progress";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";


export const Route = createFileRoute('/onboarding/motivation')({
    validateSearch: (search) => ({
        name: String(search.name ?? ''),
    }),
    beforeLoad: ({ search }) => {
        if (!search.name) {
            throw redirect({ to: '/onboarding' })
        }
    },
    component: OnboardingMotivation,
});


function OnboardingMotivation() {
    const { name } = Route.useSearch()
    const [goal, setGoal] = useState('')
    const completeOnboarding = useProgressStore(s => s.completeOnboarding)
    const navigate = useNavigate()

    const handleConfirm = () => {
          completeOnboarding(name, goal)
          navigate({ to: '/dashboard' })
      }

    const goals = [
        'Learn to read sheet music',
        'Play my favorite songs',
        'Improve my piano skills',
        'Other'
    ];

    return (
        <div>
            <h1>Onboarding Motivation</h1>
            <p>What is your goal for learning piano?</p>
            {goals.map((g) => (
                <button
                    key={g}
                    onClick={() => setGoal(g)}
                    className={goal === g ? 'ring-2' : ''}
                >
                    {g}
                </button>
            ))}
            <button onClick={handleConfirm} disabled={!goal}>
                Confirm
            </button>
        </div>
    );
}