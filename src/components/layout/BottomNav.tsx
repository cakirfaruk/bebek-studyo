import { useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '@/stores/useStore'

const navItems = [
  { path: '/', icon: 'home', label: 'Ana Sayfa' },
  { path: '/pregnancy-tracker', icon: 'spa', label: 'Takip' },
  { path: '/baby-face', icon: 'child_care', label: 'Bebek' },
  { path: '/checklists', icon: 'handyman', label: 'Araçlar' },
  { path: '/profile', icon: 'more_horiz', label: 'Profil' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const segment = useStore((s) => s.segment)

  // Determine items depending on the segment
  let items = navItems
  if (segment === 'dreaming') {
    items = [
      { path: '/', icon: 'home', label: 'Ana Sayfa' },
      { path: '/baby-face', icon: 'child_care', label: 'Bebek' },
      { path: '/checklists', icon: 'handyman', label: 'Araçlar' },
      { path: '/profile', icon: 'more_horiz', label: 'Profil' },
    ]
  }

  return (
    <nav className="fixed z-50 flex justify-around items-center px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] rounded-[3rem] border-none ring-1 ring-white/30 dark:ring-slate-800/50 shadow-[0_20px_50px_rgba(104,52,235,0.15)]">
      {items.map((item) => {
        // NOTE: startsWith can cause false positives if a nav path is a prefix of another route
        // (e.g. /names would match /names-detail). Currently safe because no sub-routes share
        // these prefixes. If new routes are added, consider exact matching or a whitelist approach.
        const isActive = item.path === '/'
          ? location.pathname === '/'
          : location.pathname.startsWith(item.path)
        
        if (isActive) {
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/40 dark:to-purple-900/40 text-purple-700 dark:text-purple-200 rounded-full w-14 h-14 active:scale-90 duration-300 transition-all shadow-sm"
              aria-label={item.label}
            >
              <span aria-hidden="true" className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
            </button>
          )
        }

        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 w-12 h-12 hover:text-pink-500 transition-all active:scale-90 duration-300"
            aria-label={item.label}
          >
            <span aria-hidden="true" className="material-symbols-outlined">{item.icon}</span>
          </button>
        )
      })}
    </nav>
  )
}
