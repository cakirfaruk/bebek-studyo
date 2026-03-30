import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'

const slides = [
  {
    emoji: '🤰',
    badge: 'Hamilelik Takibi',
    title: 'Her Anı Sevgiyle\nTakip Edin',
    subtitle: 'Haftalık gelişim, AI bebek yüzü tahmini ve kişiselleştirilmiş önerilerle yolculuğunuza eşlik ediyoruz.',
  },
  {
    emoji: '👶',
    badge: 'AI Bebek Yüzü',
    title: 'Bebeğiniz Nasıl\nGörünecek?',
    subtitle: 'Yapay zeka fotoğraflarınızı analiz ederek bebeğinizin yüzünü tahmin ediyor.',
  },
  {
    emoji: '✨',
    badge: 'Akıllı İsim Bulucu',
    title: 'Mükemmel İsmi\nBirlikte Bulalım',
    subtitle: 'Numeroloji, astroloji, anlam ve uluslararası uyum ile bebeğinize en güzel ismi seçin.',
  },
]

export default function Welcome() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const slide = slides[step]

  return (
    <div
      className="min-h-dvh flex flex-col relative overflow-hidden"
      style={{ background: 'var(--color-surface)' }}
    >
      {/* Decorative gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          key={`b1-${step}`}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -right-16 w-[320px] h-[320px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          key={`b2-${step}`}
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-24 -left-16 w-[280px] h-[280px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.14) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Glass emoji container */}
            <motion.div
              className="w-[110px] h-[110px] flex items-center justify-center mb-7"
              style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderRadius: '2rem',
                border: '1px solid rgba(255,255,255,0.4)',
                boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-[56px] leading-none">{slide.emoji}</span>
            </motion.div>

            {/* Glass pill badge */}
            <span
              className="mb-4 font-semibold text-[12px] px-4 py-1.5 inline-flex items-center gap-1"
              style={{
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                borderRadius: '9999px',
                color: 'var(--color-primary)',
              }}
            >
              {slide.badge}
            </span>

            {/* Display title */}
            <h1
              className="whitespace-pre-line mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '28px',
                lineHeight: 1.15,
                color: 'var(--color-on-surface)',
              }}
            >
              {slide.title}
            </h1>

            {/* Body subtitle */}
            <p
              className="max-w-[300px]"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                lineHeight: 1.65,
                color: 'var(--color-on-surface-variant)',
              }}
            >
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="flex gap-2.5 mt-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className="relative h-[6px] rounded-full transition-all duration-500"
              style={{
                width: i === step ? 32 : 8,
                background:
                  i === step
                    ? 'linear-gradient(90deg, #ec4899, #9333ea)'
                    : 'var(--color-surface-high)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-8 pb-10 relative z-10 space-y-3">
        {step < slides.length - 1 ? (
          <>
            <button onClick={() => setStep(step + 1)} className="btn-primary">
              Devam Et
              <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/auth')} className="btn-ghost w-full">
              Atla
            </button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/auth')} className="btn-primary">
              <Star className="w-5 h-5" />
              Hemen Başla
            </button>
            <button onClick={() => navigate('/auth?mode=login')} className="btn-secondary">
              Zaten hesabım var
            </button>
          </>
        )}
      </div>
    </div>
  )
}
