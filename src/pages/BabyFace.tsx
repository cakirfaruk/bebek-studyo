import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateBabyImage } from '@/lib/ai'
import { toast } from 'sonner'

function compressImage(dataUrl: string, maxSize = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      let w = img.width, h = img.height
      if (w > maxSize || h > maxSize) {
        if (w > h) { h = (h / w) * maxSize; w = maxSize }
        else { w = (w / h) * maxSize; h = maxSize }
      }
      canvas.width = w; canvas.height = h
      canvas.getContext('2d')!.drawImage(img, 0, 0, w, h)
      resolve(canvas.toDataURL('image/jpeg', quality))
    }
    img.src = dataUrl
  })
}

const ageLabels = ['Yenidoğan', '1Y', '2Y', '3Y', '4Y', '5Y']

const FATHER_PLACEHOLDER = "https://lh3.googleusercontent.com/aida-public/AB6AXuCQELfm6tYimuH73SQHKAmnHgyReTY3l-oUP3eVlOpv3hul4-QFRnquNbWswTs4Jm7FVxjeOSxPAYMRKiIx1UGvyU1LbEhAgRlkW1FOrxXNoVMeEZrr6ROAJj_g3LzpGnT27TstujVcfuyfJ5j154jhvSNXmQK4-SGt66ptJvDZ_cHgFpCe-8S3xYVcJd_CfEoClpVBRObZxm5f8CI9LEEqs-riS7YmooCJ5xfvkT0_hPiV8oxY38jbGSLlMsB4ArqKT3OfRUH-xJY"
const MOTHER_PLACEHOLDER = "https://lh3.googleusercontent.com/aida-public/AB6AXuC6EwjQkmD5biN_7hFEXjEcGdZ22kR_0wCxISm41nh743GtVfTjxlOIK3G8b4nhSbNXXP70NnR8uBhqIjLSKMaWcqi9GgC5ggiKVcqtHUbRrG9FkAIeOo9gZcWoKK1KovR22ItKYsOrVA2r6cCOrCAckKqMIE4g8PFnQsEPXyzGmNsQ4oUZPnivt9ov_es0Gu2JqCyxgwXGV44DgvdGDcC3RqCxrPUgfCkTlWGe2dOiMH6fZk7B-0EB4xyMQR_ZgN3vfQfDJxhDroA"
const BABY_PLACEHOLDER = "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjFt7yoCeAIkLwyrgxOdy0qcH9T1zBvkNuByfrI3LDcEPjQr6tPuJANZSYAVdvP0WZ0kX-LXca1QTfIjSa7X-a8YDZu-qmMUdsMwCbRvtQD_wDOauIUoESb8DUheIq8FCmE1BtiH0p7mCp6HKLx4rPNW08sD_Jv8rwZ2DW8v5nDIN305uNUbj66EbQ39EybASDuLC6Ri8gQKBZ1bIMmPmALEJQJ5sQNGyHfwRkOVwKDPYvTwYdrHY4v0YZDgCjorNdMTDp3w9uoo"

