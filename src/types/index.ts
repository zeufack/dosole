// Who the user is
  export type UserProfile = {
    id: string
    name: string
    level: number
    xp: number
    xpToNextLevel: number
    streak: number
    goal: string
    xpForCurrentLevel: number
  }

  // One entry in the learning journal
  export type JournalEntry = {
    id: string
    moduleId: string
    moduleTitle: string
    completedAt: string       // ISO date string
    timeSpentMinutes: number
    score: number             // 0–100
    notes?: string            // optional
  }

  // A single module in the map
  export type ModuleStatus = 'locked' | 'unlocked' | 'in-progress' | 'completed'

  export type Module = {
    id: string
    title: string
    description: string
    status: ModuleStatus
    xpReward: number
  }

  // Everything the dashboard needs
  export type DashboardData = {
    user: UserProfile
    journal: JournalEntry[]
    modules: Module[]
    nextModule: Module | null
  }