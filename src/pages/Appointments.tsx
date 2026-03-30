import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Calendar, Clock, MapPin, Check, Trash2 } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateId, formatDate } from '@/lib/utils'
import type { Appointment } from '@/types'

const appointmentTypes = [
  { value: 'checkup' as const, emoji: '👩‍⚕️', label: 'Kontrol' },
  { value: 'ultrasound' as const, emoji: '🔍', label: 'Ultrason' },
  { value: 'test' as const, emoji: '🧪', label: 'Test/Tahlil' },
  { value: 'vaccination' as const, emoji: '💉', label: 'Asi' },
  { value: 'other' as const, emoji: '📋', label: 'Diger' },
]

const typeAccentColors: Record<string, { iconBg: string; iconColor: string; accent: string }> = {
  checkup: { iconBg: 'bg-primary-container/30', iconColor: 'text-primary', accent: 'bg-primary' },
  ultrasound: { iconBg: 'bg-secondary-container/30', iconColor: 'text-secondary', accent: 'bg-secondary' },
  test: { iconBg: 'bg-tertiary-container/30', iconColor: 'text-tertiary', accent: 'bg-tertiary' },
  vaccination: { iconBg: 'bg-primary-container/30', iconColor: 'text-primary-dim', accent: 'bg-primary-dim' },
  other: { iconBg: 'bg-surface-container-high', iconColor: 'text-on-surface-variant', accent: 'bg-outline' },
}

// Generate week days around today
function getWeekDays() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))

  const days = []
  const dayNames = ['Pzt', 'Sal', 'Car', 'Per', 'Cum', 'Cmt', 'Paz']
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push({
      name: dayNames[i],
      date: d.getDate(),
      fullDate: d.toISOString().split('T')[0],
      isToday: d.toDateString() === today.toDateString(),
    })
  }
  return days
}

