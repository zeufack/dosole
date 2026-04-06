import { Link } from "@tanstack/react-router"
import type { Module } from "#/types"
import { statusIcon } from "./statusIcon"

type ModuleMapProps = {
  modules: Module[]
}

export function ModuleMap({ modules }: ModuleMapProps) {

  return (
    <div className="island-shell p-6 space-y-0">
      {modules.map(module => ((module.status !== 'locked') ? (
        <Link
          key={module.id}
          to="/modules/$moduleId"
          params={{ moduleId: module.id }}
          className="block border-t border-[var(--line)] pt-4 first:border-t-0 first:pt-0"
        >
          <h3>{statusIcon[module.status]} {module.title}</h3>
          <p>{module.description}</p>
          <p>XP Reward: {module.xpReward}</p>
        </Link>
      ) : (
        <div key={module.id} className="border-t border-[var(--line)] pt-4 first:border-t-0 first:pt-0 opacity-50">
          <h3>{statusIcon[module.status]} {module.title}</h3>
          <p>{module.description}</p>
          <p>XP Reward: {module.xpReward}</p>
        </div>
      )))}
    </div>
  )
}