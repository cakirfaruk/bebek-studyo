import { useState } from 'react'
import { motion } from 'framer-motion'
import { Baby, ShoppingCart, Stethoscope, Home, TrendingUp } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'

const categories = [
  {
    id: 'hospital',
    icon: Stethoscope,
    emoji: '🏥',
    title: 'Doğum & Hastane',
    items: [
      { label: 'Doğum masrafı', min: 15000, max: 80000 },
      { label: 'Doktor kontrolleri', min: 5000, max: 15000 },
      { label: 'Tahlil ve testler', min: 3000, max: 10000 },
    ],
  },
  {
    id: 'essentials',
    icon: ShoppingCart,
    emoji: '🛒',
    title: 'Temel İhtiyaçlar',
    items: [
      { label: 'Bebek arabası & oto koltuğu', min: 5000, max: 30000 },
      { label: 'Beşik & yatak', min: 3000, max: 15000 },
      { label: 'Kıyafetler (ilk yıl)', min: 3000, max: 10000 },
    ],
  },
  {
    id: 'monthly',
    icon: Baby,
    emoji: '👶',
    title: 'Aylık Giderler',
    items: [
      { label: 'Bez (aylık)', min: 500, max: 1500 },
      { label: 'Mama / Beslenme (aylık)', min: 500, max: 2000 },
      { label: 'Bakım ürünleri (aylık)', min: 200, max: 800 },
    ],
  },
  {
    id: 'home',
    icon: Home,
    emoji: '🏠',
    title: 'Ev Hazırlığı',
    items: [
      { label: 'Bebek odası düzenleme', min: 5000, max: 25000 },
      { label: 'Güvenlik malzemeleri', min: 500, max: 2000 },
    ],
  },
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

  const totalFirstYear = totalOneTime + totalMonthly * 12

  return (
    <MobileLayout title="Maliyet Hesaplayıcı" showBack>
      <div className="py-4">
        {/* Budget Level */}
        <div className="bg-white rounded-2xl p-4 border border-warm-border mb-6">
          <h3 className="font-semibold text-sm text-warm-text mb-3">Bütçe Seviyesi</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'economic' as const, emoji: '💚', label: 'Ekonomik' },
              { value: 'standard' as const, emoji: '💛', label: 'Standart' },
              { value: 'premium' as const, emoji: '💜', label: 'Premium' },
            ].map((b) => (
              <button
                key={b.value}
                onClick={() => setBudget(b.value)}
                className={`py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                  budget === b.value ? 'bg-primary-500 text-white' : 'bg-warm-surface text-warm-text'
                }`}
              >
                <span className="text-xl">{b.emoji}</span>
                <span className="text-xs font-medium">{b.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary */}
        <motion.div
          key={budget}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-accent-400 to-accent-500 rounded-2xl p-5 text-white mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-semibold">İlk Yıl Tahmini Toplam</h3>
          </div>
          <div className="font-display font-bold text-3xl mb-1">
            ₺{totalFirstYear.toLocaleString('tr-TR')}
          </div>
          <div className="flex gap-4 text-white/80 text-xs">
            <span>Tek seferlik: ₺{totalOneTime.toLocaleString('tr-TR')}</span>
            <span>Aylık: ₺{totalMonthly.toLocaleString('tr-TR')}</span>
          </div>
        </motion.div>

        {/* Categories */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl p-4 border border-warm-border">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{cat.emoji}</span>
                <h3 className="font-semibold text-sm text-warm-text">{cat.title}</h3>
                {cat.id === 'monthly' && (
                  <span className="text-[10px] bg-accent-50 text-accent-600 px-2 py-0.5 rounded-full">Aylık</span>
                )}
              </div>
              <div className="space-y-3">
                {cat.items.map((item) => {
                  const cost = getCost(item.min, item.max)
                  return (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-sm text-warm-muted">{item.label}</span>
                      <span className="font-semibold text-sm text-warm-text">
                        ₺{cost.toLocaleString('tr-TR')}
                      </span>
                    </div>
                  )
                })}
                <div className="pt-2 border-t border-warm-border flex items-center justify-between">
                  <span className="text-xs font-medium text-warm-muted">Alt Toplam</span>
                  <span className="font-bold text-sm text-primary-500">
                    ₺{cat.items.reduce((acc, item) => acc + getCost(item.min, item.max), 0).toLocaleString('tr-TR')}
                    {cat.id === 'monthly' && '/ay'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-warm-muted/50 text-center mt-6 px-4">
          Bu hesaplamalar 2024 Türkiye ortalamalarına dayalı yaklaşık değerlerdir. Gerçek maliyetler değişkenlik gösterebilir.
        </p>
      </div>
    </MobileLayout>
  )
}
