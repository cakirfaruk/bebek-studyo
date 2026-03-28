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
    <>
      <TopBar title={title} showBack={showBack} onBack={onBack} />
      <main
        style={{
          paddingTop: 68,
          paddingBottom: showNav ? 88 : 24,
          paddingLeft: 20,
          paddingRight: 20,
          maxWidth: 480,
          marginLeft: 'auto',
          marginRight: 'auto',
          minHeight: '100dvh',
        }}
      >
        {children}
      </main>
      {showNav && <BottomNav />}
    </>
  )
}
