import { useState } from 'react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { toast } from 'sonner'

type TabType = 'weight' | 'water' | 'mood' | 'sleep'

const tabs: { id: TabType; label: string; icon: string }[] = [
  { id: 'weight', label: 'Kilo', icon: 'monitor_weight' },
  { id: 'water', label: 'Su', icon: 'water_drop' },
  { id: 'mood', label: 'Ruh Hali', icon: 'mood' },
  { id: 'sleep', label: 'Uyku', icon: 'bedtime' },
]

const moodOptions = [
  { value: 'harika', emoji: '😊', label: 'Harika' },
  { value: 'iyi', emoji: '🙂', label: 'Iyi' },
  { value: 'normal', emoji: '😐', label: 'Normal' },
  { value: 'yorgun', emoji: '😴', label: 'Yorgun' },
  { value: 'stresli', emoji: '😟', label: 'Stresli' },
]

function getInputConfig(tab: TabType) {
  switch (tab) {
    case 'weight':
      return { placeholder: 'Kilonuz (kg)', type: 'number' as const, unit: 'kg' }
    case 'water':
      return { placeholder: 'Bardak sayisi', type: 'number' as const, unit: 'bardak' }
    case 'mood':
      return { placeholder: '', type: 'text' as const, unit: '' }
    case 'sleep':
      return { placeholder: 'Uyku suresi (saat)', type: 'number' as const, unit: 'saat' }
  }
}

function getBarColor(tab: TabType) {
  switch (tab) {
    case 'weight': return 'bg-primary'
    case 'water': return 'bg-tertiary'
    case 'mood': return 'bg-secondary'
    case 'sleep': return 'bg-primary-dim'
  }
}

export default function HealthTracker() {
  const [activeTab, setActiveTab] = useState<TabType>('weight')
  const [value, setValue] = useState('')
  const [note, setNote] = useState('')
  const { healthLogs, addHealthLog } = useStore()

  const config = getInputConfig(activeTab)
  const filteredLogs = healthLogs.filter((l) => l.type === activeTab)

  const handleSubmit = () => {
    if (!value) {
      toast.error('Lutfen bir deger girin')
      return
    }
    addHealthLog({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      type: activeTab,
      value,
      note: note || undefined,
    })
    setValue('')
    setNote('')
    toast.success('Kayit eklendi')
  }

  // Compute max value for bar chart scaling
  const numericLogs = filteredLogs
    .slice(0, 7)
    .map((l) => ({ ...l, numValue: parseFloat(l.value) || 0 }))
  const maxVal = Math.max(...numericLogs.map((l) => l.numValue), 1)

  return (
    <MobileLayout title="Saglik Takibi" showBack>
      <div className="space-y-6 pb-6">
        {/* Tab Selector */}
        <div className="flex gap-2 bg-surface-container-lowest rounded-xl p-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setValue(''); setNote('') }}
              className={`flex-1 flex flex-col items-center gap-1 py-3 rounded-lg text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-on-primary shadow-md'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span aria-hidden="true" className="material-symbols-outlined text-lg">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <div className="glass-card rounded-lg p-5 space-y-4">
          <h3 className="font-display font-bold text-on-surface text-sm">Bugunku Kayit</h3>

          {activeTab === 'mood' ? (
            <div className="grid grid-cols-5 gap-2">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setValue(mood.value)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                    value === mood.value
                      ? 'bg-secondary text-on-secondary shadow-md'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="text-xl">{mood.emoji}</span>
                  <span className="text-[10px] font-bold">{mood.label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex gap-3">
              <input
                type={config.type}
                placeholder={config.placeholder}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 bg-surface-container-low rounded-xl px-4 py-3 text-on-surface text-sm font-body outline-none focus:ring-2 focus:ring-primary/30"
              />
              {config.unit && (
                <span className="flex items-center text-on-surface-variant text-xs font-bold">
                  {config.unit}
                </span>
              )}
            </div>
          )}

          <input
            type="text"
            placeholder="Not ekleyin (opsiyonel)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full bg-surface-container-low rounded-xl px-4 py-3 text-on-surface text-sm font-body outline-none focus:ring-2 focus:ring-primary/30"
          />

          <button onClick={handleSubmit} className="btn-primary w-full py-3 rounded-full text-sm font-bold">
            <span aria-hidden="true" className="material-symbols-outlined text-base mr-2 align-middle">add</span>
            Kaydet
          </button>
        </div>

        {/* Simple Bar Chart */}
        {numericLogs.length > 0 && activeTab !== 'mood' && (
          <div className="glass-card rounded-lg p-5 space-y-3">
            <h3 className="font-display font-bold text-on-surface text-sm">Son Kayitlar</h3>
            <div className="flex items-end gap-2 h-32">
              {numericLogs.reverse().map((log) => {
                const height = Math.max((log.numValue / maxVal) * 100, 8)
                return (
                  <div key={log.id} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-on-surface-variant">
                      {log.numValue}
                    </span>
                    <div
                      className={`w-full rounded-t-md ${getBarColor(activeTab)} transition-all`}
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-[9px] text-on-surface-variant">
                      {log.date.slice(5)}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* History List */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-on-surface text-sm">Gecmis</h3>
          {filteredLogs.length === 0 ? (
            <div className="glass-card rounded-lg p-8 text-center">
              <span aria-hidden="true" className="material-symbols-outlined text-3xl text-on-surface-variant/40 mb-2 block">
                history
              </span>
              <p className="text-on-surface-variant text-xs">Henuz kayit yok</p>
            </div>
          ) : (
            filteredLogs.map((log) => (
              <div key={log.id} className="glass-card rounded-lg p-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-bold text-on-surface font-display">
                    {activeTab === 'mood'
                      ? moodOptions.find((m) => m.value === log.value)?.emoji ?? log.value
                      : `${log.value} ${getInputConfig(activeTab).unit}`}
                  </span>
                  {log.note && (
                    <p className="text-xs text-on-surface-variant mt-0.5">{log.note}</p>
                  )}
                </div>
                <span className="text-xs text-on-surface-variant font-body">{log.date}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </MobileLayout>
  )
}
