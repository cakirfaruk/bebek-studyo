import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

interface GiftItem {
  id: string
  name: string
  description: string
  price: string
  emoji: string
  gifted: boolean
  giftedBy?: string
  tag?: string
}

const giftItems: GiftItem[] = [
  {
    id: '1',
    name: 'Seyahat Sistemi Bebek Arabası',
    description: 'Luna ile yapacağımız tüm maceralar için hayalimizdeki bebek arabası. Arazi tekerlekleri ve organik pamuklu kumaşlar.',
    price: '₺28.999',
    emoji: '🍼',
    gifted: false,
    tag: 'En Çok İstenen',
  },
  {
    id: '2',
    name: 'Organik Pamuk Zıbın Seti',
    description: "Luna'nın ilk ayları için temel konfor.",
    price: '₺1.450',
    emoji: '👶',
    gifted: false,
  },
  {
    id: '3',
    name: 'Dönence Mobil',
    description: 'Bebek odasına güzel bir dokunuş.',
    price: '₺3.850',
    emoji: '🌙',
    gifted: true,
    giftedBy: 'Ayşe H.',
  },
  {
    id: '4',
    name: 'Montessori Başlangıç Seti',
    description: 'Erken gelişim için sürdürülebilir ahşap oyuncaklar.',
    price: '₺5.300',
    emoji: '🧸',
    gifted: false,
  },
  {
    id: '5',
    name: 'Emzirme Koltuğu',
    description: 'Gece geç saatlerdeki kucaklaşmalar için.',
    price: '₺14.500',
    emoji: '🪑',
    gifted: false,
  },
  {
    id: '6',
    name: 'Cam Biberon Seti',
    description: 'Sürdürülebilir ve güvenli beslenme seti.',
    price: '₺2.750',
    emoji: '🍶',
    gifted: false,
  },
]

export default function GiftList() {
  const [items] = useState<GiftItem[]>(giftItems)

  const totalItems = items.length
  const giftedCount = items.filter((i) => i.gifted).length
  const progressPercent = Math.round((giftedCount / totalItems) * 100)
  const toGo = totalItems - giftedCount

  return (
    <MobileLayout title="Hediye Listesi" showBack>
      {/* Hero Section */}
      <section className="mb-10 relative">
        <div className="flex flex-col gap-6">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-bold uppercase tracking-widest mb-4">
              Bebek Listesi
            </span>
            <h1 className="text-4xl font-headline font-bold text-on-surface leading-tight mb-4">
              Hoş Geldin <span className="text-primary italic">Bebek Luna</span>
            </h1>
            <p className="text-on-surface-variant max-w-md text-lg leading-relaxed">
              Minik bebeğimizi karşılamak için çok heyecanlıyız! Yolculuğumuzun bir parçası olduğunuz için teşekkürler.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <button className="group flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 rounded-full font-headline font-bold shadow-lg shadow-secondary/20 hover:scale-105 active:scale-95 transition-all">
              <span className="material-symbols-outlined">share</span>
              Arkadaşlarla Paylaş
            </button>
          </div>
        </div>
      </section>

      {/* Progress Tracking Card */}
      <section className="mb-12">
        <div className="bg-surface-container-lowest rounded-lg p-8 shadow-[0_20px_50px_rgba(186,9,97,0.05)] border-outline-variant/10 border relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
          <div className="flex flex-col gap-8 relative z-10">
            <div className="flex-1">
              <div className="flex justify-between items-end mb-4">
                <h2 className="font-headline text-2xl font-bold text-on-surface">Liste Durumu</h2>
                <span className="font-headline font-bold text-primary text-xl tracking-tight">
                  {giftedCount} / {totalItems}{' '}
                  <span className="text-on-surface-variant text-sm font-normal">Hediye Alındı</span>
                </span>
              </div>
              <div className="h-4 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center justify-center bg-surface-container-low px-6 py-4 rounded-lg min-w-[100px]">
                <span className="text-3xl font-headline font-bold text-on-surface">{toGo}</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Kalan</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-primary-container/30 px-6 py-4 rounded-lg min-w-[100px]">
                <span className="text-3xl font-headline font-bold text-primary">{progressPercent}%</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-on-primary-container">Tamamlandı</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gift List */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline text-3xl font-bold text-on-surface">Hediye Listem</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
            <button className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low transition-colors">
              <span className="material-symbols-outlined">grid_view</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Featured large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-container/30 to-secondary-container/30 flex items-center justify-center">
              <span className="text-8xl">{items[0].emoji}</span>
              {items[0].tag && (
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    {items[0].tag}
                  </span>
                </div>
              )}
            </div>
            <div className="p-8 flex flex-col justify-between flex-1">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-2xl font-bold text-on-surface">{items[0].name}</h3>
                  <span className="font-headline text-xl font-bold text-on-surface-variant">{items[0].price}</span>
                </div>
                <p className="text-on-surface-variant mb-8 max-w-md">{items[0].description}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                  <span className="text-sm font-semibold text-on-surface-variant">Hâlâ gerekli</span>
                </div>
                <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-headline font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1 transition-all">
                  Hediye Et
                </button>
              </div>
            </div>
          </motion.div>

          {/* Remaining cards grid */}
          <div className="grid grid-cols-2 gap-4">
            {items.slice(1).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 1) * 0.08 }}
                className={`group relative rounded-lg overflow-hidden shadow-sm transition-all duration-500 flex flex-col ${
                  item.gifted
                    ? 'bg-surface-container-low border border-outline-variant/10'
                    : 'bg-white hover:shadow-xl'
                }`}
              >
                <div
                  className={`relative h-32 overflow-hidden flex items-center justify-center ${
                    item.gifted
                      ? 'grayscale opacity-60 bg-surface-container'
                      : 'bg-gradient-to-br from-primary-container/20 to-secondary-container/20'
                  }`}
                >
                  <span className="text-5xl">{item.emoji}</span>
                  {item.gifted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/80 backdrop-blur text-secondary px-4 py-2 rounded-full font-headline font-bold text-xs">
                        {item.giftedBy} tarafından alındı
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className={`font-headline text-sm font-bold mb-1 ${item.gifted ? 'text-on-surface-variant' : 'text-on-surface'}`}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-on-surface-variant mb-4 line-clamp-2">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`font-headline font-bold text-sm ${item.gifted ? 'text-on-surface-variant/60' : 'text-on-surface'}`}>
                      {item.price}
                    </span>
                    {item.gifted ? (
                      <span
                        className="material-symbols-outlined text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    ) : (
                      <button className="text-primary font-bold text-xs hover:underline">Hediye Et</button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-headline text-2xl font-bold text-on-surface mb-4">Aradığınızı bulamadınız mı?</h2>
            <p className="text-on-surface-variant text-base mb-8">
              Büyük ürünler için arkadaşlarınızı katkıda bulunmaya davet edin veya herhangi bir mağazadan kendi favorilerinizi ekleyin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-on-surface text-surface-bright px-8 py-4 rounded-full font-headline font-bold hover:bg-on-surface/90 transition-all">
                Yeni Ürün Ekle
              </button>
              <button className="bg-white text-on-surface px-8 py-4 rounded-full font-headline font-bold shadow-sm hover:shadow-md transition-all">
                Nakit Fon Oluştur
              </button>
            </div>
          </div>
        </div>
      </section>
    </MobileLayout>
  )
}
