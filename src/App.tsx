import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useStore } from '@/stores/useStore'
import { lazy, Suspense } from 'react'

const Welcome = lazy(() => import('@/pages/Welcome'))
const Auth = lazy(() => import('@/pages/Auth'))
const SegmentSelect = lazy(() => import('@/pages/SegmentSelect'))
const ProfileSetup = lazy(() => import('@/pages/ProfileSetup'))
const Home = lazy(() => import('@/pages/Home'))
const BabyFace = lazy(() => import('@/pages/BabyFace'))
const NameFinder = lazy(() => import('@/pages/NameFinder'))
const PregnancyTracker = lazy(() => import('@/pages/PregnancyTracker'))
const Checklists = lazy(() => import('@/pages/Checklists'))
const BabyGuide = lazy(() => import('@/pages/BabyGuide'))
const Memories = lazy(() => import('@/pages/Memories'))
const Appointments = lazy(() => import('@/pages/Appointments'))
const CostCalculator = lazy(() => import('@/pages/CostCalculator'))
const ReadinessQuiz = lazy(() => import('@/pages/ReadinessQuiz'))
const Profile = lazy(() => import('@/pages/Profile'))
const GiftList = lazy(() => import('@/pages/GiftList'))
const Lullabies = lazy(() => import('@/pages/Lullabies'))
const Stories = lazy(() => import('@/pages/Stories'))
const ChildGuide = lazy(() => import('@/pages/ChildGuide'))

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

          {/* Fallback */}
          <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/welcome'} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
