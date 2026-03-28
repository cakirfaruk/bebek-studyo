import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Baby, Heart, Sparkles, ArrowRight, Star } from 'lucide-react'

const slides = [
  {
    icon: Baby,
    emoji: '👶',
    title: 'Bebeğinizin Dünyasına\nHoş Geldiniz',
    subtitle: 'AI destekli bebek yüzü tahmini, akıllı isim önerileri ve hamilelik rehberi',
    gradient: 'from-primary-400 to-rose-400',
  },
  {
    icon: Sparkles,
    emoji: '✨',
    title: 'Yapay Zeka ile\nBebeğinizi Görün',
    subtitle: 'Anne ve babanın fotoğraflarından bebeğinizin nasıl görüneceğini keşfedin',
    gradient: 'from-secondary-400 to-lavender-400',
  },
  {
    icon: Heart,
    emoji: '💝',
    title: 'Mükemmel İsmi\nBirlikte Bulalım',
    subtitle: 'Numeroloji, astroloji, anlam ve uluslararası uyum ile en güzel ismi seçin',
    gradient: 'from-accent-400 to-primary-400',
  },
]

export default function Welcome() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh flex flex-col bg-warm-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary-100/40 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-secondary-100/40 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-48 h-48 rounded-full bg-accent-100/30 blur-3xl" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center w-full"
          >
            {/* Icon */}
            <motion.div
              className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${slides[step].gradient} flex items-center justify-center mb-8 shadow-elevated`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-5xl">{slides[step].emoji}</span>
            </motion.div>

            {/* Title */}
            <h1 className="font-display font-bold text-[26px] text-warm-text leading-[1.2] whitespace-pre-line mb-3">
              {slides[step].title}
            </h1>

            {/* Subtitle */}
            <p className="text-warm-muted text-[14px] leading-relaxed">
              {slides[step].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex gap-2 mt-12">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? 'w-8 bg-primary-500' : 'w-2 bg-primary-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Bottom actions */}
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
