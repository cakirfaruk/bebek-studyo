import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateId, formatDate } from '@/lib/utils'
import type { MemoryEntry } from '@/types'

const HEART_DECOR = "https://lh3.googleusercontent.com/aida-public/AB6AXuChHV_nSNfMs2YgB99Ik9UGHFbWQJCBYio8_b8ReLBw53lt-AQ-vnjLi8kmIfU_BaTyvthi1TMM5JkI3nhC6bSmJLQQkZJj6Le8iSYLFezvpZ8bhYYZst16ox5VH8yEn6B-lCoe1H5r-e1l3MgdA1VURj1IujP2qcS82sneyTB6BApPGDQ2wBOM2F7R0NQ9ikQhndhIW4G1B5FWC1eFp5Wd_3hMDjPa2zuZFJ0kAT-YTmI5ZYuMqDhL99TD8SiunJGyqunWJrTA5a8"
const MEMORY_1_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuD3-mx3zb3iU67w0a-KCBl_NvDdR-FuB7Cekg7O31ItqZELfBp2hkGEcMDpSpzSBrBfLFc_LBemJKVsEDXM6WYAtc7Q4MEtqV_kvK8Ypx5xxr7JRRZXqVg3QOyrqJeG5T4-r7hGPUq796po6rddr3uGg9cfHmE5eXGY2Z3aNCoVf3F4e-xeiBGMFU8yjg0KxC_fijXhWHBYgoKKcTWVvh1vysYkNzMji0K5wXSb0c7APRVrofL-VcFG2Cddku13Gxg-m3i7U5lLtvw"
const MEMORY_2_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDG_dsFPqGc_aV9uJuOSRPCZynNhwzmtyDxAJSxGpDT0_YBnCJfSkzyHg-INFCW1moPfzLGwLKoHjDK63n_KOU89Ehyqx6L7rYg3cxRPnLGeKfa_nrF6TZbMOIngTduP95a6b2Ej--oz-O69eNQvtbR_iNx-BPr7BZlw41sRVdVRabMM2ZIT5QA2czPkhkd95Nje25HgtZeLuuzuwd0wYDCwwEvNYjyaxSeyL4G_XRM0dOeS5OuihQlau_rXaDp8-pm42CGUDFWS_M"
const TOY_DECOR = "https://lh3.googleusercontent.com/aida-public/AB6AXuBJO9QAoMJtu7Ypi54IIwEMrz_fxGaQyeNQiM4fOGV_1UM6QskIzk4U4Tbe1HRtXkDhAZk7B4MeJ3uUh0VFLou39bCqF2b_yAvdYyg-ztGXX8O6nSbi9f_uwSNonbF0fZCa13VGf2hlODC-X4ddo7d_Qtf5RnomhI5vFmDzjXa5D2KDzQfyyaz3k3yuFqxnANeHdwS5AEjQ509ck8YarXcMbHCEK51Ge2UifyYawKVgg5eL2cC5pFfzvNFKzTl9EULeDpgfx4KlU3A"

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

  const handleShare = async (memory: MemoryEntry) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: memory.title,
          text: memory.content,
        })
      } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${memory.title}\n\n${memory.content}`)
      toast.success('Panoya kopyalandı!')
    }
  }

  // Simulated photo upload
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
      mood: newEntry.mood || 'happy',
    })
    setNewEntry({ type: 'note', title: '', content: '', mood: 'happy', date: new Date().toISOString().split('T')[0] })
    setShowNew(false)
  }

  return (
    <MobileLayout title="Anı Defteri" showBack>
      <div className="space-y-10 pb-10 mt-4">
        
        {/* Stats/Summary Section */}
        <section className="flex items-center justify-between p-6 bg-secondary-container/30 rounded-2xl relative overflow-hidden shadow-sm border border-secondary/10">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 blur-3xl opacity-50 z-0" />
          <div className="z-10 relative">
            <p className="text-xs font-bold font-headline text-on-surface-variant uppercase tracking-widest mb-1">Toplam Anı</p>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-secondary">{memories.length > 0 ? memories.length : 128}</h2>
            <p className="text-sm text-on-surface-variant mt-2 font-medium font-body">Bu ay {memories.length > 0 ? memories.length : 12} yeni anı eklendi ✨</p>
          </div>
          <div className="relative z-10 w-24 h-24 flex-shrink-0">
            <img 
              src={HEART_DECOR} 
              alt="Memory Count Decor" 
              className="rounded-full shadow-lg border-4 border-white transform rotate-6 w-full h-full object-cover" 
            />
          </div>
        </section>

        {/* Milestone Categories */}
        <section>
          <h3 className="font-headline font-bold text-xl mb-5 px-1 text-on-surface">Kategoriler</h3>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 snap-x">
            {milestoneCategories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`snap-start flex-shrink-0 px-6 py-3.5 rounded-full font-headline font-bold text-sm tracking-wide flex items-center gap-2.5 transition-all duration-300 ${
                  activeCategory === cat.label
                    ? 'bg-primary-container text-on-primary-container shadow-[0_8px_16px_rgba(255,168,193,0.3)] border border-white/40 scale-105'
                    : 'bg-surface-container-lowest text-on-surface-variant border border-outline-variant/15 shadow-sm hover:bg-surface-container-low'
                }`}
              >
                <span aria-hidden="true" className="material-symbols-outlined text-lg" style={activeCategory === cat.label ? { fontVariationSettings: "'FILL' 1" } : {}}>{cat.icon}</span> 
                {cat.label}
              </button>
            ))}
          </div>
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
              <div className="bg-surface-container-lowest/80 backdrop-blur-xl border border-white/60 p-6 rounded-2xl shadow-[0_20px_50px_rgba(104,52,235,0.08)] space-y-6">
                
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-4">
                  <h3 className="font-headline font-bold text-xl text-on-surface">Yeni Anı Ekle</h3>
                  <button onClick={() => setShowNew(false)} className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors">
                    <span aria-hidden="true" className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>

                {/* Type Selection */}
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
                      className={`flex-1 py-3 rounded-xl text-[11px] font-bold font-headline uppercase tracking-widest flex flex-col items-center gap-1.5 transition-all ${
                        newEntry.type === t.type 
                          ? 'bg-secondary-container/50 text-secondary-dim border border-secondary/20 shadow-sm transform scale-105' 
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="text-2xl drop-shadow-sm">{t.emoji}</span>
                      <span className="mt-1">{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    placeholder={newEntry.type === 'letter' ? 'Sevgili Bebeğim...' : 'Harika bir başlık bul'}
                    className="w-full h-14 px-5 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 focus:border-secondary/40 focus:ring-4 focus:ring-secondary/10 outline-none text-base font-headline font-bold text-on-surface transition-all placeholder:font-medium placeholder:font-body"
                  />

                  <div className="relative">
                    <textarea
                      value={newEntry.content}
                      onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                      maxLength={2000}
                      placeholder={
                        newEntry.type === 'letter' ? 'Sana bu mektubu yazıyorum çünkü...' :
                        newEntry.type === 'milestone' ? 'İlk kez ne oldu? Nasıl hissettiniz?' :
                        'En güzel anılarını ölümsüzleştir...'
                      }
                      rows={5}
                      className="w-full px-5 py-4 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 focus:border-secondary/40 focus:ring-4 focus:ring-secondary/10 outline-none text-sm font-body text-on-surface transition-all resize-none leading-relaxed placeholder:font-body placeholder:text-on-surface-variant/60"
                    />
                    <span className="absolute bottom-2 right-4 text-[11px] text-on-surface-variant/60 font-body">
                      {newEntry.content?.length || 0}/2000
                    </span>
                  </div>

                  {/* Photo upload */}
                  {newEntry.imageUrl ? (
                    <div className="relative group rounded-2xl overflow-hidden border border-white/40 shadow-sm">
                      <img src={newEntry.imageUrl} alt="" className="w-full h-56 object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => setNewEntry({ ...newEntry, imageUrl: undefined })}
                          className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-error/80 transition-all border border-white/40"
                        >
                          <span aria-hidden="true" className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={handlePhotoUpload}
                      className="w-full h-16 rounded-2xl border-2 border-dashed border-outline-variant/30 flex items-center justify-center gap-3 text-sm font-headline font-bold text-on-surface-variant hover:bg-surface-container-low hover:border-secondary/40 hover:text-secondary-dim transition-all"
                    >
                      <span aria-hidden="true" className="material-symbols-outlined text-xl">add_a_photo</span>
                      Fotoğraf Ekle (Opsiyonel)
                    </button>
                  )}
                </div>

                {/* Mood Selection */}
                <div>
                  <label className="text-xs font-bold font-headline text-on-surface mb-3 block uppercase tracking-wide">Nasıl Hissediyorsun?</label>
                  <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl">
                    {moods.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setNewEntry({ ...newEntry, mood: m.value })}
                        className={`flex-1 py-2.5 rounded-lg flex flex-col items-center gap-1 transition-all ${
                          newEntry.mood === m.value ? 'bg-white shadow-sm scale-[1.05] z-10' : 'opacity-70 hover:opacity-100'
                        }`}
                        title={m.label}
                      >
                        <span className="text-2xl drop-shadow-sm">{m.emoji}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-outline-variant/10">
                  <input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="flex-1 h-14 px-4 rounded-xl bg-surface-container-low border border-outline-variant/20 focus:border-secondary/40 outline-none text-sm font-headline font-bold text-on-surface-variant"
                  />
                  <button
                    onClick={handleSave}
                    disabled={!newEntry.title || !newEntry.content}
                    className="flex-[2] h-14 rounded-xl bg-gradient-to-r from-secondary to-secondary-dim text-white text-base font-extrabold shadow-[0_8px_16px_rgba(104,52,235,0.3)] disabled:opacity-50 disabled:shadow-none hover:scale-[1.02] active:scale-95 transition-all font-headline tracking-wide"
                  >
                    Anıyı Kaydet
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memory Feed Grid */}
        <section className="space-y-8">
          {memories.length > 0 ? (
            <div className="space-y-8">
              {memories.map((memory) => (
                <article key={memory.id} className="group">
                  <div className="relative mb-5">
                    <div className="aspect-[4/5] md:aspect-[16/10] rounded-2xl overflow-hidden shadow-card border border-white/50 relative bg-gradient-to-br from-pink-100 to-purple-100">
                      {memory.imageUrl ? (
                        <img alt="Memory Photo" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" src={memory.imageUrl} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[120px] drop-shadow-2xl opacity-80">
                          {memory.type === 'photo' ? '📸' : memory.type === 'letter' ? '💌' : memory.type === 'milestone' ? '⭐' : '📝'}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent mix-blend-multiply" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="inline-block px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-widest border border-white/20 shadow-sm">
                            {memory.type === 'milestone' ? 'İlk Adım' : memory.type === 'photo' ? 'Fotoğraf' : memory.type === 'letter' ? 'Mektup' : 'Not'}
                          </span>
                          {memory.mood && (
                            <span className="text-xl drop-shadow-lg">{moods.find(m => m.value === memory.mood)?.emoji}</span>
                          )}
                        </div>
                        <p className="text-white/90 text-sm font-semibold font-body tracking-wide">{formatDate(memory.date)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="px-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h4 className="font-headline font-extrabold text-2xl md:text-3xl text-on-surface leading-tight tracking-tight break-words">{memory.title}</h4>
                      <button
                        onClick={() => handleShare(memory)}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-secondary/10 hover:text-secondary transition-colors active:scale-95"
                        aria-label="Paylaş"
                      >
                        <span aria-hidden="true" className="material-symbols-outlined text-xl">share</span>
                      </button>
                    </div>
                    <p className="text-on-surface-variant leading-relaxed font-body text-[15px]">{memory.content}</p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <>
              {/* Default showcase cards when no memories exist (Static UI match from mockup) */}
              <article className="group">
                <div className="relative mb-5 mt-4">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-card relative border border-white/50">
                    <img 
                      alt="Memory Photo" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" 
                      src={MEMORY_1_IMG}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-white/20 shadow-sm">İlk Adım</span>
                      <p className="text-white/90 text-sm font-bold font-body tracking-wide">12 Eylül 2023</p>
                    </div>
                  </div>
                  {/* Decorative toy break-out element */}
                  <div className="absolute -top-10 -right-8 w-32 h-32 transform rotate-12 drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] pointer-events-none group-hover:rotate-0 group-hover:scale-110 transition-transform duration-700 z-10">
                    <img src={TOY_DECOR} alt="Decorative Toy" className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="px-4">
                  <h4 className="font-headline font-extrabold text-3xl text-on-surface leading-tight mb-3 tracking-tight">Bugün kocaman bir adım attık!</h4>
                  <p className="text-on-surface-variant leading-relaxed text-[15px] font-body">Oturma odasından mutfağa kadar tam 4 adım attı. Hepimiz şaşkınlık ve mutluluk içindeyiz. Dünyanın en güzel anıydı.</p>
                </div>
              </article>

              <article className="group">
                <div className="relative mb-5 mt-10">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-card relative border border-white/50">
                    <img 
                      alt="Memory Photo" 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" 
                      src={MEMORY_2_IMG}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md text-white text-[11px] font-extrabold uppercase tracking-widest mb-3 border border-white/20 shadow-sm">İlk Gülümseme</span>
                      <p className="text-white/90 text-sm font-bold font-body tracking-wide">5 Ağustos 2023</p>
                    </div>
                  </div>
                </div>
                <div className="px-4">
                  <h4 className="font-headline font-extrabold text-3xl text-on-surface leading-tight mb-3 tracking-tight">O eşsiz ilk tebessüm...</h4>
                  <p className="text-on-surface-variant leading-relaxed text-[15px] font-body">Sabah uykusundan uyandığında babasını görünce öyle bir güldü ki, kalbimiz eridi. Artık dünyayı tanımaya başlıyor.</p>
                </div>
              </article>

              {/* 2-column grid for secondary bento cards */}
              <div className="grid grid-cols-2 gap-5 px-1 mt-10">
                <article className="bg-surface-container-lowest p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between aspect-square group">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                    <span aria-hidden="true" className="material-symbols-outlined text-secondary text-2xl">cake</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold font-headline text-secondary uppercase tracking-widest block mb-2">Doğum Günü</span>
                    <h4 className="font-headline font-bold text-lg text-on-surface leading-tight mb-2">1 Yaş Partisi Planları</h4>
                    <p className="text-[13px] text-on-surface-variant font-body line-clamp-2">Tema seçildi: Bulutlar ve Yıldızlar...</p>
                  </div>
                </article>
                <article className="bg-primary-container/10 p-6 rounded-2xl border border-white/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between aspect-square group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <span aria-hidden="true" className="material-symbols-outlined text-primary text-2xl">restaurant</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold font-headline text-primary uppercase tracking-widest block mb-2">Beslenme</span>
                    <h4 className="font-headline font-bold text-lg text-on-surface leading-tight mb-2">İlk Ek Gıda Deneyimi</h4>
                    <p className="text-[13px] text-on-surface-variant font-body line-clamp-2">Avokado püresini hiç sevmedi ama havuç...</p>
                  </div>
                </article>
              </div>
            </>
          )}
        </section>

        {/* Floating action equivalent spacing */}
        <div className="h-14"></div>

        {/* Large CTA Button (Instead of standard FAB for broader interaction area) */}
        {!showNew && (
          <button
            onClick={() => setShowNew(true)}
            className="w-full py-5 px-8 bg-gradient-to-br from-secondary to-secondary-dim text-white rounded-[2rem] font-headline font-extrabold text-base shadow-[0_12px_30px_rgba(104,52,235,0.3)] flex items-center justify-center gap-3 active:scale-95 hover:scale-[1.02] transition-all border border-white/20 uppercase tracking-widest"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-border">add_circle</span>
            Yeni Anı Ekle
          </button>
        )}
      </div>
    </MobileLayout>
  )
}
