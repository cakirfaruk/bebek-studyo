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
  { id: 'numerology', label: 'Numeroloji', emoji: '🔢', desc: 'Sayısal uyum' },
  { id: 'astrology', label: 'Astroloji', emoji: '⭐', desc: 'Burç uyumu' },
  { id: 'meaning', label: 'Anlam', emoji: '📖', desc: 'Derin anlam' },
  { id: 'international', label: 'Uluslararası', emoji: '🌍', desc: 'Kolay telaffuz' },
  { id: 'modern', label: 'Modern', emoji: '✨', desc: 'Çağdaş' },
  { id: 'traditional', label: 'Geleneksel', emoji: '🏛️', desc: 'Klasik' },
]

const sampleNames: BabyName[] = [
  {
    id: '1', name: 'Ada', meaning: 'Soylu, asil. Aynı zamanda matematik ve bilgisayar biliminin öncüsü Ada Lovelace\'i hatırlatır.', origin: 'Türkçe / Almanca',
    gender: 'girl', numerologyScore: 6, numerologyMeaning: 'Uyum ve sevgi sayısı', zodiacCompatibility: 85,
    isInternational: true, pronunciation: 'A-da', tags: ['modern', 'uluslararası', 'kısa'], isFavorite: false,
  },
  {
    id: '2', name: 'Deniz', meaning: 'Deniz, sonsuzluk ve özgürlük simgesi.', origin: 'Türkçe',
    gender: 'unisex', numerologyScore: 7, numerologyMeaning: 'Bilgelik ve analiz sayısı', zodiacCompatibility: 78,
    isInternational: true, pronunciation: 'De-niz', tags: ['unisex', 'doğa', 'modern'], isFavorite: false,
  },
  {
    id: '3', name: 'Mira', meaning: 'Hayranlık, barış. Sanskritçe\'de okyanus anlamına gelir.', origin: 'Türkçe / Sanskrit',
    gender: 'girl', numerologyScore: 9, numerologyMeaning: 'İnsancıl ve şefkatli sayı', zodiacCompatibility: 92,
    isInternational: true, pronunciation: 'Mi-ra', tags: ['uluslararası', 'kısa', 'anlamlı'], isFavorite: false,
  },
  {
    id: '4', name: 'Kaan', meaning: 'Hükümdar, kral. Güç ve liderlik simgesi.', origin: 'Türkçe / Moğolca',
    gender: 'boy', numerologyScore: 3, numerologyMeaning: 'Yaratıcılık ve ifade sayısı', zodiacCompatibility: 88,
    isInternational: true, pronunciation: 'Ka-an', tags: ['güçlü', 'kısa', 'geleneksel'], isFavorite: false,
  },
  {
    id: '5', name: 'Emir', meaning: 'Komutan, lider. Arapça kökenli güçlü bir isim.', origin: 'Arapça / Türkçe',
    gender: 'boy', numerologyScore: 5, numerologyMeaning: 'Özgürlük ve macera sayısı', zodiacCompatibility: 82,
    isInternational: true, pronunciation: 'E-mir', tags: ['uluslararası', 'güçlü', 'modern'], isFavorite: false,
  },
  {
    id: '6', name: 'Lina', meaning: 'Zarif, nazik. Arapça\'da palmiye ağacı anlamına gelir.', origin: 'Arapça / Latince',
    gender: 'girl', numerologyScore: 1, numerologyMeaning: 'Liderlik ve bağımsızlık sayısı', zodiacCompatibility: 90,
    isInternational: true, pronunciation: 'Li-na', tags: ['uluslararası', 'zarif', 'kısa'], isFavorite: false,
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
      toast.success(`${withIds.length} yeni isim önerisi oluşturuldu!`)
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'İsim önerileri oluşturulamadı')
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

  return (
    <MobileLayout title="İsim Bulucu" showBack>
      <div className="py-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-warm-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İsim ara..."
            className="w-full h-12 pl-11 pr-12 rounded-xl bg-white border border-warm-border focus:border-primary-400 focus:ring-2 focus:ring-primary-100 outline-none text-warm-text text-sm"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              showFilters ? 'bg-primary-500 text-white' : 'bg-warm-surface text-warm-muted'
            }`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Gender Tabs */}
        <div className="flex gap-2 mb-4">
          {[
            { value: 'girl' as const, emoji: '👧', label: 'Kız' },
            { value: 'boy' as const, emoji: '👦', label: 'Erkek' },
            { value: 'unisex' as const, emoji: '🌟', label: 'Unisex' },
          ].map((g) => (
            <button
              key={g.value}
              onClick={() => setGender(g.value)}
              className={`flex-1 h-10 rounded-xl flex items-center justify-center gap-1.5 text-sm font-medium transition-all ${
                gender === g.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-white border border-warm-border text-warm-text'
              }`}
            >
              <span className="text-sm">{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-4"
            >
              <div className="bg-white rounded-xl p-4 border border-warm-border">
                <h4 className="text-sm font-semibold text-warm-text mb-3">Kriterler</h4>
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
                      className={`py-2.5 px-2 rounded-lg flex flex-col items-center gap-1 text-center transition-all ${
                        selectedCriteria.includes(c.id)
                          ? 'bg-primary-50 border border-primary-300'
                          : 'bg-warm-surface border border-transparent'
                      }`}
                    >
                      <span className="text-lg">{c.emoji}</span>
                      <span className="text-[10px] font-medium text-warm-text">{c.label}</span>
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
          className="w-full h-12 rounded-xl gradient-secondary text-white font-semibold flex items-center justify-center gap-2 mb-6 active:scale-[0.98] transition-transform disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4.5 h-4.5" />
              AI ile İsim Öner
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">1 Kredi</span>
            </>
          )}
        </button>

        {/* Favorites count */}
        {favoriteNames.length > 0 && (
          <div className="flex items-center gap-2 mb-4 px-1">
            <Heart className="w-4 h-4 text-primary-500 fill-primary-500" />
            <span className="text-sm text-warm-muted">{favoriteNames.length} favori isim</span>
          </div>
        )}

        {/* Name Cards */}
        <div className="space-y-3">
          {filteredNames.map((name, i) => (
            <motion.div
              key={name.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl p-4 border border-warm-border hover:shadow-card transition-all"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-display font-bold text-lg text-warm-text">{name.name}</h3>
                  <span className="text-xs bg-warm-surface text-warm-muted px-2 py-0.5 rounded-full">
                    {name.gender === 'girl' ? '👧' : name.gender === 'boy' ? '👦' : '🌟'} {name.origin}
                  </span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => copyName(name.name)}
                    className="w-8 h-8 rounded-lg bg-warm-surface flex items-center justify-center"
                  >
                    {copiedId === name.name ? (
                      <Check className="w-3.5 h-3.5 text-mint-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-warm-muted" />
                    )}
                  </button>
                  <button
                    onClick={() => toggleFavorite(name)}
                    className="w-8 h-8 rounded-lg bg-warm-surface flex items-center justify-center"
                  >
                    <Heart
                      className={`w-4 h-4 transition-colors ${
                        name.isFavorite || favoriteNames.some((f) => f.name === name.name)
                          ? 'text-primary-500 fill-primary-500'
                          : 'text-warm-muted'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <p className="text-sm text-warm-muted mb-3">{name.meaning}</p>

              {/* Scores */}
              <div className="flex gap-2 flex-wrap mb-2">
                <div className="flex items-center gap-1 bg-secondary-50 px-2 py-1 rounded-lg">
                  <Hash className="w-3 h-3 text-secondary-500" />
                  <span className="text-[10px] font-medium text-secondary-700">Numeroloji: {name.numerologyScore}</span>
                </div>
                <div className="flex items-center gap-1 bg-accent-50 px-2 py-1 rounded-lg">
                  <Star className="w-3 h-3 text-accent-500" />
                  <span className="text-[10px] font-medium text-accent-700">Uyum: %{name.zodiacCompatibility}</span>
                </div>
                {name.isInternational && (
                  <div className="flex items-center gap-1 bg-mint-50 px-2 py-1 rounded-lg">
                    <Globe className="w-3 h-3 text-mint-500" />
                    <span className="text-[10px] font-medium text-mint-700">Uluslararası</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap">
                {name.tags.map((tag) => (
                  <span key={tag} className="text-[10px] bg-warm-surface text-warm-muted px-2 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Pronunciation */}
              <div className="mt-2 text-xs text-warm-muted">
                📢 Okunuş: <span className="font-medium">{name.pronunciation}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load more */}
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-4 h-12 rounded-xl border border-warm-border bg-white text-warm-text font-medium text-sm flex items-center justify-center gap-2 hover:bg-warm-surface transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Daha Fazla İsim Öner
        </button>
      </div>
    </MobileLayout>
  )
}
