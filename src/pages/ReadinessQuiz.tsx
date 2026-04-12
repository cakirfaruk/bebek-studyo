import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw, Heart, Brain, Wallet, Home, Users } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'

const questions = [
  {
    category: 'Duygusal Hazırlık',
    icon: Heart,
    emoji: '💕',
    question: 'Eşinizle birlikte ebeveynlik hakkında açık ve dürüst konuşuyor musunuz?',
    options: [
      { label: 'Evet, sık sık konuşuyoruz', score: 3 },
      { label: 'Bazen konuşuyoruz', score: 2 },
      { label: 'Çok az konuştuk', score: 1 },
      { label: 'Hiç konuşmadık', score: 0 },
    ],
  },
  {
    category: 'Duygusal Hazırlık',
    icon: Heart,
    emoji: '🤗',
    question: 'Bir bebeğin hayatınızı nasıl değiştireceğini düşündünüz mü?',
    options: [
      { label: 'Evet, detaylı düşündük', score: 3 },
      { label: 'Genel olarak düşündük', score: 2 },
      { label: 'Biraz', score: 1 },
      { label: 'Hayır', score: 0 },
    ],
  },
  {
    category: 'Finansal Hazırlık',
    icon: Wallet,
    emoji: '💰',
    question: 'Bebek masrafları için bütçeniz var mı?',
    options: [
      { label: 'Evet, biriktiriyoruz', score: 3 },
      { label: 'Genel bir planımız var', score: 2 },
      { label: 'Düşünmeye başladık', score: 1 },
      { label: 'Henüz düşünmedik', score: 0 },
    ],
  },
  {
    category: 'Finansal Hazırlık',
    icon: Wallet,
    emoji: '🏦',
    question: 'Doğum ve sonrası için sağlık sigortanız yeterli mi?',
    options: [
      { label: 'Evet, kapsamlı', score: 3 },
      { label: 'Temel düzeyde', score: 2 },
      { label: 'Araştırıyoruz', score: 1 },
      { label: 'Emin değiliz', score: 0 },
    ],
  },
  {
    category: 'Sağlık Hazırlığı',
    icon: Brain,
    emoji: '🥗',
    question: 'Hamilelik öncesi sağlık kontrolü yaptırdınız mı?',
    options: [
      { label: 'Evet, ikimiz de yaptırdık', score: 3 },
      { label: 'Biri yaptırdı', score: 2 },
      { label: 'Planlıyoruz', score: 1 },
      { label: 'Hayır', score: 0 },
    ],
  },
  {
    category: 'Yaşam Düzeni',
    icon: Home,
    emoji: '🏡',
    question: 'Yaşam alanınız bir bebeğe uygun mu?',
    options: [
      { label: 'Evet, hazırız', score: 3 },
      { label: 'Küçük değişiklikler gerekiyor', score: 2 },
      { label: 'Büyük değişiklikler gerekiyor', score: 1 },
      { label: 'Şu an uygun değil', score: 0 },
    ],
  },
  {
    category: 'Destek Sistemi',
    icon: Users,
    emoji: '👨‍👩‍👧‍👦',
    question: 'Çevrenizde destek olabilecek aile/arkadaşlarınız var mı?',
    options: [
      { label: 'Güçlü bir destek ağımız var', score: 3 },
      { label: 'Birkaç kişi var', score: 2 },
      { label: 'Sınırlı', score: 1 },
      { label: 'Çok az', score: 0 },
    ],
  },
]

export default function ReadinessQuiz() {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1)
    } else {
      setShowResult(true)
    }
  }

  const totalScore = answers.reduce((a, b) => a + b, 0)
  const maxScore = questions.length * 3
  const percentage = Math.round((totalScore / maxScore) * 100)

  const getResult = () => {
    if (percentage >= 80) return { emoji: '🌟', title: 'Harika Hazırsınız!', color: 'text-tertiary', desc: 'Hem duygusal hem pratik olarak çok iyi hazırlanmışsınız. Bu güzel yolculuğa başlamak için harika bir noktadasınız.' }
    if (percentage >= 60) return { emoji: '💪', title: 'İyi Gidiyorsunuz!', color: 'text-secondary', desc: 'Birçok alanda hazırsınız. Bazı konularda biraz daha hazırlık yapmanız faydalı olabilir.' }
    if (percentage >= 40) return { emoji: '🌱', title: 'Gelişim Alanları Var', color: 'text-secondary-dim', desc: 'Bazı önemli alanlarda daha fazla hazırlık yapmanız önerilir. Aceleniz yok, adım adım ilerleyin.' }
    return { emoji: '📚', title: 'Daha Fazla Hazırlık Gerekiyor', color: 'text-primary', desc: 'Ebeveynlik büyük bir adım. Birlikte planlama yaparak bu yolculuğa daha hazırlıklı başlayabilirsiniz.' }
  }

  const reset = () => {
    setCurrentQ(0)
    setAnswers([])
    setShowResult(false)
  }

  if (showResult) {
    const result = getResult()
    return (
      <MobileLayout title="Sonuçlar" showBack>
        <div className="py-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
            <span className="text-6xl block mb-4">{result.emoji}</span>
            <h2 className={`font-display font-bold text-2xl ${result.color} mb-2`}>{result.title}</h2>
            <div className="mb-6">
              <div className="font-display font-bold text-4xl text-on-surface mb-1">%{percentage}</div>
              <div className="h-3 bg-surface-container-low rounded-full overflow-hidden max-w-xs mx-auto">
                <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: 1 }} />
              </div>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-8 max-w-xs mx-auto">{result.desc}</p>
            <button onClick={reset} className="h-12 px-8 rounded-xl border border-outline-variant/20 text-on-surface font-medium text-sm flex items-center justify-center gap-2 mx-auto">
              <RotateCcw className="w-4 h-4" />
              Tekrar Başla
            </button>
          </motion.div>
        </div>
      </MobileLayout>
    )
  }

  const q = questions[currentQ]

  return (
    <MobileLayout title="Hazır mısınız?" showBack>
      <div className="py-6">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-xs text-on-surface-variant">{currentQ + 1}/{questions.length}</span>
          <div className="flex-1 h-2 bg-surface-container-low rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
            <div className="text-center mb-8">
              <span className="text-5xl block mb-4">{q.emoji}</span>
              <span className="text-xs text-on-surface-variant bg-surface-container-low px-3 py-1 rounded-full">{q.category}</span>
              <h2 className="font-display font-semibold text-lg text-on-surface mt-4">{q.question}</h2>
            </div>
            <div className="space-y-3">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full glass-card p-4 hover:border-primary-300 hover:shadow-card transition-all text-left active:scale-[0.98] flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center shrink-0 text-sm font-medium text-on-surface-variant">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="text-sm font-medium text-on-surface">{opt.label}</span>
                  <ArrowRight className="w-4 h-4 text-on-surface-variant ml-auto" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </MobileLayout>
  )
}
