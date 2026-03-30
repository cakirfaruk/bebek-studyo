import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateBabyNames } from '@/lib/ai'
import { generateId } from '@/lib/utils'
import type { BabyName } from '@/types'
import { toast } from 'sonner'

const sampleNames: BabyName[] = [
  {
    id: '1', name: 'Ada', meaning: 'Soylu, asil. Ayni zamanda matematik ve bilgisayar biliminin oncusu Ada Lovelace\'i hatirlatir.', origin: 'Turkce / Almanca',
    gender: 'girl', numerologyScore: 6, numerologyMeaning: 'Uyum ve sevgi sayisi', zodiacCompatibility: 85,
    isInternational: true, pronunciation: 'A-da', tags: ['modern', 'uluslararasi', 'kisa'], isFavorite: false,
  },
  {
    id: '2', name: 'Deniz', meaning: 'Deniz, sonsuzluk ve ozgurluk simgesi.', origin: 'Turkce',
    gender: 'unisex', numerologyScore: 7, numerologyMeaning: 'Bilgelik ve analiz sayisi', zodiacCompatibility: 78,
    isInternational: true, pronunciation: 'De-niz', tags: ['unisex', 'doga', 'modern'], isFavorite: false,
  },
  {
    id: '3', name: 'Mira', meaning: 'Hayranlik, baris. Sanskritce\'de okyanus anlamina gelir.', origin: 'Turkce / Sanskrit',
    gender: 'girl', numerologyScore: 9, numerologyMeaning: 'Insancil ve sefkatli sayi', zodiacCompatibility: 92,
    isInternational: true, pronunciation: 'Mi-ra', tags: ['uluslararasi', 'kisa', 'anlamli'], isFavorite: false,
  },
  {
    id: '4', name: 'Kaan', meaning: 'Hukumdar, kral. Guc ve liderlik simgesi.', origin: 'Turkce / Mogolca',
    gender: 'boy', numerologyScore: 3, numerologyMeaning: 'Yaraticilik ve ifade sayisi', zodiacCompatibility: 88,
    isInternational: true, pronunciation: 'Ka-an', tags: ['guclu', 'kisa', 'geleneksel'], isFavorite: false,
  },
  {
    id: '5', name: 'Emir', meaning: 'Komutan, lider. Arapca kokenli guclu bir isim.', origin: 'Arapca / Turkce',
    gender: 'boy', numerologyScore: 5, numerologyMeaning: 'Ozgurluk ve macera sayisi', zodiacCompatibility: 82,
    isInternational: true, pronunciation: 'E-mir', tags: ['uluslararasi', 'guclu', 'modern'], isFavorite: false,
  },
  {
    id: '6', name: 'Lina', meaning: 'Zarif, nazik. Arapca\'da palmiye agaci anlamina gelir.', origin: 'Arapca / Latince',
    gender: 'girl', numerologyScore: 1, numerologyMeaning: 'Liderlik ve bagimsizlik sayisi', zodiacCompatibility: 90,
    isInternational: true, pronunciation: 'Li-na', tags: ['uluslararasi', 'zarif', 'kisa'], isFavorite: false,
  },
]

// Pastel gradient backgrounds for name cards
const cardGradients = [
  'from-pink-50 to-pink-100',
  'from-blue-50 to-blue-100',
  'from-tertiary-fixed-dim/20 to-tertiary-container/30',
  'from-pink-50 to-pink-100',
  'from-blue-50 to-blue-100',
  'from-tertiary-fixed-dim/20 to-tertiary-container/30',
]


const cardIcons = ['cloud', 'forest', 'diamond', 'cloud', 'forest', 'diamond']

const cardAccentColors = [
  { text: 'text-primary', border: 'border-primary-container', hoverBg: 'hover:bg-primary' },
  { text: 'text-secondary', border: 'border-secondary-container', hoverBg: 'hover:bg-secondary' },
  { text: 'text-tertiary', border: 'border-tertiary-container', hoverBg: 'hover:bg-tertiary' },
  { text: 'text-primary', border: 'border-primary-container', hoverBg: 'hover:bg-primary' },
  { text: 'text-secondary', border: 'border-secondary-container', hoverBg: 'hover:bg-secondary' },
  { text: 'text-tertiary', border: 'border-tertiary-container', hoverBg: 'hover:bg-tertiary' },
]

