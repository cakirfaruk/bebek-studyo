import { ArrowLeft, Bell, Coins } from 'lucide-react'
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
    <header className="fixed top-0 left-0 right-0 z-50 glass" style={{ borderBottom: '1px solid rgba(243,232,226,0.6)' }}>
      <div className="flex items-center justify-between h-[56px] px-4 max-w-[480px] mx-auto">
        {/* Left */}
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack ? (
            <button
              onClick={onBack || (() => navigate(-1))}
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary-50 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-warm-text" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[22px] leading-none">👶</span>
              <span className="font-display font-bold text-[17px] text-gradient leading-none">BebekStüdyo</span>
            </div>
          )}
          {title && showBack && (
            <h1 className="font-display font-semibold text-[16px] text-warm-text truncate">{title}</h1>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-1.5 shrink-0">
          {profile && (
            <div className="flex items-center gap-1.5 bg-accent-50 rounded-full px-2.5 py-1.5 border border-accent-200/60">
              <Coins className="w-3.5 h-3.5 text-accent-600" />
              <span className="text-[12px] font-bold text-accent-700 leading-none">{profile.credits}</span>
            </div>
          )}
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary-50 transition-colors relative">
            <Bell className="w-[18px] h-[18px] text-warm-muted" />
            <span className="absolute top-2 right-2 w-[7px] h-[7px] bg-primary-500 rounded-full ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  )
}
