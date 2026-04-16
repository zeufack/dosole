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
    index.tsx                         → /onboarding ✅ built (name input, redirects to /dashboard if already onboarded)
    motivation.tsx                    → /onboarding/motivation ✅ built (goal picker, saves to store, redirects to /dashboard)
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
    tools.tsx                         → /tools ✅ renders Metronome
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
- **Zustand** (`src/store/progress.ts`) — client global state (XP, level, streak, name, goal, hasCompletedOnboarding)
- **useState** — local UI state (feedback overlay, metronome controls)
- **useRef** — mutable values that shouldn't trigger re-renders (Tone.js objects, beat counter)

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
- State: `xp`, `xpForCurrentLevel`, `xpForNextLevel`, `level`, `streak`, `name`, `goal`, `hasCompletedOnboarding`
- Actions: `addXp(amount)`, `completeOnboarding(name, goal)`
- Persisted to localStorage via Zustand `persist` middleware under key `'dosol-progress'`

### Components
- `src/components/dashboard/` — HeroCard, JournalList, ModuleMap, NextModuleCard, statusIcon.ts (Lucide icons)
- `src/components/Tools/Metronome.tsx` ✅ complete

## Metronome — complete

File: `src/components/Tools/Metronome.tsx`

Features: BPM slider, beats per bar (2/3/4/6), accent on first beat, visual beat indicator, Start/Stop, Tap Tempo (capped at 8 taps, resets after 2s gap).

All stale closure bugs fixed — `accentOnFirstBeat`, `beatPerBar` synced via refs.

## Key concepts learned
- File-based routing, path string conventions
- Pathless layout routes, dynamic segments, `<Outlet />`
- `activeProps`, `activeOptions` on `<Link>`
- Named exports for components
- Types before UI
- `Route.useParams()` — must be inside component (Rules of Hooks)
- Route loaders — run on server (SSR) and client (navigation)
- TanStack Query — loader warms cache, `useSuspenseQuery` reads it
- Zustand — global state for gameplay values
- Zustand `persist` middleware — persists state to localStorage, double-parentheses pattern for TypeScript
- `useRef` — mutable box, no re-render (Tone.js objects, counters)
- Stale closure problem in callbacks — use refs instead of state
- `useEffect` cleanup — return a function to run on unmount
- When NOT to use `useEffect` (data fetching → Query)
- When NOT to use Zustand (local UI state → useState)
- `validateSearch` — typed URL search params in TanStack Router
- `beforeLoad` + `throw redirect()` — route guards (runs on server + client)
- `useProgressStore.getState()` — read Zustand store outside React components
- `useNavigate` + `navigate({ to, search })` — programmatic navigation with typed params
- Lucide icons — export component references from a map, render with capital-letter variable

## Next step

**UI polish pass** — go screen by screen and apply proper Tailwind styling. Start with the onboarding screens (they have no styling yet), then tools, then dashboard components.

## Pending
- UI polish pass ← NEXT
- Journal calendar view (deferred)
- Real database (PostgreSQL) + Zod validation
- Stripe, VexFlow, full audio tools — later
