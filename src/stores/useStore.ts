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

  // UI
  activeTab: string

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
      activeTab: 'home',

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

      setActiveTab: (t) => set({ activeTab: t }),
      logout: () =>
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
          activeTab: 'home',
        }),
    }),
    {
      name: 'bebek-studio-storage',
    }
  )
)
