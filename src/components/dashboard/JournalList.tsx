import type { JournalEntry } from "#/types";

type Props = {journalEntries: JournalEntry[]}

export  function JournalList({ journalEntries }: Props) {
  return (
    <div className="island-shell rounded-2xl p-6 sm:p-8">
      <p className="island-kicker mb-2">Learning Journal</p>
      <h2 className="mb-3 text-2xl font-bold text-[var(--sea-ink)]">
        Your recent activity
      </h2>
      <ul className="divide-y divide-[var(--line)]">
        {journalEntries.slice(-3).map((entry) => (
          <li key={entry.id} className="py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-[var(--sea-ink)]">
                  {entry.moduleTitle}
                </p>
                <p className="truncate text-sm text-[var(--sea-ink-soft)]">
                  Completed on{" "}
                  {new Date(entry.completedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex-shrink-0">
                <p className="text-sm text-[var(--sea-ink-soft)]">
                  {entry.timeSpentMinutes} min
                </p>
                <p className="text-sm text-[var(--sea-ink-soft)]">{entry.score}%</p>
              </div>
            </div>
            {entry.notes && (
              <p className="mt-2 text-sm text-[var(--sea-ink)]">{entry.notes}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}   