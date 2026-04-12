import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateBabyNames } from '@/lib/ai'
import { generateId } from '@/lib/utils'
import type { BabyName } from '@/types'
import { toast } from 'sonner'

const COLLECTION_1_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDAaWVAXkxJz2Bgi48xgFsHxaZAjRShYUyVAfFj1Dr4s8xOcZ3dyHBUxDP4BOTHPq0rOY7ylqrP2p3-xhpkVPt3ABvVoVPgMb9ZLe9Gm0INMsIT_p6WB_dIpaSA5im69Hp9Yk3Pu1VnE0bfBmp4hiEo2LTzf1tdk7qB_5Nyj3JeD8WVMDIM-x2g_a5JyNKLsAH1i86gfw9xjaPnt-Vh_-J_orxKaNyjSrXOHd8TyfBgmko7hb3AIYl8WikTcaoQxiHR-pb_vhyJY_4"
const COLLECTION_2_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCGJ3hMkYcJPooSkdGweZDyMM_cB5irb0VqeuOofJ4EKtH7WjLmOjVkmMgDyRCMZPW6Fm8b-NGdu3q0Zhg5ZOHtmIzioi03Qlo_p0vYXI1pMAffskfBImPsIFLcIH9MW5YjIarAbPwexdCq-PgDFEPU30meH3ZXwo4jCVP64tHZp6J7-gxTStbAyoV0QTMTMf_l8F8TQR-PoPUpQZncyHwttTA_YCOo2RpA37-W7gJohwpLH_F1nD2x3m6ICT3cr42axDTDPlIkNeM"

