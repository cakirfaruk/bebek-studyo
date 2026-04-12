import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { babyMilestones } from '@/data/baby-guide'

const DOCTOR_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCwsv2yk3y9SgI4Xkx8X-F5CcQ9B0bpPk_iblmU9vT9NDl_h7RmRCBbUDEHsCaKKAi3MPRsBJWpw2OUBrcvvAiQuCBTpVJ4zmu-2B94r1HyaOs4ZPph-DTQYbCOeE4TExG1RW4ZSRTkmS8dgBGnKbj-eniSUkte4by9nhpmQ7uOzA5tkJiy5qxj9JeKhsC_FjCRFJLBUnZN1uAoVQmxPXMcWQDCSX_EZFCYDekq6t2wBD-oKre0MeClLmMSXeBth6lA0tQnBM4-Jek"
const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuC2ThqD-K9Atz-O9oxmPBTV30Hu0BXi2b85ftfg5Ow6v_Kj_voc6s8H-oMk4FApLoQ5De7xj5MBElTNGdibxxEj9SFaSSo6WSYF475uH9pBGODUYhSCEYzbqN21_AViLS9gu7VwyfrUGUupCCrvSxNB66vZI8ev1YTfRUuH667rnfdYx-ibkh8Dx1SRsWhARHyfH5Oga5tdTfr5qoYeP59DVFbq__PmsMRdVlTqg7GIioCBuQUrQ_GMSzuErsB5_wPaH2fmomrfeTg"

