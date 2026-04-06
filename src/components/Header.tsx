import { Link } from '@tanstack/react-router'
import ThemeToggle from './ThemeToggle'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--header-bg)] px-4 backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
        <h2>
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: 'active' }}>Dosol</Link>
        </h2>
        <div className="ml-auto flex items-center gap-x-3">
          <Link to="/dashboard" activeProps={{ className: 'active' }}>Dashboard</Link>
          <Link to="/achievements" activeProps={{ className: 'active' }}>Achievements</Link>
          <Link to="/tools" activeProps={{ className: 'active' }}>Tools</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
