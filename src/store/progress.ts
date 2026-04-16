import { create } from 'zustand';
import { persist } from 'zustand/middleware'

type ProgressState = {
    xp: number;
    xpForCurrentLevel: number;
    xpForNextLevel: number;
    level: number;
    streak: number;
    name: string;
    goal: string;
    hasCompletedOnboarding: boolean;
    addXp: (amount: number) => void;
    completeOnboarding: (name: string, goal: string) => void;
}

export const useProgressStore = create<ProgressState>()(persist((set) => ({
    xp: 1200,
    addXp: (amount) => set((state) => ({
        xp: state.xp + amount,
    })),
    xpForCurrentLevel: 1000,
    xpForNextLevel: 1500,
    level: 5,
    streak: 7,
    name: '',
    goal: '',
    hasCompletedOnboarding: false,
    completeOnboarding: (name, goal) => set({
        name: name,
        goal: goal,
        hasCompletedOnboarding: true
    })

}), { name: 'dosol-progress' }));