import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

const ageChips = ['1 Yaş', '2 Yaş', '3 Yaş', '4 Yaş', '5 Yaş', '6 Yaş']

export default function ChildGuide() {
  const [selectedAge, setSelectedAge] = useState(0)

  return (
    <MobileLayout title="Çocuk Rehberi (1-6 Yaş)" showBack>
      {/* Year Selector */}
      <section className="mb-8">
        <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-2 px-2">
          {ageChips.map((chip, i) => (
            <button
              key={chip}
              onClick={() => setSelectedAge(i)}
              className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all ${
                selectedAge === i
                  ? 'bg-secondary text-on-secondary shadow-lg shadow-secondary/20'
                  : 'bg-white text-on-surface-variant font-semibold hover:bg-secondary-container'
              }`}
            >
              {chip}
            </button>
          ))}
        </div>
      </section>

      {/* Growth Milestone Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary-container/30 to-secondary-container/30 p-8 shadow-[0_32px_64px_-16px_rgba(104,52,235,0.1)] mb-10"
      >
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative z-10 flex flex-col gap-8 items-center">
          <div className="flex-1 space-y-4">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 text-primary font-bold text-xs tracking-wider uppercase">
              Gelişim Odaklı
            </span>
            <h2 className="font-headline text-3xl font-extrabold text-on-background leading-tight">
              Küçük Keşifler Başlıyor!
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-lg">
              Birinci yaş, çocuğunuzun dünyayı kendi ayakları üzerinde keşfetmeye başladığı mucizevi bir dönemdir.
              Sosyalleşme, basit kelimeler ve bağımsız hareketler bu dönemin anahtarıdır.
            </p>
            <button className="bg-secondary text-on-secondary px-6 py-3 rounded-full font-bold shadow-xl shadow-secondary/30 active:scale-95 transition-transform">
              Detayları Gör
            </button>
          </div>
          <div className="w-full flex justify-center">
            <div className="relative group">
              <div className="w-56 h-56 bg-gradient-to-br from-primary-container to-secondary-container rounded-xl shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                <span className="text-[80px]">👶</span>
              </div>
              <div className="absolute -bottom-4 -left-4 glass-card p-4 rounded-lg shadow-lg">
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  child_care
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Education & Play Guide */}
      <section className="space-y-6 mb-10">
        <div className="flex justify-between items-end">
          <h3 className="font-headline text-2xl font-bold text-on-background">Eğitim &amp; Oyun Rehberi</h3>
          <span className="text-secondary font-bold text-sm">Tümünü Gör</span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {/* Play Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="group relative overflow-hidden bg-surface-container-lowest p-8 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col h-full justify-between gap-6">
              <div className="flex justify-between items-start">
                <div className="p-3 bg-tertiary-container/20 rounded-2xl">
                  <span className="material-symbols-outlined text-tertiary text-4xl">school</span>
                </div>
                <span className="text-on-surface-variant font-medium text-sm">Popüler</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-headline text-xl font-bold text-on-background">Kreş Hazırlığı</h4>
                <p className="text-on-surface-variant text-sm">
                  Ayrılık kaygısını yönetmek ve sosyal hayata ilk adımlar için ipuçları.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Play Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary-container/20 p-8 rounded-lg flex flex-col items-center text-center justify-center gap-4 border border-white/40"
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-primary text-3xl">brush</span>
            </div>
            <h4 className="font-headline font-bold text-on-background">Yaratıcı Oyunlar</h4>
            <p className="text-xs text-on-surface-variant">Parmak boyama ve duyusal oyun aktiviteleri.</p>
          </motion.div>
        </div>
      </section>

      {/* Social & Nutrition Grid */}
      <section className="grid grid-cols-1 gap-8 mb-10">
        {/* Social Development */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-secondary-container/10 p-8 rounded-lg space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-[80px]">groups</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined">favorite</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-background">Sosyal Beceriler</h3>
          </div>
          <p className="text-on-surface-variant leading-relaxed">
            Paylaşmayı öğrenme, empati gelişimi ve akran zorbalığı gibi konuları kapsayan rehberimizi keşfedin.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-secondary-dim">EMPATİ</span>
            <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-secondary-dim">PAYLAŞMA</span>
            <span className="px-3 py-1 bg-white rounded-full text-[10px] font-bold text-secondary-dim">OYUN GRUBU</span>
          </div>
        </motion.div>

        {/* Nutrition */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface-container-low p-8 rounded-lg space-y-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined">restaurant</span>
            </div>
            <h3 className="font-headline text-xl font-bold text-on-background">Beslenme Düzeni</h3>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg flex items-center gap-4 shadow-sm">
              <span className="material-symbols-outlined text-error">warning</span>
              <div className="flex-1">
                <h5 className="text-sm font-bold">Seçici Yemek Yeme</h5>
                <p className="text-xs text-on-surface-variant">Sebze sevmeyen çocuklar için çözüm önerileri.</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </div>
            <div className="bg-white p-4 rounded-lg flex items-center gap-4 shadow-sm">
              <span className="material-symbols-outlined text-primary">nutrition</span>
              <div className="flex-1">
                <h5 className="text-sm font-bold">Günlük Vitamin İhtiyacı</h5>
                <p className="text-xs text-on-surface-variant">Büyüme dönemindeki kritik besinler.</p>
              </div>
              <span className="material-symbols-outlined text-outline-variant">chevron_right</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Expert Advice */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-surface-container-lowest p-8 rounded-xl relative border border-secondary-container/20 mb-10"
      >
        <div className="absolute -top-4 left-10 bg-secondary px-4 py-1 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
          Uzman Görüşü
        </div>
        <div className="flex flex-col gap-6 items-center pt-4">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-container to-primary-container flex items-center justify-center border-4 border-secondary-container/30">
            <span className="text-4xl">👩‍⚕️</span>
          </div>
          <div className="flex-1 text-center">
            <p className="text-lg font-medium italic text-on-surface leading-relaxed">
              &ldquo;1-3 yaş arası öfke nöbetleri aslında çocuğun duygularını yönetme çabasıdır. Onu cezalandırmak
              yerine, duygusunu isimlendirerek sakinleşmesine yardımcı olun.&rdquo;
            </p>
            <div className="mt-4">
              <h4 className="font-bold text-on-background">Dr. Selin Demir</h4>
              <p className="text-sm text-on-surface-variant">Çocuk ve Ergen Psikoloğu</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Physical Activity Tracker */}
      <section className="bg-gradient-to-r from-secondary-dim to-secondary p-8 rounded-lg shadow-2xl text-white mb-4">
        <div className="flex flex-col gap-8 items-center">
          <div className="space-y-2 text-center">
            <h3 className="font-headline text-2xl font-bold">Günlük Hareket Hedefi</h3>
            <p className="text-secondary-fixed/80 text-sm">Bugün 120 dakikalık aktif oyun süresi hedefleniyor.</p>
          </div>
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                className="text-white/20"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                stroke="currentColor"
                strokeWidth="8"
              />
              <circle
                className="text-white"
                cx="64"
                cy="64"
                fill="transparent"
                r="58"
                stroke="currentColor"
                strokeDasharray="364.4"
                strokeDashoffset="109.3"
                strokeLinecap="round"
                strokeWidth="10"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black">70%</span>
              <span className="text-[8px] font-bold uppercase tracking-widest opacity-70">Tamamlandı</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="bg-white/10 px-4 py-3 rounded-2xl text-center">
              <span className="block text-xl font-bold">84 dk</span>
              <span className="text-[10px] uppercase opacity-70">Açık Hava</span>
            </div>
            <div className="bg-white/10 px-4 py-3 rounded-2xl text-center">
              <span className="block text-xl font-bold">36 dk</span>
              <span className="text-[10px] uppercase opacity-70">Ev İçi Oyun</span>
            </div>
          </div>
        </div>
      </section>
    </MobileLayout>
  )
}
