import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

interface Story {
  id: string
  title: string
  emoji: string
  duration: string
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
}

const stories: Story[] = [
  { id: '1', title: "Ay Dede'nin Maceraları", emoji: '🌝', duration: '5 dk' },
  { id: '2', title: 'Küçük Yıldızın Yolculuğu', emoji: '⭐', duration: '10 dk' },
]

const categories: Category[] = [
  { id: '1', name: 'Doğa Masalları', icon: 'nature_people', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: '2', name: 'Hayvan Dostlar', icon: 'pets', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { id: '3', name: 'Uzay Serüveni', icon: 'rocket_launch', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { id: '4', name: 'Sevgi Bağı', icon: 'favorite', color: 'text-pink-600', bgColor: 'bg-pink-100' },
]

export default function Stories() {
  return (
    <MobileLayout title="Masallar ve Hikayeler" showBack>
      {/* Header Section */}
      <section className="space-y-2 mb-12">
        <h2 className="text-4xl font-headline font-extrabold text-on-surface tracking-tight">Uyku Öncesi Masallar</h2>
        <p className="text-on-surface-variant max-w-md">
          Bebeğinizin hayal dünyasını besleyen, huzurlu bir uykuya hazırlayan en tatlı hikayeler burada.
        </p>
      </section>

      {/* Stories Grid */}
      <section className="grid grid-cols-1 gap-8 mb-12">
        {stories.map((story, i) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="group relative bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(104,52,235,0.08)] hover:shadow-[0_30px_60px_rgba(104,52,235,0.12)] transition-all duration-500 flex flex-col"
          >
            <div className="h-56 overflow-hidden relative bg-gradient-to-br from-secondary-container to-primary-container/40 flex items-center justify-center">
              <span className="text-[80px] group-hover:scale-110 transition-transform duration-700">
                {story.emoji}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/20">
                <span className="material-symbols-outlined text-white text-sm">schedule</span>
                <span className="text-white text-xs font-semibold">{story.duration}</span>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <h3 className="text-2xl font-headline font-bold text-on-surface">{story.title}</h3>
              <div className="flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-secondary to-secondary-dim text-white py-3 rounded-full font-semibold flex items-center justify-center gap-2 active:scale-95 transition-all">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                  Sesli Dinle
                </button>
                <button className="flex-1 border-2 border-secondary-container text-secondary py-3 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-secondary-container transition-all active:scale-95">
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  Oku
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Featured Section: Günün Hikayesi */}
      <section className="relative mb-12">
        <div className="bg-gradient-to-br from-[#1a1c2c] to-[#4a1942] rounded-xl p-8 overflow-hidden relative shadow-2xl flex flex-col items-center gap-8">
          {/* Background Decorative Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]" />

          {/* Image Container */}
          <div className="w-full relative z-10">
            <div className="aspect-square max-w-[200px] mx-auto rounded-lg overflow-hidden border-4 border-white/10 shadow-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 flex items-center justify-center transform -rotate-3 group transition-transform hover:rotate-0 duration-500">
              <span className="text-[80px]">📖</span>
            </div>
          </div>

          {/* Content Container */}
          <div className="w-full space-y-6 z-10 text-white text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary rounded-full">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
              <span className="text-xs font-bold tracking-widest uppercase">Günün Hikayesi</span>
            </div>
            <h2 className="text-3xl font-headline font-extrabold leading-tight">Bulutların Üstündeki Köy</h2>
            <p className="text-slate-300 text-base font-light leading-relaxed">
              Pofuduk bulutların üzerinde yaşayan küçük bir kuzunun rüya dolu serüvenine eşlik edin. En popüler masalımız!
            </p>
            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              <button className="bg-white text-secondary px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 active:scale-95 transition-all">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_circle
                </span>
                Hemen Dinle
              </button>
            </div>
            <div className="flex items-center gap-6 justify-center text-slate-300">
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-white">12 dk</span>
                <span className="text-[10px] opacity-60 uppercase font-bold tracking-tighter">Süre</span>
              </div>
              <div className="w-[1px] h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold text-white">4.9</span>
                <span className="text-[10px] opacity-60 uppercase font-bold tracking-tighter">Puan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="pb-4">
        <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">auto_awesome_motion</span>
          Hikaye Kategorileri
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex-shrink-0 bg-surface-container-high px-6 py-4 rounded-lg flex items-center gap-3 active:scale-95 transition-all cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-full ${cat.bgColor} flex items-center justify-center ${cat.color}`}>
                <span className="material-symbols-outlined">{cat.icon}</span>
              </div>
              <span className="font-bold">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </MobileLayout>
  )
}
