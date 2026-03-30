import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { getWeekOfPregnancy, getDaysUntilDue } from '@/lib/utils'

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

function getTrimesterLabel(week: number): string {
  if (week <= 13) return 'Birinci Trimester'
  if (week <= 26) return 'Ikinci Trimester'
  return 'Ucuncu Trimester'
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

export default function Home() {
  const navigate = useNavigate()
  const { profile, segment } = useStore()
  const cards = featureCards[segment || 'expecting']
  const week = profile?.dueDate ? getWeekOfPregnancy(profile.dueDate) : null
  const daysLeft = profile?.dueDate ? getDaysUntilDue(profile.dueDate) : null
  const greetingName = profile?.motherName || 'Guzel Anne'

  // SVG progress ring calculations
  const radius = 46
  const circumference = 2 * Math.PI * radius
  const weekProgress = week ? Math.min(1, week / 40) : 0
  const strokeDashoffset = circumference - weekProgress * circumference

  return (
    <MobileLayout>
      <div className="space-y-10">

        {/* ── Section 1: Week Indicator with Circular Progress Ring ── */}
        {segment === 'expecting' && week ? (
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="flex flex-col items-center text-center space-y-6">
              {/* Circular Progress Assembly */}
              <div className="relative w-72 h-72 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle
                    className="progress-ring-track"
                    cx="50" cy="50" r={radius}
                    strokeWidth="6"
                    stroke="currentColor"
                    style={{ color: 'var(--color-surface-highest)' }}
                  />
                  <circle
                    className="progress-ring-fill"
                    cx="50" cy="50" r={radius}
                    strokeWidth="6"
                    stroke="url(#gradientRing)"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                  />
                  <defs>
                    <linearGradient id="gradientRing" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
                      <stop stopColor="#ba0961" />
                      <stop offset="1" stopColor="#6834eb" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Content Inside Circle */}
                <div className="z-10 bg-surface-lowest w-60 h-60 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-surface p-6">
                  <span className="text-on-surface-variant font-display font-semibold text-sm tracking-widest uppercase">Hafta</span>
                  <span className="text-6xl font-display font-black text-on-surface mt-1">{week}</span>
                  <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-surface-mid rounded-full">
                    <span className="material-symbols-outlined text-primary text-lg">spa</span>
                    <span className="text-on-surface font-body font-medium text-xs">{getTrimesterLabel(week)}</span>
                  </div>
                </div>

                {/* Floating Size Comparison Card */}
                <div className="absolute -right-2 -bottom-2 w-28 h-28 bg-white rounded-xl shadow-xl flex flex-col items-center justify-center p-2 transform rotate-6 border border-white/50 backdrop-blur-sm">
                  <span className="text-3xl mb-1">🍋</span>
                  <span className="text-[10px] font-display font-bold text-primary uppercase tracking-tight text-center leading-tight">
                    {getSizeComparison(week)}
                  </span>
                </div>
              </div>

              {/* Description below ring */}
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
              {segment === 'dreaming' ? 'Hayallerin guzelligini kesfedin'
                : segment === 'newparent' ? 'Yeni macera harika gidiyor!'
                : 'Harika bir plan yapiliyor'}
            </p>
          </motion.section>
        )}

        {/* ── Section 2: Quick Action Icons ── */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { icon: 'monitor_weight', label: 'Kilo', bg: 'bg-primary-container/20', color: 'text-primary', hoverBg: 'group-hover:bg-primary group-hover:text-on-primary' },
            { icon: 'mood', label: 'Ruh Hali', bg: 'bg-secondary-container/40', color: 'text-secondary', hoverBg: 'group-hover:bg-secondary group-hover:text-on-secondary' },
            { icon: 'water_drop', label: 'Su', bg: 'bg-tertiary-container/20', color: 'text-tertiary', hoverBg: 'group-hover:bg-tertiary group-hover:text-on-tertiary' },
          ].map((action) => (
            <button
              key={action.icon}
              className="flex flex-col items-center gap-3 p-4 rounded-xl bg-surface-lowest shadow-sm hover:shadow-md transition-shadow active:scale-95 group"
            >
              <div className={`w-12 h-12 rounded-full ${action.bg} flex items-center justify-center ${action.color} ${action.hoverBg} transition-colors`}>
                <span className="material-symbols-outlined">{action.icon}</span>
              </div>
              <span className="font-body text-xs font-semibold text-on-surface-variant">{action.label}</span>
            </button>
          ))}
        </motion.section>

        {/* ── Section 3: Growth Visualization Card ── */}
        {segment === 'expecting' && week && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 overflow-hidden relative"
            style={{ background: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.6)' }}
          >
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-32 h-32 relative">
                <div className="absolute inset-0 bg-primary-fixed/30 rounded-full animate-pulse" />
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-fixed/50 to-secondary-container/50 flex items-center justify-center border-4 border-white shadow-inner">
                  <span className="text-5xl">👶</span>
                </div>
              </div>
              <div className="flex-1 space-y-3 text-center">
                <h3 className="text-xl font-display font-bold text-on-surface">Gelisim Gorsellestirmesi</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed italic">
                  Bebeginiz {getSizeComparison(week).toLowerCase()} buyuklugunde ve her gun buyumeye devam ediyor.
                </p>
                <div className="flex gap-2 pt-2 justify-center">
                  <div className="h-1.5 w-16 rounded-full" style={{ background: 'var(--color-primary)' }} />
                  <div className="h-1.5 w-16 rounded-full bg-surface-highest" />
                  <div className="h-1.5 w-16 rounded-full bg-surface-highest" />
                </div>
              </div>
            </div>
            {/* Decorative ring */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 border-[32px] border-primary/5 rounded-full" />
          </motion.section>
        )}

        {/* ── Section 3b: Dreaming Hero ── */}
        {segment === 'dreaming' && (
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative overflow-hidden rounded-xl p-6 text-white"
            style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dim))' }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span className="material-symbols-outlined text-6xl text-on-secondary">favorite</span>
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
                Hemen Kesfet <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </motion.section>
        )}

        {/* ── Section 4: Daily Tips Card ── */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="relative overflow-hidden group rounded-xl p-6 shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--color-secondary), var(--color-secondary-dim))' }}
          >
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <span className="material-symbols-outlined text-6xl text-on-secondary">lightbulb</span>
            </div>
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg">
                <span className="text-[10px] font-display font-bold text-white uppercase">Gunun Ipucu</span>
              </div>
              <h3 className="text-lg font-display font-bold text-white leading-tight">
                {segment === 'expecting' ? 'Hidrasyon Enerji Icin Anahtar'
                  : segment === 'dreaming' ? 'Birlikte Hayal Kurun'
                  : segment === 'newparent' ? 'Goz Temasi Kurun'
                  : 'Folik Asit Takviyesi'}
              </h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {segment === 'expecting'
                  ? 'Gunde en az 8 bardak su icmeyi unutmayin. Hidrasyon hem sizin hem bebeginiz icin cok onemli.'
                  : segment === 'dreaming'
                  ? 'Birlikte hayal kurmak iliskinizi guclendirir. Bu aksam bebek isimleri hakkinda sohbet edin.'
                  : segment === 'newparent'
                  ? 'Bebeginizle goz temasi kurun — bu onun sosyal gelisimi icin harika bir egzersiz.'
                  : 'Folik asit takviyesine hamilelikten 3 ay once baslamak ideal.'}
              </p>
              <button className="mt-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-full transition-all flex items-center gap-2">
                Devamini Oku <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* ── Section 5: Feature Grid Cards ── */}
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
                  <span className="material-symbols-outlined">{card.icon}</span>
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
              <span className="material-symbols-outlined text-white">workspace_premium</span>
              <h3 className="font-display font-semibold text-[16px]">Premium Uyelik</h3>
            </div>
            <p className="text-white/75 text-[12px] leading-relaxed">
              Sinirsiz AI ozellik, oncelikli destek ve reklamsiz deneyim
            </p>
            <button className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full text-[13px] font-semibold transition-all border border-white/20 flex items-center gap-2">
              Detaylari Gor <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </motion.section>

      </div>
    </MobileLayout>
  )
}
