import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { checklistCategories } from '@/data/checklists'
import { cn } from '@/lib/utils'

const categoryStyles = [
  {
    icon: 'shopping_bag',
    emoji: '👜',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-secondary',
    progressColor: 'text-primary',
    progressFrom: 'from-primary',
    progressTo: 'to-primary-container',
    btnClass: 'bg-gradient-to-r from-secondary to-secondary-dim text-white shadow-lg shadow-secondary/20',
    shadow: 'shadow-primary-dim/5',
  },
  {
    icon: 'bedroom_baby',
    emoji: '🛏️',
    iconBg: 'bg-primary-container/30',
    iconColor: 'text-primary',
    progressColor: 'text-secondary',
    progressFrom: 'from-secondary',
    progressTo: 'to-secondary-fixed-dim',
    btnClass: 'bg-surface-container-low text-on-secondary-container',
    shadow: 'shadow-secondary-dim/5',
  },
  {
    icon: 'child_care',
    emoji: '🍼',
    iconBg: 'bg-tertiary/10',
    iconColor: 'text-tertiary',
    progressColor: 'text-tertiary',
    progressFrom: 'from-tertiary',
    progressTo: 'to-tertiary-container',
    btnClass: 'bg-surface-container-low text-tertiary-dim',
    shadow: 'shadow-tertiary/5',
  },
  {
    icon: 'restaurant',
    emoji: '🤱',
    iconBg: 'bg-primary-container/30',
    iconColor: 'text-primary',
    progressColor: 'text-primary',
    progressFrom: 'from-primary',
    progressTo: 'to-primary-container',
    btnClass: 'bg-surface-container-low text-on-secondary-container',
    shadow: 'shadow-primary-dim/5',
  },
  {
    icon: 'health_and_safety',
    emoji: '🩺',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-secondary',
    progressColor: 'text-secondary',
    progressFrom: 'from-secondary',
    progressTo: 'to-secondary-fixed-dim',
    btnClass: 'bg-surface-container-low text-on-secondary-container',
    shadow: 'shadow-secondary-dim/5',
  },
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

  return (
    <MobileLayout title="Kontrol Listeleri" showBack>
      <div className="space-y-10 pb-6">
        {/* Hero Section / Title */}
        <section className="space-y-2">
          <h2 className="text-4xl font-display font-extrabold text-on-surface tracking-tight">Kontrol Listeleri</h2>
          <p className="text-on-surface-variant font-medium">Hazırlık sürecini huzurla tamamla.</p>
        </section>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 gap-8">
          {checklistCategories.map((category, catIndex) => {
            const progress = getProgress(category.id)
            const isExpanded = expandedCategory === category.id
            const completedCount = category.items.filter((i) => completedChecklistItems.includes(i.id)).length
            const style = categoryStyles[catIndex % categoryStyles.length]

            return (
              <div key={category.id} className="relative group">
                {/* Decorative emoji element */}
                {catIndex === 0 && (
                  <div className="absolute -top-6 -right-2 w-24 h-24 z-10 drop-shadow-2xl flex items-center justify-center">
                    <span className="text-5xl transform rotate-12 group-hover:rotate-0 transition-transform duration-500">{style.emoji}</span>
                  </div>
                )}
                {catIndex === 1 && (
                  <div className="absolute -top-4 -left-4 w-20 h-20 z-10 drop-shadow-xl flex items-center justify-center">
                    <span className="text-4xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500">{style.emoji}</span>
                  </div>
                )}

                <div className={`bg-surface-container-lowest rounded-lg p-8 shadow-xl ${style.shadow} relative overflow-hidden`}>
                  <div className="flex flex-col gap-6">
                    {/* Category header */}
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="flex items-center gap-4 w-full text-left"
                    >
                      <div className={`w-12 h-12 rounded-full ${style.iconBg} flex items-center justify-center ${style.iconColor}`}>
                        <span className="material-symbols-outlined">{style.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-display font-bold">{category.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-0.5 font-body">{category.description}</p>
                      </div>
                    </button>

                    {/* Progress section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-sm font-label font-semibold text-on-surface-variant uppercase tracking-wider">İlerleme</span>
                        <span className={`text-xl font-display font-bold ${style.progressColor}`}>{progress}%</span>
                      </div>
                      <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden relative">
                        <div
                          className={`h-full bg-gradient-to-r ${style.progressFrom} ${style.progressTo} rounded-full relative transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-surface-container-lowest rounded-full shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 py-2">
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
                      {isExpanded ? 'Listeyi Gizle' : 'Listeyi Görüntüle'} ({completedCount}/{category.items.length})
                    </button>
                  </div>

                  {/* Expanded items */}
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
                                  {isChecked && <span className="material-symbols-outlined text-xs">check</span>}
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
                                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">priority_high</span>
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

        {/* Add New List Card */}
        <div className="border-2 border-dashed border-outline-variant/30 rounded-lg p-8 flex flex-col items-center justify-center gap-3 text-on-surface-variant hover:border-primary/40 hover:text-primary transition-all cursor-pointer group">
          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center group-hover:bg-primary-container/20 transition-colors">
            <span className="material-symbols-outlined text-3xl">add</span>
          </div>
          <span className="font-display font-bold text-lg">Yeni Liste Ekle</span>
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fixed bottom-32 right-8 z-50 md:hidden">
        <button className="w-16 h-16 bg-gradient-to-br from-primary to-primary-dim rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center text-white active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </MobileLayout>
  )
}