export default function BabyFace() {
  const { profile, updateProfile } = useStore()
  const [selectedAge, setSelectedAge] = useState(2)
  const [generating, setGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({})
  const [motherPhoto, setMotherPhoto] = useState(profile?.motherPhoto || MOTHER_PLACEHOLDER)
  const [fatherPhoto, setFatherPhoto] = useState(profile?.fatherPhoto || FATHER_PLACEHOLDER)
  const [activeImage, setActiveImage] = useState<string | null>(null) // the currently displaying result

  const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

  const handlePhotoUpload = (type: 'mother' | 'father') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/jpeg,image/png,image/webp'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          toast.error('Desteklenmeyen dosya türü. Lütfen JPEG, PNG veya WebP yükleyin.')
          return
        }
        if (file.size > MAX_FILE_SIZE) {
          toast.error('Dosya boyutu çok büyük. Maksimum 5MB yükleyebilirsiniz.')
          return
        }
        const reader = new FileReader()
        reader.onload = async (ev) => {
          const raw = ev.target?.result as string
          const url = await compressImage(raw)
          if (type === 'mother') {
            setMotherPhoto(url)
            updateProfile({ motherPhoto: url })
          } else {
            setFatherPhoto(url)
            updateProfile({ fatherPhoto: url })
          }
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleGenerate = async () => {
    // Treat placeholder as a valid photo for demo purposes
    if (!motherPhoto || !fatherPhoto) {
      toast.error('Lütfen her iki fotoğrafı da yükleyin')
      return
    }

    setGenerating(true)
    try {
      const imageUrl = await generateBabyImage({
        motherPhotoUrl: motherPhoto,
        fatherPhotoUrl: fatherPhoto,
        gender: profile?.babyGender === 'girl' ? 'girl' : 'boy',
        age: selectedAge,
        style: 'realistic',
      })
      const key = `baby-${selectedAge}-${Date.now()}`
      setGeneratedImages((prev) => ({ ...prev, [key]: imageUrl }))
      setActiveImage(imageUrl)
      toast.success('Bebek görseli oluşturuldu!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Görsel oluşturulamadı')
    } finally {
      setGenerating(false)
    }
  }

  // If no generated image yet, wait for generator, or show placeholder if requested.
  const displayImage = activeImage || BABY_PLACEHOLDER

  return (
    <MobileLayout title="Yapay Zeka Bebek" showBack>
      <div className="space-y-8 pb-10 mt-4">
        
        {/* Hero Section */}
        <section className="text-center mb-6">
          <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface tracking-tight mb-4">
            Gelecekteki <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Bebeğiniz</span>
          </h1>
          <p className="text-on-surface-variant text-[15px] max-w-xl mx-auto font-body font-medium leading-relaxed">
            Her iki dünyanın en iyisini harmanlayarak, AI teknolojisi ile gelecekteki mucizenizi görselleştirin.
          </p>
        </section>

        {/* Main Workspace: Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Uploads */}
          <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4">
            
            {/* Parent A (Father) */}
            <div className="bg-surface-container-lowest glass-card p-5 rounded-[2rem] shadow-card border border-white/60 flex-1 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>face</span>
                  <h3 className="font-headline font-bold text-sm text-on-surface">Ebeveyn 1</h3>
                </div>
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-primary">edit</span>
                </div>
              </div>
              
              <div
                onClick={() => handlePhotoUpload('father')}
                className="relative cursor-pointer aspect-square rounded-[1.25rem] overflow-hidden border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors bg-surface-container-low"
              >
                {fatherPhoto ? (
                  <img src={fatherPhoto} alt="Baba" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant gap-2 transition-transform group-hover:scale-105">
                    <span aria-hidden="true" className="material-symbols-outlined text-3xl opacity-50">add_a_photo</span>
                    <span className="text-[10px] font-extrabold font-headline uppercase tracking-widest opacity-70">Foto Yükle</span>
                  </div>
                )}
              </div>
            </div>

            {/* Parent B (Mother) */}
            <div className="bg-surface-container-lowest glass-card p-5 rounded-[2rem] shadow-card border border-white/60 flex-1 relative overflow-hidden group">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>face_3</span>
                  <h3 className="font-headline font-bold text-sm text-on-surface">Ebeveyn 2</h3>
                </div>
                <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center">
                  <span aria-hidden="true" className="material-symbols-outlined text-[14px] text-secondary">edit</span>
                </div>
              </div>
              
              <div
                onClick={() => handlePhotoUpload('mother')}
                className="relative cursor-pointer aspect-square rounded-[1.25rem] overflow-hidden border-2 border-dashed border-outline-variant/30 hover:border-secondary/50 transition-colors bg-surface-container-low"
              >
                {motherPhoto ? (
                  <img src={motherPhoto} alt="Anne" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant gap-2 transition-transform group-hover:scale-105">
                    <span aria-hidden="true" className="material-symbols-outlined text-3xl opacity-50">add_a_photo</span>
                    <span className="text-[10px] font-extrabold font-headline uppercase tracking-widest opacity-70">Foto Yükle</span>
                  </div>
                )}
              </div>
            </div>
            
          </div>

          {/* Right Column: Generation Preview */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Preview Canvas */}
            <div className="relative bg-surface-container-lowest glass-card px-6 py-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/60 overflow-hidden flex flex-col items-center justify-center">
              
              {/* Decorative blurs */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none mix-blend-multiply" />

              <div className="relative z-10 w-full flex flex-col items-center">
                
                {/* Preview Circle Container */}
                <div className="w-56 h-56 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-primary/20 via-surface-container-lowest to-secondary/20 shadow-xl mb-10 group relative">
                  
                  {/* Decorative particles around image */}
                  <div className="absolute -inset-4 border border-outline-variant/10 rounded-full animate-[spin_30s_linear_infinite]" />
                  <div className="absolute -inset-8 border border-outline-variant/10 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-50" />
                  
                  <div className="w-full h-full rounded-full overflow-hidden bg-surface-container relative shadow-inner">
                    <img 
                      src={displayImage} 
                      alt="AI Bebek Önizleme" 
                      className={`w-full h-full object-cover transition-transform duration-1000 ${generating ? 'scale-110 blur-sm brightness-75' : 'scale-100 group-hover:scale-105'}`} 
                    />
                    
                    {/* Generative scanning effect overlay */}
                    {generating && (
                      <div className="absolute inset-0">
                         <div className="absolute inset-0 bg-primary/20 mix-blend-overlay animate-pulse" />
                         <div className="absolute inset-x-0 h-1 bg-white/50 blur-sm animate-[scan_2s_ease-in-out_infinite]" />
                      </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Age Selection */}
                <div className="w-full max-w-sm mb-10 px-4">
                  <div className="flex justify-between items-center mb-6">
                    <label className="font-headline font-bold text-on-surface flex items-center gap-2">
                      <span aria-hidden="true" className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
                      Yaş Seçimi
                    </label>
                    <span className="bg-primary-container text-on-primary-container px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest shadow-sm border border-primary/10">
                      {selectedAge === 0 ? 'Yenidoğan' : `${selectedAge} Yaş`}
                    </span>
                  </div>
                  
                  <div className="relative h-2 bg-surface-container-highest rounded-full">
                     <div 
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300 pointer-events-none"
                        style={{ width: `${(selectedAge / 5) * 100}%` }}
                     />
                    <input
                      type="range"
                      min="0"
                      max="5"
                      step="1"
                      value={selectedAge}
                      onChange={(e) => setSelectedAge(Number(e.target.value))}
                      className="absolute inset-0 w-full h-2 appearance-none bg-transparent cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-secondary [&::-moz-range-thumb]:w-6 [&::-moz-range-thumb]:h-6 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:shadow-lg [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-secondary"
                    />
                  </div>
                  
                  <div className="flex justify-between mt-4 text-[10px] font-extrabold text-on-surface-variant uppercase tracking-widest px-1">
                    {ageLabels.map((label, idx) => (
                      <span 
                        key={idx} 
                        className={`transition-colors duration-300 ${selectedAge === idx ? 'text-secondary drop-shadow-sm' : ''}`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerate}
                  disabled={generating || !motherPhoto || !fatherPhoto}
                  className="w-full max-w-xs group relative px-8 py-5 rounded-[2rem] bg-gradient-to-r from-secondary to-secondary-dim text-white font-headline font-extrabold text-base shadow-[0_20px_40px_rgba(104,52,235,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 border border-white/10"
                >
                  <div className="absolute inset-0 rounded-[2rem] bg-white opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
                  
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="tracking-wide uppercase text-sm">Oluşturuluyor...</span>
                    </>
                  ) : (
                    <>
                      <span aria-hidden="true" className="material-symbols-outlined text-[24px]">auto_awesome</span>
                      <span className="tracking-widest uppercase text-sm">Sihri Başlat</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Features/Tools Bento Pieces */}
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-surface-container-lowest glass-card p-5 rounded-2xl flex items-center gap-4 group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all border border-white/60">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-container/30 flex items-center justify-center text-tertiary group-hover:bg-tertiary-container transition-colors shadow-inner">
                  <span aria-hidden="true" className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-[15px] text-on-surface">Stil Filtresi</p>
                  <p className="text-[12px] font-medium font-body text-on-surface-variant">Editoryal Çekim</p>
                </div>
              </div>
              
              <div className="bg-surface-container-lowest glass-card p-5 rounded-2xl flex items-center gap-4 group cursor-pointer hover:-translate-y-1 hover:shadow-lg transition-all border border-white/60">
                <div className="w-14 h-14 rounded-2xl bg-primary-container/30 flex items-center justify-center text-primary group-hover:bg-primary-container transition-colors shadow-inner">
                  <span aria-hidden="true" className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
                </div>
                <div>
                  <p className="font-headline font-bold text-[15px] text-on-surface">HD Çıktı</p>
                  <p className="text-[12px] font-medium font-body text-on-surface-variant">Baskıya Hazır</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Gallery of generated images */}
        <AnimatePresence>
          {Object.keys(generatedImages).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 pt-4"
            >
              <h3 className="font-headline font-bold text-xl text-on-surface mb-5 flex items-center gap-2">
                <span aria-hidden="true" className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>collections_bookmark</span>
                Galeri <span className="text-sm font-body text-on-surface-variant ml-1 font-medium">({Object.keys(generatedImages).length} görsel)</span>
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {Object.entries(generatedImages).map(([key, url]) => (
                  <button
                    key={key}
                    onClick={() => setActiveImage(url)}
                    className={`aspect-square rounded-[1.25rem] overflow-hidden shadow-sm transition-all duration-300 relative group ${
                      url === activeImage 
                        ? 'border-4 border-secondary shadow-lg scale-105 z-10' 
                        : 'border-2 border-transparent hover:border-white/50 hover:shadow-md'
                    }`}
                  >
                    <img src={url} alt="Galeri" className="w-full h-full object-cover" />
                    {url !== activeImage && (
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        <div className="pt-4 flex justify-center pb-20">
          <p className="inline-flex items-center gap-2 text-[11px] text-on-surface-variant/60 font-body font-medium bg-surface-container-low/50 px-4 py-2.5 rounded-xl border border-outline-variant/5">
            <span aria-hidden="true" className="material-symbols-outlined text-[14px]">info</span>
            AI tarafından oluşturulan görseller eğlence amaçlıdır.
          </p>
        </div>
        
      </div>
    </MobileLayout>
  )
}
