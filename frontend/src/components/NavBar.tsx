import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive
      ? 'bg-indigo-500/20 text-indigo-200'
      : 'text-slate-300 hover:bg-white/5 hover:text-white'
  }`

export default function NavBar() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/30">
            K
          </div>
          <div>
            <p className="text-sm font-semibold text-white">KnowledgeHub AI</p>
            <p className="text-xs text-slate-400">Document intelligence workspace</p>
          </div>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-1">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/documents" className={navLinkClass}>
                Documents
              </NavLink>
              <NavLink to="/ai" className={navLinkClass}>
                Q&amp;A
              </NavLink>
              <NavLink to="/history" className={navLinkClass}>
                History
              </NavLink>
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
              <button type="button" className="btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-secondary">
                Login
              </NavLink>
              <NavLink to="/register" className="btn-primary">
                Get started
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
