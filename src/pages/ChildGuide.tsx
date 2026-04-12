import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

const DOCTOR_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCwsv2yk3y9SgI4Xkx8X-F5CcQ9B0bpPk_iblmU9vT9NDl_h7RmRCBbUDEHsCaKKAi3MPRsBJWpw2OUBrcvvAiQuCBTpVJ4zmu-2B94r1HyaOs4ZPph-DTQYbCOeE4TExG1RW4ZSRTkmS8dgBGnKbj-eniSUkte4by9nhpmQ7uOzA5tkJiy5qxj9JeKhsC_FjCRFJLBUnZN1uAoVQmxPXMcWQDCSX_EZFCYDekq6t2wBD-oKre0MeClLmMSXeBth6lA0tQnBM4-Jek"
const HERO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuB37yUfzNNsoJ4riWHtuPcQzJlemYpyAOT5EHKQo_uahKAHTc_SMtL1oLrah0OCSE7I4YLfPZcuUQjJAfWCf9e0yDbUL1XNprsG06_8hh8DAbBCaRiYTmJAflfdhQ-FXRYWq37PtdF9nMpAmUreBloAVp_MnpNDIaqf-4gaFIu379YHqEFGt8Rh2yai_wBEFFrUIQZ87JqNpXoUMkTJaYBeoamBAPXAEXTQQf3UUSqN9BJa0AWw4etK1hPYwAdOBqUKvmZdiYho4r8" // Toy/Bag abstract
const ageChips = ['1 Yaş', '2 Yaş', '3 Yaş', '4 Yaş', '5 Yaş', '6 Yaş']

