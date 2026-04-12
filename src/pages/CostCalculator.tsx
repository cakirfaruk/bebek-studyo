import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

const AESTHETIC_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDoGe3BLwN1cKir47rzDgpOoB7rgF42saBILurcnBtO4KWMd2zuxFNUgBpF2J8qkS4cHbslw0pizuq5RLLaeMZNsWkl7pj07f_filfvhxzVjIWG-jO34RhEULLuessX6XE7EDVz_vRcI5-X5S7oXUi4fv4ofc5LiK1WQfaMQ-9VhZO_DVEiXcC9Zus244swLlvbkTqFb4ZMJS5b7KRlfKDzA_4Mqy6L6HSJ75fNdtZS0lRO2vnpc7U6cidR8hAGEHKf16H5tZ0fHcI"

const categories = [
  {
    id: 'hospital',
    icon: 'medical_services',
    emoji: '🏥',
    title: 'Doğum & Hastane',
    colorFrom: '#ba0961',
    colorTo: '#ffa8c1',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    categoryLabel: 'Sağlık',
    items: [
      { label: 'Doğum masrafı', min: 15000, max: 80000 },
      { label: 'Doktor kontrolleri', min: 5000, max: 15000 },
      { label: 'Tahlil ve testler', min: 3000, max: 10000 },
    ],
  },
  {
    id: 'essentials',
    icon: 'shopping_bag',
    emoji: '🛒',
    title: 'Temel İhtiyaçlar',
    colorFrom: '#6834eb',
    colorTo: '#dacdff',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    categoryLabel: 'Bez & Bakım',
    items: [
      { label: 'Bebek arabası & oto koltuğu', min: 5000, max: 30000 },
      { label: 'Beşik & yatak', min: 3000, max: 15000 },
      { label: 'Kıyafetler (ilk yıl)', min: 3000, max: 10000 },
    ],
  },
  {
    id: 'monthly',
    icon: 'child_care',
    emoji: '👶',
    title: 'Aylık Giderler',
    colorFrom: '#006977',
    colorTo: '#50e1f9',
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
    categoryLabel: 'Beslenme',
    items: [
      { label: 'Bez (aylık)', min: 500, max: 1500 },
      { label: 'Mama / Beslenme (aylık)', min: 500, max: 2000 },
      { label: 'Bakım ürünleri (aylık)', min: 200, max: 800 },
    ],
  },
  {
    id: 'home',
    icon: 'home',
    emoji: '🏠',
    title: 'Ev Hazırlığı',
    colorFrom: '#a50055',
    colorTo: '#ff92b4',
    iconBg: 'bg-primary-container/20',
    iconColor: 'text-primary-dim',
    categoryLabel: 'Giyim',
    items: [
      { label: 'Bebek odası düzenleme', min: 5000, max: 25000 },
      { label: 'Güvenlik malzemeleri', min: 500, max: 2000 },
    ],
  },
]

const spendingCategoryIcons = [
  { icon: 'clean_hands', label: 'Bez & Bakım', color: 'text-primary' },
  { icon: 'child_care', label: 'Beslenme', color: 'text-secondary' },
  { icon: 'apparel', label: 'Giyim', color: 'text-pink-500' },
  { icon: 'toys', label: 'Oyuncak', color: 'text-tertiary' },
  { icon: 'medical_services', label: 'Sağlık', color: 'text-error' },
]

type BudgetLevel = 'economic' | 'standard' | 'premium'