const sampleNames: BabyName[] = [
  {
    id: '1', name: 'Ada', meaning: 'Soylu, asil. Ayrıca matematik ve bilgisayar biliminin öncüsü Ada Lovelace\'i hatırlatır.', origin: 'Türkçe / Almanca',
    gender: 'girl', numerologyScore: 6, numerologyMeaning: 'Uyum ve sevgi sayısı', zodiacCompatibility: 85,
    isInternational: true, pronunciation: 'A-da', tags: ['modern', 'uluslararası', 'kısa'], isFavorite: false,
  },
  {
    id: '2', name: 'Deniz', meaning: 'Sonsuzluk ve özgürlük simgesi.', origin: 'Türkçe',
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

// Pastel gradient backgrounds for name cards
const cardGradients = [
  'from-pink-50 to-pink-100',
  'from-blue-50 to-blue-100',
  'from-tertiary-container/20 to-tertiary-container/30',
  'from-pink-50 to-pink-100',
  'from-blue-50 to-blue-100',
  'from-tertiary-container/20 to-tertiary-container/30',
]

const cardIcons = ['cloud', 'forest', 'diamond', 'cloud', 'forest', 'diamond']

const cardAccentColors = [
  { text: 'text-primary', border: 'border-primary-container', hoverBg: 'hover:bg-primary text-primary border-primary/20', bgBadge: 'bg-primary-container text-on-primary-container' },
  { text: 'text-secondary', border: 'border-secondary-container', hoverBg: 'hover:bg-secondary text-secondary border-secondary/20', bgBadge: 'bg-secondary-container text-on-secondary-container' },
  { text: 'text-tertiary', border: 'border-tertiary-container', hoverBg: 'hover:bg-tertiary text-tertiary border-tertiary/20', bgBadge: 'bg-tertiary-container text-on-tertiary-container' },
  { text: 'text-primary', border: 'border-primary-container', hoverBg: 'hover:bg-primary text-primary border-primary/20', bgBadge: 'bg-primary-container text-on-primary-container' },
  { text: 'text-secondary', border: 'border-secondary-container', hoverBg: 'hover:bg-secondary text-secondary border-secondary/20', bgBadge: 'bg-secondary-container text-on-secondary-container' },
  { text: 'text-tertiary', border: 'border-tertiary-container', hoverBg: 'hover:bg-tertiary text-tertiary border-tertiary/20', bgBadge: 'bg-tertiary-container text-on-tertiary-container' },
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
      let parsed: BabyName[]
      try {
        parsed = JSON.parse(cleaned) as BabyName[]
      } catch {
        toast.error('AI yanıtı işlenemedi. Lütfen tekrar deneyin.')
        return
      }
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

  const filteredNames = names.filter((n) => {
    if (searchQuery && !n.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    if (gender !== 'unisex' && n.gender !== gender && n.gender !== 'unisex') return false
    return true
  })

  return (
    <MobileLayout title="İsim Bulucu" showBack>
      <div className="space-y-6 pb-8 mt-4">
        {/* Hero Section & AI Prompt */}
        <section className="mb-8">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-3 leading-tight tracking-tight">
            Yıldızınızı <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">İsimlendirin.</span>
          </h2>
          <p className="text-on-surface-variant font-body max-w-md text-base leading-relaxed">
            AI destekli astroloji, numeroloji ve derin dilbilim kökleri ile mükemmel ismi keşfedin.
          </p>
        </section>

        {/* Search & Filter Cluster (Bento Style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {/* Main Search Bento */}
          <div className="lg:col-span-8 bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-card border border-white/60 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10">
              <label className="block text-sm font-headline font-bold mb-4 text-on-surface uppercase tracking-widest">Bir tarzi arayin</label>
              <div className="relative flex items-center">
                <span aria-hidden="true" className="material-symbols-outlined absolute left-5 text-outline-variant text-[22px]">search</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-5 py-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:border-primary/40 focus:ring-4 focus:ring-primary/10 focus:bg-white text-on-surface font-body outline-none transition-all placeholder:text-outline-variant"
                  placeholder="'Zarif ve Doğal' veya 'Asil Kökler' deneyin..."
                />
              </div>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {[
                  { value: 'girl' as const, label: 'Kız', active: gender === 'girl' },
                  { value: 'boy' as const, label: 'Erkek', active: gender === 'boy' },
                  { value: 'unisex' as const, label: 'Üniseks', active: gender === 'unisex' },
                ].map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGender(g.value)}
                    className={`px-6 py-2.5 rounded-full text-sm font-headline font-bold transition-all ${
                      g.active
                        ? 'bg-gradient-to-r from-secondary to-secondary-dim text-white shadow-md shadow-secondary/30 border border-secondary'
                        : 'bg-surface-container-high/50 text-on-surface-variant hover:bg-surface-container-high border border-outline-variant/10 hover:border-outline-variant/30'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
                
                <div className="w-[1px] h-8 bg-outline-variant/20 mx-1 self-center hidden sm:block"></div>
                
                <button onClick={() => toast.info('Kategori filtreleri yakinda aktif olacak')} className="px-5 py-2.5 rounded-full bg-surface-container-high/50 text-on-surface-variant text-sm font-headline font-bold hover:bg-surface-container-high border border-outline-variant/10 transition-colors hidden sm:block">
                  Doga
                </button>
                <button onClick={() => toast.info('Kategori filtreleri yakinda aktif olacak')} className="px-5 py-2.5 rounded-full bg-surface-container-high/50 text-on-surface-variant text-sm font-headline font-bold hover:bg-surface-container-high border border-outline-variant/10 transition-colors hidden sm:block">
                  Kozmik
                </button>
              </div>
            </div>
          </div>

          {/* Parent Compatibility Bento */}
          <div className="lg:col-span-4 bg-secondary-container/50 border border-secondary-container rounded-3xl p-6 flex flex-col justify-between shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10">
              <span aria-hidden="true" className="material-symbols-outlined text-secondary text-3xl mb-3 mt-1" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="text-xl font-headline font-bold text-on-secondary-container leading-snug">Ebeveyn Eşleştirme</h3>
              <p className="text-[13px] text-on-surface-variant mt-2 font-body leading-relaxed">Anne ve baba isimleriyle kusursuz fonetik uyum sağlayın.</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 relative z-10">
              <input
                type="text"
                value={fatherNameInput}
                onChange={(e) => setFatherNameInput(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white focus:border-secondary/40 focus:bg-white text-sm font-body placeholder:text-outline outline-none transition-all"
                placeholder="Baba Adı"
              />
              <input
                type="text"
                value={motherNameInput}
                onChange={(e) => setMotherNameInput(e.target.value)}
                className="w-full px-5 py-3.5 rounded-xl bg-white/70 backdrop-blur-sm border border-white focus:border-secondary/40 focus:bg-white text-sm font-body placeholder:text-outline outline-none transition-all"
                placeholder="Anne Adı"
              />
            </div>
          </div>
        </div>

        {/* AI Suggestions Grid */}
        <div className="pt-6 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-2xl font-headline font-bold text-on-surface">Sizin İçin Seçildi</h3>
          <button onClick={handleGenerate} className="inline-flex max-w-[fit-content] items-center gap-2 px-6 py-2.5 rounded-full bg-primary-container text-on-primary-container text-sm font-headline font-bold hover:bg-primary sm:hover:text-white transition-colors">
            AI Yenile <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>refresh</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
                className="bg-surface-container-lowest rounded-[2rem] p-1.5 pt-0 shadow-card border border-white/60 group hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                {/* Gradient header strip */}
                <div className={`h-36 rounded-t-[1.75rem] rounded-b-xl bg-gradient-to-br ${cardGradients[gradientIdx]} flex items-end px-6 pb-5 relative overflow-hidden border border-black/5`}>
                  <div className="absolute -right-4 -top-4 w-28 h-28 opacity-15 mix-blend-color-burn">
                    <span className={`material-symbols-outlined text-[100px] leading-none ${accent.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>{cardIcons[gradientIdx]}</span>
                  </div>
                  <span className={`bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-extrabold ${accent.text} uppercase tracking-widest absolute top-5 left-5 shadow-sm border border-white`}>
                    {name.gender === 'girl' ? 'Kız' : name.gender === 'boy' ? 'Erkek' : 'Üniseks'}
                  </span>
                </div>

                <div className="p-6">
                  {/* Name and match percentage */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-3xl font-headline font-extrabold text-on-surface tracking-tight">{name.name}</h4>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-outline flex items-center gap-1.5 mt-2">
                        <span aria-hidden="true" className="material-symbols-outlined text-[14px]">public</span> {name.origin}
                      </p>
                    </div>
                    <div className={`w-14 h-14 rounded-full border-4 ${accent.border} flex items-center justify-center text-[13px] font-extrabold ${accent.text} bg-white shadow-sm`}>
                      %{name.zodiacCompatibility}
                    </div>
                  </div>

                  {/* Meaning */}
                  <p className="text-sm text-on-surface-variant font-body mb-6 leading-relaxed min-h-[60px]">{name.meaning}</p>

                  {/* Numerology & Astro grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-surface-container-low p-4 rounded-2xl border border-white/30">
                      <span className="block text-[10px] uppercase font-headline font-extrabold text-outline-variant tracking-widest mb-1.5">Numeroloji</span>
                      <span className="text-sm font-bold text-on-surface font-headline">Yaşam Yolu {name.numerologyScore}</span>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-2xl border border-white/30">
                      <span className="block text-[10px] uppercase font-headline font-extrabold text-outline-variant tracking-widest mb-1.5">Burç Uyumu</span>
                      <span className="text-sm font-bold text-on-surface font-headline">% {name.zodiacCompatibility}</span>
                    </div>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={() => toggleFavorite(name)}
                    className={`w-full py-3.5 rounded-xl font-headline font-bold transition-all duration-300 flex items-center justify-center gap-2 border ${
                      isFav
                        ? `bg-secondary text-white border-secondary shadow-md shadow-secondary/20`
                        : `bg-surface-container-low bg-opacity-50 ${accent.hoverBg}`
                    }`}
                  >
                    <span aria-hidden="true" className="material-symbols-outlined text-xl" style={isFav ? { fontVariationSettings: "'FILL' 1" } : {}}>
                      {isFav ? 'favorite' : 'favorite_border'}
                    </span>
                    {isFav ? 'Favorilere Eklendi' : 'Favorilere Ekle'}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* AI Generate Button (Bottom) */}
        <div className="py-6">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-secondary to-secondary-dim text-white font-headline font-extrabold text-base shadow-[0_20px_40px_rgba(104,52,235,0.25)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 border border-white/10 uppercase tracking-widest"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span aria-hidden="true" className="material-symbols-outlined text-[24px]">auto_awesome</span>
                Daha Fazla Öneri Üret
              </>
            )}
          </button>
        </div>

        {/* Featured Collections */}
        <section className="mt-4">
          <h3 className="text-2xl font-headline font-bold text-on-surface mb-6">Özenle Seçilmiş Koleksiyonlar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-3xl overflow-hidden h-[300px] flex flex-col justify-end p-8 group border border-black/5 shadow-md">
              <img 
                alt="Ay Işığı Koleksiyonu" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                src={COLLECTION_1_IMG}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-extrabold uppercase tracking-widest mb-3 border border-white/20">Klasik</span>
                <h4 className="text-white text-3xl font-headline font-extrabold tracking-tight">Ay Işığı ve Gizem</h4>
                <p className="text-white/90 text-[15px] font-medium mt-2 font-body">Kozmostan ilham alan özel isimler</p>
                <button onClick={() => toast.info('Koleksiyon detaylari yakinda aktif olacak')} className="mt-4 px-5 py-2.5 bg-white text-on-surface rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Incele</button>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden h-[300px] flex flex-col justify-end p-8 group border border-black/5 shadow-md">
              <img
                alt="Doga Koleksiyonu"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                src={COLLECTION_2_IMG}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-extrabold uppercase tracking-widest mb-3 border border-white/20">Modern</span>
                <h4 className="text-white text-3xl font-headline font-extrabold tracking-tight">Vahsi ve Ozgur</h4>
                <p className="text-white/90 text-[15px] font-medium mt-2 font-body">Maceracilar icin organik isimler</p>
                <button onClick={() => toast.info('Koleksiyon detaylari yakinda aktif olacak')} className="mt-4 px-5 py-2.5 bg-white text-on-surface rounded-full text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">Incele</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MobileLayout>
  )
}
