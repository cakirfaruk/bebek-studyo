import { ArrowLeft, Bell } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '@/stores/useStore'

interface TopBarProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
}

export function TopBar({ title, showBack, onBack }: TopBarProps) {
  const navigate = useNavigate()
  const profile = useStore((s) => s.profile)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-header">
      <div className="flex items-center justify-between h-16 px-6 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 min-w-0">
          {showBack ? (
            <button
              onClick={onBack || (() => navigate(-1))}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-lowest/60 backdrop-blur-sm transition-all hover:bg-surface-lowest active:scale-95"
            >
              <ArrowLeft className="w-5 h-5 text-on-surface" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-gradient-brand font-display font-extrabold text-xl tracking-tight">LuminaBloom</span>
            </div>
          )}
          {title && showBack && (
            <h1 className="font-display font-bold text-lg text-on-surface truncate">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {profile && !showBack && (
            <div className="flex items-center gap-1.5 bg-secondary-container/60 backdrop-blur-sm rounded-full px-3 py-1.5">
              <span className="text-[11px] font-semibold text-on-secondary-container">{profile.credits} Kredi</span>
            </div>
          )}
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-lowest/60 backdrop-blur-sm transition-all hover:bg-surface-lowest active:scale-95 relative">
            <Bell className="w-[18px] h-[18px] text-on-surface-variant" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-surface" />
          </button>
        </div>
      </div>
    </header>
  )
}
