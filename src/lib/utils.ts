import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const PREGNANCY_DURATION_DAYS = 280
export const PREGNANCY_WEEKS = 40
export const INITIAL_CREDITS = 100
export const MAX_NAME_HISTORY = 100
export const MAX_FILE_SIZE_MB = 5
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, locale = 'tr-TR'): string {
  return new Date(date).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getWeekOfPregnancy(dueDate: string): number {
  const due = new Date(dueDate)
  const conceptionDate = new Date(due.getTime() - PREGNANCY_DURATION_DAYS * 24 * 60 * 60 * 1000)
  const now = new Date()
  const diffMs = now.getTime() - conceptionDate.getTime()
  const weeks = Math.floor(diffMs / (7 * 24 * 60 * 60 * 1000))
  return Math.max(1, Math.min(42, weeks))
}

export function getDaysUntilDue(dueDate: string): number {
  const due = new Date(dueDate)
  const now = new Date()
  return Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

export function calculateNumerology(name: string): number {
  const charMap: Record<string, number> = {
    a: 1, b: 2, c: 3, ç: 3, d: 4, e: 5, f: 6, g: 7, ğ: 7, h: 8, ı: 9,
    i: 9, j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, ö: 6, p: 7, r: 9, s: 1,
    ş: 1, t: 2, u: 3, ü: 3, v: 4, y: 7, z: 8,
  }
  const sum = name
    .toLowerCase()
    .split('')
    .reduce((acc, char) => acc + (charMap[char] || 0), 0)
  let result = sum
  while (result > 9 && result !== 11 && result !== 22 && result !== 33) {
    result = result
      .toString()
      .split('')
      .reduce((acc, d) => acc + parseInt(d), 0)
  }
  return result
}

/**
 * Determines the zodiac sign for a given date string.
 * Iterates through a fixed 13-element array (O(13) worst case) which is
 * effectively constant time and needs no further optimization.
 */
export function getZodiacSign(date: string): string {
  const d = new Date(date)
  const month = d.getMonth() + 1
  const day = d.getDate()
  const signs = [
    { sign: 'Oğlak', endMonth: 1, endDay: 19 },
    { sign: 'Kova', endMonth: 2, endDay: 18 },
    { sign: 'Balık', endMonth: 3, endDay: 20 },
    { sign: 'Koç', endMonth: 4, endDay: 19 },
    { sign: 'Boğa', endMonth: 5, endDay: 20 },
    { sign: 'İkizler', endMonth: 6, endDay: 20 },
    { sign: 'Yengeç', endMonth: 7, endDay: 22 },
    { sign: 'Aslan', endMonth: 8, endDay: 22 },
    { sign: 'Başak', endMonth: 9, endDay: 22 },
    { sign: 'Terazi', endMonth: 10, endDay: 22 },
    { sign: 'Akrep', endMonth: 11, endDay: 21 },
    { sign: 'Yay', endMonth: 12, endDay: 21 },
    { sign: 'Oğlak', endMonth: 12, endDay: 31 },
  ]
  for (const s of signs) {
    if (month < s.endMonth || (month === s.endMonth && day <= s.endDay)) {
      return s.sign
    }
  }
  return 'Oğlak'
}

export function getTrimesterLabel(week: number): string {
  if (week <= 13) return 'Birinci Trimester'
  if (week <= 26) return 'Ikinci Trimester'
  return 'Ucuncu Trimester'
}

export function hasInternationalChars(name: string): boolean {
  return /[çğıöşüÇĞİÖŞÜ]/.test(name)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}
