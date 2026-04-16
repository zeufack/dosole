import { useProgressStore } from '#/store/progress';
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/onboarding/')({
    component: OnboardingWelcome,
    beforeLoad: () => {
      const { hasCompletedOnboarding } = useProgressStore.getState()
      if (hasCompletedOnboarding) {
          throw redirect({ to: '/dashboard' })
      }
  }
});



function OnboardingWelcome() {

    const [name, setName] = useState('');
    const navigate = useNavigate();
    return (
        <div>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
                <button disabled={!name} onClick={() => navigate({ to: `/onboarding/motivation` , search: { name } })}>
                    Continue
                </button>
            <h1>Welcome to Dosol</h1>
            <p>Your step-by-step guide to reading sheet music and playing piano as an adult.</p>
        </div>
    );
}