export default function BabyGuide() {
  const [selectedMonth, setSelectedMonth] = useState<number>(3)
  const milestone = babyMilestones.find((m) => m.month === selectedMonth)

  // Array of available months (0-12)
  const availableMonths = Array.from({ length: 13 }, (_, i) => i)

  return (
    <MobileLayout title="Bebek Rehberi" showBack>
      <div className="space-y-8 pb-6 mt-4">
        
        {/* Month Selector */}
        <section className="overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
          <div className="flex gap-3">
            {availableMonths.map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-headline font-bold text-sm transition-all duration-300 ${
                  selectedMonth === month
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30 scale-105'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {month === 0 ? 'Yenidoğan' : `${month}. Ay`}
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence mode="wait">
          {milestone && (
            <motion.div
              key={selectedMonth}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Main Development Card */}
              <section className="relative mt-4">
                <div className="bg-gradient-to-br from-primary-container to-secondary-container rounded-2xl p-8 overflow-hidden relative group shadow-card border border-white/50">
                  {/* Asymmetric 3D Illustration */}
                  <div className="absolute -right-6 -top-6 w-48 h-48 opacity-95 group-hover:scale-105 transition-transform duration-700">
                    <img 
                      className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/40" 
                      src={HERO_IMAGE} 
                      alt="Milestone highlight" 
                    />
                  </div>
                  
                  <div className="relative z-10 max-w-[60%]">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-on-primary-container mb-4 shadow-sm">
                      Bu Ayki Gelişim
                    </span>
                    <h2 className="font-headline font-extrabold text-3xl md:text-4xl text-on-primary-container leading-tight mb-4 drop-shadow-sm">
                      {milestone.title}
                    </h2>
                    <p className="text-on-primary-container/90 text-sm font-medium leading-relaxed font-body">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </section>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Beslenme Rehberi */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border border-white/50">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                      <span aria-hidden="true" className="material-symbols-outlined text-primary text-3xl">sanitizer</span>
                    </div>
                    <h3 className="font-headline font-bold text-xl text-on-surface mb-3">Beslenme Rehberi</h3>
                    <ul className="space-y-2">
                      {milestone.feedingTips.slice(0, 2).map((tip, i) => (
                        <li key={i} className="text-on-surface-variant text-[13px] leading-relaxed flex items-start gap-2 font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 shadow-sm" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-outline-variant/10">
                    <div className="flex -space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary-container border-2 border-white flex items-center justify-center shadow-sm z-10">
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-on-primary-container">breastfeeding</span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-secondary-container border-2 border-white flex items-center justify-center shadow-sm">
                        <span aria-hidden="true" className="material-symbols-outlined text-[18px] text-on-secondary-container">child_care</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-primary uppercase tracking-widest hover:underline cursor-pointer transition-all">Tüm İpuçlarını Gör</span>
                  </div>
                </div>

                {/* Uyku Düzeni */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 flex flex-col justify-between group hover:shadow-xl hover:shadow-secondary/10 transition-all duration-300 border border-white/50">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                      <span aria-hidden="true" className="material-symbols-outlined text-secondary text-3xl">bedtime</span>
                    </div>
                    <h3 className="font-headline font-bold text-xl text-on-surface mb-3">Uyku Düzeni</h3>
                    <p className="text-on-surface-variant text-[13px] leading-relaxed font-body">
                      {milestone.sleepInfo}
                    </p>
                  </div>
                  <div className="mt-6 bg-secondary-container/30 rounded-xl p-4 flex items-center justify-between border border-secondary/10">
                    <div className="flex items-center gap-3">
                      <span aria-hidden="true" className="material-symbols-outlined text-secondary text-xl">schedule</span>
                      <span className="text-[13px] font-bold text-on-secondary-container tracking-wide">14-16 Saat</span>
                    </div>
                    <span aria-hidden="true" className="material-symbols-outlined text-secondary text-xl opacity-70">trending_up</span>
                  </div>
                </div>

                {/* Oyun ve Aktivite (Large Horizontal) */}
                <div className="md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 relative overflow-hidden group hover:shadow-xl hover:shadow-tertiary/10 transition-shadow duration-300 border border-white/50">
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-tertiary/10 to-tertiary/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                      <span aria-hidden="true" className="material-symbols-outlined text-tertiary text-4xl">extension</span>
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-headline font-bold text-2xl text-on-surface mb-3">Oyun ve Aktivite</h3>
                      <ul className="space-y-2 max-w-lg">
                        {milestone.funActivities.slice(0, 2).map((activity, i) => (
                          <li key={i} className="text-on-surface-variant text-sm flex items-start gap-2.5 font-body">
                            <span className="w-1.5 h-1.5 rounded-full bg-tertiary mt-2.5 shrink-0 shadow-sm" />
                            <span className="leading-relaxed">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="bg-tertiary text-white px-8 py-4 rounded-full font-headline font-bold text-[11px] uppercase tracking-widest self-start md:self-center shadow-lg shadow-tertiary/30 hover:-translate-y-1 transition-transform">
                      Egzersizleri Keşfet
                    </button>
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-tertiary/10 rounded-full blur-3xl z-0" />
                </div>

                {/* Uzman Tavsiyesi */}
                <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 shadow-2xl relative overflow-hidden border border-slate-700">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-primary-fixed overflow-hidden flex-shrink-0 shadow-lg">
                      <img 
                        className="w-full h-full object-cover" 
                        src={DOCTOR_IMAGE}
                        alt="Pediatrician expert" 
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-white font-headline font-bold text-base md:text-lg">Dr. Selen Yılmaz</h4>
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary-fixed text-[9px] font-extrabold uppercase tracking-widest border border-primary/30">Pediatrist</span>
                      </div>
                      <p className="text-slate-300 text-sm italic leading-relaxed font-body pr-4">
                        "Bu ayda bebeğinizin ellerini keşfetmesine izin verin. Parmak emmesi bir açlık belirtisi değil, bir rahatlama ve keşif yöntemidir."
                      </p>
                    </div>
                  </div>
                  <span aria-hidden="true" className="material-symbols-outlined text-[120px] absolute -bottom-6 -right-6 text-primary-fixed opacity-5 rotate-12 z-0 pointer-events-none">format_quote</span>
                </div>
              </div>

              {/* Growth Tracker Preview */}
              <section className="bg-white/50 backdrop-blur border border-outline-variant/20 rounded-2xl p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline font-bold text-xl text-on-surface">Boy & Kilo Takibi</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest bg-surface-container-low px-3 py-1 rounded-full">Normal Sınırlar</span>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2 font-body">
                      <span className="text-on-surface-variant">Kilo (kg)</span>
                      <span className="text-primary text-sm">6.2 kg</span>
                    </div>
                    <div className="h-2.5 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full relative w-[65%] shadow-sm">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border-2 border-primary/20" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2 font-body">
                      <span className="text-on-surface-variant">Boy (cm)</span>
                      <span className="text-secondary text-sm">61 cm</span>
                    </div>
                    <div className="h-2.5 w-full bg-surface-container-highest rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-gradient-to-r from-secondary to-secondary-container rounded-full relative w-[72%] shadow-sm">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow border-2 border-secondary/20" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Detailed Lists: Physical, Cognitive, Social */}
              <div className="space-y-5">
                {/* Fiziksel Gelişim */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-white/50">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <span aria-hidden="true" className="material-symbols-outlined text-primary text-xl">accessibility_new</span>
                    </div>
                    <h3 className="font-headline font-bold text-on-surface text-lg">Fiziksel Gelişim</h3>
                  </div>
                  <ul className="space-y-3">
                    {milestone.physicalDevelopment.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 shadow-sm" />
                        <span className="text-[13px] text-on-surface-variant font-body leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bilişsel Gelişim */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 group hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 border border-white/50">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
                      <span aria-hidden="true" className="material-symbols-outlined text-secondary text-xl">psychology</span>
                    </div>
                    <h3 className="font-headline font-bold text-on-surface text-lg">Bilişsel Gelişim</h3>
                  </div>
                  <ul className="space-y-3">
                    {milestone.cognitiveDevelopment.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-secondary mt-2 shrink-0 shadow-sm" />
                        <span className="text-[13px] text-on-surface-variant font-body leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sosyal Gelişim */}
                <div className="bg-surface-container-lowest rounded-2xl p-6 group hover:shadow-xl hover:shadow-tertiary/5 transition-all duration-300 border border-white/50">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-tertiary/10 flex items-center justify-center">
                      <span aria-hidden="true" className="material-symbols-outlined text-tertiary text-xl">diversity_1</span>
                    </div>
                    <h3 className="font-headline font-bold text-on-surface text-lg">Sosyal Gelişim</h3>
                  </div>
                  <ul className="space-y-3">
                    {milestone.socialDevelopment.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-2 h-2 rounded-full bg-tertiary mt-2 shrink-0 shadow-sm" />
                        <span className="text-[13px] text-on-surface-variant font-body leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Dikkat Edilmesi Gerekenler */}
                {milestone.warningSign.length > 0 && (
                  <div className="bg-error-container/10 border-2 border-error-container/20 rounded-2xl p-8 my-6">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-error-container/30 flex items-center justify-center">
                        <span aria-hidden="true" className="material-symbols-outlined text-error text-xl">error</span>
                      </div>
                      <h3 className="font-headline font-bold text-error text-lg">Dikkat Edilmesi Gerekenler</h3>
                    </div>
                    <ul className="space-y-3">
                      {milestone.warningSign.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-2 h-2 rounded-full bg-error mt-2 shrink-0 shadow-sm" />
                          <span className="text-[13px] text-error font-body leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 pt-4 border-t border-error/20 flex gap-2 items-center">
                      <span aria-hidden="true" className="material-symbols-outlined text-error/80 text-sm">info</span>
                      <p className="text-[11px] text-error/80 font-bold font-body">Bu belirtiler kesin sorun anlamına gelmez, doktorunuzla paylaşın.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileLayout>
  )
}
