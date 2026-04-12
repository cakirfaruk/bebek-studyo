import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { checklistCategories } from '@/data/checklists'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

const categoryStyles = [
  {
    icon: 'shopping_bag',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB37yUfzNNsoJ4riWHtuPcQzJlemYpyAOT5EHKQo_uahKAHTc_SMtL1oLrah0OCSE7I4YLfPZcuUQjJAfWCf9e0yDbUL1XNprsG06_8hh8DAbBCaRiYTmJAflfdhQ-FXRYWq37PtdF9nMpAmUreBloAVp_MnpNDIaqf-4gaFIu379YHqEFGt8Rh2yai_wBEFFrUIQZ87JqNpXoUMkTJaYBeoamBAPXAEXTQQf3UUSqN9BJa0AWw4etK1hPYwAdOBqUKvmZdiYho4r8',
    imagePosition: '-top-8 -right-4 w-32 h-32 rotate-12',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCioo6GjZc1J2XWguLfD3Tb8dXmnigfe8MEDnC-RBHGSdGcAz41UsDwBXHYh-sDfF_fU_ws5jZP5B19rrXy_7WvMyQa-0XcG-fI168Rg___5559lCFVh4nqHGkdxilpfNG2IbXYqK8X81mdOcUDhUdxAfjUGoVOOmIij3p0-GUW1b1dqFNZwM2BUNSVCU2M1vsMWLZG2mznXBbaJRMTTe_P_OCUJNf17VY6Aq8xctVuf9eNMdBtLFyVu2hSfTfuls1t_QVczA2BtQA',
    imagePosition: '-top-6 -left-6 w-28 h-28 -rotate-12',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwd482tp4A2psX2HPKpP7THQusSDAoouhzRF836r9x4GTRpJmQyOm-L24SxD-m1kPXLEX57GS5AWtxYw3uaPrSR0VpfkEH694Egb1_h-YxtrAUtv1mznQ813RZtRjeYRcbZyKcgkxm2SQZ4G58BiIjxh1-fXsk9F1W_yCz8A1xBvdWwhRVbQyOsoX_eq-GywP_JBxcLffZZihLpoH5y-FBJFGbcHllUXi0vt-BHdrbCBGci57gWmxyhTqHCXaAPpkhoZWFYKVqbgs', // Reusing bottle from gift list
    imagePosition: '-top-4 -right-2 w-24 h-24 rotate-6',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZcNOlw9TwnBdaQr9goWjSpj5KvpeAuyeWay-jAGUM2l854YqMRDQUWlqJWHXNgHwE9rpseP4VcOPAKowt3eKE3TYew62nMsnePnDqvm60yiIETFFxkv2uJTsODNM3TvRNcH7lpudCLc_-UFi2pVbPRBdWGn1MB-WXOlzrd1cmLTz-Gtpb_oY99TGE0yJY3UAJXhrZcwJNRdW9606hfVariyQsr1kV235alBN3WRtKjKKK195T9t6kGsMGkpjhAWUNCsHLLg2MII', // Chair from gift list
    imagePosition: '-top-6 -left-4 w-28 h-28 -rotate-6',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX7aiIEJ7Oe9IWXK-zyoC4TpnuBBQ0lHROqIS4JYG9EnyJd6ijpv4m46SP4UN86mWuPlt3tslb2fvInzgwwRpHkiaf-unzPxB_88pS72IP9Yg4lQpC-eGWsvBT1XJlbTV8eoeL1aYQvVNTavpgMCDJFVkKS9qD4W1GG1nn1Huw1I1zHu4-rsy5mb0wLrsQyLVQooKajq__XA7FRs2fQHyI22GTQbZE_4mQa3npAaeSC8v5JjWyWfzaEB0-IFY5TGbwwEsot5RXkFc', // Skincare set from list
    imagePosition: '-top-4 -right-4 w-24 h-24 rotate-12',
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
      <div className="space-y-10 pb-6 mt-4">
        {/* Hero Section / Title */}
        <section className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">Kontrol Listeleri</h2>
          <p className="text-on-surface-variant font-medium text-lg">Hazırlık sürecini huzurla tamamla.</p>
        </section>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 gap-10">
          {checklistCategories.map((category, catIndex) => {
            const progress = getProgress(category.id)
            const isExpanded = expandedCategory === category.id
            const completedCount = category.items.filter((i) => completedChecklistItems.includes(i.id)).length
            const style = categoryStyles[catIndex % categoryStyles.length]

            return (
              <div key={category.id} className="relative group mt-4">
                {/* 3D Break-out Element Illustration */}
                <div className={`absolute ${style.imagePosition} z-10 drop-shadow-2xl`}>
                  <img
                    src={style.image}
                    alt={category.title}
                    className="w-full h-full object-contain group-hover:scale-110 group-hover:rotate-0 transition-transform duration-500 hover:drop-shadow-3xl"
                  />
                </div>

                <div className={`bg-surface-container-lowest rounded-2xl p-8 shadow-card ${style.shadow} relative overflow-hidden border border-white/50`}>
                  <div className="flex flex-col gap-6 relative z-20">
                    {/* Category header */}
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className="flex items-center gap-4 w-full text-left"
                    >
                      <div className={`w-14 h-14 rounded-full ${style.iconBg} flex items-center justify-center ${style.iconColor} shadow-inner`}>
                        <span aria-hidden="true" className="material-symbols-outlined text-2xl">{style.icon}</span>
                      </div>
                      <div className="flex-1 pr-16 md:pr-24">
                        <h3 className="text-2xl font-headline font-bold">{category.title}</h3>
                        <p className="text-xs text-on-surface-variant mt-1 font-body leading-tight">{category.description}</p>
                      </div>
                    </button>

                    {/* Progress section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-end">
                        <span className="text-xs font-label font-bold text-on-surface-variant uppercase tracking-wider">İlerleme</span>
                        <span className={`text-2xl font-headline font-bold ${style.progressColor}`}>{progress}%</span>
                      </div>
                      <div className="h-3 w-full bg-surface-container-highest rounded-full overflow-hidden relative shadow-inner">
                        <div
                          className={`h-full bg-gradient-to-r ${style.progressFrom} ${style.progressTo} rounded-full relative transition-all duration-1000 ease-out`}
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                        </div>
                      </div>
                    </div>

                    {/* Preview Tags */}
                    <div className="flex flex-wrap gap-2 py-2">
                      {category.items.slice(0, 3).map((item) => (
                        <span key={item.id} className="px-4 py-1.5 bg-surface-container-low rounded-full text-[11px] font-bold text-on-surface-variant border border-outline-variant/10 shadow-sm">
                          {item.title.length > 20 ? item.title.substring(0, 20) + '...' : item.title}
                        </span>
                      ))}
                    </div>

                    {/* View list button */}
                    <button
                      onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                      className={`w-full py-4 font-bold font-headline rounded-full hover:opacity-90 active:scale-[0.98] transition-all duration-300 ${style.btnClass}`}
                    >
                      {isExpanded ? 'Listeyi Gizle' : 'Listeyi Görüntüle'} ({completedCount}/{category.items.length})
                    </button>
                  </div>

                  {/* Expanded items */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 mt-4 border-t border-outline-variant/10 space-y-2 relative z-20">
                          {category.items.map((item) => {
                            const isChecked = completedChecklistItems.includes(item.id)
                            return (
                              <button
                                key={item.id}
                                onClick={() => toggleChecklistItem(item.id)}
                                className={cn(
                                  'w-full flex items-start gap-4 p-4 rounded-xl transition-all duration-300 text-left border',
                                  isChecked 
                                    ? 'bg-surface-container/50 border-transparent opacity-70' 
                                    : 'bg-white border-outline-variant/10 hover:shadow-md hover:border-primary/20'
                                )}
                              >
                                <div className={cn(
                                  'w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300 shadow-sm',
                                  isChecked
                                    ? 'bg-gradient-to-br from-tertiary to-tertiary-dim text-white'
                                    : item.priority === 'high'
                                    ? 'bg-surface-container-lowest ring-2 ring-primary/60'
                                    : 'bg-surface-container-low ring-1 ring-outline-variant/30'
                                )}>
                                  {isChecked && <span aria-hidden="true" className="material-symbols-outlined text-[14px]">check</span>}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span className={cn(
                                    'text-sm transition-all font-body font-bold block mb-1.5',
                                    isChecked ? 'text-on-surface-variant line-through' : 'text-on-surface'
                                  )}>
                                    {item.title}
                                  </span>
                                  <p className="text-xs text-on-surface-variant leading-relaxed font-body">{item.description}</p>
                                </div>
                                {item.priority === 'high' && !isChecked && (
                                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-container/30 text-primary">
                                    <span aria-hidden="true" className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
                                  </div>
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
        <div onClick={() => toast.info('Ozel liste olusturma yakinda aktif olacak')} className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 text-on-surface-variant hover:border-primary/40 hover:text-primary transition-all duration-300 cursor-pointer group bg-surface-container-lowest/50 backdrop-blur-sm mt-8">
          <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center group-hover:bg-primary-container/30 group-hover:scale-110 transition-all duration-300 shadow-sm group-hover:shadow-md">
            <span aria-hidden="true" className="material-symbols-outlined text-4xl">add</span>
          </div>
          <span className="font-headline font-bold text-xl">Yeni Liste Ekle</span>
          <p className="text-xs text-on-surface-variant/70 font-body group-hover:text-primary/70 transition-colors">Kendi özel kontrol listenizi oluşturun</p>
        </div>
      </div>

      {/* Floating Action Button (FAB) for very small screens */}
      <div className="fixed bottom-28 right-6 z-50 md:hidden">
        <button onClick={() => toast.info('Ozel liste olusturma yakinda aktif olacak')} className="w-14 h-14 bg-gradient-to-br from-primary to-primary-dim rounded-full shadow-lg shadow-primary/30 flex items-center justify-center text-white active:scale-90 hover:scale-105 transition-all duration-300 border border-white/20">
          <span aria-hidden="true" className="material-symbols-outlined text-3xl">add</span>
        </button>
      </div>
    </MobileLayout>
  )
}
