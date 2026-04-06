import { useProgressStore } from "#/store/progress";
type HeroCardProps = {
    name: string;
    goal: string;
}

export function HeroCard({ name, goal }: HeroCardProps) {
    const { xp, xpForCurrentLevel, xpForNextLevel, level, streak } = useProgressStore()
    const xpProgress = ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100
    return (<div className="island-shell">
        <p>Welcome back, {name}!</p>
        <p>Level {level} — {xp} / {xpForNextLevel} XP</p>
        <div className="h-2 w-full rounded-full bg-[var(--line)]">
            <div
                className="h-2 rounded-full bg-xp"
                style={{ width: `${xpProgress}%` }}
            />
        </div>
        <p>{goal}</p>
        <p>Current Streak: {streak} days</p>
    </div>);
}