import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useStore } from '@/stores/useStore'
import type { UserSegment } from '@/types'

const segments = [
  {
    id: 'expecting' as UserSegment,
    emoji: '🤰',
    title: 'Bebek Bekliyoruz',
    description: 'Hamilelik takibi, isim önerileri, bebek yüzü tahmini, kontrol listeleri ve rehberler',
    gradient: 'from-primary-400 to-rose-400',
    features: ['Haftalık gelişim takibi', 'AI bebek yüzü', 'Akıllı isim bulucu', 'Kontrol listeleri', 'Anı defteri'],
  },
  {
    id: 'dreaming' as UserSegment,
    emoji: '💑',
    title: 'Hayalini Kuruyoruz',
    description: 'Eğlenceli bebek yüzü tahmini, romantik isim keşfi ve geleceği planlama',
    gradient: 'from-lavender-400 to-secondary-400',
    features: ['AI bebek yüzü tahmini', 'Romantik isim keşfi', 'Hazır mıyız testi', 'Eğlenceli quizler'],
  },
  {
    id: 'newparent' as UserSegment,
    emoji: '👨‍👩‍👧',
    title: 'Yeni Ebeveyniz',
    description: '0-12 ay bebek gelişim rehberi, beslenme, uyku ve sağlık takibi',
    gradient: 'from-mint-400 to-sky-400',
    features: ['Aylık gelişim rehberi', 'Beslenme takibi', 'Uyku düzeni', 'Aşı takvimi', 'İlk yardım'],
  },
  {
    id: 'planner' as UserSegment,
    emoji: '📋',
    title: 'Planlama Yapıyoruz',
    description: 'Hamilelik öncesi hazırlık, sağlık planı, finansal planlama',
    gradient: 'from-accent-400 to-primary-400',
    features: ['Sağlık hazırlığı', 'Maliyet hesaplayıcı', 'Beslenme rehberi', 'Checklist\'ler'],
  },
]

export default function SegmentSelect() {
  const navigate = useNavigate()
  const { setSegment, setOnboarded } = useStore()

  const handleSelect = (seg: UserSegment) => {
    setSegment(seg)
    setOnboarded(true)
    navigate('/profile-setup')
  }

  return (
    <div className="min-h-dvh bg-warm-bg px-6 pt-12 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary-100/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary-100/20 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display font-bold text-2xl text-warm-text mb-2">
            Sizi Tanıyalım
          </h1>
          <p className="text-warm-muted text-sm">
            Size en uygun deneyimi sunabilmemiz için durumunuzu seçin
          </p>
        </motion.div>

        <div className="space-y-4">
          {segments.map((seg, i) => (
            <motion.button
              key={seg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelect(seg.id)}
              className="w-full bg-white rounded-2xl p-5 border border-warm-border hover:border-primary-300 hover:shadow-card transition-all text-left active:scale-[0.98]"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${seg.gradient} flex items-center justify-center shrink-0`}>
                  <span className="text-2xl">{seg.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-base text-warm-text mb-1">{seg.title}</h3>
                  <p className="text-warm-muted text-xs leading-relaxed mb-3">{seg.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {seg.features.map((f) => (
                      <span key={f} className="text-[10px] bg-warm-surface text-warm-muted px-2 py-0.5 rounded-full">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