export default function Appointments() {
  const { appointments, addAppointment, removeAppointment, toggleAppointment } = useStore()
  const [showNew, setShowNew] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [form, setForm] = useState<Partial<Appointment>>({
    type: 'checkup',
    title: '',
    date: '',
    time: '',
    doctor: '',
    location: '',
    notes: '',
  })

  const weekDays = getWeekDays()
  const currentMonth = new Date().toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })

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
      <div className="space-y-10 pb-6">
        {/* Horizontal Week Calendar Strip */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-on-surface capitalize">{currentMonth}</h2>
            <Calendar className="w-5 h-5 text-outline" />
          </div>
          <div className="flex justify-between items-center overflow-x-auto pb-2 gap-3">
            {weekDays.map((day) => (
              <button
                key={day.fullDate}
                onClick={() => setSelectedDate(day.fullDate)}
                className={`flex flex-col items-center min-w-[3.5rem] p-3 rounded-xl transition-all ${
                  day.isToday
                    ? 'bg-gradient-to-br from-secondary to-secondary-dim text-white shadow-lg shadow-secondary/20 scale-105 min-w-[4rem] p-4'
                    : selectedDate === day.fullDate
                    ? 'bg-primary-container/30 text-primary'
                    : 'bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span className={`text-xs font-medium uppercase font-display ${day.isToday ? 'font-bold' : ''}`}>{day.name}</span>
                <span className={`text-lg font-bold ${day.isToday ? 'text-xl font-extrabold' : ''}`}>{day.date}</span>
                {day.isToday && <div className="w-1.5 h-1.5 bg-white rounded-full mt-1" />}
              </button>
            ))}
          </div>
        </section>

        {/* Add new appointment button */}
        <button
          onClick={() => setShowNew(true)}
          className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-dim text-white font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yeni Randevu Ekle
        </button>

        {/* New appointment form */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-2xl p-5 space-y-3">
                <div className="flex gap-2">
                  {appointmentTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setForm({ ...form, type: t.value })}
                      className={`flex-1 py-2.5 rounded-xl flex flex-col items-center gap-0.5 text-[10px] font-medium transition-all ${
                        form.type === t.value
                          ? 'bg-secondary-container text-on-secondary-container'
                          : 'bg-surface-container-low text-on-surface-variant'
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
                  placeholder="Randevu basligi"
                  className="w-full py-3 px-4 rounded-full bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <input type="text" value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  placeholder="Doktor adi (opsiyonel)" className="w-full py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Konum (opsiyonel)" className="w-full py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                <div className="flex gap-2 pt-1">
                  <button onClick={() => setShowNew(false)}
                    className="flex-1 py-3 rounded-full bg-surface-container-low text-on-surface-variant font-bold text-sm hover:bg-surface-container-high transition-colors">
                    Iptal
                  </button>
                  <button onClick={handleSave} disabled={!form.title || !form.date}
                    className="flex-1 py-3 rounded-full bg-gradient-to-r from-secondary to-secondary-dim text-white font-bold text-sm shadow-lg shadow-secondary/20 disabled:opacity-50">
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming Appointments */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-on-surface">Yaklasan Randevular</h3>
            <span className="text-sm font-semibold text-primary">Tumunu Gor</span>
          </div>
          {upcoming.length === 0 ? (
            <div className="bg-surface-container-low rounded-2xl p-8 text-center">
              <p className="text-sm text-on-surface-variant font-body">Yaklasan randevunuz yok</p>
            </div>
          ) : (
            <div className="space-y-4">
              {upcoming.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} onToggle={() => toggleAppointment(apt.id)} onRemove={() => removeAppointment(apt.id)} />
              ))}
            </div>
          )}
        </section>

        {/* Past Appointments */}
        {past.length > 0 && (
          <section className="space-y-4">
            <h3 className="font-display font-bold text-xl text-on-surface opacity-60">Gecmis Randevular</h3>
            <div className="space-y-3">
              {past.map((apt) => (
                <AppointmentCard key={apt.id} appointment={apt} onToggle={() => toggleAppointment(apt.id)} onRemove={() => removeAppointment(apt.id)} isPast />
              ))}
            </div>
          </section>
        )}
      </div>
    </MobileLayout>
  )
}

function AppointmentCard({ appointment, onToggle, onRemove, isPast }: {
  appointment: Appointment; onToggle: () => void; onRemove: () => void; isPast?: boolean
}) {
  const typeEmoji = appointmentTypes.find((t) => t.value === appointment.type)?.emoji || '📋'
  const colors = typeAccentColors[appointment.type] || typeAccentColors.other

  return (
    <div className={`bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm relative ${isPast ? 'opacity-60 grayscale-[0.2]' : ''}`}>
      {/* Colored accent bar on the left */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.accent} rounded-l-2xl`} />

      <div className="p-5 pl-6 flex gap-4">
        <div className={`w-14 h-14 rounded-2xl ${colors.iconBg} flex items-center justify-center flex-shrink-0`}>
          <span className="text-2xl">{typeEmoji}</span>
        </div>
        <div className="flex-grow space-y-2 min-w-0">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-display font-bold text-on-surface leading-tight">{appointment.title}</h4>
              {appointment.doctor && (
                <p className="text-on-surface-variant text-sm font-medium font-body">{appointment.doctor}</p>
              )}
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {!isPast && (
                <button
                  onClick={onToggle}
                  className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                    appointment.isCompleted ? 'bg-tertiary text-on-tertiary' : 'bg-surface-container-high'
                  }`}
                >
                  {appointment.isCompleted && <Check className="w-3.5 h-3.5" />}
                </button>
              )}
              <button onClick={onRemove} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-error-container/20">
                <Trash2 className="w-3.5 h-3.5 text-on-surface-variant" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-semibold font-body">{formatDate(appointment.date)}</span>
            </div>
            {appointment.time && (
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-semibold font-body">{appointment.time}</span>
              </div>
            )}
            {appointment.location && (
              <div className="flex items-center gap-1.5 text-on-surface-variant">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-semibold font-body">{appointment.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
