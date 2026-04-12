import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Calendar, ArrowRight, Check } from 'lucide-react'
import { useStore } from '@/stores/useStore'

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

const steps = ['Kişisel Bilgiler', 'Fotoğraflar', 'Bebek Bilgileri']

export default function ProfileSetup() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const { profile, updateProfile, segment } = useStore()
  const [form, setForm] = useState({
    motherName: profile?.motherName || '',
    fatherName: profile?.fatherName || '',
    motherBirthDate: profile?.motherBirthDate || '',
    fatherBirthDate: profile?.fatherBirthDate || '',
    dueDate: profile?.dueDate || '',
    babyGender: profile?.babyGender || 'unknown' as 'boy' | 'girl' | 'unknown',
    motherPhoto: profile?.motherPhoto || '',
    fatherPhoto: profile?.fatherPhoto || '',
  })

  const handlePhotoUpload = (type: 'mother' | 'father') => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = async (ev) => {
          const raw = ev.target?.result as string
          const url = await compressImage(raw)
          if (type === 'mother') setForm({ ...form, motherPhoto: url })
          else setForm({ ...form, fatherPhoto: url })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const [dateErrors, setDateErrors] = useState<Record<string, string>>({})

  const today = new Date().toISOString().split('T')[0]

  const validateBirthDate = (field: string, value: string) => {
    if (value && value > today) {
      setDateErrors((prev) => ({ ...prev, [field]: 'Doğum tarihi gelecekte olamaz' }))
    } else {
      setDateErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const validateDueDate = (value: string) => {
    if (value && value <= today) {
      setDateErrors((prev) => ({ ...prev, dueDate: 'Tahmini doğum tarihi gelecekte olmalıdır' }))
    } else {
      setDateErrors((prev) => {
        const next = { ...prev }
        delete next.dueDate
        return next
      })
    }
  }

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1)
    } else {
      updateProfile(form)
      navigate('/')
    }
  }

  const isStepValid = () => {
    if (step === 0) {
      const hasNames = form.motherName.length > 0 && form.fatherName.length > 0
      const noBirthErrors = !dateErrors.motherBirthDate && !dateErrors.fatherBirthDate
      return hasNames && noBirthErrors
    }
    if (step === 1) return true
    if (step === 2) {
      if (segment === 'expecting') return form.dueDate.length > 0 && !dateErrors.dueDate
      return !dateErrors.dueDate
    }
    return true
  }

  return (
    <div className="min-h-dvh page-bg px-6 pt-12 pb-8">
      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`h-1.5 flex-1 rounded-full transition-all ${i <= step ? 'bg-primary-500' : 'bg-warm-border'}`} />
              {i < steps.length - 1 && <div className="w-0" />}
            </div>
          ))}
        </div>

        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <>
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">👫</span>
                <h2 className="font-display font-bold text-xl text-warm-text">Kendinizi Tanıtın</h2>
                <p className="text-warm-muted text-sm mt-1">AI önerilerimiz için bilgileriniz gerekli</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-warm-text mb-1.5 block">Anne Adı</label>
                  <input
                    type="text"
                    value={form.motherName}
                    onChange={(e) => setForm({ ...form, motherName: e.target.value })}
                    placeholder="Anne adını girin"
                    className="w-full h-12 px-4 input-field"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-warm-text mb-1.5 block">Baba Adı</label>
                  <input
                    type="text"
                    value={form.fatherName}
                    onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
                    placeholder="Baba adını girin"
                    className="w-full h-12 px-4 input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-warm-text mb-1.5 block">Anne Doğum Tarihi</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
                      <input
                        type="date"
                        value={form.motherBirthDate}
                        max={today}
                        onChange={(e) => {
                          setForm({ ...form, motherBirthDate: e.target.value })
                          validateBirthDate('motherBirthDate', e.target.value)
                        }}
                        className="w-full h-12 pl-10 pr-3 input-field text-sm"
                      />
                    </div>
                    {dateErrors.motherBirthDate && (
                      <p className="text-red-500 text-xs mt-1">{dateErrors.motherBirthDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-warm-text mb-1.5 block">Baba Doğum Tarihi</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
                      <input
                        type="date"
                        value={form.fatherBirthDate}
                        max={today}
                        onChange={(e) => {
                          setForm({ ...form, fatherBirthDate: e.target.value })
                          validateBirthDate('fatherBirthDate', e.target.value)
                        }}
                        className="w-full h-12 pl-10 pr-3 input-field text-sm"
                      />
                    </div>
                    {dateErrors.fatherBirthDate && (
                      <p className="text-red-500 text-xs mt-1">{dateErrors.fatherBirthDate}</p>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Step 1: Photos */}
          {step === 1 && (
            <>
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">📸</span>
                <h2 className="font-display font-bold text-xl text-warm-text">Fotoğraflarınız</h2>
                <p className="text-warm-muted text-sm mt-1">Bebek yüzü tahmini için fotoğraf ekleyin</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {(['mother', 'father'] as const).map((type) => {
                  const photo = type === 'mother' ? form.motherPhoto : form.fatherPhoto
                  return (
                    <button
                      key={type}
                      onClick={() => handlePhotoUpload(type)}
                      className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/50 hover:border-primary-400 glass-card flex flex-col items-center justify-center gap-3 transition-all overflow-hidden"
                    >
                      {photo ? (
                        <img src={photo} alt={type} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="w-16 h-16 rounded-full bg-primary-50 flex items-center justify-center">
                            <Camera className="w-7 h-7 text-primary-400" />
                          </div>
                          <span className="text-sm text-warm-muted font-medium">
                            {type === 'mother' ? 'Anne Fotoğrafı' : 'Baba Fotoğrafı'}
                          </span>
                        </>
                      )}
                    </button>
                  )
                })}
              </div>

              <p className="text-xs text-warm-muted text-center">
                İsteğe bağlı - daha sonra da ekleyebilirsiniz
              </p>
            </>
          )}

          {/* Step 2: Baby Info */}
          {step === 2 && (
            <>
              <div className="text-center mb-6">
                <span className="text-4xl mb-3 block">👶</span>
                <h2 className="font-display font-bold text-xl text-warm-text">Bebek Bilgileri</h2>
                <p className="text-warm-muted text-sm mt-1">
                  {segment === 'expecting' ? 'Tahmini doğum tarihinizi girin' : 'Geleceği hayal edelim'}
                </p>
              </div>

              <div className="space-y-5">
                {(segment === 'expecting' || segment === 'planner') && (
                  <div>
                    <label className="text-sm font-medium text-warm-text mb-1.5 block">
                      {segment === 'expecting' ? 'Tahmini Doğum Tarihi' : 'Planlanan Tarih (Opsiyonel)'}
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-warm-muted" />
                      <input
                        type="date"
                        value={form.dueDate}
                        min={segment === 'expecting' ? today : undefined}
                        onChange={(e) => {
                          setForm({ ...form, dueDate: e.target.value })
                          if (segment === 'expecting') validateDueDate(e.target.value)
                        }}
                        className="w-full h-12 pl-10 pr-3 input-field"
                      />
                    </div>
                    {dateErrors.dueDate && (
                      <p className="text-red-500 text-xs mt-1">{dateErrors.dueDate}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-warm-text mb-3 block">Cinsiyet</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'girl', emoji: '👧', label: 'Kız' },
                      { value: 'boy', emoji: '👦', label: 'Erkek' },
                      { value: 'unknown', emoji: '🎁', label: 'Sürpriz' },
                    ].map((g) => (
                      <button
                        key={g.value}
                        onClick={() => setForm({ ...form, babyGender: g.value as 'boy' | 'girl' | 'unknown' })}
                        className={`h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                          form.babyGender === g.value
                            ? 'border-primary-500 bg-primary-50/80'
                            : 'border-white/50 glass-card'
                        }`}
                      >
                        <span className="text-2xl">{g.emoji}</span>
                        <span className="text-xs font-medium text-warm-text">{g.label}</span>
                        {form.babyGender === g.value && (
                          <Check className="w-3.5 h-3.5 text-primary-500 absolute" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Navigation */}
        <div className="flex gap-3 mt-10 min-w-0">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="h-14 px-6 shrink-0 rounded-2xl border border-outline-variant/20 text-on-surface font-medium"
            >
              Geri
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1 min-w-0 h-14 rounded-2xl bg-gradient-to-r from-secondary to-secondary-dim text-white font-semibold flex items-center justify-center gap-2 shadow-lg shadow-secondary/30 active:scale-[0.98] transition-transform disabled:opacity-50"
          >
            {step === 2 ? 'Tamamla' : 'Devam'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
