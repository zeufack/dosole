import type { Module } from "#/types"
import { Link } from "@tanstack/react-router"
import { statusIcon } from "./statusIcon"

type NextModuleCardProps = {
    nextModule: Module | null
}

export function NextModuleCard({ nextModule }: NextModuleCardProps) {
    
    if (!nextModule) {
        return null
    }

    return (
        <div className="island-shell">
            <h2>Next Up</h2>
            <Link
                to="/modules/$moduleId"
                params={{ moduleId: nextModule.id }}
                className="block border-t border-[var(--line)] pt-4 first:border-t-0 first:pt-0"
            >
                <h3>{statusIcon[nextModule.status]} {nextModule.title}</h3>
                <p>{nextModule.description}</p>
                <p>XP Reward: {nextModule.xpReward}</p>
            </Link>
        </div>
    )
}