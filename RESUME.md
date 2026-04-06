# Resume Prompt

Paste this into a new Claude Code conversation to continue exactly where we left off:

---

I'm building **Dosol** — a piano learning web app MVP — with TanStack Start + React + TypeScript + Tailwind CSS 4.

I'm also learning TanStack Start as I build. My learning rules:
1. Explain every concept before writing code
2. After each file created, explain WHY it's structured that way
3. Ask me to explain things back to check my understanding
4. Give mini challenges after each section
5. Go step by step — don't build too many things at once
6. Don't create files — ask me to create them, then review my work like a mentor
7. Keep frontend best practices throughout
8. Don't make design decisions without a design system in place
9. If a task is purely mechanical repetition with no new concepts, do it directly

## Route structure (complete)

```
src/routes/
  __root.tsx                          ← HTML shell, QueryClientProvider, theme script
  index.tsx                           → / (redirects to /dashboard)
  onboarding/
    index.tsx                         → /onboarding (placeholder)
    motivation.tsx                    → /onboarding/motivation (placeholder)
  _app.tsx                            ← pathless layout: Header + Outlet + Footer
  _app/
    dashboard.tsx                     → /dashboard ✅ fully built
    modules/
      $moduleId/
        index.tsx                     → /modules/:moduleId ✅ built
        lesson.tsx                    → /modules/:moduleId/lesson ✅ built
        exercise.tsx                  → /modules/:moduleId/exercise ✅ built
        results.tsx                   → /modules/:moduleId/results ✅ built
    review.tsx                        → /review (placeholder)
    challenge.tsx                     → /challenge (placeholder)
    achievements.tsx                  → /achievements (placeholder)
    tools.tsx                         → /tools (placeholder)
    settings.tsx                      → /settings (placeholder)
    help.tsx                          → /help (placeholder)
```

## Architecture

### Data flow
```
loader (params + context.queryClient)
  → queryClient.ensureQueryData({ queryKey, queryFn })
  → warms cache on server (SSR) or client (navigation)

component
  → useSuspenseQuery({ queryKey, queryFn })
  → reads from cache — no duplicate fetch
```

### State management
- **TanStack Query** — server/async data (modules, dashboard)
- **Zustand** (`src/store/progress.ts`) — client global state (XP, level, streak)
- **useState** — local UI state (feedback overlay visibility)

### Query keys
- `['dashboard']` — full dashboard data
- `['module', moduleId]` — specific module by ID

## Key files

### Types (`src/types/index.ts`)
- `UserProfile` — id, name, level, xp, xpForCurrentLevel, xpToNextLevel, streak, goal
- `JournalEntry` — id, moduleId, moduleTitle, completedAt, timeSpentMinutes, score, notes?
- `ModuleStatus` — 'locked' | 'unlocked' | 'in-progress' | 'completed'
- `Module` — id, title, description, status, xpReward
- `DashboardData` — user, journal[], modules[], nextModule | null

### Mock data
- `src/data/dashboard.ts` — `mockDashboardData`
- `src/data/module.ts` — `getModuleById(id)`

### Store (`src/store/progress.ts`)
- State: `xp`, `xpForCurrentLevel`, `xpForNextLevel`, `level`, `streak`
- Actions: `addXp(amount)`
- Initial values match mock data

### Components (`src/components/dashboard/`)
- `HeroCard` — reads XP/level/streak from Zustand store, name/goal from props
- `JournalList` — last 3 entries, dividers, design tokens
- `ModuleMap` — status icons, Link for unlocked, opacity-50 for locked
- `NextModuleCard` — next module CTA
- `statusIcon.ts` — shared `Record<ModuleStatus, string>` (emoji placeholders → Lucide later)

## Key concepts learned
- File-based routing, path string conventions
- `routeTree.gen.ts` — auto-generated, never edit
- Pathless layout routes (`_app.tsx`)
- Dynamic segments (`$moduleId`)
- `<Outlet />`, `activeProps`, `activeOptions`
- Named exports for components
- Types before UI
- `Route.useParams()` — must be inside component (Rules of Hooks)
- Route loaders — run on server (SSR) and client (navigation)
- TanStack Query — loader warms cache, `useSuspenseQuery` reads it
- Zustand — global state for gameplay values
- `useEffect` with empty deps — run once on mount
- When NOT to use `useEffect` (data fetching → use Query instead)
- When NOT to use Zustand (local UI state → use useState)

## Pending
- Replace emoji status icons with Lucide icons
- Persist Zustand state to localStorage (zustand/middleware)
- Onboarding flow (multi-step form state)
- Journal calendar view (deferred)
- Real database (PostgreSQL) + Zod validation
- Stripe — later
- VexFlow music notation — later
- Tone.js audio — later

## Next step
Candidate directions:
A — Persist Zustand to localStorage so XP survives refresh
B — Onboarding flow (multi-step form state, new concept)
C — Replace emoji icons with Lucide
D — Start building real screens (Tools page with metronome)
