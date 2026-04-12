import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

interface GiftItem {
  id: string
  name: string
  description: string
  price: string
  image: string
  gifted: boolean
  giftedBy?: string
  tag?: string
  className?: string
}

const giftItems: GiftItem[] = [
  {
    id: '1',
    name: 'Seyahat Sistemi Bebek Arabası',
    description: 'Luna ile yapacağımız tüm maceralar için hayalimizdeki bebek arabası. Arazi tekerlekleri ve organik pamuklu kumaşlar.',
    price: '₺28.999',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdqF-yNDWRIlGV1AnYcaLLSES04AbIrEPHV8ujEoDA8ggtsFbwYH-_gRd_B8SzrQsnLr_B81G55TX49J8I29BTJaN8ijR_tpN_CJLSwj__JmErO2ZHxbP82HbtHYfo2uIDtN36ZCdpusvzhvkJ8-ITVcUygbemRIeo7g-5imTDeBpH09d9XrU2SUAaCs8pA9BJNBpvVHSwE8tC9voYKHAgBvLQjtHWa0Dv9IrHYP5kqSmIcmL4sNRhecQh9Wil_-NKcUXumX4N-dM',
    gifted: false,
    tag: 'En Çok İstenen',
    className: 'md:col-span-2 md:row-span-2',
  },
  {
    id: '2',
    name: 'Organik Pamuk Zıbın Seti',
    description: "Luna'nın ilk ayları için temel konfor.",
    price: '₺1.450',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDD6SXfpjGDC7Y1kJWal6gHYzVCvqgbS30QT_tw84BXt_POKGLNmJBBY9mrep64qUT1OeYZhst9koLQQ78Nl9sa1a0rd2dAEBjJyVqTpgr-WGLL899hDXZzxV0NdcFJvXZKkQ0Rmdi_GkwRlN1PR3Z28pAJDWI9uQaE2X34dSSaoUIcD04V1eOsoTuhO0WqK9_hMqfH6Owq13JGGPXJ2LetvBpuKrgyZBo4-VM4ZQ4If9iqreQuvB6fIkKHR_0s7SYdaRszY9Ug8k',
    gifted: false,
  },
  {
    id: '3',
    name: 'Ethereal Dönence Mobil',
    description: 'Bebek odasına güzel ve sakinleştirici bir dokunuş.',
    price: '₺3.850',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHIeCcSug5yRv_L2ZSACr_3LDdi4yyBcqVYqYFFhybnOKvwyLALCk28_vcT26LPIpv4EoJfmnhiS2lFx9Ay8G4d2_iISCd2JeAHJcniof8psSlMD3F6VkF6RTx4RMyOeju2R3e5Nv9IqeM4poFmjZetdzJYsfhSUqbPjUOuSI2nXMH0ZotIk_qMkVQv8QmUB2Yg0H9_q_UJpUPwh7_Y4jy6Y25JOqy4XhLR5_DNWFZvPUz4ylkHrkbitMVw2MUV8vl8mLSkYaCrRc',
    gifted: true,
    giftedBy: 'Ayşe H.',
  },
  {
    id: '4',
    name: 'Montessori Başlangıç Seti',
    description: 'Erken gelişim için sürdürülebilir ahşap oyuncaklar.',
    price: '₺5.300',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6PvPTkeX1vUH7p-SjS3LaDuQDPPQgsMVO985gVXL0H3T5q4gNZeHCiHjB-x13iSW97rS5Iiw5ibw6DVVjI_IH5Q3GNWYWq7x7DuShkeSwAuwexTyHcHUnynX5IT_9ViYDXMLP_H9cGeJs6kZw7931RFyNh8_YDYwahmf2HNTb2ycJatIEcszpOeTvEw_9JBeCBzCfoto0UrVKjqswl-eZwPM1jAtplfUNHvKtQ6xsJsHqGWr85WeEu1NrSZ_TJDq1aIcrpXzYA3s',
    gifted: false,
    className: 'md:col-span-1',
  },
  {
    id: '5',
    name: 'Emzirme Koltuğu',
    description: 'Gece geç saatlerdeki kucaklaşmalar için.',
    price: '₺14.500',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZcNOlw9TwnBdaQr9goWjSpj5KvpeAuyeWay-jAGUM2l854YqMRDQUWlqJWHXNgHwE9rpseP4VcOPAKowt3eKE3TYew62nMsnePnDqvm60yiIETFFxkv2uJTsODNM3TvRNcH7lpudCLc_-UFi2pVbPRBdWGn1MB-WXOlzrd1cmLTz-Gtpb_oY99TGE0yJY3UAJXhrZcwJNRdW9606hfVariyQsr1kV235alBN3WRtKjKKK195T9t6kGsMGkpjhAWUNCsHLLg2MII',
    gifted: false,
  },
  {
    id: '6',
    name: 'Cam Biberon Seti',
    description: 'Sürdürülebilir ve güvenli beslenme seti.',
    price: '₺2.750',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwd482tp4A2psX2HPKpP7THQusSDAoouhzRF836r9x4GTRpJmQyOm-L24SxD-m1kPXLEX57GS5AWtxYw3uaPrSR0VpfkEH694Egb1_h-YxtrAUtv1mznQ813RZtRjeYRcbZyKcgkxm2SQZ4G58BiIjxh1-fXsk9F1W_yCz8A1xBvdWwhRVbQyOsoX_eq-GywP_JBxcLffZZihLpoH5y-FBJFGbcHllUXi0vt-BHdrbCBGci57gWmxyhTqHCXaAPpkhoZWFYKVqbgs',
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
      <section className="mb-10 relative mt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label text-xs font-bold uppercase tracking-widest mb-4">
              Bebek Listesi
            </span>
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-on-surface leading-tight mb-4">
              Hoş Geldin <span className="text-primary italic">Bebek Luna</span>
            </h1>
            <p className="text-on-surface-variant max-w-md text-lg leading-relaxed">
              Minik bebeğimizi karşılamak için çok heyecanlıyız! Yolculuğumuzun bir parçası olduğunuz için teşekkürler.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end">
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
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
                  className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-surface-container-lowest rounded-full mr-1 shadow-sm"></div>
                </motion.div>
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

      {/* Gift List Grid */}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => {
            const isFirst = index === 0

            if (isFirst) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${item.className || ''} group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col`}
                >
                  <div className="relative h-[280px] md:h-[400px] overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} alt={item.name} />
                    {item.tag && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary text-on-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{item.tag}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-headline text-2xl font-bold text-on-surface">{item.name}</h3>
                        <span className="font-headline text-xl font-bold text-on-surface-variant">{item.price}</span>
                      </div>
                      <p className="text-on-surface-variant mb-8 max-w-md">{item.description}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        <span className="text-sm font-semibold text-on-surface-variant">Hâlâ gerekli</span>
                      </div>
                      <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-headline font-bold shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all">
                        Hediye Et
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className={item.gifted 
                  ? `${item.className || ''} group relative bg-surface-container-low rounded-lg overflow-hidden border border-outline-variant/10 shadow-sm`
                  : `${item.className || ''} group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col`
                }
              >
                <div className={`relative ${item.gifted ? 'h-48 md:h-64 grayscale opacity-60' : 'h-48 md:h-64'} overflow-hidden`}>
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={item.image} alt={item.name} />
                  {!item.gifted && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center shadow-lg">
                        <span className="material-symbols-outlined">shopping_bag</span>
                      </div>
                    </div>
                  )}
                  {item.gifted && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="bg-white/90 backdrop-blur text-secondary px-4 py-2 rounded-full font-headline font-bold text-sm shadow-sm">
                        {item.giftedBy} tarafından alındı
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-headline text-lg font-bold mb-1 ${item.gifted ? 'text-on-surface-variant' : 'text-on-surface'}`}>{item.name}</h3>
                    <p className={`text-sm mb-6 ${item.gifted ? 'text-on-surface-variant/70' : 'text-on-surface-variant'}`}>{item.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className={`font-headline font-bold ${item.gifted ? 'text-on-surface-variant/60' : 'text-on-surface'}`}>{item.price}</span>
                    {item.gifted ? (
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    ) : (
                      <button className="text-primary font-bold text-sm hover:underline hover:text-primary-dim transition-colors">Hediye Et</button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-secondary/10 to-primary/10 rounded-lg p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-3xl -mr-32 -mt-32 rounded-full" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-headline text-3xl font-bold text-on-surface mb-6">Aradığınızı bulamadınız mı?</h2>
            <p className="text-on-surface-variant text-lg mb-10">
              Büyük eşyalar için "Hayal Fonu"na katkı sağlamaları için arkadaşlarınızı davet edin veya dilediğiniz çevrimiçi mağazadan favori ürünlerinizi ekleyin.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-on-surface text-surface-bright px-8 py-4 rounded-full font-headline font-bold hover:bg-on-surface/80 transition-all">
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
