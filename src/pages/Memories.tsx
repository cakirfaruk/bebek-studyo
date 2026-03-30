import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateId, formatDate } from '@/lib/utils'
import type { MemoryEntry } from '@/types'

const moods = [
  { value: 'happy' as const, emoji: '😊', label: 'Mutlu' },
  { value: 'excited' as const, emoji: '🤩', label: 'Heyecanlı' },
  { value: 'emotional' as const, emoji: '🥺', label: 'Duygusal' },
  { value: 'tired' as const, emoji: '😴', label: 'Yorgun' },
  { value: 'anxious' as const, emoji: '😰', label: 'Endişeli' },
  { value: 'grateful' as const, emoji: '🙏', label: 'Minnettar' },
]

const milestoneCategories = [
  { icon: 'stars', label: 'İlkler', active: true },
  { icon: 'trending_up', label: 'Gelişim', active: false },
  { icon: 'photo_library', label: 'Aylık Fotolar', active: false },
  { icon: 'favorite', label: 'Aile', active: false },
]

export default function Memories() {
  const { memories, addMemory } = useStore()
  const [activeCategory, setActiveCategory] = useState('İlkler')
  const [showNew, setShowNew] = useState(false)
  const [newEntry, setNewEntry] = useState<Partial<MemoryEntry>>({
    type: 'note',
    title: '',
    content: '',
    mood: 'happy',
    date: new Date().toISOString().split('T')[0],
  })

  const handlePhotoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          setNewEntry({ ...newEntry, imageUrl: ev.target?.result as string })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleSave = () => {
    if (!newEntry.title || !newEntry.content) return
    addMemory({
      id: generateId(),
      type: newEntry.type || 'note',
      title: newEntry.title,
      content: newEntry.content,
      imageUrl: newEntry.imageUrl,
      date: newEntry.date || new Date().toISOString(),
      mood: newEntry.mood,
    })
    setNewEntry({ type: 'note', title: '', content: '', mood: 'happy', date: new Date().toISOString().split('T')[0] })
    setShowNew(false)
  }

  return (
    <MobileLayout title="Anı Defteri" showBack>
      <div className="space-y-10">
        {/* Stats/Summary Section */}
        <section className="flex items-center justify-between p-6 bg-secondary-container/30 rounded-lg relative overflow-hidden">
          <div className="z-10">
            <p className="text-sm font-label text-on-surface-variant uppercase tracking-widest mb-1">Toplam Anı</p>
            <h2 className="text-4xl font-display font-extrabold text-secondary">{memories.length || 128}</h2>
            <p className="text-xs text-on-surface-variant mt-2">Bu ay 12 yeni anı eklendi ✨</p>
          </div>
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 blur-3xl opacity-50"></div>
          <div className="relative z-10 w-20 h-20 text-5xl flex items-center justify-center">
            💖
          </div>
        </section>

        {/* Milestone Categories */}
        <section>
          <h3 className="font-display font-bold text-lg mb-4 px-1">Kategoriler</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {milestoneCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-medium flex items-center gap-2 shadow-sm ${
                  activeCategory === cat.label
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-white text-on-surface-variant border border-outline-variant/15'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{cat.icon}</span> {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Memory Feed */}
        <section className="space-y-10">
          {/* Memory Card 1 - Large image card */}
          {memories.length > 0 ? (
            memories.map((memory, _i) => (
              <article key={memory.id} className="group">
                <div className="relative mb-6">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl relative bg-gradient-to-br from-pink-100 to-purple-100">
                    {memory.imageUrl ? (
                      <img alt="Memory Photo" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" src={memory.imageUrl} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl">
                        {memory.type === 'photo' ? '📸' : memory.type === 'letter' ? '💌' : memory.type === 'milestone' ? '⭐' : '📝'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-tighter mb-2">
                        {memory.type === 'milestone' ? 'İlk Adım' : memory.type === 'photo' ? 'Fotoğraf' : memory.type === 'letter' ? 'Mektup' : 'Not'}
                      </span>
                      <p className="text-white/90 text-sm font-medium">{formatDate(memory.date)}</p>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="font-display font-bold text-2xl text-on-surface leading-tight mb-3">{memory.title}</h4>
                  <p className="text-on-surface-variant leading-relaxed">{memory.content}</p>
                </div>
              </article>
            ))
          ) : (
            <>
              {/* Default showcase cards when no memories exist */}
              <article className="group">
                <div className="relative mb-6">
                  <div className="aspect-[4/5] rounded-lg overflow-hidden shadow-2xl relative bg-gradient-to-br from-pink-100 to-purple-100">
                    <div className="w-full h-full flex items-center justify-center text-8xl">👶</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-tighter mb-2">İlk Adım</span>
                      <p className="text-white/90 text-sm font-medium">12 Eylül 2023</p>
                    </div>
                  </div>
                  {/* Break-out element */}
                  <div className="absolute -top-6 -right-4 w-24 h-24 transform rotate-12 drop-shadow-2xl text-6xl flex items-center justify-center">
                    🧸
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="font-display font-bold text-2xl text-on-surface leading-tight mb-3">Bugün kocaman bir adım attık!</h4>
                  <p className="text-on-surface-variant leading-relaxed">Oturma odasından mutfağa kadar tam 4 adım attı. Hepimiz şaşkınlık ve mutluluk içindeyiz. Dünyanın en güzel anıydı.</p>
                </div>
              </article>

              <article className="group">
                <div className="relative mb-6">
                  <div className="aspect-square rounded-lg overflow-hidden shadow-2xl relative bg-gradient-to-br from-purple-100 to-pink-100">
                    <div className="w-full h-full flex items-center justify-center text-8xl">😊</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-tighter mb-2">İlk Gülümseme</span>
                      <p className="text-white/90 text-sm font-medium">5 Ağustos 2023</p>
                    </div>
                  </div>
                </div>
                <div className="px-2">
                  <h4 className="font-display font-bold text-2xl text-on-surface leading-tight mb-3">O eşsiz ilk tebessüm...</h4>
                  <p className="text-on-surface-variant leading-relaxed">Sabah uykusundan uyandığında babasını görünce öyle bir güldü ki, kalbimiz eridi. Artık dünyayı tanımaya başlıyor.</p>
                </div>
              </article>

              {/* 2-column grid for secondary cards */}
              <div className="grid grid-cols-2 gap-6">
                <article className="bg-surface-container-low p-5 rounded-lg border border-white/40 shadow-sm flex flex-col justify-between aspect-square">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-secondary">cake</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block mb-1">Doğum Günü</span>
                    <h4 className="font-display font-bold text-lg text-on-surface leading-none mb-2">1 Yaş Partisi Planları</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2">Tema seçildi: Bulutlar ve Yıldızlar...</p>
                  </div>
                </article>
                <article className="bg-primary/5 p-5 rounded-lg border border-white/40 shadow-sm flex flex-col justify-between aspect-square">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-primary">restaurant</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">Beslenme</span>
                    <h4 className="font-display font-bold text-lg text-on-surface leading-none mb-2">İlk Ek Gıda Deneyimi</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2">Avokado püresini hiç sevmedi ama havuç...</p>
                  </div>
                </article>
              </div>
            </>
          )}
        </section>

        {/* New Entry Form */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-4 rounded-lg space-y-4">
                {/* Type */}
                <div className="flex gap-2">
                  {[
                    { type: 'note' as const, emoji: '📝', label: 'Not' },
                    { type: 'photo' as const, emoji: '📸', label: 'Fotoğraf' },
                    { type: 'letter' as const, emoji: '💌', label: 'Mektup' },
                    { type: 'milestone' as const, emoji: '⭐', label: 'İlk' },
                  ].map((t) => (
                    <button
                      key={t.type}
                      onClick={() => setNewEntry({ ...newEntry, type: t.type })}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 ${
                        newEntry.type === t.type ? 'bg-primary-container/30 border border-primary-container' : 'bg-surface-container-low'
                      }`}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Title */}
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder={newEntry.type === 'letter' ? 'Sevgili Bebeğim...' : 'Başlık'}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/15 focus:border-primary outline-none text-sm"
                />

                {/* Content */}
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder={
                    newEntry.type === 'letter' ? 'Sana bu mektubu yazıyorum çünkü...' :
                    newEntry.type === 'milestone' ? 'İlk kez ne oldu? Nasıl hissettiniz?' :
                    'Anınızı yazın...'
                  }
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container border border-outline-variant/15 focus:border-primary outline-none text-sm resize-none"
                />

                {/* Photo upload */}
                {newEntry.imageUrl ? (
                  <div className="relative">
                    <img src={newEntry.imageUrl} alt="" className="w-full h-40 object-cover rounded-xl" />
                    <button
                      onClick={() => setNewEntry({ ...newEntry, imageUrl: undefined })}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                    >
                      <span className="material-symbols-outlined text-white text-sm">delete</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handlePhotoUpload}
                    className="w-full h-11 rounded-xl border border-outline-variant/15 flex items-center justify-center gap-2 text-sm text-on-surface-variant hover:bg-surface-container-low"
                  >
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                    Fotoğraf Ekle
                  </button>
                )}

                {/* Mood */}
                <div>
                  <label className="text-xs font-medium text-on-surface mb-2 block">Ruh Haliniz</label>
                  <div className="flex gap-2">
                    {moods.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setNewEntry({ ...newEntry, mood: m.value })}
                        className={`flex-1 py-2 rounded-lg flex flex-col items-center gap-0.5 transition-all ${
                          newEntry.mood === m.value ? 'bg-primary-container/30 border border-primary-container' : 'bg-surface-container-low'
                        }`}
                      >
                        <span className="text-lg">{m.emoji}</span>
                        <span className="text-[9px] text-on-surface-variant">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container border border-outline-variant/15 focus:border-primary outline-none text-sm"
                />

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowNew(false)}
                    className="flex-1 h-11 rounded-xl border border-outline-variant/15 text-on-surface-variant text-sm font-medium"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!newEntry.title || !newEntry.content}
                    className="flex-1 h-11 rounded-xl bg-gradient-to-br from-secondary to-secondary-dim text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state spacing for FAB */}
        <div className="h-12"></div>

        {/* Large CTA Button */}
        <button
          onClick={() => setShowNew(true)}
          className="w-full py-5 px-8 bg-gradient-to-br from-secondary to-secondary-dim text-white rounded-full font-display font-bold shadow-[0_12px_24px_rgba(104,52,235,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Yeni Anı Ekle
        </button>
      </div>
    </MobileLayout>
  )
}
