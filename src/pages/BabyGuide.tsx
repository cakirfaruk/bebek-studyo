import { useState } from 'react'
import { motion } from 'framer-motion'
import { Baby, Brain, Heart, Utensils, Moon, AlertTriangle, Gamepad2, ChevronRight } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { babyMilestones } from '@/data/baby-guide'

const sectionIcons = [
  { key: 'physical', icon: Baby, label: 'Fiziksel', color: 'text-primary-500', bg: 'bg-primary-50' },
  { key: 'cognitive', icon: Brain, label: 'Bilişsel', color: 'text-secondary-500', bg: 'bg-secondary-50' },
  { key: 'social', icon: Heart, label: 'Sosyal', color: 'text-rose-500', bg: 'bg-rose-50' },
  { key: 'feeding', icon: Utensils, label: 'Beslenme', color: 'text-accent-500', bg: 'bg-accent-50' },
  { key: 'sleep', icon: Moon, label: 'Uyku', color: 'text-sky-500', bg: 'bg-sky-50' },
  { key: 'activities', icon: Gamepad2, label: 'Aktiviteler', color: 'text-mint-500', bg: 'bg-mint-50' },
  { key: 'warning', icon: AlertTriangle, label: 'Uyarılar', color: 'text-red-500', bg: 'bg-red-50' },
]

export default function BabyGuide() {
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null)
  const milestone = babyMilestones.find((m) => m.month === selectedMonth)

  if (milestone) {
    return (
      <MobileLayout title={milestone.title} showBack onBack={() => setSelectedMonth(null)}>
        <div className="py-4 space-y-4">
          {/* Hero */}
          <div className="bg-gradient-to-br from-secondary-400 to-lavender-400 rounded-2xl p-5 text-white">
            <h2 className="font-display font-bold text-xl mb-1">{milestone.title}</h2>
            <p className="text-white/80 text-sm">{milestone.description}</p>
          </div>

          {/* Physical Development */}
          <Section
            icon={Baby} title="Fiziksel Gelişim" color="text-primary-500" bg="bg-primary-50"
            items={milestone.physicalDevelopment}
          />

          {/* Cognitive Development */}
          <Section
            icon={Brain} title="Bilişsel Gelişim" color="text-secondary-500" bg="bg-secondary-50"
            items={milestone.cognitiveDevelopment}
          />

          {/* Social Development */}
          <Section
            icon={Heart} title="Sosyal Gelişim" color="text-rose-500" bg="bg-rose-50"
            items={milestone.socialDevelopment}
          />

          {/* Feeding */}
          <Section
            icon={Utensils} title="Beslenme İpuçları" color="text-accent-500" bg="bg-accent-50"
            items={milestone.feedingTips}
          />

          {/* Sleep */}
          <div className="bg-white rounded-2xl p-4 border border-warm-border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <Moon className="w-4 h-4 text-sky-500" />
              </div>
              <h3 className="font-semibold text-sm text-warm-text">Uyku Düzeni</h3>
            </div>
            <p className="text-sm text-warm-muted">{milestone.sleepInfo}</p>
          </div>

          {/* Activities */}
          <Section
            icon={Gamepad2} title="Eğlenceli Aktiviteler" color="text-mint-500" bg="bg-mint-50"
            items={milestone.funActivities}
          />

          {/* Warning Signs */}
          <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-500" />
              </div>
              <h3 className="font-semibold text-sm text-red-700">Dikkat Edilmesi Gerekenler</h3>
            </div>
            <ul className="space-y-2">
              {milestone.warningSign.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                  <span className="text-sm text-red-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-red-500 mt-3">Bu belirtiler endişelenmeniz gerektiği anlamına gelmez, ancak doktorunuzla paylaşın.</p>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout title="Bebek Gelişim Rehberi" showBack>
      <div className="py-4">
        {/* Intro */}
        <div className="bg-gradient-to-br from-mint-400 to-sky-400 rounded-2xl p-5 text-white mb-6">
          <h2 className="font-display font-bold text-lg mb-1">0-12 Ay Rehberi</h2>
          <p className="text-white/80 text-sm">
            Bebeğinizin ilk yılındaki tüm gelişim adımları, beslenme ipuçları ve eğlenceli aktiviteler
          </p>
        </div>

        {/* Month Cards */}
        <div className="space-y-3">
          {babyMilestones.map((m, i) => (
            <motion.button
              key={m.month}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedMonth(m.month)}
              className="w-full bg-white rounded-2xl p-4 border border-warm-border hover:shadow-card transition-all text-left flex items-center gap-4"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-400 to-lavender-400 flex items-center justify-center shrink-0">
                <span className="text-white font-display font-bold text-lg">
                  {m.month === 0 ? '0' : m.month}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-warm-text">{m.title}</h3>
                <p className="text-xs text-warm-muted mt-0.5">{m.description}</p>
                <div className="flex gap-1.5 mt-2">
                  {sectionIcons.slice(0, 4).map((s) => (
                    <div key={s.key} className={`w-6 h-6 rounded-md ${s.bg} flex items-center justify-center`}>
                      <s.icon className={`w-3 h-3 ${s.color}`} />
                    </div>
                  ))}
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-warm-muted shrink-0" />
            </motion.button>
          ))}
        </div>
      </div>
    </MobileLayout>
  )
}

function Section({ icon: Icon, title, color, bg, items }: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  color: string
  bg: string
  items: string[]
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-warm-border">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <h3 className="font-semibold text-sm text-warm-text">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${color.replace('text-', 'bg-')}`} />
            <span className="text-sm text-warm-muted">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