export default function ChildGuide() {
  const [selectedAge, setSelectedAge] = useState(0)

  return (
    <MobileLayout title="Çocuk Rehberi (1-6 Yaş)" showBack>
      <div className="space-y-8 pb-6 mt-4">
        
        {/* Year Selector */}
        <section className="overflow-x-auto no-scrollbar py-2 -mx-4 px-4">
          <div className="flex gap-3">
            {ageChips.map((chip, i) => (
              <button
                key={chip}
                onClick={() => setSelectedAge(i)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-headline font-bold text-sm transition-all duration-300 ${
                  selectedAge === i
                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30 scale-105'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>
        </section>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAge}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Growth Milestone Card */}
            <section className="relative mt-4">
              <div className="bg-gradient-to-br from-primary-container to-secondary-container rounded-2xl p-8 shadow-card border border-white/50 relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                
                {/* Asymmetric 3D Illustration */}
                <div className="absolute -right-8 -bottom-8 w-48 h-48 opacity-95 group-hover:scale-105 transition-transform duration-700">
                  <img 
                    className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/40" 
                    src={HERO_IMAGE} 
                    alt="Child milestone highlight" 
                  />
                </div>

                <div className="relative z-10 max-w-[65%] flex flex-col items-start min-h-[180px]">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-primary font-bold text-[10px] tracking-widest uppercase mb-4 shadow-sm">
                    Gelişim Odaklı
                  </span>
                  <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-on-background leading-tight mb-4 drop-shadow-sm">
                    Küçük Keşifler Başlıyor!
                  </h2>
                  <p className="text-on-surface-variant leading-relaxed text-[13px] font-body mb-6">
                    Birinci yaş, çocuğunuzun dünyayı kendi ayakları üzerinde keşfetmeye başladığı mucizevi bir dönemdir.
                    Sosyalleşme, basit kelimeler ve bağımsız hareketler bu dönemin anahtarıdır.
                  </p>
                  <button className="bg-secondary text-white px-8 py-3.5 rounded-full font-headline font-bold text-xs uppercase tracking-widest shadow-lg shadow-secondary/30 active:scale-95 transition-transform">
                    Detayları Gör
                  </button>
                </div>
              </div>
            </section>

            {/* Education & Play Guide */}
            <section className="space-y-5">
              <div className="flex justify-between items-end px-1">
                <h3 className="font-headline text-2xl font-bold text-on-background">Eğitim & Oyun Rehberi</h3>
                <span className="text-secondary font-bold text-[11px] uppercase tracking-widest cursor-pointer hover:underline">Tümünü Gör</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Play Card 1 */}
                <div className="group relative overflow-hidden bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-tertiary/10 transition-all duration-300 border border-white/50">
                  <div className="flex flex-col h-full justify-between gap-6">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center group-hover:bg-tertiary/20 transition-colors">
                        <span className="material-symbols-outlined text-tertiary text-2xl">school</span>
                      </div>
                      <span className="text-on-surface-variant font-bold text-[10px] uppercase tracking-widest bg-surface-container-low px-3 py-1 rounded-full">Popüler</span>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-headline text-lg font-bold text-on-background">Kreş Hazırlığı</h4>
                      <p className="text-on-surface-variant text-[13px] font-body leading-relaxed">
                        Ayrılık kaygısını yönetmek ve sosyal hayata ilk adımlar için ipuçları.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Play Card 2 */}
                <div className="bg-gradient-to-br from-primary-container/20 to-primary-container/40 p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 border border-white/60 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-primary text-3xl">brush</span>
                  </div>
                  <div>
                    <h4 className="font-headline text-lg font-bold text-on-background mb-1">Yaratıcı Oyunlar</h4>
                    <p className="text-[13px] text-on-surface-variant font-body">Parmak boyama ve duyusal oyun aktiviteleri.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Social & Nutrition Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Social Development */}
              <div className="bg-gradient-to-br from-secondary-container/10 to-secondary-container/30 p-8 rounded-2xl space-y-6 relative overflow-hidden border border-white/50 hover:shadow-lg hover:shadow-secondary/5 transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-5 transform rotate-12 pointer-events-none">
                  <span className="material-symbols-outlined text-[100px]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                </div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-background">Sosyal Beceriler</h3>
                </div>
                <p className="text-on-surface-variant leading-relaxed text-[13px] font-body relative z-10">
                  Paylaşmayı öğrenme, empati gelişimi ve akran zorbalığı gibi konuları kapsayan kapsamlı rehberimizi keşfedin.
                </p>
                <div className="flex gap-2 flex-wrap relative z-10">
                  {['Empati', 'Paylaşma', 'Oyun Grubu'].map(tag => (
                    <span key={tag} className="px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full text-[10px] font-extrabold uppercase tracking-widest text-secondary-dim border border-white">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Nutrition */}
              <div className="bg-surface-container-lowest p-8 rounded-2xl space-y-6 border border-white/50 shadow-sm hover:shadow-lg hover:shadow-tertiary/5 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-tertiary/10 rounded-2xl flex items-center justify-center text-tertiary">
                    <span className="material-symbols-outlined text-2xl text-tertiary">restaurant</span>
                  </div>
                  <h3 className="font-headline text-xl font-bold text-on-background">Beslenme Düzeni</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/5">
                    <div className="w-10 h-10 rounded-full bg-error-container/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-error text-lg">warning</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold font-headline text-on-surface">Seçici Yemek Yeme</h5>
                      <p className="text-[11px] text-on-surface-variant font-body mt-0.5">Sebze sevmeyen çocuklar için çözüm önerileri.</p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
                  </div>
                  <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 hover:bg-surface-container-high transition-colors cursor-pointer border border-outline-variant/5">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary text-lg">nutrition</span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold font-headline text-on-surface">Günlük Vitamin İhtiyacı</h5>
                      <p className="text-[11px] text-on-surface-variant font-body mt-0.5">Büyüme dönemindeki kritik besin destekleri.</p>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Expert Advice */}
            <section className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl relative border border-slate-700 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary px-6 py-2 rounded-bl-2xl text-white text-[10px] font-extrabold tracking-widest uppercase shadow-md">
                Uzman Görüşü
              </div>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pt-6 relative z-10">
                <div className="w-20 h-20 rounded-full border-2 border-primary-fixed overflow-hidden flex-shrink-0 shadow-lg">
                  <img 
                    className="w-full h-full object-cover" 
                    src={DOCTOR_IMAGE}
                    alt="Child Psychologist" 
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="text-sm md:text-base font-medium italic text-slate-300 leading-relaxed font-body">
                    &ldquo;1-3 yaş arası öfke nöbetleri aslında çocuğun duygularını yönetme çabasıdır. Onu cezalandırmak
                    yerine, duygusunu isimlendirerek sakinleşmesine yardımcı olun.&rdquo;
                  </p>
                  <div className="mt-5 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 justify-center md:justify-start">
                    <h4 className="font-bold font-headline text-white">Dr. Selin Demir</h4>
                    <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-primary/50"></span>
                    <p className="text-xs text-primary-fixed font-semibold uppercase tracking-widest">Çocuk Psikoloğu</p>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[100px] absolute -bottom-4 -left-4 text-primary-fixed opacity-5 rotate-12 z-0 pointer-events-none text-white">format_quote</span>
            </section>

            {/* Physical Activity Tracker */}
            <section className="bg-gradient-to-r from-secondary-dim to-secondary p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between relative z-10">
                <div className="space-y-3 text-center md:text-left flex-1 md:pr-8">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold uppercase tracking-widest text-white mb-1 backdrop-blur-sm">Aktivite Takibi</span>
                  <h3 className="font-headline text-2xl md:text-3xl font-bold leading-tight">Günlük Hareket Hedefi</h3>
                  <p className="text-secondary-fixed/90 text-[13px] font-body leading-relaxed">
                    Bugün 120 dakikalık aktif oyun süresi hedefleniyor. Çocuğunuzun fiziksel gelişimini desteklemek için bol bol hareket!
                  </p>
                </div>
                
                <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      className="text-white/20"
                      cx="72"
                      cy="72"
                      fill="transparent"
                      r="64"
                      stroke="currentColor"
                      strokeWidth="8"
                    />
                    <circle
                      className="text-white"
                      cx="72"
                      cy="72"
                      fill="transparent"
                      r="64"
                      stroke="currentColor"
                      strokeDasharray="402"
                      strokeDashoffset="120.6" // (402 * 0.3)
                      strokeLinecap="round"
                      strokeWidth="10"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black font-headline">70%</span>
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-80 mt-1">Tamamlandı</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-8 relative z-10 border-t border-white/20 pt-6">
                <div className="bg-white/10 px-4 py-4 rounded-xl text-center backdrop-blur-sm border border-white/10">
                  <span className="block text-2xl font-bold font-headline mb-1">84 dk</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-body">Açık Hava</span>
                </div>
                <div className="bg-white/10 px-4 py-4 rounded-xl text-center backdrop-blur-sm border border-white/10">
                  <span className="block text-2xl font-bold font-headline mb-1">36 dk</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-80 font-body">Ev İçi Oyun</span>
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>
    </MobileLayout>
  )
}
