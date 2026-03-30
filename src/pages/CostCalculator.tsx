import { useState } from 'react'
import { motion } from 'framer-motion'
import { Baby, ShoppingCart, Stethoscope, Home } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'

const categories = [
  {
    id: 'hospital',
    icon: Stethoscope,
    emoji: '🏥',
    title: 'Dogum & Hastane',
    colorFrom: '#ba0961',
    colorTo: '#ffa8c1',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    items: [
      { label: 'Dogum masrafi', min: 15000, max: 80000 },
      { label: 'Doktor kontrolleri', min: 5000, max: 15000 },
      { label: 'Tahlil ve testler', min: 3000, max: 10000 },
    ],
  },
  {
    id: 'essentials',
    icon: ShoppingCart,
    emoji: '🛒',
    title: 'Temel Ihtiyaclar',
    colorFrom: '#6834eb',
    colorTo: '#dacdff',
    iconBg: 'bg-secondary/10',
    iconColor: 'text-secondary',
    items: [
      { label: 'Bebek arabasi & oto koltugu', min: 5000, max: 30000 },
      { label: 'Besik & yatak', min: 3000, max: 15000 },
      { label: 'Kiyafetler (ilk yil)', min: 3000, max: 10000 },
    ],
  },
  {
    id: 'monthly',
    icon: Baby,
    emoji: '👶',
    title: 'Aylik Giderler',
    colorFrom: '#006977',
    colorTo: '#50e1f9',
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
    items: [
      { label: 'Bez (aylik)', min: 500, max: 1500 },
      { label: 'Mama / Beslenme (aylik)', min: 500, max: 2000 },
      { label: 'Bakim urunleri (aylik)', min: 200, max: 800 },
    ],
  },
  {
    id: 'home',
    icon: Home,
    emoji: '🏠',
    title: 'Ev Hazirligi',
    colorFrom: '#a50055',
    colorTo: '#ff92b4',
    iconBg: 'bg-primary-container/20',
    iconColor: 'text-primary-dim',
    items: [
      { label: 'Bebek odasi duzenleme', min: 5000, max: 25000 },
      { label: 'Guvenlik malzemeleri', min: 500, max: 2000 },
    ],
  },
]

type BudgetLevel = 'economic' | 'standard' | 'premium'

// Donut chart component
function DonutChart({ segments, size = 180, strokeWidth = 24 }: {
  segments: { value: number; colorFrom: string; colorTo: string }[]
  size?: number; strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((acc, s) => acc + s.value, 0)

  let cumulativeOffset = 0
  const segmentElements = segments.map((seg, i) => {
    const segLength = total > 0 ? (seg.value / total) * circumference : 0
    const rotation = (cumulativeOffset / total) * 360
    cumulativeOffset += seg.value

    return (
      <g key={i}>
        <defs>
          <linearGradient id={`donut-grad-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={seg.colorFrom} />
            <stop offset="100%" stopColor={seg.colorTo} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={`url(#donut-grad-${i})`}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={`${segLength} ${circumference - segLength}`}
          style={{
            transform: `rotate(${rotation - 90}deg)`,
            transformOrigin: '50% 50%',
            transition: 'all 0.5s ease',
          }}
        />
      </g>
    )
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none" stroke="currentColor" strokeWidth={strokeWidth}
        className="text-surface-container-highest"
      />
      {segmentElements}
    </svg>
  )
}

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

  const totalFirstYear = totalOneTime + totalMonthly * 12

  // Category totals for donut chart
  const categoryTotals = categories.map((cat) => ({
    value: cat.items.reduce((acc, item) => acc + getCost(item.min, item.max), 0) * (cat.id === 'monthly' ? 12 : 1),
    colorFrom: cat.colorFrom,
    colorTo: cat.colorTo,
  }))

  return (
    <MobileLayout title="Maliyet Hesaplayici" showBack>
      <div className="space-y-10 pb-6">
        {/* Monthly Budget Summary Card - Purple gradient like stitch */}
        <section>
          <motion.div
            key={budget}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-secondary to-secondary-dim text-on-secondary shadow-[0_20px_40px_rgba(104,52,235,0.2)]"
          >
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div>
                <p className="text-sm font-medium opacity-80 mb-1 font-body">Ilk Yil Tahmini Toplam</p>
                <h2 className="text-4xl font-display font-extrabold tracking-tight">
                  {totalFirstYear.toLocaleString('tr-TR')} TL
                </h2>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                2024
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-semibold">
                <span>Butce Dagilimi</span>
                <span>{budget === 'economic' ? 'Ekonomik' : budget === 'standard' ? 'Standart' : 'Premium'}</span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary-container to-white rounded-full relative" style={{ width: '75%' }}>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg" />
                </div>
              </div>
              <div className="flex gap-4 text-xs opacity-80">
                <span>Tek seferlik: {totalOneTime.toLocaleString('tr-TR')} TL</span>
                <span>Aylik: {totalMonthly.toLocaleString('tr-TR')} TL</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Budget Level Selector */}
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-display font-bold text-on-surface mb-4">Butce Seviyesi</h3>
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
        </div>

        {/* Large Donut Chart */}
        <section className="flex flex-col items-center">
          <div className="relative">
            <DonutChart segments={categoryTotals} size={200} strokeWidth={28} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-on-surface-variant font-body">Toplam</span>
              <span className="text-2xl font-display font-extrabold text-on-surface">
                {(totalFirstYear / 1000).toFixed(0)}K
              </span>
              <span className="text-[10px] text-on-surface-variant font-body">TL</span>
            </div>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full" style={{ background: `linear-gradient(135deg, ${cat.colorFrom}, ${cat.colorTo})` }} />
                <span className="text-[10px] font-medium text-on-surface-variant">{cat.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Spending Categories Scroll */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-display font-bold text-on-surface">Kategoriler</h3>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
            {categories.map((cat) => (
              <div key={cat.id} className="flex-shrink-0 flex flex-col items-center gap-3">
                <div className={`w-16 h-16 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer`}>
                  <span className="text-3xl">{cat.emoji}</span>
                </div>
                <span className="text-xs font-semibold text-on-surface-variant text-center max-w-[4rem]">{cat.title}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Detail */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const catTotal = cat.items.reduce((acc, item) => acc + getCost(item.min, item.max), 0)
            const maxCost = Math.max(...cat.items.map(item => getCost(item.min, item.max)))

            return (
              <div key={cat.id} className="glass-card rounded-2xl p-5 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${cat.iconBg} flex items-center justify-center`}>
                    <cat.icon className={`w-5 h-5 ${cat.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-bold text-on-surface">{cat.title}</h3>
                    {cat.id === 'monthly' && (
                      <span className="text-[10px] bg-tertiary-container/30 text-tertiary px-2 py-0.5 rounded-full font-bold">Aylik</span>
                    )}
                  </div>
                  <span className="font-display font-extrabold text-on-surface">
                    {catTotal.toLocaleString('tr-TR')} TL
                  </span>
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
          Bu hesaplamalar 2024 Turkiye ortalamalarina dayali yaklasik degerlerdir. Gercek maliyetler degiskenlik gosterebilir.
        </p>
      </div>
    </MobileLayout>
  )
}
