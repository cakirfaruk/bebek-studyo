import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { checklistCategories } from '@/data/checklists'
import { cn } from '@/lib/utils'

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
      <div className="py-4">
        {/* Overall Progress */}
        <div className="bg-white rounded-2xl p-5 border border-warm-border mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-warm-text">Genel İlerleme</h3>
            <span className="text-sm font-bold text-primary-500">{totalProgress}%</span>
          </div>
          <div className="h-3 bg-warm-surface rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${totalProgress}%` }}
            />
          </div>
          <p className="text-xs text-warm-muted mt-2">
            {totalCompleted} / {totalItems} madde tamamlandı
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-3">
          {checklistCategories.map((category) => {
            const progress = getProgress(category.id)
            const isExpanded = expandedCategory === category.id
            const completedCount = category.items.filter((i) => completedChecklistItems.includes(i.id)).length

            return (
              <div key={category.id} className="bg-white rounded-2xl border border-warm-border overflow-hidden">
                {/* Category Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                  className="w-full p-4 flex items-center gap-3 text-left"
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-sm text-warm-text">{category.title}</h3>
                      <span className={cn(
                        'text-xs font-bold px-2 py-0.5 rounded-full',
                        progress === 100 ? 'bg-mint-100 text-mint-700' : 'bg-warm-surface text-warm-muted'
                      )}>
                        {completedCount}/{category.items.length}
                      </span>
                    </div>
                    <p className="text-xs text-warm-muted mt-0.5">{category.description}</p>
                    <div className="h-1.5 bg-warm-surface rounded-full overflow-hidden mt-2">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all',
                          progress === 100 ? 'bg-mint-500' : 'bg-primary-500'
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-warm-muted shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-warm-muted shrink-0" />
                  )}
                </button>

                {/* Items */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-1">
                        {category.items.map((item) => {
                          const isChecked = completedChecklistItems.includes(item.id)
                          return (
                            <button
                              key={item.id}
                              onClick={() => toggleChecklistItem(item.id)}
                              className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-warm-surface transition-colors text-left"
                            >
                              <div className={cn(
                                'w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all',
                                isChecked
                                  ? 'bg-mint-500 border-mint-500'
                                  : item.priority === 'high'
                                  ? 'border-primary-300'
                                  : 'border-warm-border'
                              )}>
                                {isChecked && <Check className="w-3 h-3 text-white" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className={cn(
                                  'text-sm font-medium transition-all',
                                  isChecked ? 'text-warm-muted line-through' : 'text-warm-text'
                                )}>
                                  {item.title}
                                </span>
                                <p className="text-xs text-warm-muted/70 mt-0.5">{item.description}</p>
                              </div>
                              {item.priority === 'high' && !isChecked && (
                                <AlertCircle className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </MobileLayout>
  )
}
