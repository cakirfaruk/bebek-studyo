import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { checklistCategories } from '@/data/checklists'
import { cn } from '@/lib/utils'

// Circular progress component
function CircularProgress({ percent, size = 56, strokeWidth = 5, gradientId, colorFrom, colorTo }: {
  percent: number; size?: number; strokeWidth?: number; gradientId: string; colorFrom: string; colorTo: string
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" strokeWidth={strokeWidth}
          className="text-surface-container-highest" stroke="currentColor"
        />
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colorFrom} />
            <stop offset="100%" stopColor={colorTo} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth} strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <span className="absolute text-xs font-bold text-on-surface font-display">{percent}%</span>
    </div>
  )
}

const categoryStyles = [
  { gradientId: 'checkPrimary', colorFrom: '#ba0961', colorTo: '#ffa8c1', iconBg: 'bg-secondary-container', iconColor: 'text-secondary', progressFrom: 'from-primary', progressTo: 'to-primary-container', btnClass: 'bg-gradient-to-r from-secondary to-secondary-dim text-white shadow-lg shadow-secondary/20' },
  { gradientId: 'checkSecondary', colorFrom: '#6834eb', colorTo: '#dacdff', iconBg: 'bg-primary-container/30', iconColor: 'text-primary', progressFrom: 'from-secondary', progressTo: 'to-secondary-fixed-dim', btnClass: 'bg-surface-container-low text-on-secondary-container' },
  { gradientId: 'checkTertiary', colorFrom: '#006977', colorTo: '#50e1f9', iconBg: 'bg-tertiary-container/20', iconColor: 'text-tertiary', progressFrom: 'from-tertiary', progressTo: 'to-tertiary-container', btnClass: 'bg-surface-container-low text-tertiary-dim' },
]

export default function Checklists() {
  const { completedChecklistItems, toggleChecklistItem } = useStore()
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const getProgress = (categoryId: string) => {
    const category = checklistCategories.find((c) => c.id === categoryId)
    if (!category) return 0
    const completed = category.items.filter((i) => completedChecklistItems.includes(i.id)).length
    return Math.round((completed / category.items.length) * 100)
  }

  const totalItems = checklistCategories.reduce((acc, c) => acc + c.items.length, 0)
  const totalCompleted = completedChecklistItems.length
  const totalProgress = Math.round((totalCompleted / totalItems) * 100)

  return (
    <MobileLayout title="Kontrol Listeleri" showBack>
      <div className="space-y-10 pb-6">
        {/* Hero Section */}
        <section className="space-y-2">
          <h2 className="text-4xl font-display font-extrabold text-on-surface tracking-tight">Kontrol Listeleri</h2>
          <p className="text-on-surface-variant font-medium font-body">Hazirlik surecini huzurla tamamla.</p>
        </section>

        {/* Overall Progress - Glass card */}
        <div className="glass-card rounded-2xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-on-surface text-lg">Genel Ilerleme</h3>
            <CircularProgress
              percent={totalProgress}
              size={64}
              strokeWidth={6}
              gradientId="totalProgress"
              colorFrom="#ba0961"
              colorTo="#6834eb"
            />
          </div>
          <div className="h-3 bg-surface-container-highest rounded-full overflow-hidden relative">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg" />
            </motion.div>
          </div>
          <p className="text-xs text-on-surface-variant mt-3 font-body">
            {totalCompleted} / {totalItems} madde tamamlandi
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-8">
          {checklistCategories.map((category, catIndex) => {
            const progress = getProgress(category.id)
            const isExpanded = expandedCategory === category.id
            const completedCount = category.items.filter((i) => completedChecklistItems.includes(i.id)).length
            const style = categoryStyles[catIndex % categoryStyles.length]

            return (
              <div key={category.id} className="relative group">
                <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-xl shadow-primary-dim/5 relative overflow-hidden">
                  <div className="flex flex-col gap-5">
                    {/* Category header */}
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="flex items-center gap-4 w-full text-left"
                    >
                      <div className={`w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center`}>
                        <span className="text-2xl">{category.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-display font-bold text-on-surface">{category.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-0.5 font-body">{category.description}</p>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-on-surface-variant shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-on-surface-variant shrink-0" />
                      )}
                    </button>

                    {/* Progress section */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-semibold text-on-surface-variant uppercase tracking-wider font-body">Ilerleme</span>
                        <span className={`text-xl font-display font-bold ${style.iconColor}`}>{progress}%</span>
                      </div>
                      <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
                        <div
                          className={`h-full bg-gradient-to-r ${style.progressFrom} ${style.progressTo} rounded-full relative transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {category.items.slice(0, 3).map((item) => (
                        <span key={item.id} className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface-variant">
                          {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
                        </span>
                      ))}
                    </div>

                    {/* View list button */}
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className={`w-full py-4 font-bold rounded-full hover:opacity-90 transition-opacity active:scale-[0.98] transition-transform ${style.btnClass}`}
                    >
                      {isExpanded ? 'Listeyi Gizle' : 'Listeyi Goruntule'} ({completedCount}/{category.items.length})
                    </button>
                  </div>

                  {/* Items */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5 space-y-1">
                          {category.items.map((item) => {
                            const isChecked = completedChecklistItems.includes(item.id)
                            return (
                              <button
                                key={item.id}
                                onClick={() => toggleChecklistItem(item.id)}
                                className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-colors text-left"
                              >
                                <div className={cn(
                                  'w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all',
                                  isChecked
                                    ? 'bg-tertiary text-white'
                                    : item.priority === 'high'
                                    ? 'bg-surface-container-high ring-2 ring-primary/30'
                                    : 'bg-surface-container-high'
                                )}>
                                  {isChecked && <Check className="w-3 h-3" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className={cn(
                                    'text-sm font-medium transition-all font-body',
                                    isChecked ? 'text-on-surface-variant line-through' : 'text-on-surface'
                                  )}>
                                    {item.title}
                                  </span>
                                  <p className="text-xs text-on-surface-variant/70 mt-0.5 font-body">{item.description}</p>
                                </div>
                                {item.priority === 'high' && !isChecked && (
                                  <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                )}
                              </button>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </MobileLayout>
  )
}
