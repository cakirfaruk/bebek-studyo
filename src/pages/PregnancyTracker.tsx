import { useState } from 'react'
import { motion } from 'framer-motion'
import { Baby, Heart, AlertTriangle, Lightbulb, ChevronLeft, ChevronRight, Scale, Ruler } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { getWeekOfPregnancy, getDaysUntilDue } from '@/lib/utils'
import { getWeekData } from '@/data/pregnancy-weeks'

export default function PregnancyTracker() {
  const { profile } = useStore()
  const currentWeek = profile?.dueDate ? getWeekOfPregnancy(profile.dueDate) : 20
  const [selectedWeek, setSelectedWeek] = useState(currentWeek)
  const daysLeft = profile?.dueDate ? getDaysUntilDue(profile.dueDate) : null
  const weekData = getWeekData(selectedWeek)

  const trimester = selectedWeek <= 13 ? 1 : selectedWeek <= 26 ? 2 : 3
  const trimesterColors = { 1: 'primary', 2: 'accent', 3: 'secondary' } as const
  const color = trimesterColors[trimester as 1 | 2 | 3]

  return (
    <MobileLayout title="Hamilelik Takibi" showBack>
      <div className="py-4">
        {/* Week selector */}
        <div className="bg-white rounded-2xl p-4 border border-warm-border mb-6">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={() => setSelectedWeek(Math.max(4, selectedWeek - 1))}
              className="w-10 h-10 rounded-xl bg-warm-surface flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="font-display font-bold text-3xl text-warm-text">{selectedWeek}</div>
              <div className="text-xs text-warm-muted">Hafta</div>
            </div>
            <button
              onClick={() => setSelectedWeek(Math.min(42, selectedWeek + 1))}
              className="w-10 h-10 rounded-xl bg-warm-surface flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-warm-surface rounded-full overflow-hidden mb-2">
            <motion.div
              className={`h-full rounded-full ${color === 'primary' ? 'gradient-primary' : color === 'accent' ? 'bg-accent-500' : 'gradient-secondary'}`}
              initial={{ width: 0 }}
              animate={{ width: `${(selectedWeek / 40) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-warm-muted">
            <span>1. Trimester</span>
            <span>2. Trimester</span>
            <span>3. Trimester</span>
          </div>

          {selectedWeek === currentWeek && daysLeft && daysLeft > 0 && (
            <div className="mt-3 text-center">
              <span className="text-xs bg-primary-50 text-primary-600 px-3 py-1 rounded-full font-medium">
                📅 Doğuma {daysLeft} gün kaldı
              </span>
            </div>
          )}
        </div>

        {/* Baby Size Card */}
        <motion.div
          key={selectedWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-5 mb-4 ${
            color === 'primary' ? 'bg-primary-50 border-primary-100' :
            color === 'accent' ? 'bg-accent-50 border-accent-100' :
            'bg-secondary-50 border-secondary-100'
          } border`}
        >
          <div className="flex items-center gap-4">
            <div className="text-5xl">{weekData.babySizeComparison === 'Karpuz' ? '🍉' :
              weekData.babySizeComparison === 'Muz' ? '🍌' :
              weekData.babySizeComparison === 'Limon' ? '🍋' :
              weekData.babySizeComparison === 'Avokado' ? '🥑' :
              weekData.babySizeComparison === 'Ahududu' ? '🫐' :
              '🍼'}</div>
            <div>
              <h3 className="font-display font-semibold text-lg text-warm-text">
                Bebeğiniz bir {weekData.babySizeComparison} büyüklüğünde
              </h3>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-warm-muted" />
                  <span className="text-xs text-warm-muted">{weekData.babyLength}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-warm-muted" />
                  <span className="text-xs text-warm-muted">{weekData.babyWeight}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {/* Baby Development */}
          <div className="bg-white rounded-2xl p-4 border border-warm-border">
            <div className="flex items-center gap-2 mb-3">
              <Baby className="w-5 h-5 text-secondary-500" />
              <h3 className="font-semibold text-sm text-warm-text">Bebek Gelişimi</h3>
            </div>
            <ul className="space-y-2">
              {weekData.babyDevelopment.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 mt-1.5 shrink-0" />
                  <span className="text-sm text-warm-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mother Symptoms */}
          <div className="bg-white rounded-2xl p-4 border border-warm-border">
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-5 h-5 text-primary-500" />
              <h3 className="font-semibold text-sm text-warm-text">Anne Belirtileri</h3>
            </div>
            <ul className="space-y-2">
              {weekData.motherSymptoms.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 mt-1.5 shrink-0" />
                  <span className="text-sm text-warm-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-white rounded-2xl p-4 border border-warm-border">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-5 h-5 text-accent-500" />
              <h3 className="font-semibold text-sm text-warm-text">Bu Hafta İpuçları</h3>
            </div>
            <ul className="space-y-2">
              {weekData.tips.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-400 mt-1.5 shrink-0" />
                  <span className="text-sm text-warm-muted">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warning Signs */}
          {weekData.warning.length > 0 && (
            <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <h3 className="font-semibold text-sm text-red-700">Uyarı İşaretleri</h3>
              </div>
              <ul className="space-y-2">
                {weekData.warning.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                    <span className="text-sm text-red-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-red-500 mt-2">Bu belirtileri yaşarsanız derhal doktorunuza başvurun.</p>
            </div>
          )}
        </div>

        {/* Quick week navigation */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-warm-text mb-3">Hızlı Geçiş</h4>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWeek(w)}
                className={`shrink-0 w-12 h-12 rounded-xl flex flex-col items-center justify-center text-xs font-medium transition-all ${
                  selectedWeek === w
                    ? 'bg-primary-500 text-white'
                    : w === currentWeek
                    ? 'bg-primary-50 text-primary-600 border border-primary-200'
                    : 'bg-white border border-warm-border text-warm-text'
                }`}
              >
                <span className="font-bold">{w}</span>
                <span className="text-[8px]">hafta</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </MobileLayout>
  )
}
