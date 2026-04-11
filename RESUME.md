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
- **Zustand** (`src/store/progress.ts`) — client global state (XP, level, streak)
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
- State: `xp`, `xpForCurrentLevel`, `xpForNextLevel`, `level`, `streak`
- Actions: `addXp(amount)`

### Components
- `src/components/dashboard/` — HeroCard, JournalList, ModuleMap, NextModuleCard, statusIcon.ts
- `src/components/tools/Metronome.tsx` ← IN PROGRESS (see below)

## Metronome — current status

File: `src/components/tools/Metronome.tsx`

State: `bpm` (80), `isPlaying`, `beatPerBar` (4), `accentOnFirstBeat` (true), `currentBeat` (0)
Refs: `synthRef`, `loopRef`

**What works:**
- UI: slider, beats buttons (2/3/4/6), accent toggle, start/stop button
- Tone.Synth and Loop are created on play
- `Tone.start()` is called (required by browsers)

**Four bugs to fix before continuing:**

1. **Transport never starts/stops** — missing `Tone.getTransport().start()` on play and `Tone.getTransport().stop()` + dispose on stop
2. **BPM slider doesn't update Tone** — need `useEffect(() => { Tone.getTransport().bpm.value = bpm }, [bpm])`
3. **Stale closure bug** — `accentOnFirstBeat` and `currentBeat` inside the loop callback are stale. Fix: use `beatCountRef = useRef(0)` to track beat inside the loop, `setCurrentBeat` only for UI
4. **Missing cleanup useEffect** — dispose synth, loop, stop Transport on unmount

## Next step

Fix the four metronome bugs listed above, then add Tap BPM functionality.

## Tap BPM concept (for when bugs are fixed)
- Store timestamps of last few taps in a ref
- Calculate average interval between taps
- Convert to BPM: `bpm = 60000 / avgInterval`
- Reset if gap between taps > 2 seconds

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
- `useRef` — mutable box, no re-render (Tone.js objects, counters)
- Stale closure problem in callbacks — use refs instead of state
- `useEffect` cleanup — return a function to run on unmount
- When NOT to use `useEffect` (data fetching → Query)
- When NOT to use Zustand (local UI state → useState)

## Pending
- Tap BPM
- Replace emoji status icons with Lucide icons
- Persist Zustand state to localStorage
- Onboarding flow
- Journal calendar view (deferred)
- Real database (PostgreSQL) + Zod validation
- Stripe, VexFlow, full audio tools — later
- UI polish pass (after all screens functional)
