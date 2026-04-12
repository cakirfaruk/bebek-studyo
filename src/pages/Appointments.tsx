import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateId, formatDate } from '@/lib/utils'
import type { Appointment } from '@/types'

const HEART_DECORATION = "https://lh3.googleusercontent.com/aida-public/AB6AXuAVz9PXBo0rwsHv5ufvXBq3fDneRXf1qMx-pSKCKFKEW05hB9_lfbqD9XuwqA99ALi-0HfcvzQEIHT4E18bgiZN4DIOCjyKksMh1KZKv88980SoEC2o3d8G9GnNJLZbNd9CZG18tNPKKjPrMTPQT_gSdH9s_yhhXCsxyzKSukHB8sTt2I3uPplH5TZJLQl0F4gMmigEsarEvoH6UZwiART8QzZeXCpJDon0LPQ1NcVlJZ2XtkChhIMbEah-lsGIr00JFy7srT-EhO4"

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
      <div className="space-y-10 pb-6 mt-4">
        
        {/* Horizontal Week Calendar Selector */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-headline font-bold text-lg text-on-surface capitalize">{currentMonth}</h2>
            <span aria-hidden="true" className="material-symbols-outlined text-outline">calendar_month</span>
          </div>
          <div className="flex justify-between items-center overflow-x-auto pb-4 pt-2 gap-3 no-scrollbar -mx-4 px-4">
            {weekDays.map((day) => (
              <button
                key={day.fullDate}
                onClick={() => setSelectedDate(day.fullDate)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-300 ${
                  day.fullDate === selectedDate
                    ? 'min-w-[4rem] p-4 bg-gradient-to-br from-secondary to-secondary-dim text-white shadow-lg shadow-secondary/30 scale-105 border border-white/20'
                    : day.isToday
                    ? 'min-w-[4rem] p-4 bg-primary-container text-on-primary-container font-extrabold shadow-sm'
                    : 'min-w-[3.5rem] bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className={`text-xs uppercase font-headline font-bold tracking-widest ${day.fullDate === selectedDate ? 'opacity-90' : 'opacity-70'}`}>
                  {day.name}
                </span>
                <span className={`font-headline mt-1 ${day.fullDate === selectedDate ? 'text-xl font-extrabold' : 'text-lg font-bold'}`}>
                  {day.date}
                </span>
                {day.isToday && day.fullDate !== selectedDate && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shadow-sm"></div>}
                {day.fullDate === selectedDate && <div className="w-1.5 h-1.5 bg-white rounded-full mt-1.5 shadow-sm"></div>}
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
              <div className="bg-surface-container-lowest border border-white/60 shadow-xl rounded-2xl p-6 space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
                
                <h3 className="font-headline font-bold text-lg text-on-surface mb-2">Yeni Randevu</h3>
                
                <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl">
                  {appointmentTypes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setForm({ ...form, type: t.value })}
                      className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1 text-[10px] uppercase tracking-widest font-bold transition-all ${
                        form.type === t.value
                          ? 'bg-white shadow-sm text-secondary-dim border border-black/5'
                          : 'text-on-surface-variant opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className="text-xl mb-0.5">{t.emoji}</span>
                      {t.label}
                    </button>
                  ))}
                </div>
                
                <div className="space-y-3 pt-2 relative z-10">
                  <div>
                    <label htmlFor="apt-title" className="sr-only">Randevu Başlığı</label>
                    <input
                      id="apt-title"
                      type="text"
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="Randevu Başlığı"
                      className="w-full py-4 px-5 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 text-on-surface font-body outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="apt-date" className="sr-only">Tarih</label>
                      <input id="apt-date" type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full py-4 px-5 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 text-on-surface font-body outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all text-sm" />
                    </div>
                    <div>
                      <label htmlFor="apt-time" className="sr-only">Saat</label>
                      <input id="apt-time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}
                        className="w-full py-4 px-5 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 text-on-surface font-body outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all text-sm" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="apt-doctor" className="sr-only">Doktor adı</label>
                    <input id="apt-doctor" type="text" value={form.doctor} onChange={(e) => setForm({ ...form, doctor: e.target.value })}
                      placeholder="Doktor adı (Opsiyonel)" className="w-full py-4 px-5 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 text-on-surface font-body outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all text-sm" />
                  </div>
                  <div>
                    <label htmlFor="apt-location" className="sr-only">Konum/Hastane</label>
                    <input id="apt-location" type="text" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                      placeholder="Konum/Hastane (Opsiyonel)" className="w-full py-4 px-5 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 text-on-surface font-body outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all text-sm" />
                  </div>
                  <div>
                    <label htmlFor="apt-notes" className="sr-only">Notlar</label>
                    <textarea id="apt-notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      placeholder="Notlar (Opsiyonel)" rows={2} className="w-full py-4 px-5 rounded-2xl bg-surface-container-highest/30 border border-outline-variant/20 text-on-surface font-body outline-none focus:ring-2 focus:ring-secondary/30 focus:bg-white transition-all text-sm resize-none" />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button onClick={() => setShowNew(false)}
                    className="flex-1 py-4 rounded-xl border-2 border-surface-container-highest text-on-surface-variant font-bold text-sm hover:bg-surface-container-low transition-colors font-headline">
                    İptal
                  </button>
                  <button onClick={handleSave} disabled={!form.title || !form.date}
                    className="flex-1 py-4 rounded-xl bg-gradient-to-r from-secondary to-secondary-dim text-white font-bold text-sm shadow-lg shadow-secondary/30 disabled:opacity-50 disabled:shadow-none font-headline active:scale-[0.98]">
                    Randevuyu Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upcoming Appointments Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline font-bold text-xl text-on-surface">Yaklaşan Randevular</h3>
            {upcoming.length > 0 && <span className="text-[11px] font-bold text-secondary uppercase tracking-widest cursor-pointer hover:underline">Tümünü Gör</span>}
          </div>

          {upcoming.length === 0 && past.length === 0 ? (
            <>
              {/* Default showcase cards when no appointments exist (Visual Mockup from HTML) */}
              <div className="relative group mt-4">
                <div className="absolute -top-4 -right-2 w-[120px] h-[120px] pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 z-10 opacity-70 drop-shadow-2xl">
                  <img src={HEART_DECORATION} alt="Decoration" className="w-full h-full object-contain" />
                </div>
                <div className="bg-surface-container-lowest rounded-2xl p-6 flex gap-6 shadow-card border border-white/60 relative overflow-hidden group-hover:shadow-[0_20px_40px_rgba(104,52,235,0.08)] transition-all">
                  <div className="w-16 h-16 rounded-2xl bg-primary-container/30 flex items-center justify-center flex-shrink-0">
                    <span aria-hidden="true" className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  </div>
                  <div className="flex-grow space-y-3 relative z-20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-headline font-bold text-lg text-on-surface leading-tight">Aylık Doktor Kontrolü</h4>
                        <p className="text-on-surface-variant text-sm font-medium font-body mt-0.5">Dr. Selin Yılmaz</p>
                      </div>
                      <span className="bg-secondary-container text-on-secondary-container text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-secondary/10">Bugün</span>
                    </div>
                    <div className="flex items-center gap-5 pt-2 border-t border-outline-variant/10">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span aria-hidden="true" className="material-symbols-outlined text-lg opacity-70">event</span>
                        <span className="text-sm font-semibold font-body">15 Temmuz</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span aria-hidden="true" className="material-symbols-outlined text-lg opacity-70">schedule</span>
                        <span className="text-sm font-semibold font-body">10:00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-6 flex gap-6 shadow-sm border border-outline-variant/10 hover:shadow-md transition-all mt-4">
                <div className="w-16 h-16 rounded-2xl bg-tertiary-container/30 flex items-center justify-center flex-shrink-0">
                  <span aria-hidden="true" className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>vaccines</span>
                </div>
                <div className="flex-grow space-y-3">
                  <div>
                    <h4 className="font-headline font-bold text-lg text-on-surface leading-tight">Aşı Günü - Hepatit B</h4>
                    <p className="text-on-surface-variant text-sm font-medium font-body mt-0.5">Sağlık Ocağı</p>
                  </div>
                  <div className="flex items-center gap-5 pt-2 border-t border-outline-variant/10">
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span aria-hidden="true" className="material-symbols-outlined text-lg opacity-70">event</span>
                      <span className="text-sm font-semibold font-body">20 Temmuz</span>
                    </div>
                    <div className="flex items-center gap-2 text-on-surface-variant">
                      <span aria-hidden="true" className="material-symbols-outlined text-lg opacity-70">schedule</span>
                      <span className="text-sm font-semibold font-body">14:30</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {upcoming.length === 0 ? (
                <div className="bg-surface-container-low/50 border border-dashed border-outline-variant/30 rounded-2xl p-10 text-center flex flex-col items-center gap-3">
                  <span aria-hidden="true" className="material-symbols-outlined text-4xl text-outline-variant/50">event_busy</span>
                  <p className="text-sm text-on-surface-variant font-body">Yaklaşan randevunuz yok, her şey yolunda!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcoming.map((apt, i) => {
                    const typeInfo = typeIcons[apt.type] || typeIcons.other
                    return (
                      <div key={apt.id} className="relative group">
                        {i === 0 && (
                          <div className="absolute -top-4 -right-2 w-[110px] h-[110px] pointer-events-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 z-10 opacity-70 drop-shadow-2xl">
                             <img src={HEART_DECORATION} alt="Decoration" className="w-full h-full object-contain" />
                          </div>
                        )}
                        <div className="bg-surface-container-lowest rounded-2xl p-6 flex gap-5 md:gap-6 shadow-card border border-white/60 relative overflow-hidden group-hover:shadow-[0_20px_40px_rgba(104,52,235,0.08)] transition-all">
                          <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${typeInfo.iconBg} flex items-center justify-center flex-shrink-0 shadow-inner`}>
                            <span
                              className={`material-symbols-outlined ${typeInfo.iconColor} text-2xl md:text-3xl`}
                              style={typeInfo.fillStyle ? { fontVariationSettings: typeInfo.fillStyle } : undefined}
                            >{typeInfo.icon}</span>
                          </div>
                          <div className="flex-grow space-y-3 relative z-20">
                            <div className="flex justify-between items-start">
                              <div className="pr-4">
                                <h4 className="font-headline font-bold text-lg text-on-surface leading-tight break-words">{apt.title}</h4>
                                {apt.doctor && <p className="text-on-surface-variant text-[13px] font-medium font-body mt-1 line-clamp-1">{apt.doctor}</p>}
                                {apt.location && <p className="text-on-surface-variant/70 text-[11px] font-medium font-body mt-0.5 max-w-[200px] truncate">{apt.location}</p>}
                              </div>
                              <button
                                onClick={() => removeAppointment(apt.id)}
                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-error-container/20 text-outline hover:text-error transition-colors shrink-0 border border-transparent hover:border-error/20"
                                aria-label="Randevuyu sil"
                              >
                                <span aria-hidden="true" className="material-symbols-outlined text-sm">close</span>
                              </button>
                            </div>
                            <div className="flex flex-wrap items-center gap-4 md:gap-5 pt-2 border-t border-outline-variant/10">
                              <div className="flex items-center gap-1.5 text-on-surface-variant">
                                <span aria-hidden="true" className="material-symbols-outlined text-base opacity-70">event</span>
                                <span className="text-[13px] font-semibold font-body">{formatDate(apt.date)}</span>
                              </div>
                              {apt.time && (
                                <div className="flex items-center gap-1.5 text-on-surface-variant">
                                  <span aria-hidden="true" className="material-symbols-outlined text-base opacity-70">schedule</span>
                                  <span className="text-[13px] font-semibold font-body">{apt.time}</span>
                                </div>
                              )}
                            </div>
                            {apt.notes && (
                               <p className="text-xs text-on-surface-variant/80 italic font-body pt-1" title={apt.notes}>
                                 <span className="font-semibold not-italic">Not:</span> {apt.notes.length > 40 ? apt.notes.substring(0, 40) + '...' : apt.notes}
                               </p>
                            )}
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
            <h3 className="font-headline font-bold text-xl text-on-surface opacity-60">Geçmiş Randevular</h3>
            <div className="space-y-3">
              {past.map((apt) => {
                const typeInfo = typeIcons[apt.type] || typeIcons.other
                return (
                  <div key={apt.id} className="bg-surface-container-low/50 rounded-xl p-4 flex gap-4 opacity-70 grayscale-[0.2] border border-outline-variant/5 hover:grayscale-0 hover:opacity-100 transition-all">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
                      <span aria-hidden="true" className="material-symbols-outlined text-outline text-2xl">{typeInfo.icon}</span>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-headline font-semibold text-base text-on-surface line-clamp-1">{apt.title}</h4>
                      <div className="flex items-center gap-2 text-on-surface-variant mt-1 flex-wrap">
                        <span className="text-[11px] font-semibold font-body">{formatDate(apt.date)}{apt.time ? `, ${apt.time}` : ''}</span>
                        {apt.doctor && (
                          <>
                            <span className="w-1 h-1 bg-outline rounded-full hidden sm:block"></span>
                            <span className="text-[11px] font-semibold font-body truncate max-w-[120px]">{apt.doctor}</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span aria-hidden="true" className="material-symbols-outlined text-primary/60 text-xl py-2">check_circle</span>
                  </div>
                )
              })}
            </div>
          </section>
        ) : (
          /* Default past appointments when none exist */
          <section className="space-y-6">
            <h3 className="font-headline font-bold text-xl text-on-surface opacity-60">Geçmiş Randevular</h3>
            <div className="space-y-3">
              <div className="bg-surface-container-low/50 rounded-xl p-4 flex gap-4 opacity-70 grayscale-[0.2] border border-outline-variant/5">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <span aria-hidden="true" className="material-symbols-outlined text-outline text-2xl">stethoscope</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline font-semibold text-base text-on-surface">Genel Muayene</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant mt-1">
                    <span className="text-[11px] font-medium font-body">10 Haziran, 11:00</span>
                    <span className="w-1 h-1 bg-outline rounded-full"></span>
                    <span className="text-[11px] font-medium font-body">Dr. Selin Yılmaz</span>
                  </div>
                </div>
                <span aria-hidden="true" className="material-symbols-outlined text-outline text-xl py-2">check_circle</span>
              </div>
              <div className="bg-surface-container-low/50 rounded-xl p-4 flex gap-4 opacity-70 grayscale-[0.2] border border-outline-variant/5">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center flex-shrink-0">
                  <span aria-hidden="true" className="material-symbols-outlined text-outline text-2xl">emergency</span>
                </div>
                <div className="flex-grow">
                  <h4 className="font-headline font-semibold text-base text-on-surface">Göz Taraması</h4>
                  <div className="flex items-center gap-2 text-on-surface-variant mt-1">
                    <span className="text-[11px] font-medium font-body">25 Mayıs, 09:30</span>
                    <span className="w-1 h-1 bg-outline rounded-full"></span>
                    <span className="text-[11px] font-medium font-body">Dünya Göz Hastanesi</span>
                  </div>
                </div>
                <span aria-hidden="true" className="material-symbols-outlined text-outline text-xl py-2">check_circle</span>
              </div>
            </div>
          </section>
        )}

        {/* Add new appointment FAB-style Action */}
        <div className="pt-4">
          <button
            onClick={() => setShowNew(true)}
            className="w-full py-4 px-8 bg-gradient-to-r from-secondary to-secondary-dim text-white rounded-2xl font-headline font-bold shadow-[0_12px_24px_rgba(104,52,235,0.25)] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all text-sm uppercase tracking-widest border border-white/10"
          >
            <span aria-hidden="true" className="material-symbols-outlined">add_circle</span>
            Yeni Randevu
          </button>
        </div>

        {/* Decorative background glows */}
        <div className="fixed top-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
        <div className="fixed bottom-20 -right-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10 pointer-events-none" />
      </div>
    </MobileLayout>
  )
}
