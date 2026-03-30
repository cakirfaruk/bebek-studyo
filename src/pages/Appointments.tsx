import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

const typeIcons: Record<string, { icon: string; iconBg: string; iconColor: string; fillStyle?: string }> = {
  checkup: { icon: 'medical_services', iconBg: 'bg-primary-container/30', iconColor: 'text-primary', fillStyle: "'FILL' 1" },
  ultrasound: { icon: 'radiology', iconBg: 'bg-secondary-container/30', iconColor: 'text-secondary', fillStyle: "'FILL' 1" },
  test: { icon: 'biotech', iconBg: 'bg-tertiary-container/30', iconColor: 'text-tertiary', fillStyle: "'FILL' 1" },
  vaccination: { icon: 'vaccines', iconBg: 'bg-tertiary-container/30', iconColor: 'text-tertiary', fillStyle: "'FILL' 1" },
  other: { icon: 'stethoscope', iconBg: 'bg-surface-container-high', iconColor: 'text-outline' },
}

// Generate week days around today
function getWeekDays() {
  const today = new Date()
  const dayOfWeek = today.getDay()
  const monday = new Date(today)
  monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7))

  const days = []
  const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz']
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
  const { appointments, addAppointment, removeAppointment } = useStore()
  const [showNew, setShowNew] = useState(false)
  const [_selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
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
      <div className="space-y-10">
        {/* Horizontal Week Calendar Selector */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-lg text-on-surface capitalize">{currentMonth}</h2>
            <span className="material-symbols-outlined text-outline">calendar_month</span>
          </div>
          <div className="flex justify-between items-center overflow-x-auto pb-2 gap-3 no-scrollbar">
            {weekDays.map((day) => (
              <button
                key={day.fullDate}
                onClick={() => setSelectedDate(day.fullDate)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                  day.isToday
                    ? 'min-w-[4rem] p-4 bg-gradient-to-br from-secondary to-secondary-dim text-white shadow-lg shadow-secondary/20 scale-105'
                    : 'min-w-[3.5rem] bg-surface-container-low text-on-surface-variant'
                }`}
              >
                <span className={`text-xs font-medium uppercase font-display ${day.isToday ? 'font-bold' : ''}`}>{day.name}</span>
                <span className={`font-bold ${day.isToday ? 'text-xl font-extrabold' : 'text-lg'}`}>{day.date}</span>
                {day.isToday && <div className="w-1.5 h-1.5 bg-white rounded-full mt-1"></div>}
              </button>
            ))}
          </div>
        </section>

        {/* New appointment form */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="glass-card rounded-lg p-5 space-y-3">
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
                  placeholder="Randevu başlığı"
                  className="w-full py-3 px-4 rounded-full bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                </div>
                <input type="text" value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                  placeholder="Doktor adı (opsiyonel)" className="w-full py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                <input type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                  placeholder="Konum (opsiyonel)" className="w-full py-3 px-4 rounded-xl bg-surface-container text-on-surface font-body text-sm outline-none focus:ring-2 focus:ring-primary/20" />
                <div className="flex gap-2 pt-1">
                  <button onClick={() => setShowNew(false)}
                    className="flex-1 py-3 rounded-full bg-surface-container-low text-on-surface-variant font-bold text-sm hover:bg-surface-container-high transition-colors">
                    İptal
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

        {/* Upcoming Appointments Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-xl text-on-surface">Yaklaşan Randevular</h3>
            <span className="text-sm font-semibold text-primary">Tümünü Gör</span>
          </div>

          {upcoming.length === 0 && past.length === 0 ? (
            <>
              {/* Default showcase cards when no appointments exist */}
              {/* Appointment Card 1 with decorative breakout */}
              <div className="relative group">
                <div className="absolute -top-4 -right-2 w-24 h-24 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500 text-6xl flex items-center justify-center">
                  💖
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-6 flex gap-6 shadow-sm border border-outline-variant/10 relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container/30 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-display font-bold text-lg text-on-surface leading-tight">Aylık Doktor Kontrolü</h4>
                        <p className="text-on-surface-variant text-sm font-medium">Dr. Selin Yılmaz</p>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Bugün</span>
                    </div>
                    <div className="flex items-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <span className="material-symbols-outlined text-lg">event</span>
                        <span className="text-xs font-semibold">15 Temmuz</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <span className="material-symbols-outlined text-lg">schedule</span>
                        <span className="text-xs font-semibold">10:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Card 2 */}
              <div className="bg-surface-container-lowest rounded-lg p-6 flex gap-6 shadow-sm border border-outline-variant/10 relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-tertiary-container/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
                </div>
                <div className="flex-grow space-y-2">
                  <h4 className="font-display font-bold text-lg text-on-surface leading-tight">Aşı Günü - Hepatit B</h4>
                  <p className="text-on-surface-variant text-sm font-medium">Sağlık Ocağı</p>
                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">event</span>
                      <span className="text-xs font-semibold">20 Temmuz</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant">
                      <span className="material-symbols-outlined text-lg">schedule</span>
                      <span className="text-xs font-semibold">14:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {upcoming.length === 0 ? (
                <div className="bg-surface-container-low rounded-lg p-8 text-center">
                  <p className="text-sm text-on-surface-variant font-body">Yaklaşan randevunuz yok</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((apt, i) => {
                    const typeInfo = typeIcons[apt.type] || typeIcons.other
                    return (
                      <div key={apt.id} className="relative group">
                        {i === 0 && (
                          <div className="absolute -top-4 -right-2 w-24 h-24 opacity-20 pointer-events-none group-hover:scale-110 transition-transform duration-500 text-6xl flex items-center justify-center">
                            💖
                          </div>
                        )}
                        <div className="bg-surface-container-lowest rounded-lg p-6 flex gap-6 shadow-sm border border-outline-variant/10 relative overflow-hidden">
                          <div className={`w-16 h-16 rounded-2xl ${typeInfo.iconBg} flex items-center justify-center flex-shrink-0`}>
                            <span
                              className={`material-symbols-outlined ${typeInfo.iconColor} text-3xl`}
                              style={typeInfo.fillStyle ? { fontVariationSettings: typeInfo.fillStyle } : undefined}
                            >{typeInfo.icon}</span>
                          </div>
                          <div className="flex-grow space-y-2">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-display font-bold text-lg text-on-surface leading-tight">{apt.title}</h4>
                                {apt.doctor && <p className="text-on-surface-variant text-sm font-medium">{apt.doctor}</p>}
                              </div>
                              <button
                                onClick={() => removeAppointment(apt.id)}
                                className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-error-container/20"
                              >
                                <span className="material-symbols-outlined text-outline text-sm">close</span>
                              </button>
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                              <div className="flex items-center gap-1.5 text-on-surface-variant">
                                <span className="material-symbols-outlined text-lg">event</span>
                                <span className="text-xs font-semibold">{formatDate(apt.date)}</span>
                              </div>
                              {apt.time && (
                                <div className="flex items-center gap-1.5 text-on-surface-variant">
                                  <span className="material-symbols-outlined text-lg">schedule</span>
                                  <span className="text-xs font-semibold">{apt.time}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </>
          )}
        </section>

        {/* Past Appointments Section */}
        {past.length > 0 ? (
          <section className="space-y-6">
            <h3 className="font-display font-bold text-xl text-on-surface opacity-60">Geçmiş Randevular</h3>
            <div className="space-y-4">
              {past.map((apt) => {
                const typeInfo = typeIcons[apt.type] || typeIcons.other
                return (
                  <div key={apt.id} className="bg-surface-container-low/50 rounded-lg p-4 flex gap-4 opacity-70 grayscale-[0.2]">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-outline text-2xl">{typeInfo.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-display font-semibold text-base text-on-surface">{apt.title}</h4>
                      <div className="flex items-center gap-3 text-on-surface-variant mt-1">
                        <span className="text-xs font-medium">{formatDate(apt.date)}{apt.time ? `, ${apt.time}` : ''}</span>
                        {apt.doctor && (
                          <>
                            <span className="w-1 h-1 bg-outline rounded-full"></span>
                            <span className="text-xs font-medium">{apt.doctor}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-outline text-xl">check_circle</span>
                  </div>
                )
              })}
            </div>
          </section>
        ) : (
          /* Default past appointments when none exist */
          <section className="space-y-6">
            <h3 className="font-display font-bold text-xl text-on-surface opacity-60">Geçmiş Randevular</h3>
            <div className="space-y-4">
              <div className="bg-surface-container-low/50 rounded-lg p-4 flex gap-4 opacity-70 grayscale-[0.2]">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-outline text-2xl">stethoscope</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-display font-semibold text-base text-on-surface">Genel Muayene</h4>
                  <div className="flex items-center gap-3 text-on-surface-variant mt-1">
                    <span className="text-xs font-medium">10 Haziran, 11:00</span>
                    <span className="w-1 h-1 bg-outline rounded-full"></span>
                    <span className="text-xs font-medium">Dr. Selin Yılmaz</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-xl">check_circle</span>
              </div>
              <div className="bg-surface-container-low/50 rounded-lg p-4 flex gap-4 opacity-70 grayscale-[0.2]">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-outline text-2xl">emergency</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-display font-semibold text-base text-on-surface">Göz Taraması</h4>
                  <div className="flex items-center gap-3 text-on-surface-variant mt-1">
                    <span className="text-xs font-medium">25 Mayıs, 09:30</span>
                    <span className="w-1 h-1 bg-outline rounded-full"></span>
                    <span className="text-xs font-medium">Dünya Göz Hastanesi</span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-outline text-xl">check_circle</span>
              </div>
            </div>
          </section>
        )}

        {/* Add new appointment button */}
        <button
          onClick={() => setShowNew(true)}
          className="w-full py-5 px-8 bg-gradient-to-br from-secondary to-secondary-dim text-white rounded-full font-display font-bold shadow-[0_12px_24px_rgba(104,52,235,0.3)] flex items-center justify-center gap-3 active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined">add_circle</span>
          Yeni Randevu Ekle
        </button>

        {/* Decorative Elements */}
        <div className="fixed top-40 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="fixed bottom-20 -right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      </div>
    </MobileLayout>
  )
}
