import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { getWeekOfPregnancy, getDaysUntilDue } from '@/lib/utils'

interface FeatureCard {
  path: string
  emoji: string
  title: string
  desc: string
  gradient: string
}

const featureCards: Record<string, FeatureCard[]> = {
  expecting: [
    { path: '/pregnancy-tracker', emoji: '📅', title: 'Hamilelik Takibi', desc: 'Haftalık gelişim', gradient: 'from-primary-400 to-rose-400' },
    { path: '/baby-face', emoji: '👶', title: 'Bebek Yüzü', desc: 'AI ile tahmin', gradient: 'from-secondary-400 to-lavender-400' },
    { path: '/names', emoji: '✨', title: 'İsim Bulucu', desc: 'Akıllı öneriler', gradient: 'from-accent-400 to-primary-400' },
    { path: '/checklists', emoji: '📋', title: 'Kontrol Listeleri', desc: 'Her şey hazır mı?', gradient: 'from-mint-400 to-sky-400' },
    { path: '/baby-guide', emoji: '📖', title: 'Bebek Rehberi', desc: '0-12 ay gelişim', gradient: 'from-sky-400 to-secondary-400' },
    { path: '/memories', emoji: '💝', title: 'Anı Defteri', desc: 'Özel anlarınız', gradient: 'from-rose-400 to-lavender-400' },
    { path: '/appointments', emoji: '🏥', title: 'Randevular', desc: 'Takip edin', gradient: 'from-mint-400 to-primary-400' },
    { path: '/cost-calculator', emoji: '💰', title: 'Maliyet', desc: 'Bütçe planlayın', gradient: 'from-accent-400 to-accent-500' },
  ],
  dreaming: [
    { path: '/baby-face', emoji: '👶', title: 'Bebek Yüzü', desc: 'AI ile tahmin', gradient: 'from-lavender-400 to-secondary-400' },
    { path: '/names', emoji: '✨', title: 'İsim Keşfi', desc: 'Romantik isimler', gradient: 'from-rose-400 to-primary-400' },
    { path: '/readiness-quiz', emoji: '💡', title: 'Hazır mıyız?', desc: 'Birlikte test edin', gradient: 'from-accent-400 to-primary-400' },
    { path: '/cost-calculator', emoji: '💰', title: 'Maliyet', desc: 'Bütçe planlayın', gradient: 'from-mint-400 to-sky-400' },
  ],
  newparent: [
    { path: '/baby-guide', emoji: '📖', title: 'Gelişim Rehberi', desc: '0-12 ay', gradient: 'from-mint-400 to-sky-400' },
    { path: '/checklists', emoji: '📋', title: 'Kontrol Listeleri', desc: 'Takip edin', gradient: 'from-primary-400 to-rose-400' },
    { path: '/memories', emoji: '💝', title: 'Anı Defteri', desc: 'İlk anlar', gradient: 'from-rose-400 to-lavender-400' },
    { path: '/names', emoji: '✨', title: 'İsim Bulucu', desc: 'Hala arıyorum', gradient: 'from-accent-400 to-primary-400' },
    { path: '/appointments', emoji: '🏥', title: 'Randevular', desc: 'Aşı takvimi', gradient: 'from-sky-400 to-secondary-400' },
    { path: '/baby-face', emoji: '👶', title: 'Bebek Yüzü', desc: 'Büyüyünce', gradient: 'from-secondary-400 to-lavender-400' },
  ],
  planner: [
    { path: '/cost-calculator', emoji: '💰', title: 'Maliyet', desc: 'Bütçe planlayın', gradient: 'from-accent-400 to-primary-400' },
    { path: '/checklists', emoji: '📋', title: 'Hazırlık Listesi', desc: 'Planlayın', gradient: 'from-mint-400 to-sky-400' },
    { path: '/names', emoji: '✨', title: 'İsim Keşfi', desc: 'Araştırın', gradient: 'from-rose-400 to-primary-400' },
    { path: '/baby-face', emoji: '👶', title: 'Bebek Yüzü', desc: 'AI tahmin', gradient: 'from-lavender-400 to-secondary-400' },
    { path: '/baby-guide', emoji: '📖', title: 'Bebek Rehberi', desc: 'Bilgilenin', gradient: 'from-sky-400 to-secondary-400' },
    { path: '/readiness-quiz', emoji: '💡', title: 'Hazırlık Testi', desc: 'Değerlendirin', gradient: 'from-primary-400 to-accent-400' },
  ],
}

