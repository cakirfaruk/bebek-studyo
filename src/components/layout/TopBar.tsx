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

  const avatarUrl = profile?.motherName 
    ? `https://api.dicebear.com/7.x/notionists/svg?seed=${profile.motherName}`
    : 'https://api.dicebear.com/7.x/notionists/svg?seed=Guest'

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 py-4 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(233,30,99,0.06)]">
      <div className="flex items-center gap-3">
        {showBack ? (
          <button
            onClick={onBack || (() => navigate(-1))}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-lowest/60 backdrop-blur-sm transition-all hover:bg-surface-container-lowest active:scale-95"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-on-surface">arrow_back</span>
          </button>
        ) : (
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-primary-fixed shadow-sm">
            <img alt="Profile" className="w-full h-full object-cover" src={avatarUrl} />
          </div>
        )}
        
        {title && showBack ? (
          <h1 className="font-display font-bold text-lg text-on-surface truncate">{title}</h1>
        ) : (
          <h1 className="font-display font-extrabold tracking-tight text-2xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">Lumina Bloom</h1>
        )}
      </div>
      
      <div className="flex flex-row items-center gap-3">
        {profile?.credits !== undefined && !showBack && (
          <div className="flex items-center gap-1.5 bg-secondary-container/60 backdrop-blur-sm rounded-full px-3 py-1.5">
            <span className="text-[11px] font-semibold text-on-secondary-container">{profile.credits} Kredi</span>
          </div>
        )}
        <button className="p-2 rounded-full text-pink-600 dark:text-pink-400 hover:bg-pink-50 transition-colors active:scale-95 duration-200 relative" aria-label="Bildirimler">
          <span aria-hidden="true" className="material-symbols-outlined">notifications</span>
          {/* Notification badge removed: was always visible with no backing data. Re-add with a store-driven flag when notification system is implemented. */}
        </button>
      </div>
    </header>
  )
}
