import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Sparkles, Baby, BookHeart, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useStore } from '@/stores/useStore'

const navItems = [
  { path: '/', icon: Home, label: 'Ana Sayfa' },
  { path: '/names', icon: Sparkles, label: 'İsimler' },
  { path: '/baby-face', icon: Baby, label: 'Bebek Yüzü' },
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
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass" style={{ borderTop: '1px solid rgba(243,232,226,0.6)' }}>
      <div className="flex items-stretch max-w-[480px] mx-auto" style={{ height: '64px', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        {items.map((item) => {
          const isActive = item.path === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(item.path)
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex-1 flex flex-col items-center justify-center gap-[2px] relative"
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-[3px] rounded-b-full bg-primary-500" />
              )}
              <item.icon
                className={cn(
                  'w-[22px] h-[22px] transition-colors',
                  isActive ? 'text-primary-500' : 'text-warm-muted/60'
                )}
                strokeWidth={isActive ? 2.5 : 1.8}
              />
              <span className={cn(
                'text-[10px] font-medium leading-none transition-colors',
                isActive ? 'text-primary-500' : 'text-warm-muted/60'
              )}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
