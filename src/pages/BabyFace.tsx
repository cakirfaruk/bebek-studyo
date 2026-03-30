import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Wand2, Download, Share2, ChevronLeft, ChevronRight, Palette, Sparkles } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateBabyImage } from '@/lib/ai'
import { toast } from 'sonner'

const styles = [
  { id: 'realistic' as const, label: 'Gerçekçi', emoji: '📸', desc: 'Fotoğraf kalitesi' },
  { id: 'soft' as const, label: 'Yumuşak', emoji: '🎨', desc: 'Rüya gibi' },
  { id: 'artistic' as const, label: 'Sanatsal', emoji: '🖼️', desc: 'Sulu boya' },
]

const ages = [
  { value: 0, label: 'Yenidoğan' },
  { value: 1, label: '1 Yaş' },
  { value: 3, label: '3 Yaş' },
  { value: 5, label: '5 Yaş' },
  { value: 7, label: '7 Yaş' },
  { value: 10, label: '10 Yaş' },
  { value: 14, label: '14 Yaş' },
  { value: 18, label: '18 Yaş' },
  { value: 25, label: '25 Yaş' },
]

export default function BabyFace() {
  const { profile, updateProfile } = useStore()
  const [selectedStyle, setSelectedStyle] = useState<'realistic' | 'soft' | 'artistic'>('realistic')
  const [selectedAge, setSelectedAge] = useState(0)
  const [selectedGender, setSelectedGender] = useState<'boy' | 'girl'>(profile?.babyGender === 'girl' ? 'girl' : 'boy')
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
      toast.error('Lütfen her iki fotoğrafı da yükleyin')
      return
    }

    setGenerating(true)
    try {
      const imageUrl = await generateBabyImage({
        motherPhotoUrl: motherPhoto,
        fatherPhotoUrl: fatherPhoto,
        gender: selectedGender,
        age: ages[selectedAge].value,
        style: selectedStyle,
      })
      const key = `${selectedGender}-${ages[selectedAge].value}-${selectedStyle}`
      setGeneratedImages((prev) => ({ ...prev, [key]: imageUrl }))
      toast.success('Bebek görseli oluşturuldu!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Görsel oluşturulamadı')
    } finally {
      setGenerating(false)
    }
  }

  const currentKey = `${selectedGender}-${ages[selectedAge].value}-${selectedStyle}`
  const currentImage = generatedImages[currentKey]

  return (
    <MobileLayout title="Bebek Yüzü" showBack>
      <div className="py-4">
        {/* Parent Photos */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {(['mother', 'father'] as const).map((type) => {
            const photo = type === 'mother' ? motherPhoto : fatherPhoto
            return (
              <button
                key={type}
                onClick={() => handlePhotoUpload(type)}
                className="aspect-square rounded-2xl border-2 border-dashed border-white/50 hover:border-primary-400 glass-card flex flex-col items-center justify-center gap-2 transition-all overflow-hidden relative"
              >
                {photo ? (
                  <>
                    <img src={photo} alt={type} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white opacity-0 hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="absolute bottom-2 left-2 text-xs bg-black/50 text-white px-2 py-0.5 rounded-full">
                      {type === 'mother' ? '👩 Anne' : '👨 Baba'}
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-14 h-14 rounded-full bg-primary-50 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-primary-400" />
                    </div>
                    <span className="text-xs text-warm-muted font-medium">
                      {type === 'mother' ? 'Anne Fotoğrafı' : 'Baba Fotoğrafı'}
                    </span>
                  </>
                )}
              </button>
            )
          })}
        </div>

        {/* Gender Selection */}
        <div className="flex gap-2 mb-4">
          {[
            { value: 'girl' as const, emoji: '👧', label: 'Kız' },
            { value: 'boy' as const, emoji: '👦', label: 'Erkek' },
          ].map((g) => (
            <button
              key={g.value}
              onClick={() => setSelectedGender(g.value)}
              className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-medium text-sm transition-all ${
                selectedGender === g.value
                  ? 'gradient-primary text-white shadow-glow-primary'
                  : 'glass-card text-warm-text'
              }`}
            >
              <span>{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>

        {/* Style Selection */}
        <div className="flex gap-2 mb-4">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStyle(s.id)}
              className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                selectedStyle === s.id
                  ? 'bg-secondary-500 text-white shadow-glow-secondary'
                  : 'glass-card text-warm-text'
              }`}
            >
              <span className="text-lg">{s.emoji}</span>
              <span className="text-xs font-medium">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Age Slider */}
        <div className="glass-card p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-warm-text flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-secondary-500" />
              Yaş: {ages[selectedAge].label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedAge(Math.max(0, selectedAge - 1))}
              className="w-8 h-8 rounded-full bg-warm-surface flex items-center justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex-1 flex gap-1">
              {ages.map((a, i) => (
                <button
                  key={a.value}
                  onClick={() => setSelectedAge(i)}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    i === selectedAge ? 'bg-secondary-500 scale-y-150' : i < selectedAge ? 'bg-secondary-200' : 'bg-warm-border'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setSelectedAge(Math.min(ages.length - 1, selectedAge + 1))}
              className="w-8 h-8 rounded-full bg-warm-surface flex items-center justify-center"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={generating || !motherPhoto || !fatherPhoto}
          className="w-full h-14 rounded-2xl gradient-primary text-white font-semibold flex items-center justify-center gap-2 shadow-glow-primary active:scale-[0.98] transition-transform disabled:opacity-50 mb-6"
        >
          {generating ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Oluşturuluyor...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5" />
              Bebek Yüzü Oluştur
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">1 Kredi</span>
            </>
          )}
        </button>

        {/* Result */}
        <AnimatePresence>
          {currentImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-card overflow-hidden shadow-card"
            >
              <div className="aspect-square bg-warm-surface">
                <img src={currentImage} alt="Bebek tahmini" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm text-warm-text">
                    {selectedGender === 'girl' ? '👧 Kız' : '👦 Erkek'} - {ages[selectedAge].label}
                  </h3>
                  <p className="text-xs text-warm-muted">{styles.find((s) => s.id === selectedStyle)?.label} stil</p>
                </div>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-xl bg-warm-surface flex items-center justify-center hover:bg-warm-border transition-colors">
                    <Download className="w-5 h-5 text-warm-text" />
                  </button>
                  <button className="w-10 h-10 rounded-xl bg-warm-surface flex items-center justify-center hover:bg-warm-border transition-colors">
                    <Share2 className="w-5 h-5 text-warm-text" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery of generated images */}
        {Object.keys(generatedImages).length > 1 && (
          <div className="mt-6">
            <h3 className="font-semibold text-sm text-warm-text mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-accent-500" />
              Galeri ({Object.keys(generatedImages).length} görsel)
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(generatedImages).map(([key, url]) => (
                <button
                  key={key}
                  onClick={() => {
                    const [g, a, s] = key.split('-')
                    setSelectedGender(g as 'boy' | 'girl')
                    setSelectedAge(ages.findIndex((age) => age.value === parseInt(a)))
                    setSelectedStyle(s as 'realistic' | 'soft' | 'artistic')
                  }}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    key === currentKey ? 'border-primary-500' : 'border-warm-border'
                  }`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        <p className="text-[10px] text-warm-muted/60 text-center mt-6 px-4">
          AI tarafından oluşturulan görseller eğlence amaçlıdır ve gerçek sonuçları garanti etmez.
        </p>
      </div>
    </MobileLayout>
  )
}
