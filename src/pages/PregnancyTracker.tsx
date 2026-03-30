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
  const trimesterLabel = trimester === 1 ? '1. Trimester' : trimester === 2 ? '2. Trimester' : '3. Trimester'
  const progressPercent = Math.round((selectedWeek / 40) * 100)

  // SVG circular progress ring parameters
  const ringSize = 140
  const strokeWidth = 10
  const radius = (ringSize - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference

  return (
    <MobileLayout title="Hamilelik Takibi" showBack>
      <div className="space-y-8 pb-6">
        {/* Weekly Progress Header */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-on-surface-variant font-medium text-sm font-body uppercase tracking-wider">Mevcut Hafta</p>
              <h1 className="text-4xl font-bold tracking-tight text-on-surface font-display">Hafta {selectedWeek}</h1>
            </div>
            <div className="text-right">
              <p className="text-on-surface-variant text-sm uppercase tracking-wider">{trimesterLabel}</p>
              {daysLeft && daysLeft > 0 && selectedWeek === currentWeek && (
                <p className="text-primary font-bold font-display">{daysLeft} gun kaldi</p>
              )}
            </div>
          </div>
          {/* Gradient progress bar */}
          <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>
          <div className="flex justify-between text-[10px] text-on-surface-variant font-body">
            <span>1. Trimester</span>
            <span>2. Trimester</span>
            <span>3. Trimester</span>
          </div>
        </section>

        {/* Circular Progress Ring + Week Selector */}
        <section className="relative flex flex-col items-center justify-center">
          {/* Decorative glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/20 to-secondary-container/20 rounded-full blur-3xl -z-10" />

          <div className="relative flex items-center justify-center">
            {/* Left arrow */}
            <button
              onClick={() => setSelectedWeek(Math.max(4, selectedWeek - 1))}
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center mr-4 hover:scale-95 transition-transform"
            >
              <ChevronLeft className="w-5 h-5 text-on-surface-variant" />
            </button>

            {/* SVG Circular Ring */}
            <div className="relative">
              <svg width={ringSize} height={ringSize} className="transform -rotate-90">
                {/* Background ring */}
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={strokeWidth}
                  className="text-surface-container-highest"
                />
                {/* Progress ring with gradient */}
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ba0961" />
                    <stop offset="100%" stopColor="#6834eb" />
                  </linearGradient>
                </defs>
                <circle
                  cx={ringSize / 2}
                  cy={ringSize / 2}
                  r={radius}
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                />
              </svg>
              {/* Center content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display font-extrabold text-4xl text-on-surface">{selectedWeek}</span>
                <span className="text-xs text-on-surface-variant font-body">Hafta</span>
              </div>
            </div>

            {/* Right arrow */}
            <button
              onClick={() => setSelectedWeek(Math.min(42, selectedWeek + 1))}
              className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center ml-4 hover:scale-95 transition-transform"
            >
              <ChevronRight className="w-5 h-5 text-on-surface-variant" />
            </button>
          </div>
        </section>

        {/* Baby Size Card - Glass card */}
        <motion.div
          key={selectedWeek}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 shadow-card"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-white to-pink-50 shadow-lg flex items-center justify-center text-4xl">
              {weekData.babySizeComparison === 'Karpuz' ? '🍉' :
              weekData.babySizeComparison === 'Muz' ? '🍌' :
              weekData.babySizeComparison === 'Limon' ? '🍋' :
              weekData.babySizeComparison === 'Avokado' ? '🥑' :
              weekData.babySizeComparison === 'Ahududu' ? '🫐' :
              '🍼'}
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-on-surface">
                Bebeginiz bir {weekData.babySizeComparison} buyuklugunde
              </h3>
              <div className="flex gap-4 mt-2">
                <div className="flex items-center gap-1.5">
                  <Ruler className="w-3.5 h-3.5 text-on-surface-variant" />
                  <span className="text-xs text-on-surface-variant font-body">{weekData.babyLength}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-on-surface-variant" />
                  <span className="text-xs text-on-surface-variant font-body">{weekData.babyWeight}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Metrics */}
        <section className="grid grid-cols-2 gap-4">
          {/* Daily growth card */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl shadow-card relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="text-6xl text-primary">✨</span>
            </div>
            <h3 className="font-bold text-primary mb-2 font-display text-sm">Gunluk Gelisim</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed font-body">
              {weekData.babyDevelopment[0] || 'Bebeginiz gelismeye devam ediyor...'}
            </p>
          </div>
          {/* Tips card */}
          <div className="bg-primary-container p-5 rounded-2xl shadow-card relative overflow-hidden">
            <h3 className="font-bold text-on-primary-container mb-2 font-display text-sm">Gunun Ipucu</h3>
            <div className="flex flex-col gap-2">
              {weekData.tips.slice(0, 2).map((tip, i) => (
                <span key={i} className="bg-white/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-on-primary-container">
                  {tip.length > 30 ? tip.substring(0, 30) + '...' : tip}
                </span>
              ))}
            </div>
            <div className="absolute -bottom-2 -right-2 opacity-20">
              <Lightbulb className="w-12 h-12" />
            </div>
          </div>
        </section>

        {/* Sections */}
        <div className="space-y-4">
          {/* Baby Development */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                <Baby className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-display font-bold text-on-surface">Bebek Gelisimi</h3>
            </div>
            <ul className="space-y-2.5">
              {weekData.babyDevelopment.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0" />
                  <span className="text-sm text-on-surface-variant font-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mother Symptoms */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-on-surface">Anne Belirtileri</h3>
            </div>
            <ul className="space-y-2.5">
              {weekData.motherSymptoms.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  <span className="text-sm text-on-surface-variant font-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-tertiary-container/30 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-tertiary" />
              </div>
              <h3 className="font-display font-bold text-on-surface">Bu Hafta Ipuclari</h3>
            </div>
            <ul className="space-y-2.5">
              {weekData.tips.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2 shrink-0" />
                  <span className="text-sm text-on-surface-variant font-body">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Warning Signs */}
          {weekData.warning.length > 0 && (
            <div className="bg-error-container/10 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-error" />
                </div>
                <h3 className="font-display font-bold text-error">Uyari Isaretleri</h3>
              </div>
              <ul className="space-y-2.5">
                {weekData.warning.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 shrink-0" />
                    <span className="text-sm text-error font-body">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-error/70 mt-3 font-body">Bu belirtileri yasarsaniz derhal doktorunuza basvurun.</p>
            </div>
          )}
        </div>

        {/* Quick week navigation - Health Log style */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold font-display px-1">Hizli Gecis</h2>
          <div className="flex gap-3 overflow-x-auto pb-4">
            {[4, 8, 12, 16, 20, 24, 28, 32, 36, 40].map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWeek(w)}
                className="flex-shrink-0 flex flex-col items-center gap-2 group"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${
                  selectedWeek === w
                    ? 'bg-gradient-to-br from-primary to-secondary text-white shadow-lg shadow-primary/20 scale-105'
                    : w === currentWeek
                    ? 'bg-primary-container/30 text-primary'
                    : 'bg-surface-container-high text-on-surface-variant group-active:scale-90'
                }`}>
                  <span className="font-bold text-sm">{w}</span>
                </div>
                <span className="text-[10px] font-bold text-on-surface-variant">hafta</span>
              </button>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  )
}
