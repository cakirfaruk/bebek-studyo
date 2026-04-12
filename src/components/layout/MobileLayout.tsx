import { type ReactNode } from 'react'
import { BottomNav } from './BottomNav'
import { TopBar } from './TopBar'

interface MobileLayoutProps {
  children: ReactNode
  title?: string
  showBack?: boolean
  showNav?: boolean
  onBack?: () => void
}

export function MobileLayout({ children, title, showBack, showNav = true, onBack }: MobileLayoutProps) {
  return (
    <div className="page-bg min-h-dvh relative">
      {/* Decorative background blobs */}
      <div className="absolute opacity-60 pointer-events-none" style={{ width: 400, height: 400, top: -100, right: -100, background: 'radial-gradient(circle, var(--color-primary-container) 0%, transparent 60%)', filter: 'blur(60px)', mixBlendMode: 'multiply' }} />
      <div className="absolute opacity-50 pointer-events-none" style={{ width: 350, height: 350, bottom: -80, left: -80, background: 'radial-gradient(circle, var(--color-secondary-container) 0%, transparent 60%)', filter: 'blur(50px)', mixBlendMode: 'multiply' }} />

      <TopBar title={title} showBack={showBack} onBack={onBack} />
      <main
        style={{
          paddingTop: 88,
          paddingBottom: showNav ? 120 : 32,
          paddingLeft: 24,
          paddingRight: 24,
          maxWidth: 672,
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  )
}
