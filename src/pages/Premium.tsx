import { useState } from 'react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { toast } from 'sonner'

const tiers = [
  { id: 'monthly', label: 'Aylik', price: '49.99', period: '/ay', popular: false },
  { id: 'quarterly', label: '3 Aylik', price: '129.99', period: '/3 ay', popular: false },
  { id: 'yearly', label: 'Yillik', price: '399.99', period: '/yil', popular: true },
]

const comparisonRows = [
  { feature: 'Kredi', free: '100 kredi', premium: 'Sinirsiz kredi' },
  { feature: 'Ozellikler', free: 'Temel ozellikler', premium: 'Tum ozellikler' },
  { feature: 'Reklamlar', free: 'Reklamli', premium: 'Reklamsiz' },
  { feature: 'Destek', free: 'Standart', premium: 'Oncelikli destek' },
]

export default function Premium() {
  const [selectedTier, setSelectedTier] = useState('yearly')

  const handlePurchase = () => {
    const tier = tiers.find((t) => t.id === selectedTier)
    toast.info(`${tier?.label} plan secildi. Odeme sistemi yakin zamanda aktif olacak.`)
  }

  return (
    <MobileLayout title="Premium" showBack>
      <div className="space-y-8 pb-6">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br from-primary to-secondary text-white text-center">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 space-y-3">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <h1 className="font-headline text-2xl font-bold">Premium Uyelik</h1>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs mx-auto">
              Tum ozelliklere sinirsiz erisim, reklamsiz deneyim ve oncelikli destek
            </p>
          </div>
        </div>

        {/* Feature Comparison */}
        <div className="space-y-3">
          <h2 className="font-headline text-lg font-bold text-on-surface text-center">
            Ozellik Karsilastirmasi
          </h2>
          <div className="glass-card rounded-lg overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 bg-surface-container-lowest px-4 py-3 border-b border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant font-body">Ozellik</span>
              <span className="text-xs font-bold text-on-surface-variant text-center font-body">Free</span>
              <span className="text-xs font-bold text-primary text-center font-body">Premium</span>
            </div>
            {/* Rows */}
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-4 py-3 border-b border-outline-variant/5 last:border-b-0"
              >
                <span className="text-xs font-semibold text-on-surface font-body">{row.feature}</span>
                <span className="text-xs text-on-surface-variant text-center font-body">{row.free}</span>
                <span className="text-xs text-primary font-semibold text-center font-body">{row.premium}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="space-y-3">
          <h2 className="font-headline text-lg font-bold text-on-surface text-center">
            Plan Seciniz
          </h2>
          <div className="space-y-3">
            {tiers.map((tier) => {
              const isSelected = selectedTier === tier.id
              return (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier.id)}
                  className={`glass-card w-full rounded-lg p-5 text-left transition-all relative overflow-hidden ${
                    isSelected
                      ? 'ring-2 ring-primary shadow-lg shadow-primary/10'
                      : 'hover:shadow-md'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                      En Populer
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-primary bg-primary' : 'border-outline-variant'
                        }`}
                      >
                        {isSelected && (
                          <span
                            aria-hidden="true"
                            className="material-symbols-outlined text-white text-sm"
                          >
                            check
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-display font-bold text-on-surface text-sm">
                          {tier.label}
                        </span>
                        {tier.popular && (
                          <span className="block text-[10px] text-primary font-semibold">
                            En cok tercih edilen
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-display font-bold text-on-surface text-lg">
                        {tier.price}
                      </span>
                      <span className="text-on-surface-variant text-xs"> TL{tier.period}</span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Purchase Button */}
        <button onClick={handlePurchase} className="btn-primary w-full py-4 rounded-full text-sm font-bold">
          <span aria-hidden="true" className="material-symbols-outlined text-base mr-2 align-middle">
            shopping_cart
          </span>
          Satin Al
        </button>
      </div>
    </MobileLayout>
  )
}
