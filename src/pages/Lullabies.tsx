import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

interface SleepAid {
  id: string
  name: string
  icon: string
}

interface Lullaby {
  id: string
  title: string
  emoji: string
  duration: string
  rating: string
  isFavorite: boolean
}

const sleepAids: SleepAid[] = [
  { id: '1', name: 'Beyaz Gürültü', icon: 'air' },
  { id: '2', name: 'Yağmur Sesi', icon: 'rainy' },
  { id: '3', name: 'Anne Karnı', icon: 'favorite' },
  { id: '4', name: 'Orman Sesi', icon: 'nature' },
  { id: '5', name: 'Okyanus', icon: 'waves' },
]

const lullabies: Lullaby[] = [
  { id: '1', title: 'Dandini Dandini', emoji: '🌙', duration: '04:20', rating: '4.9', isFavorite: true },
  { id: '2', title: 'Fış Fış Kayıkçı', emoji: '⛵', duration: '03:15', rating: '4.8', isFavorite: false },
  { id: '3', title: 'Eee Eee Bebek', emoji: '🧸', duration: '05:40', rating: '5.0', isFavorite: true },
  { id: '4', title: 'Uyusunda Büyüsün', emoji: '💤', duration: '06:15', rating: '4.7', isFavorite: false },
]

export default function Lullabies() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    Object.fromEntries(lullabies.map((l) => [l.id, l.isFavorite]))
  )

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <MobileLayout title="Ninniler ve Uyku Sesleri" showBack>
      {/* Hero Section */}
      <section className="mb-10 relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-secondary-container to-white shadow-sm">
        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-headline font-extrabold text-on-secondary-container leading-tight mb-4">
            Tatlı Rüyalar Zamanı
          </h2>
          <p className="text-on-surface-variant text-lg font-medium leading-relaxed">
            Miniğiniz için özenle seçilmiş en huzurlu ninniler ve rahatlatıcı uyku sesleri.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-64 h-64 opacity-20 transform rotate-12 flex items-center justify-center">
          <span className="text-[120px]">🌙</span>
        </div>
      </section>

      {/* Sleeping Aids - Horizontal Scroll */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-headline font-bold text-on-surface">Uyku Yardımcıları</h3>
          <span className="text-primary text-sm font-semibold">Tümünü Gör</span>
        </div>
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-2 px-2">
          {sleepAids.map((aid, i) => (
            <motion.div
              key={aid.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              className="flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full bg-white shadow-xl shadow-purple-100 flex items-center justify-center transition-transform group-active:scale-90 border-2 border-transparent group-hover:border-primary-fixed">
                <span className="material-symbols-outlined text-secondary text-3xl">{aid.icon}</span>
              </div>
              <span className="text-sm font-semibold text-on-surface-variant">{aid.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lullabies Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-headline font-bold text-on-surface">Popüler Ninniler</h3>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {lullabies.map((lullaby, i) => (
            <motion.div
              key={lullaby.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-lg p-5 flex items-center gap-5 relative group transition-all hover:bg-white/60"
            >
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-md bg-gradient-to-br from-secondary-container to-primary-container/30 flex items-center justify-center">
                <span className="text-4xl">{lullaby.emoji}</span>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-headline font-bold text-on-surface mb-1">{lullaby.title}</h4>
                <div className="flex items-center gap-4 text-on-surface-variant text-sm font-medium">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span> {lullaby.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">star</span> {lullaby.rating}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleFavorite(lullaby.id)}
                className="w-10 h-10 flex items-center justify-center hover:scale-110 transition-transform"
              >
                <span
                  className={`material-symbols-outlined ${favorites[lullaby.id] ? 'text-primary-dim' : 'text-on-surface-variant'}`}
                  style={favorites[lullaby.id] ? { fontVariationSettings: "'FILL' 1" } : undefined}
                >
                  favorite
                </span>
              </button>
              <div className="absolute right-4 bottom-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 shadow-lg">
                <span
                  className="material-symbols-outlined text-white text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Playlist */}
      <section className="mt-12 bg-primary/5 rounded-xl p-6 border border-primary/10">
        <div className="flex flex-col items-center gap-8">
          <div className="w-full aspect-square rounded-lg overflow-hidden shadow-2xl rotate-3 bg-gradient-to-br from-secondary-container to-primary-container flex items-center justify-center max-w-[200px]">
            <span className="text-[80px]">🛏️</span>
          </div>
          <div className="flex-grow text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-pink-100 text-pink-600 text-xs font-bold mb-3">
              ÖNERİLEN LİSTE
            </span>
            <h3 className="text-3xl font-headline font-extrabold text-on-surface mb-3">Gece Yolculuğu</h3>
            <p className="text-on-surface-variant mb-6">
              45 dakikalık kesintisiz uyku geçişi. Uykuya dalmayı kolaylaştıran özel ritimlerle hazırlandı.
            </p>
            <button className="bg-secondary text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 mx-auto shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_circle
              </span>
              Hemen Başlat
            </button>
          </div>
        </div>
      </section>
    </MobileLayout>
  )
}
