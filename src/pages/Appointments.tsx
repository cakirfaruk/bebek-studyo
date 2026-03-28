import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Calendar, Clock, MapPin, Stethoscope, Check, Trash2 } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateId, formatDate } from '@/lib/utils'
import type { Appointment } from '@/types'

const appointmentTypes = [
  { value: 'checkup' as const, emoji: '👩‍⚕️', label: 'Kontrol' },
  { value: 'ultrasound' as const, emoji: '🔍', label: 'Ultrason' },
  { value: 'test' as const, emoji: '🧪', label: 'Test/Tahlil' },
  { value: 'vaccination' as const, emoji: '💉', label: 'Aşı' },
  { value: 'other' as const, emoji: '📋', label: 'Diğer' },
]

export default function Appointments() {
  const { appointments, addAppointment, removeAppointment, toggleAppointment } = useStore()
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState<Partial<Appointment>>({
    type: 'checkup',
    title: '',
    date: '',
    time: '',
    doctor: '',
    location: '',
    notes: '',
  })

  const handleSave = () => {
    if (!form.title || !form.date) return
    addAppointment({
      id: generateId(),
      title: form.title,
      date: form.date,
      time: form.time || '',
      doctor: form.doctor,
      location: form.location,
      notes: form.notes,
      type: form.type || 'checkup',
      isCompleted: false,
    })
    setForm({ type: 'checkup', title: '', date: '', time: '', doctor: '', location: '', notes: '' })
    setShowNew(false)
  }

  const upcoming = appointments
    .filter((a) => !a.isCompleted && new Date(a.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const past = appointments
    .filter((a) => a.isCompleted || new Date(a.date) < new Date())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <MobileLayout title="Randevular" showBack>
      <div className="py-4">
        <button
          onClick={() => setShowNew(true)}
          className="w-full h-12 rounded-xl gradient-primary text-white font-semibold text-sm flex items-center justify-center gap-2 mb-6 active:scale-[0.98] transition-transform"
        >
          <Plus className="w-5 h-5" />
          Yeni Randevu Ekle
        </button>

        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white rounded-2xl p-4 border border-warm-border space-y-3">
                <div className="flex gap-2">
                  {appointmentTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setForm({ ...form, type: t.value })}
                      className={`flex-1 py-2 rounded-lg flex flex-col items-center gap-0.5 text-[10px] font-medium ${
                        form.type === t.value ? 'bg-primary-50 border border-primary-300' : 'bg-warm-surface'
                      }`}
                    >
                      <span>{t.emoji}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Randevu başlığı"
                  className="w-full h-11 px-3 rounded-xl bg-warm-surface border border-warm-border focus:border-primary-400 outline-none text-sm"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="h-11 px-3 rounded-xl bg-warm-surface border border-warm-border focus:border-primary-400 outline-none text-sm" />
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="h-11 px-3 rounded-xl bg-warm-surface border border-warm-border focus:border-primary-400 outline-none text-sm" />
                </div>
                <input type="text" value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  placeholder="Doktor adı (opsiyonel)" className="w-full h-11 px-3 rounded-xl bg-warm-surface border border-warm-border outline-none text-sm" />
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Konum (opsiyonel)" className="w-full h-11 px-3 rounded-xl bg-warm-surface border border-warm-border outline-none text-sm" />
                <div className="flex gap-2">
                  <button onClick={() => setShowNew(false)} className="flex-1 h-11 rounded-xl border border-warm-border text-sm font-medium">İptal</button>
                  <button onClick={handleSave} disabled={!form.title || !form.date}
                    className="flex-1 h-11 rounded-xl gradient-primary text-white text-sm font-semibold disabled:opacity-50">Kaydet</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming */}
        <h3 className="font-semibold text-sm text-warm-text mb-3">Yaklaşan Randevular</h3>
        {upcoming.length === 0 ? (
          <div className="bg-warm-surface rounded-xl p-6 text-center mb-6">
            <p className="text-sm text-warm-muted">Yaklaşan randevunuz yok</p>
          </div>
        ) : (
          <div className="space-y-3 mb-6">
            {upcoming.map((apt) => (
              <AppointmentCard key={apt.id} appointment={apt} onToggle={() => toggleAppointment(apt.id)} onRemove={() => removeAppointment(apt.id)} />
            ))}
          </div>
        )}

        {past.length > 0 && (
          <>
            <h3 className="font-semibold text-sm text-warm-text mb-3">Geçmiş</h3>
            <div className="space-y-3">
              {past.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} onToggle={() => toggleAppointment(apt.id)} onRemove={() => removeAppointment(apt.id)} isPast />
              ))}
            </div>
          </>
        )}
      </div>
    </MobileLayout>
  )
}

function AppointmentCard({ appointment, onToggle, onRemove, isPast }: {
  appointment: Appointment; onToggle: () => void; onRemove: () => void; isPast?: boolean
}) {
  const typeEmoji = appointmentTypes.find((t) => t.value === appointment.type)?.emoji || '📋'
  return (
    <div className={`bg-white rounded-xl p-4 border border-warm-border ${isPast ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
            appointment.isCompleted ? 'bg-mint-500 border-mint-500' : 'border-warm-border'
          }`}
        >
          {appointment.isCompleted && <Check className="w-3.5 h-3.5 text-white" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span>{typeEmoji}</span>
            <h4 className={`font-medium text-sm ${appointment.isCompleted ? 'line-through text-warm-muted' : 'text-warm-text'}`}>
              {appointment.title}
            </h4>
          </div>
          <div className="flex flex-wrap gap-3 mt-2 text-xs text-warm-muted">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(appointment.date)}</span>
            {appointment.time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{appointment.time}</span>}
            {appointment.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{appointment.location}</span>}
            {appointment.doctor && <span className="flex items-center gap-1"><Stethoscope className="w-3 h-3" />{appointment.doctor}</span>}
          </div>
        </div>
        <button onClick={onRemove} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50">
          <Trash2 className="w-3.5 h-3.5 text-warm-muted" />
        </button>
      </div>
    </div>
  )
}
