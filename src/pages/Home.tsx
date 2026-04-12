import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { getWeekOfPregnancy, getDaysUntilDue, getTrimesterLabel } from '@/lib/utils'
import { toast } from 'sonner'

interface FeatureCard {
  path: string
  icon: string
  title: string
  desc: string
  iconBg: string
  iconColor: string
}

const featureCards: Record<string, FeatureCard[]> = {
  expecting: [
    { path: '/pregnancy-tracker', icon: 'calendar_month', title: 'Hamilelik Takibi', desc: 'Haftalik gelisim', iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
    { path: '/baby-face', icon: 'child_care', title: 'Bebek Yuzu', desc: 'AI ile tahmin', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/names', icon: 'auto_awesome', title: 'Isim Bulucu', desc: 'Akilli oneriler', iconBg: 'bg-primary-fixed/20', iconColor: 'text-primary' },
    { path: '/checklists', icon: 'checklist', title: 'Kontrol Listeleri', desc: 'Her sey hazir mi?', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
    { path: '/baby-guide', icon: 'menu_book', title: 'Bebek Rehberi', desc: '0-12 ay gelisim', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/memories', icon: 'favorite', title: 'Ani Defteri', desc: 'Ozel anlariniz', iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
    { path: '/appointments', icon: 'local_hospital', title: 'Randevular', desc: 'Takip edin', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
    { path: '/cost-calculator', icon: 'savings', title: 'Maliyet', desc: 'Butce planlayin', iconBg: 'bg-primary-fixed/20', iconColor: 'text-primary' },
    { path: '/gift-list', icon: 'redeem', title: 'Hediye Listesi', desc: 'Bebek hediyeleri', iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
    { path: '/lullabies', icon: 'music_note', title: 'Ninniler', desc: 'Uyku sesleri', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/stories', icon: 'auto_stories', title: 'Masallar', desc: 'Uyku hikayeleri', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
  ],
  dreaming: [
    { path: '/baby-face', icon: 'child_care', title: 'Bebek Yuzu', desc: 'AI ile tahmin', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/names', icon: 'auto_awesome', title: 'Isim Kesfi', desc: 'Romantik isimler', iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
    { path: '/readiness-quiz', icon: 'lightbulb', title: 'Hazir miyiz?', desc: 'Birlikte test edin', iconBg: 'bg-primary-fixed/20', iconColor: 'text-primary' },
    { path: '/cost-calculator', icon: 'savings', title: 'Maliyet', desc: 'Butce planlayin', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
  ],
  newparent: [
    { path: '/baby-guide', icon: 'menu_book', title: 'Gelisim Rehberi', desc: '0-12 ay', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
    { path: '/checklists', icon: 'checklist', title: 'Kontrol Listeleri', desc: 'Takip edin', iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
    { path: '/memories', icon: 'favorite', title: 'Ani Defteri', desc: 'Ilk anlar', iconBg: 'bg-primary-fixed/20', iconColor: 'text-primary' },
    { path: '/names', icon: 'auto_awesome', title: 'Isim Bulucu', desc: 'Hala ariyorum', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/appointments', icon: 'local_hospital', title: 'Randevular', desc: 'Asi takvimi', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
    { path: '/baby-face', icon: 'child_care', title: 'Bebek Yuzu', desc: 'Buyuyunce', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/lullabies', icon: 'music_note', title: 'Ninniler', desc: 'Uyku sesleri', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/stories', icon: 'auto_stories', title: 'Masallar', desc: 'Uyku hikayeleri', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
    { path: '/child-guide', icon: 'school', title: 'Cocuk Rehberi', desc: '1-6 yas', iconBg: 'bg-primary-fixed/20', iconColor: 'text-primary' },
  ],
  planner: [
    { path: '/cost-calculator', icon: 'savings', title: 'Maliyet', desc: 'Butce planlayin', iconBg: 'bg-primary-fixed/20', iconColor: 'text-primary' },
    { path: '/checklists', icon: 'checklist', title: 'Hazirlik Listesi', desc: 'Planlayin', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
    { path: '/names', icon: 'auto_awesome', title: 'Isim Kesfi', desc: 'Arastirin', iconBg: 'bg-primary-container/20', iconColor: 'text-primary' },
    { path: '/baby-face', icon: 'child_care', title: 'Bebek Yuzu', desc: 'AI tahmin', iconBg: 'bg-secondary-container/40', iconColor: 'text-secondary' },
    { path: '/baby-guide', icon: 'menu_book', title: 'Bebek Rehberi', desc: 'Bilgilenin', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary' },
    { path: '/readiness-quiz', icon: 'lightbulb', title: 'Hazirlik Testi', desc: 'Degerlendirin', iconBg: 'bg-primary-fixed/20', iconColor: 'text-primary' },
  ],
}

function getSizeComparison(week: number): string {
  if (week <= 6) return 'Mercimek'
  if (week <= 8) return 'Ahududu'
  if (week <= 10) return 'Zeytin'
  if (week <= 12) return 'Misket Limonu'
  if (week <= 14) return 'Limon'
  if (week <= 16) return 'Avokado'
  if (week <= 18) return 'Nar'
  if (week <= 20) return 'Muz'
  if (week <= 22) return 'Mango'
  if (week <= 24) return 'Misir'
  if (week <= 26) return 'Salatalik'
  if (week <= 28) return 'Patlican'
  if (week <= 30) return 'Hindistan Cevizi'
  if (week <= 32) return 'Ananas'
  if (week <= 34) return 'Kavun'
  if (week <= 36) return 'Papaya'
  if (week <= 38) return 'Kabak'
  return 'Karpuz'
}

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

export default function Home() {
  const navigate = useNavigate()
  const { profile, segment } = useStore()
  const cards = featureCards[segment || 'expecting']
  const week = profile?.dueDate ? getWeekOfPregnancy(profile.dueDate) : null
  const daysLeft = profile?.dueDate ? getDaysUntilDue(profile.dueDate) : null
  const greetingName = profile?.motherName || 'Guzel Anne'

  // SVG progress ring calculations
  const { radius, circumference, strokeDashoffset } = useMemo(() => {
    const r = 46
    const c = 2 * Math.PI * r
    const progress = week ? Math.min(1, week / 40) : 0
    return { radius: r, circumference: c, strokeDashoffset: c - progress * c }
  }, [week])

  return (
    <MobileLayout>
      <div className="space-y-10">

        {/* ── Hero Section: Weekly Progress ── */}
        {segment === 'expecting' && week ? (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute -top-12 -right-8 w-64 h-64 bg-primary-fixed/20 rounded-full blur-[80px] -z-10"></div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-secondary-container/30 rounded-full blur-[60px] -z-10"></div>

            <div className="flex flex-col items-center text-center space-y-6">
              {/* Circular Progress Assembly */}
              <div className="relative w-64 h-64 flex items-center justify-center mb-8">
                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    className="text-surface-container-highest"
                    cx="50" cy="50" r={radius}
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="6"
                  />
                  <circle
                    cx="50" cy="50" r={radius}
                    fill="transparent"
                    stroke="url(#paint0_linear)"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                  <defs>
                    <linearGradient id="paint0_linear" gradientUnits="userSpaceOnUse" x1="0" x2="100" y1="0" y2="100">
                      <stop stopColor="#ba0961" />
                      <stop offset="1" stopColor="#6834eb" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Content Inside Circle */}
                <div className="z-10 bg-surface-container-lowest w-52 h-52 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-surface p-4">
                  <span className="text-on-surface-variant font-display font-semibold text-[11px] tracking-widest uppercase">Hafta</span>
                  <span className="text-5xl font-display font-black text-on-surface mt-0">{week}</span>
                  <div className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-full">
                    <span aria-hidden="true" className="material-symbols-outlined text-primary text-[14px]">spa</span>
                    <span className="text-on-surface font-body font-semibold text-[10px]">{getTrimesterLabel(week)}</span>
                  </div>
                </div>

                {/* Visual Metaphor: Floating Illustration */}
                <div className="absolute -right-2 -bottom-2 w-28 h-28 bg-white/90 rounded-2xl shadow-xl flex flex-col items-center justify-center p-2 transform rotate-6 border border-white/80 backdrop-blur-md">
                  <span className="text-4xl mb-1">{getSizeEmoji(week)}</span>
                  <span className="text-[9px] font-display font-bold text-primary uppercase tracking-tighter text-center leading-tight">
                    {getSizeComparison(week)} Boyutunda
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-display font-bold text-on-surface">
                  Merhaba, {greetingName}!
                </h2>
                <p className="text-on-surface-variant max-w-xs mx-auto text-sm leading-relaxed">
                  {daysLeft && daysLeft > 0
                    ? `${week}. haftadasiniz — Doguma ${daysLeft} gun kaldi`
                    : 'Dogum zamani yaklasti!'}
                </p>
              </div>
            </div>
          </motion.section>
        ) : (
          /* Non-expecting greeting */
          <motion.section
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-2"
          >
            <h2 className="text-2xl font-display font-bold text-on-surface">
              Merhaba, {greetingName}!
            </h2>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {segment === 'expecting' && !week
                ? 'Tahmini doğum tarihinizi profil ayarlarından girerek haftalık takibi başlatın.'
                : segment === 'dreaming' ? 'Hayallerin guzelligini kesfedin'
                : segment === 'newparent' ? 'Yeni macera harika gidiyor!'
                : 'Harika bir plan yapiliyor'}
            </p>
          </motion.section>
        )}

        {/* ── Quick Actions ── */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-4"
        >
          <button onClick={() => toast.info('Bu özellik yakında aktif olacak')} className="flex flex-col items-center gap-3 p-4 rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow active:scale-95 group">
            <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
              <span aria-hidden="true" className="material-symbols-outlined">monitor_weight</span>
            </div>
            <span className="font-body text-xs font-semibold text-on-surface-variant">Kilo</span>
          </button>
          <button onClick={() => toast.info('Bu özellik yakında aktif olacak')} className="flex flex-col items-center gap-3 p-4 rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow active:scale-95 group">
            <div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
              <span aria-hidden="true" className="material-symbols-outlined">mood</span>
            </div>
            <span className="font-body text-xs font-semibold text-on-surface-variant">Ruh Hali</span>
          </button>
          <button onClick={() => toast.info('Bu özellik yakında aktif olacak')} className="flex flex-col items-center gap-3 p-4 rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow active:scale-95 group">
            <div className="w-12 h-12 rounded-full bg-tertiary-container/20 flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
              <span aria-hidden="true" className="material-symbols-outlined">water_drop</span>
            </div>
            <span className="font-body text-xs font-semibold text-on-surface-variant">Su</span>
          </button>
        </motion.section>

        {/* ── Bento Layout: Daily Tip & Next Milestone ── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-5"
        >
          {/* Daily Tip Card */}
          <div className="relative overflow-hidden group bg-gradient-to-br from-secondary to-secondary-dim p-5 rounded-2xl shadow-lg border border-white/10">
            <div className="absolute -top-4 -right-4 p-4 opacity-10 pointer-events-none">
              <span aria-hidden="true" className="material-symbols-outlined text-[100px] text-on-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>
            </div>
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center px-2 py-1 bg-white/20 backdrop-blur-md rounded-md shadow-sm">
                <span className="text-[9px] font-display font-extrabold text-on-secondary uppercase tracking-widest">Günün İpucu</span>
              </div>
              <h3 className="text-[17px] font-display font-bold text-on-secondary leading-tight tracking-tight max-w-[85%]">
                {segment === 'expecting' ? 'Hidrasyon Enerji İçin Anahtar'
                  : segment === 'dreaming' ? 'Birlikte Hayal Kurun'
                  : segment === 'newparent' ? 'Göz Teması Kurun'
                  : 'Folik Asit Takviyesi'}
              </h3>
              <p className="text-on-secondary/85 text-[12px] leading-relaxed max-w-[90%] font-medium">
                {segment === 'expecting'
                  ? 'Günde en az 8 bardak su içmeyi unutmayın. Hidrasyon hem sizin hem bebeğiniz için çok önemlidir.'
                  : segment === 'dreaming'
                  ? 'Birlikte hayal kurmak ilişkinizi güçlendirir. Bu akşam bebek isimleri hakkında sohbet edin.'
                  : segment === 'newparent'
                  ? 'Bebeğinizle göz teması kurun — bu onun sosyal gelişimi için harika bir egzersizdir.'
                  : 'Folik asit takviyesine hamilelikten 3 ay önce başlamak idealdir.'}
              </p>
              <button onClick={() => navigate('/baby-guide')} className="mt-1 px-4 py-2 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-secondary text-[11px] font-bold tracking-wider uppercase rounded-full transition-all flex items-center gap-1.5 w-fit border border-surface-container-lowest/20 shadow-sm">
                Devamını Oku <span aria-hidden="true" className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Next Milestone Card */}
          <div className="glass-card p-5 rounded-2xl shadow-card border border-white/60 space-y-4 relative overflow-hidden">
            <div className="flex justify-between items-start relative z-10">
              <div className="space-y-1">
                <span className="text-primary font-display font-extrabold text-[10px] uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded-full inline-block mb-1">Sonraki Metrik</span>
                <h3 className="text-[16px] font-display font-bold text-on-surface">NT Ultrasonu</h3>
              </div>
              <div className="bg-primary-container/30 p-2.5 rounded-xl shadow-inner border border-primary/10">
                <span aria-hidden="true" className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 py-3 border-y border-outline-variant/10 relative z-10">
              <div className="text-center w-12 shrink-0">
                <span className="block text-2xl font-display font-black text-on-surface leading-none">14</span>
                <span className="text-[9px] font-body font-bold text-on-surface-variant uppercase tracking-widest mt-0.5 block">Ekm</span>
              </div>
              <div className="h-8 w-[1px] bg-outline-variant/20 shrink-0"></div>
              <div className="flex-1 min-w-0">
                <span className="block text-[13px] font-body font-bold text-on-surface truncate">Klinik Randevusu</span>
                <span className="text-[11px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                  <span aria-hidden="true" className="material-symbols-outlined text-[12px]">schedule</span> 09:30 • 4 gün kaldı
                </span>
              </div>
            </div>
            
            <button onClick={() => navigate('/appointments')} className="w-full py-3 bg-surface-container-lowest/50 text-on-surface text-[12px] font-bold rounded-xl hover:bg-white transition-colors border border-outline-variant/10 shadow-sm relative z-10 mt-1">
              Takvime Ekle
            </button>
          </div>
        </motion.section>

        {/* ── Fetus Visualization Section ── */}
        {segment === 'expecting' && week && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/40 backdrop-blur-xl p-8 rounded-lg border border-white/60 shadow-xl overflow-hidden relative"
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-40 h-40 relative">
                <div className="absolute inset-0 bg-primary-fixed/30 rounded-full animate-pulse"></div>
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-fixed/50 to-secondary-container/50 flex items-center justify-center border-4 border-white shadow-inner">
                  <span className="text-5xl">👶</span>
                </div>
              </div>
              <div className="flex-1 space-y-3">
                <h3 className="text-xl font-display font-bold text-on-surface">Gelisim Gorsellestirmesi</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed italic">
                  Bebeginiz {getSizeComparison(week).toLowerCase()} buyuklugunde ve her gun buyumeye devam ediyor.
                </p>
                <div className="flex gap-2 pt-2">
                  <div className="h-1.5 w-16 bg-primary rounded-full"></div>
                  <div className="h-1.5 w-16 bg-surface-container-highest rounded-full"></div>
                  <div className="h-1.5 w-16 bg-surface-container-highest rounded-full"></div>
                </div>
              </div>
            </div>
            {/* Decorative Background Element */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 border-[32px] border-primary/5 rounded-full"></div>
          </motion.section>
        )}

        {/* ── Dreaming Hero ── */}
        {segment === 'dreaming' && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-xl p-6 text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dim))' }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span aria-hidden="true" className="material-symbols-outlined text-6xl text-on-secondary">favorite</span>
            </div>
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg">
                <span className="text-[10px] font-display font-bold text-on-secondary uppercase">Hayaliniz</span>
              </div>
              <h3 className="text-lg font-display font-bold text-on-secondary leading-tight">Hayalinizdeki Bebek</h3>
              <p className="text-on-secondary/80 text-sm leading-relaxed">
                Yapay zeka ile bebeginizin nasil gorunecegini kesfedin.
              </p>
              <button
                onClick={() => navigate('/baby-face')}
                className="mt-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-on-secondary text-xs font-bold rounded-full transition-all flex items-center gap-2"
              >
                Hemen Kesfet <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </motion.section>
        )}

        {/* ── Feature Grid Cards ── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="section-title">Ozellikler</h2>
          <div className="grid grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.button
                key={card.path}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.04 }}
                onClick={() => navigate(card.path)}
                className="glass-card p-5 text-left flex flex-col gap-3"
              >
                <div className={`w-12 h-12 rounded-full ${card.iconBg} flex items-center justify-center ${card.iconColor}`}>
                  <span aria-hidden="true" className="material-symbols-outlined">{card.icon}</span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-[13px] text-on-surface leading-tight">{card.title}</h3>
                  <p className="text-on-surface-variant text-[11px] mt-0.5">{card.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* ── Premium CTA ── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative overflow-hidden rounded-xl p-6 text-white"
          style={{ background: 'linear-gradient(135deg, #ba0961, #a50055)' }}
        >
          <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10 blur-lg" />
          <div className="absolute top-0 left-1/2 w-20 h-20 rounded-full bg-white/5 blur-xl" />
          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="material-symbols-outlined text-white">workspace_premium</span>
              <h3 className="font-display font-semibold text-[16px]">Premium Uyelik</h3>
            </div>
            <p className="text-white/75 text-[12px] leading-relaxed">
              Sinirsiz AI ozellik, oncelikli destek ve reklamsiz deneyim
            </p>
            <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-[13px] font-semibold transition-all border border-white/20 flex items-center gap-2">
              Detaylari Gor <span aria-hidden="true" className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </motion.section>

      </div>
    </MobileLayout>
  )
}
