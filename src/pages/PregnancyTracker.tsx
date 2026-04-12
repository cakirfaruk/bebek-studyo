import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { getWeekOfPregnancy, getDaysUntilDue } from '@/lib/utils'
import { getWeekData } from '@/data/pregnancy-weeks'

function getSizeEmoji(week: number): string {
  if (week <= 6) return '🫘'
  if (week <= 8) return '🫐'
  if (week <= 10) return '🫒'
  if (week <= 12) return '🍋'
  if (week <= 14) return '🍋'
  if (week <= 16) return '🥑'
  if (week <= 18) return '🍎'
  if (week <= 20) return '🍌'
  if (week <= 22) return '🥭'
  if (week <= 24) return '🌽'
  if (week <= 26) return '🥒'
  if (week <= 28) return '🍆'
  if (week <= 30) return '🥥'
  if (week <= 32) return '🍍'
  if (week <= 34) return '🍈'
  if (week <= 36) return '🥭'
  if (week <= 38) return '🎃'
  return '🍉'
}

export default function PregnancyTracker() {
  const navigate = useNavigate()
  const { profile } = useStore()
  const hasDueDate = Boolean(profile?.dueDate)
  const currentWeek = hasDueDate ? getWeekOfPregnancy(profile!.dueDate!) : 12
  const [selectedWeek, setSelectedWeek] = useState(currentWeek)
  const daysLeft = hasDueDate ? getDaysUntilDue(profile!.dueDate!) : null
  const weekData = getWeekData(selectedWeek)

  const trimester = selectedWeek <= 13 ? 1 : selectedWeek <= 26 ? 2 : 3
  const trimesterLabel = trimester === 1 ? '1. Trimester' : trimester === 2 ? '2. Trimester' : '3. Trimester'
  const progressPercent = Math.round((selectedWeek / 40) * 100)

  // Floating text array for animation
  const growthText = weekData.babyDevelopment[0] || 'Bebeğiniz gelişmeye devam ediyor...'

  return (
    <MobileLayout title="Hamilelik Takibi" showBack>
      <div className="space-y-10 pb-6 mt-4">

        {!hasDueDate && (
          <div className="bg-primary-container/30 border border-primary/20 rounded-2xl p-5 flex items-center gap-4">
            <span aria-hidden="true" className="material-symbols-outlined text-primary text-2xl">info</span>
            <div className="flex-1">
              <p className="text-sm font-body text-on-surface font-medium">
                Tahmini doğum tarihiniz henüz girilmemiş. Şu anda örnek veriler gösteriliyor.
              </p>
              <button
                onClick={() => navigate('/profile-setup')}
                className="text-primary text-sm font-bold mt-1 underline"
              >
                Profil Ayarlarına Git
              </button>
            </div>
          </div>
        )}

        {/* Weekly Progress Header */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-on-surface-variant font-medium text-xs font-body tracking-wider">MEVCUT DURUM</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">{selectedWeek}. Hafta</h1>
            </div>
            <div className="text-right">
              <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">{trimesterLabel}</p>
              {daysLeft && daysLeft > 0 && selectedWeek === currentWeek && (
                <p className="text-primary font-bold font-headline">{daysLeft} Gün Kaldı</p>
              )}
            </div>
          </div>
          <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden relative shadow-inner">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-surface-container-lowest rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            </motion.div>
          </div>
        </section>

        {/* Main 3D Visual Section */}
        <section className="relative aspect-square flex items-center justify-center overflow-visible mt-8">
          {/* Decorative Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/20 to-secondary-container/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedWeek}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Floating Badge (Size) */}
              <motion.div 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-4 right-0 md:-right-8 z-10 glass-card px-4 py-2.5 rounded-xl shadow-lg rotate-3 border border-white/50"
              >
                <span className="text-[11px] font-semibold text-secondary block font-body">Bebeğin boyutu:</span>
                <span className="text-[16px] md:text-xl font-bold text-on-surface font-headline leading-tight">
                  {weekData.babySizeComparison} {getSizeEmoji(selectedWeek)}
                </span>
                <div className="text-[9px] text-on-surface-variant mt-0.5">Boy: {weekData.babyLength} | Kilo: {weekData.babyWeight}</div>
              </motion.div>

              {/* Main 3D Fetus Visual */}
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-gradient-to-b from-white to-pink-50 shadow-[0_20px_50px_rgba(233,30,99,0.15)] flex items-center justify-center p-6 relative overflow-visible ring-4 ring-white mb-6">
                <img 
                  alt="Fetus visual" 
                  className="w-full h-full object-contain drop-shadow-2xl scale-110 transform transition-transform hover:scale-105 duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWDGJ9RW6axz_qxAyfZ87YV4HOKgo3ggdyewP6isVnHVpVSvg9P4dVJ3WbMmYkELQctWcHGA3PkpSb_POZKpWS7AXlo0y-gWefAh52RzyEA1VXA2-a7B45jZJN_rRQ0IIvAgGy91OPB8T9AbtZasUgvrh8y1oWo1Ex_EnE_uy8iPYqkgQ7GYPZS2fntcMfyTkE2sdw3cU4G5exlvDKmrp9F2ifDOV-rh9OkU3eKJWkOvBUMDf8WdpMa7HJpLXw5prx7YRyga2HsvY"
                />
                
                {/* Decorative floating icon */}
                <div className="absolute -bottom-4 -left-0 w-12 h-12 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-bounce border border-white">
                  <span aria-hidden="true" className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Week Navigators overlay */}
          <button
            onClick={() => setSelectedWeek(Math.max(4, selectedWeek - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white/60 active:scale-95 transition-all z-20"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-on-surface">chevron_left</span>
          </button>
          <button
            onClick={() => setSelectedWeek(Math.min(40, selectedWeek + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white/60 active:scale-95 transition-all z-20"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-on-surface">chevron_right</span>
          </button>
        </section>

        {/* Bento Grid Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Next Appointment Card */}
          <div className="col-span-1 md:col-span-2 glass-card p-5 rounded-2xl flex items-center justify-between shadow-sm border border-white/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center text-secondary shadow-inner">
                <span aria-hidden="true" className="material-symbols-outlined text-[20px]">event</span>
              </div>
              <div>
                <h3 className="font-bold text-[14px] text-on-surface font-headline leading-tight">Sonraki Randevu</h3>
                <p className="text-on-surface-variant text-[11px] font-body">Kontrol Listesine Ekle</p>
              </div>
            </div>
            <button className="bg-secondary text-white px-4 py-2 rounded-full font-bold text-[12px] shadow-lg shadow-secondary/20 hover:scale-95 transition-transform hover:bg-secondary-dim">
              Planla
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
            {/* Daily Update Card */}
            <div className="bg-surface-container-lowest p-4 rounded-xl shadow-card border border-white/60 relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <span aria-hidden="true" className="material-symbols-outlined text-4xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              </div>
              <div>
                <h3 className="font-bold text-[13px] text-primary mb-1.5 font-headline">Günlük Gelişim</h3>
                <p className="text-[11px] text-on-surface-variant leading-snug font-body line-clamp-3">
                  {growthText}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-on-surface hover:text-primary transition-colors cursor-pointer w-fit">
                <span>Tüm Detaylar</span>
                <span aria-hidden="true" className="material-symbols-outlined text-[12px]">arrow_forward</span>
              </div>
            </div>
            
            {/* Tips Card */}
            <div className="bg-primary-container p-4 rounded-xl shadow-card relative overflow-hidden hover:shadow-md transition-shadow">
              <h3 className="font-bold text-[13px] text-on-primary-container mb-2.5 font-headline">Günün İpuçları</h3>
              <div className="flex flex-col gap-1.5 relative z-10 w-[95%]">
                {weekData.tips.slice(0, 2).map((tip, i) => (
                  <span key={i} className="bg-white/50 backdrop-blur-sm px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-on-primary-container leading-tight shadow-sm border border-white/30 truncate block w-full">
                    {tip}
                  </span>
                ))}
              </div>
              <div className="absolute -bottom-2 -right-2 opacity-20 transform -rotate-12 pointer-events-none">
                <span aria-hidden="true" className="material-symbols-outlined text-[60px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions / Health Log */}
        <section className="space-y-4 pt-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xl font-bold font-headline text-on-surface">Günlük Kayıt</h2>
            <button className="text-secondary font-semibold text-sm">Hepsini Gör</button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 pt-1 no-scrollbar px-1">
            {[
              { icon: 'scale', label: 'Kilo' },
              { icon: 'water_drop', label: 'Su' },
              { icon: 'bedtime', label: 'Uyku' },
              { icon: 'mood', label: 'Duygu' },
              { icon: 'favorite', label: 'Tansiyon' },
            ].map((action, i) => (
              <button key={i} className="flex-shrink-0 flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 bg-surface-container-lowest rounded-full flex items-center justify-center shadow-sm border border-outline-variant/10 group-hover:bg-primary-container/20 group-hover:border-primary/20 group-active:scale-90 transition-all">
                  <span aria-hidden="true" className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">{action.icon}</span>
                </div>
                <span className="text-xs font-bold text-on-surface-variant font-body">{action.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Detailed Sections (Mother, Warning) */}
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold font-headline text-on-surface px-1">Detaylı Bilgiler</h2>
          
          <div className="glass-card rounded-2xl p-6 shadow-sm border border-white/50">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-primary-container/40 flex items-center justify-center">
                <span aria-hidden="true" className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>pregnant_woman</span>
              </div>
              <h3 className="font-display font-bold text-lg text-on-surface">Annede Değişimler</h3>
            </div>
            <ul className="space-y-3">
              {weekData.motherSymptoms.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-sm" />
                  <span className="text-sm text-on-surface-variant font-body leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {weekData.warning.length > 0 && (
            <div className="bg-error-container/10 rounded-2xl p-6 border border-error/20 my-4 shadow-sm">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-full bg-error-container/30 flex items-center justify-center">
                  <span aria-hidden="true" className="material-symbols-outlined text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                </div>
                <h3 className="font-display font-bold text-error text-lg">Dikkat Edilmesi Gerekenler</h3>
              </div>
              <ul className="space-y-3">
                {weekData.warning.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-error mt-2 shrink-0 shadow-sm" />
                    <span className="text-sm text-error/90 font-body leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-error/20 flex gap-2">
                <span aria-hidden="true" className="material-symbols-outlined text-error/80 text-sm">info</span>
                <p className="text-xs text-error/80 font-body font-semibold">Bu belirtileri yaşarsanız derhal doktorunuza başvurun.</p>
              </div>
            </div>
          )}
        </section>

      </div>
    </MobileLayout>
  )
}
