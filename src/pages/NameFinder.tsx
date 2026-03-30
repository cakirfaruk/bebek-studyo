import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Heart, Globe, Hash, Star, Filter, Search, RefreshCw, Copy, Check } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateBabyNames } from '@/lib/ai'
import { generateId } from '@/lib/utils'
import type { BabyName } from '@/types'
import { toast } from 'sonner'

const criteria = [
  { id: 'numerology', label: 'Numeroloji', emoji: '🔢', desc: 'Sayisal uyum' },
  { id: 'astrology', label: 'Astroloji', emoji: '⭐', desc: 'Burc uyumu' },
  { id: 'meaning', label: 'Anlam', emoji: '📖', desc: 'Derin anlam' },
  { id: 'international', label: 'Uluslararasi', emoji: '🌍', desc: 'Kolay telaffuz' },
  { id: 'modern', label: 'Modern', emoji: '✨', desc: 'Cagdas' },
  { id: 'traditional', label: 'Geleneksel', emoji: '🏛️', desc: 'Klasik' },
]

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

export default function NameFinder() {
  const { profile, favoriteNames, addFavoriteName, removeFavoriteName, addNameToHistory } = useStore()
  const [gender, setGender] = useState<'boy' | 'girl' | 'unisex'>('girl')
  const [selectedCriteria, setSelectedCriteria] = useState<string[]>(['meaning', 'international'])
  const [names, setNames] = useState<BabyName[]>(sampleNames)
  const [loading, setLoading] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = async () => {
    setLoading(true)
    try {
      const result = await generateBabyNames({
        motherName: profile?.motherName || '',
        fatherName: profile?.fatherName || '',
        surname: profile?.fatherName?.split(' ').pop() || '',
        motherBirthDate: profile?.motherBirthDate,
        fatherBirthDate: profile?.fatherBirthDate,
        dueDate: profile?.dueDate,
        gender,
        criteria: selectedCriteria,
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

  const copyName = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopiedId(name)
    setTimeout(() => setCopiedId(null), 1500)
  }

  const filteredNames = names.filter((n) => {
    if (searchQuery && !n.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (gender !== 'unisex' && n.gender !== gender && n.gender !== 'unisex') return false
    return true
  })

  // Pastel gradient backgrounds for name cards
  const cardGradients = [
    'from-pink-50 to-pink-100',
    'from-blue-50 to-blue-100',
    'from-purple-50 to-purple-100',
    'from-amber-50 to-amber-100',
    'from-emerald-50 to-emerald-100',
    'from-cyan-50 to-cyan-100',
  ]

  const cardAccentColors = [
    { text: 'text-primary', border: 'border-primary-container', bg: 'bg-primary' },
    { text: 'text-secondary', border: 'border-secondary-container', bg: 'bg-secondary' },
    { text: 'text-tertiary', border: 'border-tertiary-container', bg: 'bg-tertiary' },
    { text: 'text-primary', border: 'border-primary-container', bg: 'bg-primary' },
    { text: 'text-secondary', border: 'border-secondary-container', bg: 'bg-secondary' },
    { text: 'text-tertiary', border: 'border-tertiary-container', bg: 'bg-tertiary' },
  ]

  return (
    <MobileLayout title="Isim Bulucu" showBack>
      <div className="space-y-8 pb-6">
        {/* Hero Section */}
        <section className="space-y-2">
          <h2 className="text-4xl font-display font-extrabold text-on-surface leading-tight">
            Isim <span className="text-primary">Rehberin.</span>
          </h2>
          <p className="text-on-surface-variant font-body max-w-md">
            AI destekli astroloji, numeroloji ve dilbilim analizi ile mukemmel ismi kesfet.
          </p>
        </section>

        {/* Search - Bento style */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-card relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl" />
          <div className="relative z-10">
            <label className="block text-sm font-bold mb-3 text-on-surface font-display">Bir isim ara</label>
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-outline" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="'Zarif ve Dogal' veya 'Asil' deneyin..."
                className="w-full pl-12 pr-12 py-4 rounded-full bg-surface-container focus:ring-2 focus:ring-primary/20 text-on-surface font-body text-sm outline-none"
              />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`absolute right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  showFilters ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20' : 'bg-surface-container-high text-on-surface-variant'
                }`}
              >
                <Filter className="w-4 h-4" />
              </button>
            </div>

            {/* Gender tabs as pills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { value: 'girl' as const, label: 'Kiz', emoji: '👧' },
                { value: 'boy' as const, label: 'Erkek', emoji: '👦' },
                { value: 'unisex' as const, label: 'Unisex', emoji: '🌟' },
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    gender === g.value
                      ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-primary-container/30'
                  }`}
                >
                  {g.emoji} {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-2xl p-5">
                <h4 className="text-sm font-bold text-on-surface mb-3 font-display">Kriterler</h4>
                <div className="grid grid-cols-3 gap-2">
                  {criteria.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setSelectedCriteria(
                          selectedCriteria.includes(c.id)
                            ? selectedCriteria.filter((x) => x !== c.id)
                            : [...selectedCriteria, c.id]
                        )
                      }}
                      className={`py-3 px-2 rounded-2xl flex flex-col items-center gap-1 text-center transition-all ${
                        selectedCriteria.includes(c.id)
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-low text-on-surface-variant'
                      }`}
                    >
                      <span className="text-lg">{c.emoji}</span>
                      <span className="text-[10px] font-medium">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Generate */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-full bg-gradient-to-r from-secondary to-secondary-dim text-white font-bold shadow-lg shadow-secondary/20 hover:opacity-90 transition-opacity active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              AI ile Isim Oner
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">1 Kredi</span>
            </>
          )}
        </button>

        {/* Favorites count */}
        {favoriteNames.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm text-on-surface-variant font-body">{favoriteNames.length} favori isim</span>
          </div>
        )}

        {/* Curated For You heading */}
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-display font-bold text-on-surface">Onerilenler</h3>
          <button onClick={handleGenerate} className="text-primary font-bold text-sm flex items-center gap-1">
            Yenile <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* Name Cards - Stitch style */}
        <div className="space-y-6">
          {filteredNames.map((name, i) => {
            const gradientIdx = i % cardGradients.length
            const accent = cardAccentColors[gradientIdx]
            return (
              <motion.div
                key={name.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 group hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Pastel gradient header */}
                <div className={`h-24 bg-gradient-to-br ${cardGradients[gradientIdx]} flex items-end px-5 pb-3 relative overflow-hidden`}>
                  <span className="bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest absolute top-3 left-5 text-on-surface-variant">
                    {name.gender === 'girl' ? 'Kiz' : name.gender === 'boy' ? 'Erkek' : 'Unisex'}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-3xl font-display font-extrabold text-on-surface">{name.name}</h4>
                      <p className="text-xs font-medium text-outline flex items-center gap-1 mt-1">
                        <Globe className="w-3 h-3" /> {name.origin}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-full border-4 ${accent.border} flex items-center justify-center text-xs font-bold ${accent.text} bg-white`}>
                      {name.zodiacCompatibility}%
                    </div>
                  </div>

                  <p className="text-sm text-on-surface-variant font-body mb-4 leading-relaxed">{name.meaning}</p>

                  {/* Scores grid */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-surface-container-low p-3 rounded-xl">
                      <span className="block text-[10px] uppercase font-bold text-outline-variant mb-1">Numeroloji</span>
                      <span className="text-sm font-bold text-on-surface flex items-center gap-1">
                        <Hash className="w-3 h-3" /> Sayi {name.numerologyScore}
                      </span>
                    </div>
                    <div className="bg-surface-container-low p-3 rounded-xl">
                      <span className="block text-[10px] uppercase font-bold text-outline-variant mb-1">Uyum</span>
                      <span className="text-sm font-bold text-on-surface flex items-center gap-1">
                        <Star className="w-3 h-3" /> %{name.zodiacCompatibility}
                      </span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {name.tags.map((tag) => (
                      <span key={tag} className="text-[10px] bg-surface-container-low text-on-surface-variant px-2.5 py-1 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                    {name.isInternational && (
                      <span className="text-[10px] bg-tertiary-container/30 text-tertiary px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                        <Globe className="w-2.5 h-2.5" /> Uluslararasi
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleFavorite(name)}
                      className={`flex-1 py-3 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 ${
                        name.isFavorite || favoriteNames.some((f) => f.name === name.name)
                          ? 'bg-primary text-on-primary'
                          : 'bg-surface-container text-on-surface-variant hover:bg-primary hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${name.isFavorite || favoriteNames.some((f) => f.name === name.name) ? 'fill-current' : ''}`} />
                      {name.isFavorite || favoriteNames.some((f) => f.name === name.name) ? 'Favorilerde' : 'Favorilere Ekle'}
                    </button>
                    <button
                      onClick={() => copyName(name.name)}
                      className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center hover:bg-surface-container-highest transition-colors"
                    >
                      {copiedId === name.name ? (
                        <Check className="w-4 h-4 text-tertiary" />
                      ) : (
                        <Copy className="w-4 h-4 text-on-surface-variant" />
                      )}
                    </button>
                  </div>

                  {/* Pronunciation */}
                  <div className="mt-3 text-xs text-on-surface-variant font-body">
                    Okunus: <span className="font-medium">{name.pronunciation}</span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Load more */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 rounded-full bg-surface-container-low text-on-surface-variant font-bold hover:bg-surface-container-high transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Daha Fazla Isim Oner
        </button>
      </div>
    </MobileLayout>
  )
}
