import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateBabyImage } from '@/lib/ai'
import { toast } from 'sonner'

const ageLabels = ['Yenidogan', '1Y', '2Y', '3Y', '4Y', '5Y']

export default function BabyFace() {
  const { profile, updateProfile } = useStore()
  const [selectedAge, setSelectedAge] = useState(2)
  const [generating, setGenerating] = useState(false)
  const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({})
  const [motherPhoto, setMotherPhoto] = useState(profile?.motherPhoto || '')
  const [fatherPhoto, setFatherPhoto] = useState(profile?.fatherPhoto || '')

  const handlePhotoUpload = (type: 'mother' | 'father') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          const url = ev.target?.result as string
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
    if (!motherPhoto || !fatherPhoto) {
      toast.error('Lutfen her iki fotografi da yukleyin')
      return
    }

    setGenerating(true)
    try {
      const imageUrl = await generateBabyImage({
        motherPhotoUrl: motherPhoto,
        fatherPhotoUrl: fatherPhoto,
        gender: 'boy',
        age: selectedAge,
        style: 'realistic',
      })
      const key = `baby-${selectedAge}`
      setGeneratedImages((prev) => ({ ...prev, [key]: imageUrl }))
      toast.success('Bebek gorseli olusturuldu!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Gorsel olusturulamadi')
    } finally {
      setGenerating(false)
    }
  }

  const currentKey = `baby-${selectedAge}`
  const currentImage = generatedImages[currentKey]

  return (
    <MobileLayout title="Bebek Yuzu" showBack>
      {/* Hero Section */}
      <section className="mb-10 text-center">
        <h1 className="font-display text-4xl font-extrabold text-on-surface tracking-tight mb-4">
          Hayalinizdeki <span className="text-primary italic">Bebegi Gorun</span>
        </h1>
        <p className="text-on-surface-variant text-lg max-w-xl mx-auto">
          Her iki dunyanin en iyisini harmanlayarak gelecekteki mucizenizi gorsellestirin.
        </p>
      </section>

      {/* Main Workspace: Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Left Column: Uploads */}
        <div className="md:col-span-4 flex flex-col gap-6">
          {/* Parent A */}
          <div className="bg-surface-container-lowest glass-card p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary">face</span>
              <h3 className="font-display font-bold text-on-surface">Ebeveyn 1</h3>
            </div>
            <div
              onClick={() => handlePhotoUpload('father')}
              className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors bg-surface-container"
            >
              {fatherPhoto ? (
                <img src={fatherPhoto} alt="Baba" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant gap-2">
                  <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">Foto Yukle</span>
                </div>
              )}
            </div>
          </div>

          {/* Parent B */}
          <div className="bg-surface-container-lowest glass-card p-6 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-secondary">face_3</span>
              <h3 className="font-display font-bold text-on-surface">Ebeveyn 2</h3>
            </div>
            <div
              onClick={() => handlePhotoUpload('mother')}
              className="relative group cursor-pointer aspect-square rounded-lg overflow-hidden border-2 border-dashed border-outline-variant/30 hover:border-primary/50 transition-colors bg-surface-container"
            >
              {motherPhoto ? (
                <img src={motherPhoto} alt="Anne" className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant gap-2">
                  <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                  <span className="text-xs font-semibold uppercase tracking-wider">Foto Yukle</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Generation Preview */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* Preview Canvas */}
          <div className="relative bg-surface-container-lowest glass-card p-8 rounded-lg shadow-2xl overflow-hidden min-h-[400px] flex flex-col items-center justify-center">
            {/* Decorative blurs */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-full flex flex-col items-center">
              {/* Preview Circle */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full p-2 bg-gradient-to-tr from-primary/20 via-surface-container-lowest to-secondary/20 shadow-xl mb-8">
                <div className="w-full h-full rounded-full overflow-hidden bg-surface-container-high relative">
                  {currentImage ? (
                    <img src={currentImage} alt="AI Bebek Onizleme" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      👶
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                </div>
              </div>

              {/* Age Selection */}
              <div className="w-full max-w-sm mb-8 px-4">
                <div className="flex justify-between items-center mb-4">
                  <label className="font-display font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>cake</span>
                    Yas Secin
                  </label>
                  <span className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold">
                    {selectedAge === 0 ? 'Yenidogan' : `${selectedAge} Yas`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={selectedAge}
                  onChange={(e) => setSelectedAge(Number(e.target.value))}
                  className="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-tighter">
                  {ageLabels.map((label) => (
                    <span key={label}>{label}</span>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={generating || !motherPhoto || !fatherPhoto}
                className="group relative px-12 py-5 rounded-full bg-gradient-to-r from-secondary to-secondary-dim text-on-secondary font-display font-bold text-lg shadow-[0_20px_40px_rgba(104,52,235,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50"
              >
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="flex items-center gap-3">
                  {generating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Olusturuluyor...
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">auto_awesome</span>
                      Sihir Olustur
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Features/Tools Bento Pieces */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-5 rounded-lg flex items-center gap-4 group cursor-pointer hover:bg-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary-container">
                <span className="material-symbols-outlined">palette</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm">Stil Filtresi</p>
                <p className="text-xs text-on-surface-variant">Editoryal Parlama</p>
              </div>
            </div>
            <div className="bg-surface-container-low p-5 rounded-lg flex items-center gap-4 group cursor-pointer hover:bg-white transition-colors">
              <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container">
                <span className="material-symbols-outlined">download</span>
              </div>
              <div>
                <p className="font-display font-bold text-sm">HD Aktar</p>
                <p className="text-xs text-on-surface-variant">Baskiya Hazir</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery of generated images */}
      <AnimatePresence>
        {Object.keys(generatedImages).length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8"
          >
            <h3 className="font-display font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">collections</span>
              Galeri ({Object.keys(generatedImages).length} gorsel)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(generatedImages).map(([key, url]) => (
                <button
                  key={key}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    key === currentKey ? 'border-primary' : 'border-outline-variant/30'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info */}
      <p className="text-[10px] text-on-surface-variant/60 text-center mt-6 px-4">
        AI tarafindan olusturulan gorseller eglence amaclidir ve gercek sonuclari garanti etmez.
      </p>
    </MobileLayout>
  )
}
