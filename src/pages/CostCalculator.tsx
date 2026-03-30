import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

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
    <MobileLayout title="Maliyetler" showBack>
      <div className="space-y-10">
        {/* Monthly Budget Summary Card */}
        <section>
          <motion.div
            key={budget}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden p-8 rounded-lg bg-gradient-to-br from-secondary to-secondary-dim text-on-secondary shadow-[0_20px_40px_rgba(104,52,235,0.2)]"
          >
            {/* Abstract 3D Shapes (Decorative) */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div>
                <p className="text-sm font-medium opacity-80 mb-1">Aylık Toplam Harcama</p>
                <h2 className="text-4xl font-display font-extrabold tracking-tight">
                  {totalMonthly.toLocaleString('tr-TR')} TL
                </h2>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                EYLÜL 2023
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>Bütçe Durumu</span>
                <span>{budgetPercent}%</span>
              </div>
              <div className="w-full h-3 bg-surface-container-highest/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-container to-white rounded-full relative"
                  style={{ width: `${budgetPercent}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg"></div>
                </div>
              </div>
              <p className="text-xs opacity-70">
                Toplam {budgetTotal.toLocaleString('tr-TR')} TL bütçeden {Math.max(0, budgetTotal - totalMonthly).toLocaleString('tr-TR')} TL kaldı.
              </p>
            </div>
          </motion.div>
        </section>

        {/* Spending Categories Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-on-surface">Kategoriler</h3>
            <button className="text-sm font-bold text-primary hover:opacity-70">Hepsini Gör</button>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-2 px-2">
            {spendingCategoryIcons.map((cat) => (
              <div key={cat.label} className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl bg-surface-container-low flex items-center justify-center ${cat.color} shadow-sm hover:scale-105 transition-transform cursor-pointer border border-white/50`}>
                  <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <span className="text-xs font-semibold text-on-surface-variant">{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Expenses List */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-on-surface">Son Harcamalar</h3>
            <span className="material-symbols-outlined text-outline">tune</span>
          </div>
          <div className="space-y-4">
            {/* Card 1 */}
            <div className="glass-card p-5 rounded-lg flex items-center justify-between group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_bag</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors">Aylık Bez Paketi</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 bg-surface-container-high rounded-full font-bold uppercase tracking-wider text-on-surface-variant">Bez & Bakım</span>
                    <span className="text-[10px] text-outline-variant font-medium">12 Eylül 2023</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-extrabold text-on-surface">750 TL</p>
                <span className="material-symbols-outlined text-outline-variant text-sm">chevron_right</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="glass-card p-5 rounded-lg flex items-center justify-between group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>nutrition</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface group-hover:text-secondary transition-colors">Organik Bebek Maması</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 bg-surface-container-high rounded-full font-bold uppercase tracking-wider text-on-surface-variant">Beslenme</span>
                    <span className="text-[10px] text-outline-variant font-medium">10 Eylül 2023</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-extrabold text-on-surface">320 TL</p>
                <span className="material-symbols-outlined text-outline-variant text-sm">chevron_right</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="glass-card p-5 rounded-lg flex items-center justify-between group hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_library</span>
                </div>
                <div>
                  <h4 className="font-bold text-on-surface group-hover:text-tertiary transition-colors">Montessori Oyuncak Seti</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] px-2 py-0.5 bg-surface-container-high rounded-full font-bold uppercase tracking-wider text-on-surface-variant">Oyuncak & Eğitici</span>
                    <span className="text-[10px] text-outline-variant font-medium">08 Eylül 2023</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display font-extrabold text-on-surface">1.200 TL</p>
                <span className="material-symbols-outlined text-outline-variant text-sm">chevron_right</span>
              </div>
            </div>

            {/* Aesthetic tip card */}
            <div className="relative h-40 rounded-lg overflow-hidden group mt-8 bg-gradient-to-br from-purple-200 to-pink-200">
              <div className="w-full h-full flex items-center justify-center text-6xl">🧸</div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <p className="text-white font-display font-bold">Tasarruf İpuçları: Bebek Alışverişinde Akıllı Tercihler</p>
              </div>
            </div>
          </div>
        </section>

        {/* Budget Level Selector */}
        <section className="glass-card rounded-lg p-5">
          <h3 className="font-display font-bold text-on-surface mb-4">Bütçe Seviyesi</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'economic' as const, emoji: '💚', label: 'Ekonomik' },
              { value: 'standard' as const, emoji: '💛', label: 'Standart' },
              { value: 'premium' as const, emoji: '💜', label: 'Premium' },
            ].map((b) => (
              <button
                key={b.value}
                onClick={() => setBudget(b.value)}
                className={`py-3 rounded-2xl flex flex-col items-center gap-1.5 transition-all ${
                  budget === b.value
                    ? 'bg-gradient-to-br from-secondary to-secondary-dim text-white shadow-lg shadow-secondary/20'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="text-xl">{b.emoji}</span>
                <span className="text-xs font-medium">{b.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Categories Detail */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const catTotal = cat.items.reduce((acc, item) => acc + getCost(item.min, item.max), 0)
            const maxCost = Math.max(...cat.items.map(item => getCost(item.min, item.max)))

            return (
              <div key={cat.id} className="glass-card rounded-lg p-5 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${cat.iconBg} flex items-center justify-center ${cat.iconColor}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-on-surface">{cat.title}</h4>
                    {cat.id === 'monthly' && (
                      <span className="text-[10px] bg-tertiary-container/30 text-tertiary px-2 py-0.5 rounded-full font-bold">Aylık</span>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-display font-extrabold text-on-surface">{catTotal.toLocaleString('tr-TR')} TL</p>
                    <span className="material-symbols-outlined text-outline-variant text-sm">chevron_right</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {cat.items.map((item) => {
                    const cost = getCost(item.min, item.max)
                    const barPercent = maxCost > 0 ? (cost / maxCost) * 100 : 0
                    return (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-on-surface-variant font-body">{item.label}</span>
                          <span className="font-bold text-sm text-on-surface font-display">
                            {cost.toLocaleString('tr-TR')} TL
                          </span>
                        </div>
                        <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${barPercent}%`,
                              background: `linear-gradient(90deg, ${cat.colorFrom}, ${cat.colorTo})`,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

        <p className="text-[10px] text-on-surface-variant/50 text-center px-4 font-body">
          Bu hesaplamalar 2024 Türkiye ortalamalarına dayalı yaklaşık değerlerdir. Gerçek maliyetler değişkenlik gösterebilir.
        </p>
      </div>
    </MobileLayout>
  )
}
