import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Sparkles, Baby, BookHeart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/stores/useStore'

const navItems = [
  { path: '/', icon: Home, label: 'Ana Sayfa' },
  { path: '/names', icon: Sparkles, label: 'İsimler' },
  { path: '/baby-face', icon: Baby, label: 'Bebek' },
  { path: '/memories', icon: BookHeart, label: 'Anılar' },
  { path: '/profile', icon: User, label: 'Profil' },
]

export function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const segment = useStore((s) => s.segment)

  const items = segment === 'expecting' || segment === 'newparent'
    ? navItems
    : navItems.filter((i) => i.path !== '/memories')

  return (
    <div
      className="fixed z-50 left-1/2 -translate-x-1/2"
      style={{ bottom: 'max(24px, env(safe-area-inset-bottom, 24px))', width: '92%', maxWidth: 420 }}
    >
      <nav className="glass-nav h-[72px] px-3 flex items-center">
        {items.map((item) => {
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                'flex-1 flex flex-col items-center justify-center gap-[3px] h-[52px] rounded-2xl transition-all duration-200',
                isActive
                  ? 'bg-secondary-container'
                  : 'hover:bg-surface-low'
              )}
            >
              <item.icon
                className={cn(
                  'w-[22px] h-[22px] transition-colors',
                  isActive ? 'text-on-secondary-container' : 'text-slate-400'
                )}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={cn(
                'text-[10px] font-medium leading-none transition-colors',
                isActive ? 'text-on-secondary-container' : 'text-slate-400'
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
