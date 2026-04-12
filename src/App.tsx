import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useStore } from '@/stores/useStore'
import { lazy, Suspense } from 'react'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'

function lazyRetry<T extends React.ComponentType<Record<string, unknown>>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(() =>
    factory().catch(() => {
      // Retry once after 1 second
      return new Promise<{ default: T }>((resolve) => {
        setTimeout(() => resolve(factory()), 1000)
      })
    })
  )
}

const Welcome = lazyRetry(() => import('@/pages/Welcome'))
const Auth = lazyRetry(() => import('@/pages/Auth'))
const SegmentSelect = lazyRetry(() => import('@/pages/SegmentSelect'))
const ProfileSetup = lazyRetry(() => import('@/pages/ProfileSetup'))
const Home = lazyRetry(() => import('@/pages/Home'))
const BabyFace = lazyRetry(() => import('@/pages/BabyFace'))
const NameFinder = lazyRetry(() => import('@/pages/NameFinder'))
const PregnancyTracker = lazyRetry(() => import('@/pages/PregnancyTracker'))
const Checklists = lazyRetry(() => import('@/pages/Checklists'))
const BabyGuide = lazyRetry(() => import('@/pages/BabyGuide'))
const Memories = lazyRetry(() => import('@/pages/Memories'))
const Appointments = lazyRetry(() => import('@/pages/Appointments'))
const CostCalculator = lazyRetry(() => import('@/pages/CostCalculator'))
const ReadinessQuiz = lazyRetry(() => import('@/pages/ReadinessQuiz'))
const Profile = lazyRetry(() => import('@/pages/Profile'))
const GiftList = lazyRetry(() => import('@/pages/GiftList'))
const Lullabies = lazyRetry(() => import('@/pages/Lullabies'))
const Stories = lazyRetry(() => import('@/pages/Stories'))
const ChildGuide = lazyRetry(() => import('@/pages/ChildGuide'))
const Premium = lazyRetry(() => import('@/pages/Premium'))
const HealthTracker = lazyRetry(() => import('@/pages/HealthTracker'))
const Partner = lazyRetry(() => import('@/pages/Partner'))

function LoadingScreen() {
  return (
    <div className="min-h-dvh flex items-center justify-center bg-warm-bg">
      <div className="text-center">
        <span className="text-4xl block mb-3 animate-float">👶</span>
        <div className="w-8 h-8 border-3 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto" />
      </div>
    </div>
  )
}

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: string}> {
  constructor(props: {children: React.ReactNode}) {
    super(props)
    this.state = { hasError: false, error: '' }
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding:40,textAlign:'center',fontFamily:'Be Vietnam Pro'}}>
          <p style={{fontSize:48,marginBottom:16}}>{'😔'}</p>
          <h2 style={{fontSize:20,fontWeight:700,marginBottom:8}}>Bir hata olustu</h2>
          <p style={{color:'#5a5f67',marginBottom:24}}>{this.state.error}</p>
          <button onClick={()=>window.location.reload()} style={{padding:'12px 32px',borderRadius:9999,background:'linear-gradient(to right,#6834eb,#5c20df)',color:'#fff',border:'none',fontWeight:700,cursor:'pointer'}}>Yeniden Dene</button>
        </div>
      )
    }
    return this.props.children
  }
}

function OfflineBanner() {
  const isOnline = useOnlineStatus()
  if (isOnline) return null
  return (
    <div style={{ position:'fixed', top:0, left:0, right:0, zIndex:9999, background:'#ac3434', color:'white', textAlign:'center', padding:'8px 16px', fontSize:13, fontFamily:'Be Vietnam Pro' }}>
      <span style={{marginRight:8}}>{'⚠️'}</span>
      {'İnternet bağlantınız yok. Bazı özellikler çalışmayabilir.'}
    </div>
  )
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  if (!isAuthenticated) return <Navigate to="/welcome" replace />
  return <>{children}</>
}

export default function App() {
  const isAuthenticated = useStore((s) => s.isAuthenticated)
  const isOnboarded = useStore((s) => s.isOnboarded)

  return (
    <BrowserRouter>
      <OfflineBanner />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'white',
            border: '1px solid #f3e8e2',
            borderRadius: '16px',
            padding: '12px 16px',
            fontSize: '14px',
          },
        }}
      />
      <ErrorBoundary>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Public routes */}
          <Route path="/welcome" element={
            isAuthenticated ? <Navigate to="/" replace /> : <Welcome />
          } />
          <Route path="/auth" element={
            isAuthenticated ? <Navigate to={isOnboarded ? '/' : '/segment-select'} replace /> : <Auth />
          } />

          {/* Onboarding */}
          <Route path="/segment-select" element={
            <ProtectedRoute><SegmentSelect /></ProtectedRoute>
          } />
          <Route path="/profile-setup" element={
            <ProtectedRoute><ProfileSetup /></ProtectedRoute>
          } />

          {/* Main app routes */}
          <Route path="/" element={
            <ProtectedRoute><Home /></ProtectedRoute>
          } />
          <Route path="/baby-face" element={
            <ProtectedRoute><BabyFace /></ProtectedRoute>
          } />
          <Route path="/names" element={
            <ProtectedRoute><NameFinder /></ProtectedRoute>
          } />
          <Route path="/pregnancy-tracker" element={
            <ProtectedRoute><PregnancyTracker /></ProtectedRoute>
          } />
          <Route path="/checklists" element={
            <ProtectedRoute><Checklists /></ProtectedRoute>
          } />
          <Route path="/baby-guide" element={
            <ProtectedRoute><BabyGuide /></ProtectedRoute>
          } />
          <Route path="/memories" element={
            <ProtectedRoute><Memories /></ProtectedRoute>
          } />
          <Route path="/appointments" element={
            <ProtectedRoute><Appointments /></ProtectedRoute>
          } />
          <Route path="/cost-calculator" element={
            <ProtectedRoute><CostCalculator /></ProtectedRoute>
          } />
          <Route path="/readiness-quiz" element={
            <ProtectedRoute><ReadinessQuiz /></ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute><Profile /></ProtectedRoute>
          } />
          <Route path="/gift-list" element={
            <ProtectedRoute><GiftList /></ProtectedRoute>
          } />
          <Route path="/lullabies" element={
            <ProtectedRoute><Lullabies /></ProtectedRoute>
          } />
          <Route path="/stories" element={
            <ProtectedRoute><Stories /></ProtectedRoute>
          } />
          <Route path="/child-guide" element={
            <ProtectedRoute><ChildGuide /></ProtectedRoute>
          } />
          <Route path="/premium" element={
            <ProtectedRoute><Premium /></ProtectedRoute>
          } />
          <Route path="/health-tracker" element={
            <ProtectedRoute><HealthTracker /></ProtectedRoute>
          } />
          <Route path="/partner" element={
            <ProtectedRoute><Partner /></ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/welcome'} replace />} />
        </Routes>
      </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  )
}
