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
    gradient: 'linear-gradient(135deg, #ff7ea0, #ff5085)',
    features: ['Haftalık gelişim takibi', 'AI bebek yüzü', 'Akıllı isim bulucu', 'Kontrol listeleri', 'Anı defteri'],
  },
  {
    id: 'dreaming' as UserSegment,
    emoji: '💑',
    title: 'Hayalini Kuruyoruz',
    description: 'Eğlenceli bebek yüzü tahmini, romantik isim keşfi ve geleceği planlama',
    gradient: 'linear-gradient(135deg, #c084fc, #7c3aed)',
    features: ['AI bebek yüzü tahmini', 'Romantik isim keşfi', 'Hazır mıyız testi', 'Eğlenceli quizler'],
  },
  {
    id: 'newparent' as UserSegment,
    emoji: '👨‍👩‍👧',
    title: 'Yeni Ebeveyniz',
    description: '0-12 ay bebek gelişim rehberi, beslenme, uyku ve sağlık takibi',
    gradient: 'linear-gradient(135deg, #34d399, #38bdf8)',
    features: ['Aylık gelişim rehberi', 'Beslenme takibi', 'Uyku düzeni', 'Aşı takvimi', 'İlk yardım'],
  },
  {
    id: 'planner' as UserSegment,
    emoji: '📋',
    title: 'Planlama Yapıyoruz',
    description: 'Hamilelik öncesi hazırlık, sağlık planı, finansal planlama',
    gradient: 'linear-gradient(135deg, #fbbf24, #ff5085)',
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
    <div className="min-h-dvh gradient-mesh px-6 pt-14 pb-8 relative overflow-hidden">
      <div className="relative z-10" style={{ maxWidth: 440, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="font-display font-bold text-[24px] text-warm-text mb-2">Sizi Tanıyalım</h1>
          <p className="text-warm-muted text-[14px]">Size en uygun deneyimi sunabilmemiz için durumunuzu seçin</p>
        </motion.div>

        <div className="space-y-3.5">
          {segments.map((seg, i) => (
            <motion.button
              key={seg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => handleSelect(seg.id)}
              className="glass-card w-full p-5 text-left"
            >
              <div className="flex items-start gap-4">
                <div
                  className="icon-box shrink-0"
                  style={{ background: seg.gradient, fontSize: 28 }}
                >
                  {seg.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-[15px] text-warm-text mb-1">{seg.title}</h3>
                  <p className="text-warm-muted text-[12px] leading-relaxed mb-3">{seg.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {seg.features.map((f) => (
                      <span key={f} className="tag text-warm-muted">{f}</span>
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
