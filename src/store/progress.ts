import { create } from 'zustand';

type ProgressState = {
    xp: number;
    xpForCurrentLevel: number;
    xpForNextLevel: number;
    level: number;
    streak: number;
    addXp: (amount: number) => void;
}

export const useProgressStore = create<ProgressState>((set) => ({
    xp: 1200,
    addXp: (amount) => set((state) => ({
        xp: state.xp + amount,
    })),
    xpForCurrentLevel: 1000,
    xpForNextLevel: 1500,
    level: 5,
    streak: 7,
}));