export default function CostCalculator() {
  const [budget, setBudget] = useState<BudgetLevel>('standard')

  const getMultiplier = (level: BudgetLevel) => {
    switch (level) {
      case 'economic': return 0
      case 'standard': return 0.5
      case 'premium': return 1
    }
  }

  const getCost = (min: number, max: number) => {
    const mult = getMultiplier(budget)
    return Math.round(min + (max - min) * mult)
  }

  const totalOneTime = categories
    .filter((c) => c.id !== 'monthly')
    .flatMap((c) => c.items)
    .reduce((acc, item) => acc + getCost(item.min, item.max), 0)

  const totalMonthly = categories
    .filter((c) => c.id === 'monthly')
    .flatMap((c) => c.items)
    .reduce((acc, item) => acc + getCost(item.min, item.max), 0)

  void (totalOneTime) // used for future features
  const budgetTotal = 6000
  const budgetPercent = Math.min(Math.round((totalMonthly / budgetTotal) * 100), 100)

  return (
    <MobileLayout title="Maliyetler & Bütçe" showBack>
      <div className="space-y-10 pb-10 mt-4">
        
        {/* Monthly Budget Summary Card */}
        <section>
          <motion.div
            key={budget}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-secondary to-secondary-dim text-white shadow-[0_20px_40px_rgba(104,52,235,0.25)] border border-secondary/20"
          >
            {/* Abstract 3D Shapes (Decorative) */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none mix-blend-overlay" />
            
            <div className="relative z-10 flex justify-between items-start mb-8">
              <div>
                <p className="text-[13px] font-bold font-headline uppercase tracking-widest text-white/80 mb-2">Aylık Tahmini Harcama</p>
                <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight drop-shadow-sm">
                  {totalMonthly.toLocaleString('tr-TR')} TL
                </h2>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-white/20 shadow-sm mt-1">
                BU AY
              </div>
            </div>
            
            <div className="space-y-4 relative z-10 bg-black/10 p-5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="flex justify-between text-sm font-bold font-headline">
                <span className="text-white/90">Bütçe Doluluk Oranı</span>
                <span>{budgetPercent}%</span>
              </div>
              <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${budgetPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-primary-container to-white rounded-full relative"
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                </motion.div>
              </div>
              <p className="text-[11px] font-medium font-body text-white/80">
                Hedeflenen {budgetTotal.toLocaleString('tr-TR')} TL bütçeden {Math.max(0, budgetTotal - totalMonthly).toLocaleString('tr-TR')} TL kaldı.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Budget Level Selector */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-headline font-bold text-on-surface">Bütçe Seviyesi</h3>
            <span aria-hidden="true" className="material-symbols-outlined text-outline">tune</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'economic' as const, emoji: '💚', label: 'Ekonomik' },
              { value: 'standard' as const, emoji: '💛', label: 'Standart' },
              { value: 'premium' as const, emoji: '💜', label: 'Premium' },
            ].map((b) => (
              <button
                key={b.value}
                onClick={() => setBudget(b.value)}
                className={`py-4 rounded-2xl flex flex-col items-center gap-2 transition-all duration-300 font-headline font-bold ${
                  budget === b.value
                    ? 'bg-gradient-to-br from-secondary to-secondary-dim text-white shadow-lg shadow-secondary/30 scale-105 border border-white/20'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border border-outline-variant/10 hover:shadow-sm'
                }`}
              >
                <span className="text-2xl drop-shadow-sm">{b.emoji}</span>
                <span className="text-[11px] uppercase tracking-wider">{b.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Spending Categories Tags */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-headline font-bold text-on-surface">Kategoriler</h3>
            <button className="text-[11px] font-extrabold uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">Hepsini Gör</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 pt-2 -mx-4 px-4 snap-x">
            {spendingCategoryIcons.map((cat) => (
              <div key={cat.label} className="snap-start flex-shrink-0 flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl bg-surface-container-lowest flex items-center justify-center ${cat.color} shadow-sm hover:shadow-md transition-all cursor-pointer border border-white/60 group`}>
                  <span aria-hidden="true" className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                </div>
                <span className="text-[11px] font-bold font-headline text-on-surface-variant">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Expenses List Visual Mockup integrated with dynamic aesthetic */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-headline font-bold text-on-surface">Son Harcamalar</h3>
          </div>
          <div className="space-y-4">
            {/* Mocked Cards from HTML for authentic visual layout matching */}
            <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group shadow-card border border-white/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors shadow-inner">
                  <span aria-hidden="true" className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors">Aylık Bez Paketi</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full font-extrabold uppercase tracking-widest border border-outline-variant/10">Bez & Bakım</span>
                    <span className="text-[11px] text-on-surface-variant/70 font-semibold font-body">12 Eyl 2023</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <p className="font-headline font-extrabold text-on-surface text-lg">750 TL</p>
                <span aria-hidden="true" className="material-symbols-outlined text-outline-variant/50 text-xl group-hover:text-primary transition-colors">chevron_right</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group shadow-card border border-white/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary/20 transition-colors shadow-inner">
                  <span aria-hidden="true" className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>nutrition</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-on-surface group-hover:text-secondary transition-colors">Organik Bebek Maması</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full font-extrabold uppercase tracking-widest border border-outline-variant/10">Beslenme</span>
                    <span className="text-[11px] text-on-surface-variant/70 font-semibold font-body">10 Eyl 2023</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <p className="font-headline font-extrabold text-on-surface text-lg">320 TL</p>
                <span aria-hidden="true" className="material-symbols-outlined text-outline-variant/50 text-xl group-hover:text-secondary transition-colors">chevron_right</span>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-5 rounded-2xl flex items-center justify-between group shadow-card border border-white/60 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:bg-tertiary/20 transition-colors shadow-inner">
                  <span aria-hidden="true" className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_library</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-base text-on-surface group-hover:text-tertiary transition-colors">Eğitici Oyuncak Seti</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[9px] px-2 py-0.5 bg-surface-container text-on-surface-variant rounded-full font-extrabold uppercase tracking-widest border border-outline-variant/10">Oyuncak</span>
                    <span className="text-[11px] text-on-surface-variant/70 font-semibold font-body">08 Eyl 2023</span>
                  </div>
                </div>
              </div>
              <div className="text-right flex items-center gap-2">
                <p className="font-headline font-extrabold text-on-surface text-lg">1.200 TL</p>
                <span aria-hidden="true" className="material-symbols-outlined text-outline-variant/50 text-xl group-hover:text-tertiary transition-colors">chevron_right</span>
              </div>
            </div>

            {/* Aesthetic tip card */}
            <div className="relative h-48 rounded-[2rem] overflow-hidden group mt-8 shadow-md border border-black/5">
              <img 
                src={AESTHETIC_IMG} 
                alt="Tasarruf İpuçları" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent mix-blend-multiply flex items-end p-6" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-[10px] font-extrabold uppercase tracking-widest mb-3 border border-white/20 shadow-sm">Öneri</span>
                  <h4 className="text-white font-headline font-bold text-lg leading-tight drop-shadow-md">Tasarruf İpuçları: Bebek Alışverişinde Akıllı Tercihler</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Detailed Categories */}
        <div className="space-y-5 pt-4">
          <h3 className="text-2xl font-headline font-bold text-on-surface mb-2">Detaylı Bütçe Analizi</h3>
          {categories.map((cat, i) => {
            const catTotal = cat.items.reduce((acc, item) => acc + getCost(item.min, item.max), 0)
            const maxCost = Math.max(...cat.items.map(item => getCost(item.min, item.max)))

            return (
              <motion.div 
                key={cat.id} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-container-lowest rounded-[2rem] p-6 shadow-card border border-white/60 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${cat.iconBg} flex items-center justify-center ${cat.iconColor} shadow-inner`}>
                    <span aria-hidden="true" className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-headline font-bold text-lg text-on-surface tracking-tight">{cat.title}</h4>
                    {cat.id === 'monthly' ? (
                      <span className="inline-block text-[10px] bg-tertiary-container text-on-tertiary-container px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest mt-1 border border-tertiary/10">Aylık Düzenli</span>
                    ) : (
                      <span className="inline-block text-[10px] bg-surface-container text-on-surface-variant px-2 py-0.5 rounded-full font-extrabold uppercase tracking-widest mt-1 border border-outline-variant/10">Tek Seferlik</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-headline font-extrabold text-on-surface text-xl">{catTotal.toLocaleString('tr-TR')} TL</p>
                  </div>
                </div>
                
                <div className="space-y-4 bg-surface-container-low/30 rounded-2xl p-4 border border-outline-variant/5">
                  {cat.items.map((item) => {
                    const cost = getCost(item.min, item.max)
                    const barPercent = maxCost > 0 ? (cost / maxCost) * 100 : 0
                    return (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[13px] text-on-surface-variant font-medium font-body truncate pr-4">{item.label}</span>
                          <span className="font-bold text-[13px] text-on-surface font-headline whitespace-nowrap">
                            {cost.toLocaleString('tr-TR')} TL
                          </span>
                        </div>
                        <div className="h-2.5 bg-surface-container-highest/50 rounded-full overflow-hidden shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${barPercent}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              background: `linear-gradient(90deg, ${cat.colorFrom}, ${cat.colorTo})`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )
          })}
        </div>

        <div className="py-6 mb-8 text-center px-6">
          <p className="inline-flex items-center gap-2 text-[11px] text-on-surface-variant/60 font-body font-medium bg-surface-container-low px-4 py-2 rounded-xl">
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">info</span>
            Bu hesaplamalar tahminidir. Gerçek maliyetler değişkenlik gösterebilir.
          </p>
        </div>
      </div>
    </MobileLayout>
  )
}
