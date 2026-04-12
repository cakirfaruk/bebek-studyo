import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserProfile, UserSegment, BabyName, MemoryEntry, Appointment } from '@/types'

interface AppState {
  // Auth
  isAuthenticated: boolean
  isOnboarded: boolean

  // User
  profile: UserProfile | null
  segment: UserSegment | null

  // Names
  favoriteNames: BabyName[]
  nameHistory: BabyName[]

  // Memory
  memories: MemoryEntry[]

  // Checklists
  completedChecklistItems: string[]

  // Appointments
  appointments: Appointment[]

  // Health tracking
  healthLogs: { id: string; date: string; type: 'weight' | 'water' | 'mood' | 'sleep'; value: string; note?: string }[]
  addHealthLog: (log: { id: string; date: string; type: 'weight' | 'water' | 'mood' | 'sleep'; value: string; note?: string }) => void

  // UI
  activeTab: string

  // Error
  error: string | null

  // Actions
  setAuthenticated: (v: boolean) => void
  setOnboarded: (v: boolean) => void
  setProfile: (p: UserProfile) => void
  updateProfile: (p: Partial<UserProfile>) => void
  setSegment: (s: UserSegment) => void
  addFavoriteName: (n: BabyName) => void
  removeFavoriteName: (id: string) => void
  addNameToHistory: (n: BabyName) => void
  addMemory: (m: MemoryEntry) => void
  removeMemory: (id: string) => void
  toggleChecklistItem: (id: string) => void
  addAppointment: (a: Appointment) => void
  removeAppointment: (id: string) => void
  toggleAppointment: (id: string) => void
  setError: (msg: string | null) => void
  setActiveTab: (t: string) => void
  logout: () => void
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isOnboarded: false,
      profile: null,
      segment: null,
      favoriteNames: [],
      nameHistory: [],
      memories: [],
      completedChecklistItems: [],
      appointments: [],
      healthLogs: [],
      activeTab: 'home',
      error: null,

      setAuthenticated: (v) => set({ isAuthenticated: v }),
      setOnboarded: (v) => set({ isOnboarded: v }),
      setProfile: (p) => set({ profile: p }),
      updateProfile: (p) =>
        set((s) => ({
          profile: s.profile ? { ...s.profile, ...p } : null,
        })),
      setSegment: (s) => set({ segment: s }),

      addFavoriteName: (n) =>
        set((s) => ({
          favoriteNames: [...s.favoriteNames.filter((f) => f.id !== n.id), { ...n, isFavorite: true }],
        })),
      removeFavoriteName: (id) =>
        set((s) => ({
          favoriteNames: s.favoriteNames.filter((f) => f.id !== id),
        })),
      addNameToHistory: (n) =>
        set((s) => ({
          nameHistory: [n, ...s.nameHistory.filter((h) => h.id !== n.id)].slice(0, 100),
        })),

      addMemory: (m) =>
        set((s) => ({ memories: [m, ...s.memories] })),
      removeMemory: (id) =>
        set((s) => ({ memories: s.memories.filter((m) => m.id !== id) })),

      toggleChecklistItem: (id) =>
        set((s) => ({
          completedChecklistItems: s.completedChecklistItems.includes(id)
            ? s.completedChecklistItems.filter((i) => i !== id)
            : [...s.completedChecklistItems, id],
        })),

      addHealthLog: (log) =>
        set((s) => ({ healthLogs: [log, ...s.healthLogs] })),

      addAppointment: (a) =>
        set((s) => ({ appointments: [...s.appointments, a] })),
      removeAppointment: (id) =>
        set((s) => ({ appointments: s.appointments.filter((a) => a.id !== id) })),
      toggleAppointment: (id) =>
        set((s) => ({
          appointments: s.appointments.map((a) =>
            a.id === id ? { ...a, isCompleted: !a.isCompleted } : a
          ),
        })),

      setError: (msg) => set({ error: msg }),
      setActiveTab: (t) => set({ activeTab: t }),
      logout: () => {
        localStorage.removeItem('bebek-studio-storage')
        set({
          isAuthenticated: false,
          isOnboarded: false,
          profile: null,
          segment: null,
          favoriteNames: [],
          nameHistory: [],
          memories: [],
          completedChecklistItems: [],
          appointments: [],
          healthLogs: [],
          activeTab: 'home',
          error: null,
        })
      },
    }),
    {
      name: 'bebek-studio-storage',
      storage: {
        getItem: (name: string) => {
          try {
            const value = localStorage.getItem(name)
            return value ? JSON.parse(value) : null
          } catch {
            return null
          }
        },
        setItem: (name: string, value: unknown) => {
          try {
            localStorage.setItem(name, JSON.stringify(value))
          } catch {
            console.warn('localStorage quota exceeded, clearing old data')
            try {
              // Try to clear name history to free space
              const current = JSON.parse(localStorage.getItem(name) || '{}')
              if (current.state?.nameHistory) {
                current.state.nameHistory = current.state.nameHistory.slice(0, 20)
                localStorage.setItem(name, JSON.stringify(current))
              }
            } catch {
              // Last resort: remove item
              localStorage.removeItem(name)
            }
          }
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name)
        },
      },
    }
  )
)