export default function Home() {
  const navigate = useNavigate()
  const { profile, segment } = useStore()
  const cards = featureCards[segment || 'expecting']

  const week = profile?.dueDate ? getWeekOfPregnancy(profile.dueDate) : null
  const daysLeft = profile?.dueDate ? getDaysUntilDue(profile.dueDate) : null

  const greetingName = profile?.motherName || 'Güzel Anne'

  return (
    <MobileLayout>
      <div className="py-4 space-y-5">
        {/* Greeting */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display font-bold text-[22px] text-warm-text leading-tight">
            Merhaba, {greetingName} 👋
          </h1>
          <p className="text-warm-muted text-[13px] mt-1">
            {segment === 'expecting' && week && daysLeft && daysLeft > 0
              ? `${week}. hafta — Doğuma ${daysLeft} gün kaldı`
              : segment === 'dreaming'
              ? 'Hayallerin güzelliğini keşfedin'
              : segment === 'newparent'
              ? 'Yeni macera harika gidiyor!'
              : 'Harika bir plan yapılıyor'}
          </p>
        </motion.div>

        {/* Pregnancy Progress Card */}
        {segment === 'expecting' && week && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card p-5"
          >
            <div className="flex items-center gap-4">
              <div className="w-[60px] h-[60px] rounded-2xl gradient-warm flex items-center justify-center shrink-0 shadow-soft">
                <span className="text-[30px] leading-none">🤰</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-bold text-[28px] text-warm-text leading-none">{week}</span>
                  <span className="text-warm-muted text-[13px] font-medium">. hafta</span>
                </div>
                <p className="text-warm-muted text-[12px] mt-1">
                  {daysLeft && daysLeft > 0 ? `Doğuma ${daysLeft} gün kaldı` : 'Doğum zamanı geldi!'}
                </p>
                <div className="mt-2.5 h-[6px] bg-primary-100 rounded-full overflow-hidden">
                  <div
                    className="h-full gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (week / 40) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hero for Dreaming */}
        {segment === 'dreaming' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="rounded-[20px] p-5 gradient-dream text-white shadow-elevated overflow-hidden relative"
          >
            <div className="pointer-events-none absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />
            <div className="flex items-center gap-2.5 mb-2">
              <Heart className="w-5 h-5" />
              <h3 className="font-display font-semibold text-[16px]">Hayalinizdeki Bebek</h3>
            </div>
            <p className="text-white/80 text-[13px] leading-relaxed">
              Yapay zeka ile bebeğinizin nasıl görüneceğini keşfedin ve en güzel isimleri bulun.
            </p>
            <button
              onClick={() => navigate('/baby-face')}
              className="mt-4 bg-white/20 hover:bg-white/30 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-colors border border-white/20"
            >
              Hemen Keşfet
            </button>
          </motion.div>
        )}

        {/* Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[16px] p-4 bg-accent-50 border border-accent-200/50"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent-100 flex items-center justify-center shrink-0">
              <span className="text-[18px] leading-none">💡</span>
            </div>
            <div className="min-w-0">
              <h4 className="font-semibold text-[13px] text-accent-800 mb-0.5">Günün İpucu</h4>
              <p className="text-accent-700/80 text-[12px] leading-[1.6]">
                {segment === 'expecting'
                  ? 'Günde en az 8 bardak su içmeyi unutmayın. Hamilelikte hidrasyon hem sizin hem bebeğiniz için çok önemli.'
                  : segment === 'dreaming'
                  ? 'Birlikte hayal kurmak ilişkinizi güçlendirir. Bu akşam bebek isimleri hakkında sohbet edin.'
                  : segment === 'newparent'
                  ? 'Bebeğinizle göz teması kurun — bu onun sosyal gelişimi için harika bir egzersiz.'
                  : 'Folik asit takviyesine hamilelikten 3 ay önce başlamak ideal kabul edilir.'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div>
          <h2 className="font-display font-semibold text-[15px] text-warm-text mb-3">Özellikler</h2>
          <div className="grid grid-cols-2 gap-3">
            {cards.map((card, i) => (
              <motion.button
                key={card.path}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.04 }}
                onClick={() => navigate(card.path)}
                className="card p-4 text-left active:scale-[0.97] transition-transform"
              >
                <div className={`w-[46px] h-[46px] rounded-[14px] bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-3 shadow-soft`}>
                  <span className="text-[22px] leading-none">{card.emoji}</span>
                </div>
                <h3 className="font-semibold text-[13px] text-warm-text leading-tight">{card.title}</h3>
                <p className="text-warm-muted text-[11px] mt-0.5">{card.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Premium Banner */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-[20px] p-5 gradient-primary text-white relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white/10 blur-lg" />
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[20px]">👑</span>
            <h3 className="font-display font-semibold text-[15px]">Premium Üyelik</h3>
          </div>
          <p className="text-white/80 text-[12px] leading-relaxed mb-3">
            Sınırsız AI özellik, öncelikli destek ve reklamsız deneyim
          </p>
          <button className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl text-[13px] font-semibold transition-colors border border-white/20">
            Detayları Gör
          </button>
        </motion.div>
      </div>
    </MobileLayout>
  )
}
