export type UserSegment = 'expecting' | 'dreaming' | 'newparent' | 'planner'

export interface UserProfile {
  id: string
  email: string
  segment: UserSegment
  motherName: string
  fatherName: string
  motherBirthDate?: string
  fatherBirthDate?: string
  motherPhoto?: string
  fatherPhoto?: string
  dueDate?: string
  babyGender?: 'boy' | 'girl' | 'unknown'
  babyName?: string
  babyBirthDate?: string
  partnerCode?: string
  credits: number
  isPremium: boolean
  createdAt: string
}

export interface BabyName {
  id: string
  name: string
  meaning: string
  origin: string
  gender: 'boy' | 'girl' | 'unisex'
  numerologyScore: number
  numerologyMeaning: string
  zodiacCompatibility: number
  isInternational: boolean
  pronunciation: string
  tags: string[]
  isFavorite: boolean
}

export interface GeneratedImage {
  id: string
  imageUrl: string
  age: number
  style: 'realistic' | 'soft' | 'artistic'
  gender: 'boy' | 'girl'
  createdAt: string
}

export interface PregnancyWeek {
  week: number
  babySize: string
  babySizeComparison: string
  babyWeight: string
  babyLength: string
  babyDevelopment: string[]
  motherSymptoms: string[]
  tips: string[]
  warning: string[]
}

export interface ChecklistItem {
  id: string
  title: string
  description: string
  isCompleted: boolean
  category: string
  priority: 'high' | 'medium' | 'low'
  trimester?: number
}

export interface ChecklistCategory {
  id: string
  title: string
  icon: string
  description: string
  items: ChecklistItem[]
  progress: number
}

export interface BabyMilestone {
  month: number
  title: string
  description: string
  physicalDevelopment: string[]
  cognitiveDevelopment: string[]
  socialDevelopment: string[]
  feedingTips: string[]
  sleepInfo: string
  warningSign: string[]
  funActivities: string[]
}

export interface MemoryEntry {
  id: string
  type: 'photo' | 'note' | 'milestone' | 'letter'
  title: string
  content: string
  imageUrl?: string
  date: string
  week?: number
  mood?: 'happy' | 'excited' | 'emotional' | 'tired' | 'anxious' | 'grateful'
}

export interface Appointment {
  id: string
  title: string
  date: string
  time: string
  doctor?: string
  location?: string
  notes?: string
  type: 'checkup' | 'ultrasound' | 'test' | 'vaccination' | 'other'
  isCompleted: boolean
}

export interface DailyTip {
  id: string
  week: number
  day: number
  title: string
  content: string
  category: 'health' | 'nutrition' | 'exercise' | 'emotional' | 'practical'
  icon: string
}