export default function NameFinder() {
  const { profile, favoriteNames, addFavoriteName, removeFavoriteName, addNameToHistory } = useStore()
  const [gender, setGender] = useState<'boy' | 'girl' | 'unisex'>('girl')
  const [names, setNames] = useState<BabyName[]>(sampleNames)
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [fatherNameInput, setFatherNameInput] = useState('')
  const [motherNameInput, setMotherNameInput] = useState('')

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generateBabyNames({
        motherName: motherNameInput || profile?.motherName || '',
        fatherName: fatherNameInput || profile?.fatherName || '',
        surname: profile?.fatherName?.split(' ').pop() || '',
        motherBirthDate: profile?.motherBirthDate,
        fatherBirthDate: profile?.fatherBirthDate,
        dueDate: profile?.dueDate,
        gender,
        criteria: ['meaning', 'international'],
        count: 6,
      })

      const cleaned = result.replace(/```json?\n?/g, '').replace(/```/g, '').trim()
      const parsed = JSON.parse(cleaned) as BabyName[]
      const withIds = parsed.map((n) => ({
        ...n,
        id: generateId(),
        isFavorite: favoriteNames.some((f) => f.name === n.name),
      }))
      setNames(withIds)
      withIds.forEach((n) => addNameToHistory(n))
      toast.success(`${withIds.length} yeni isim onerisi olusturuldu!`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Isim onerileri olusturulamadi')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = (name: BabyName) => {
    if (favoriteNames.some((f) => f.name === name.name)) {
      removeFavoriteName(name.id)
      setNames(names.map((n) => n.id === name.id ? { ...n, isFavorite: false } : n))
    } else {
      addFavoriteName(name)
      setNames(names.map((n) => n.id === name.id ? { ...n, isFavorite: true } : n))
    }
  }

  const filteredNames = names.filter((n) => {
    if (searchQuery && !n.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (gender !== 'unisex' && n.gender !== gender && n.gender !== 'unisex') return false
    return true
  })

  return (
    <MobileLayout title="Isim Bulucu" showBack>
      {/* Hero Section & AI Prompt */}
      <section className="mb-10">
        <h2 className="text-4xl font-display font-extrabold text-on-surface mb-2 leading-tight">
          Isminizi <span className="text-primary">Bulun.</span>
        </h2>
        <p className="text-on-surface-variant font-body max-w-md">
          AI destekli astroloji, numeroloji ve derin dilbilim kokleri ile mukemmel ismi kesfedin.
        </p>
      </section>

      {/* Search & Filter Cluster (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Main Search Bento */}
        <div className="md:col-span-8 bg-surface-container-lowest rounded-lg p-8 shadow-[0_8px_32px_rgba(186,9,97,0.04)] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <label className="block text-sm font-bold mb-4 text-on-surface">Bir tarzi arayin</label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-4 text-outline">search</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full bg-surface-container border-none focus:ring-2 focus:ring-primary/20 text-on-surface font-body outline-none"
                placeholder="'Zarif ve Dogal' veya 'Asil Kokler' deneyin..."
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                { value: 'girl' as const, label: 'Kiz', active: gender === 'girl' },
                { value: 'boy' as const, label: 'Erkek', active: gender === 'boy' },
                { value: 'unisex' as const, label: 'Unisex', active: gender === 'unisex' },
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                    g.active
                      ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container/30'
                  }`}
                >
                  {g.label}
                </button>
              ))}
              <button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-primary-container/30 transition-colors">
                Doga
              </button>
              <button className="px-5 py-2 rounded-full bg-surface-container-high text-on-surface-variant text-sm font-medium hover:bg-primary-container/30 transition-colors">
                Kozmik
              </button>
            </div>
          </div>
        </div>

        {/* Parent Compatibility Bento */}
        <div className="md:col-span-4 bg-secondary-container rounded-lg p-6 flex flex-col justify-between border-none">
          <div>
            <span className="material-symbols-outlined text-secondary text-3xl mb-3">auto_awesome</span>
            <h3 className="text-xl font-display font-bold text-on-secondary-container leading-snug">Ebeveyn Eslestirme</h3>
            <p className="text-sm text-on-secondary-fixed-variant mt-2 font-body">Ebeveyn isimleriyle fonetik uyum saglayin.</p>
          </div>
          <div className="mt-6 space-y-3">
            <input
              type="text"
              value={fatherNameInput}
              onChange={(e) => setFatherNameInput(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/40 border-none text-sm placeholder:text-slate-400 outline-none"
              placeholder="Baba Adi"
            />
            <input
              type="text"
              value={motherNameInput}
              onChange={(e) => setMotherNameInput(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white/40 border-none text-sm placeholder:text-slate-400 outline-none"
              placeholder="Anne Adi"
            />
          </div>
        </div>
      </div>

      {/* AI Suggestions Grid */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-display font-bold text-on-surface">Sizin Icin Secildi</h3>
        <button onClick={handleGenerate} className="text-primary font-bold text-sm flex items-center gap-1">
          AI Yenile <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNames.map((name, i) => {
          const gradientIdx = i % cardGradients.length
          const accent = cardAccentColors[gradientIdx]
          const isFav = name.isFavorite || favoriteNames.some((f) => f.name === name.name)

          return (
            <motion.div
              key={name.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-container-lowest rounded-lg p-1 pt-0 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Gradient header strip */}
              <div className={`h-32 rounded-t-lg bg-gradient-to-br ${cardGradients[gradientIdx]} flex items-end px-6 pb-4 relative overflow-hidden`}>
                <div className="absolute -right-4 -top-4 w-24 h-24 opacity-20">
                  <span className={`material-symbols-outlined text-8xl ${accent.text}`}>{cardIcons[gradientIdx]}</span>
                </div>
                <span className={`bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold ${accent.text} uppercase tracking-widest absolute top-4 left-6`}>
                  {name.gender === 'girl' ? 'Kiz' : name.gender === 'boy' ? 'Erkek' : 'Unisex'}
                </span>
              </div>

              <div className="p-6">
                {/* Name and match percentage */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-3xl font-display font-extrabold text-on-surface">{name.name}</h4>
                    <p className="text-xs font-medium text-outline flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-sm">public</span> {name.origin}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-full border-4 ${accent.border} flex items-center justify-center text-xs font-bold ${accent.text} bg-white`}>
                    {name.zodiacCompatibility}%
                  </div>
                </div>

                {/* Meaning */}
                <p className="text-sm text-on-surface-variant font-body mb-6 leading-relaxed">{name.meaning}</p>

                {/* Numerology & Astro grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-surface-container-low p-3 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-outline-variant mb-1">Numeroloji</span>
                    <span className="text-sm font-bold text-on-surface">Yasam Yolu {name.numerologyScore}</span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-xl">
                    <span className="block text-[10px] uppercase font-bold text-outline-variant mb-1">Burc</span>
                    <span className="text-sm font-bold text-on-surface">%{name.zodiacCompatibility} Uyum</span>
                  </div>
                </div>

                {/* Save button */}
                <button
                  onClick={() => toggleFavorite(name)}
                  className={`w-full py-3 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                    isFav
                      ? 'bg-primary text-on-primary'
                      : `bg-surface-container text-on-surface-variant ${accent.hoverBg} hover:text-white`
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">favorite</span>
                  {isFav ? 'Favorilerde' : 'Favorilere Ekle'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* AI Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full mt-8 py-4 rounded-full bg-gradient-to-r from-secondary to-secondary-dim text-on-secondary font-display font-bold shadow-[0_20px_40px_rgba(104,52,235,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <span className="material-symbols-outlined">auto_awesome</span>
            AI ile Isim Oner
          </>
        )}
      </button>

      {/* Featured Collections */}
      <section className="mt-16">
        <h3 className="text-2xl font-display font-bold text-on-surface mb-8">Secilmis Koleksiyonlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-lg overflow-hidden h-64 flex flex-col justify-end p-8 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30" />
            <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">
              🌙
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h4 className="text-white text-2xl font-display font-bold">Ay Isigi ve Gizemli</h4>
              <p className="text-white/80 text-sm mt-1">Kozmostan ilham alan 24 isim</p>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden h-64 flex flex-col justify-end p-8 group">
            <div className="absolute inset-0 bg-gradient-to-br from-tertiary/30 to-green-500/30" />
            <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-30">
              🌿
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="relative z-10">
              <h4 className="text-white text-2xl font-display font-bold">Vahsi ve Ozgur</h4>
              <p className="text-white/80 text-sm mt-1">Maceracilar icin 18 dogal isim</p>
            </div>
          </div>
        </div>
      </section>
    </MobileLayout>
  )
}
