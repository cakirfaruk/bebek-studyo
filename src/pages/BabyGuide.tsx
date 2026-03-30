import { useState } from 'react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { babyMilestones } from '@/data/baby-guide'

export default function BabyGuide() {
  const [selectedMonth, setSelectedMonth] = useState<number>(3)
  const milestone = babyMilestones.find((m) => m.month === selectedMonth)

  return (
    <MobileLayout title="Bebek Rehberi" showBack>
      <div className="space-y-8 pb-6">
        {/* Month Selector */}
        <section className="overflow-x-auto no-scrollbar py-2">
          <div className="flex gap-3 px-2">
            {babyMilestones.map((m) => (
              <button
                key={m.month}
                onClick={() => setSelectedMonth(m.month)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-display font-bold text-sm transition-colors ${
                  selectedMonth === m.month
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/20'
                    : 'bg-surface-container-low text-on-surface-variant font-semibold hover:bg-surface-container-high'
                }`}
              >
                {m.month === 0 ? 'Yenidoğan' : `${m.month}. Ay`}
              </button>
            ))}
          </div>
        </section>

        {/* Main Development Card */}
        {milestone && (
          <section className="relative">
            <div className="bg-gradient-to-br from-primary-container to-secondary-container rounded-lg p-8 overflow-hidden relative group">
              {/* Decorative emoji */}
              <div className="absolute -right-4 -top-4 w-48 h-48 opacity-90 group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                <span className="text-8xl">👶</span>
              </div>
              <div className="relative z-10 max-w-[65%]">
                <span className="inline-block px-3 py-1 rounded-full bg-white/40 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-on-primary-container mb-3">Bu Ayki Gelişim</span>
                <h2 className="font-display font-extrabold text-3xl text-on-primary-container leading-tight mb-4">{milestone.title}</h2>
                <p className="text-on-primary-container/80 text-sm font-medium leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Bento Grid */}
        {milestone && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Beslenme Rehberi */}
            <div className="bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-primary">sanitizer</span>
                </div>
                <h3 className="font-display font-bold text-lg text-on-surface mb-2">Beslenme Rehberi</h3>
                <ul className="space-y-1.5">
                  {milestone.feedingTips.slice(0, 2).map((tip, i) => (
                    <li key={i} className="text-on-surface-variant text-xs leading-relaxed flex items-start gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container border-2 border-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-on-primary-container">breastfeeding</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[14px] text-on-secondary-container">child_care</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">İpuçlarını Gör</span>
              </div>
            </div>

            {/* Uyku Düzeni */}
            <div className="bg-surface-container-lowest rounded-lg p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-secondary">bedtime</span>
                </div>
                <h3 className="font-display font-bold text-lg text-on-surface mb-2">Uyku Düzeni</h3>
                <p className="text-on-surface-variant text-xs leading-relaxed">
                  {milestone.sleepInfo}
                </p>
              </div>
              <div className="mt-6 bg-secondary-container/30 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-sm">schedule</span>
                  <span className="text-xs font-bold text-on-secondary-container">14-16 Saat</span>
                </div>
                <span className="material-symbols-outlined text-secondary text-sm">trending_up</span>
              </div>
            </div>

            {/* Oyun ve Aktivite (Large Horizontal) */}
            <div className="md:col-span-2 bg-surface-container-lowest rounded-lg p-6 relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-16 h-16 rounded-3xl bg-tertiary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-3xl">extension</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-display font-bold text-xl text-on-surface mb-2">Oyun ve Aktivite</h3>
                  <ul className="space-y-1.5 max-w-md">
                    {milestone.funActivities.slice(0, 2).map((activity, i) => (
                      <li key={i} className="text-on-surface-variant text-sm flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-tertiary mt-2 shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="bg-tertiary text-white px-6 py-3 rounded-full font-display font-bold text-xs uppercase tracking-widest self-start md:self-center">Egzersizleri Keşfet</button>
              </div>
              {/* Decorative element */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-tertiary/5 rounded-full blur-2xl" />
            </div>

            {/* Uzman Tavsiyesi */}
            <div className="md:col-span-2 bg-gradient-to-r from-on-background to-slate-800 rounded-lg p-6 shadow-2xl relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-primary-fixed overflow-hidden flex-shrink-0 bg-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-primary-container">person</span>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white font-display font-bold text-sm">Dr. Selen Yılmaz</h4>
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary-fixed text-[8px] font-bold uppercase tracking-tighter">Pediatrist</span>
                  </div>
                  <p className="text-slate-300 text-xs italic leading-relaxed">
                    "Bu ayda bebeğinizin ellerini keşfetmesine izin verin. Parmak emmesi bir açlık belirtisi değil, bir rahatlama ve keşif yöntemidir."
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary-fixed opacity-50">format_quote</span>
              </div>
            </div>
          </div>
        )}

        {/* Growth Tracker Preview */}
        {milestone && (
          <section className="bg-white/40 border-outline-variant/10 border-2 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-on-surface">Boy & Kilo Takibi</h3>
              <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Normal Sınırlar</span>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-on-surface-variant">Kilo (kg)</span>
                  <span className="text-primary">6.2 kg</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full relative w-[65%]">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] font-bold mb-1">
                  <span className="text-on-surface-variant">Boy (cm)</span>
                  <span className="text-secondary">61 cm</span>
                </div>
                <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-secondary to-secondary-container rounded-full relative w-[72%]">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Physical Development */}
        {milestone && (
          <div className="space-y-4">
            {/* Fiziksel Gelişim */}
            <div className="bg-surface-container-lowest rounded-lg p-6 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary">child_care</span>
                </div>
                <h3 className="font-display font-bold text-on-surface">Fiziksel Gelişim</h3>
              </div>
              <ul className="space-y-2">
                {milestone.physicalDevelopment.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span className="text-sm text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bilişsel Gelişim */}
            <div className="bg-surface-container-lowest rounded-lg p-6 group hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-secondary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">psychology</span>
                </div>
                <h3 className="font-display font-bold text-on-surface">Bilişsel Gelişim</h3>
              </div>
              <ul className="space-y-2">
                {milestone.cognitiveDevelopment.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                    <span className="text-sm text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sosyal Gelişim */}
            <div className="bg-surface-container-lowest rounded-lg p-6 group hover:shadow-xl hover:shadow-tertiary/5 transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-tertiary/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-tertiary">favorite</span>
                </div>
                <h3 className="font-display font-bold text-on-surface">Sosyal Gelişim</h3>
              </div>
              <ul className="space-y-2">
                {milestone.socialDevelopment.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-1.5 shrink-0" />
                    <span className="text-sm text-on-surface-variant">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dikkat Edilmesi Gerekenler */}
            <div className="bg-error-container/10 border-2 border-error-container/20 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-error-container/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-error">warning</span>
                </div>
                <h3 className="font-display font-bold text-error">Dikkat Edilmesi Gerekenler</h3>
              </div>
              <ul className="space-y-2">
                {milestone.warningSign.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0" />
                    <span className="text-sm text-error-dim">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-on-surface-variant mt-3">Bu belirtiler endişelenmeniz gerektiği anlamına gelmez, ancak doktorunuzla paylaşın.</p>
            </div>
          </div>
        )}
      </div>
    </MobileLayout>
  )
}
