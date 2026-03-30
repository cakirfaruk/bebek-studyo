import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Camera, Trash2, Calendar } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { generateId, formatDate } from '@/lib/utils'
import type { MemoryEntry } from '@/types'

const moods = [
  { value: 'happy' as const, emoji: '😊', label: 'Mutlu' },
  { value: 'excited' as const, emoji: '🤩', label: 'Heyecanlı' },
  { value: 'emotional' as const, emoji: '🥺', label: 'Duygusal' },
  { value: 'tired' as const, emoji: '😴', label: 'Yorgun' },
  { value: 'anxious' as const, emoji: '😰', label: 'Endişeli' },
  { value: 'grateful' as const, emoji: '🙏', label: 'Minnettar' },
]

const tabs = [
  { id: 'all', label: 'Tümü' },
  { id: 'photo', label: 'Fotoğraflar' },
  { id: 'note', label: 'Notlar' },
  { id: 'letter', label: 'Mektuplar' },
  { id: 'milestone', label: 'İlkler' },
]

export default function Memories() {
  const { memories, addMemory, removeMemory } = useStore()
  const [activeTab, setActiveTab] = useState('all')
  const [showNew, setShowNew] = useState(false)
  const [newEntry, setNewEntry] = useState<Partial<MemoryEntry>>({
    type: 'note',
    title: '',
    content: '',
    mood: 'happy',
    date: new Date().toISOString().split('T')[0],
  })

  const filteredMemories = activeTab === 'all'
    ? memories
    : memories.filter((m) => m.type === activeTab)

  const handlePhotoUpload = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (ev) => {
          setNewEntry({ ...newEntry, imageUrl: ev.target?.result as string })
        }
        reader.readAsDataURL(file)
      }
    }
    input.click()
  }

  const handleSave = () => {
    if (!newEntry.title || !newEntry.content) return
    addMemory({
      id: generateId(),
      type: newEntry.type || 'note',
      title: newEntry.title,
      content: newEntry.content,
      imageUrl: newEntry.imageUrl,
      date: newEntry.date || new Date().toISOString(),
      mood: newEntry.mood,
    })
    setNewEntry({ type: 'note', title: '', content: '', mood: 'happy', date: new Date().toISOString().split('T')[0] })
    setShowNew(false)
  }

  return (
    <MobileLayout title="Anı Defteri" showBack>
      <div className="py-4">
        {/* Stats */}
        <div className="flex gap-3 mb-6">
          {[
            { emoji: '📝', count: memories.filter((m) => m.type === 'note').length, label: 'Not' },
            { emoji: '📸', count: memories.filter((m) => m.type === 'photo').length, label: 'Fotoğraf' },
            { emoji: '💌', count: memories.filter((m) => m.type === 'letter').length, label: 'Mektup' },
            { emoji: '⭐', count: memories.filter((m) => m.type === 'milestone').length, label: 'İlk' },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 glass-card p-3 text-center">
              <span className="text-lg">{stat.emoji}</span>
              <div className="font-bold text-lg text-warm-text">{stat.count}</div>
              <div className="text-[10px] text-warm-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? 'gradient-primary text-white'
                  : 'glass-card text-warm-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowNew(true)}
          className="w-full h-12 rounded-xl border-2 border-dashed border-primary-300 text-primary-500 font-medium text-sm flex items-center justify-center gap-2 mb-6 hover:bg-primary-50 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Yeni Anı Ekle
        </button>

        {/* New Entry Form */}
        <AnimatePresence>
          {showNew && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="glass-card p-4 space-y-4">
                {/* Type */}
                <div className="flex gap-2">
                  {[
                    { type: 'note' as const, emoji: '📝', label: 'Not' },
                    { type: 'photo' as const, emoji: '📸', label: 'Fotoğraf' },
                    { type: 'letter' as const, emoji: '💌', label: 'Mektup' },
                    { type: 'milestone' as const, emoji: '⭐', label: 'İlk' },
                  ].map((t) => (
                    <button
                      key={t.type}
                      onClick={() => setNewEntry({ ...newEntry, type: t.type })}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium flex flex-col items-center gap-1 ${
                        newEntry.type === t.type ? 'bg-primary-50 border border-primary-300' : 'bg-warm-surface'
                      }`}
                    >
                      <span>{t.emoji}</span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>

                {/* Title */}
                <input
                  type="text"
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  placeholder={newEntry.type === 'letter' ? 'Sevgili Bebeğim...' : 'Başlık'}
                  className="w-full h-11 px-3 rounded-xl bg-warm-surface border border-warm-border focus:border-primary-400 outline-none text-sm"
                />

                {/* Content */}
                <textarea
                  value={newEntry.content}
                  onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                  placeholder={
                    newEntry.type === 'letter' ? 'Sana bu mektubu yazıyorum çünkü...' :
                    newEntry.type === 'milestone' ? 'İlk kez ne oldu? Nasıl hissettiniz?' :
                    'Anınızı yazın...'
                  }
                  rows={4}
                  className="w-full px-3 py-2 rounded-xl bg-warm-surface border border-warm-border focus:border-primary-400 outline-none text-sm resize-none"
                />

                {/* Photo upload */}
                {newEntry.imageUrl ? (
                  <div className="relative">
                    <img src={newEntry.imageUrl} alt="" className="w-full h-40 object-cover rounded-xl" />
                    <button
                      onClick={() => setNewEntry({ ...newEntry, imageUrl: undefined })}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handlePhotoUpload}
                    className="w-full h-11 rounded-xl border border-warm-border flex items-center justify-center gap-2 text-sm text-warm-muted hover:bg-warm-surface"
                  >
                    <Camera className="w-4 h-4" />
                    Fotoğraf Ekle
                  </button>
                )}

                {/* Mood */}
                <div>
                  <label className="text-xs font-medium text-warm-text mb-2 block">Ruh Haliniz</label>
                  <div className="flex gap-2">
                    {moods.map((m) => (
                      <button
                        key={m.value}
                        onClick={() => setNewEntry({ ...newEntry, mood: m.value })}
                        className={`flex-1 py-2 rounded-lg flex flex-col items-center gap-0.5 transition-all ${
                          newEntry.mood === m.value ? 'bg-primary-50 border border-primary-300' : 'bg-warm-surface'
                        }`}
                      >
                        <span className="text-lg">{m.emoji}</span>
                        <span className="text-[9px] text-warm-muted">{m.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Date */}
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                  className="w-full h-11 px-3 rounded-xl bg-warm-surface border border-warm-border focus:border-primary-400 outline-none text-sm"
                />

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowNew(false)}
                    className="flex-1 h-11 rounded-xl border border-warm-border text-warm-text text-sm font-medium"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!newEntry.title || !newEntry.content}
                    className="flex-1 h-11 rounded-xl gradient-primary text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memory List */}
        {filteredMemories.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-5xl block mb-4">📔</span>
            <h3 className="font-display font-semibold text-warm-text mb-1">Henüz anı yok</h3>
            <p className="text-sm text-warm-muted">İlk anınızı ekleyerek başlayın</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredMemories.map((memory, i) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card overflow-hidden"
              >
                {memory.imageUrl && (
                  <img src={memory.imageUrl} alt="" className="w-full h-40 object-cover" />
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">
                        {memory.type === 'photo' ? '📸' : memory.type === 'letter' ? '💌' : memory.type === 'milestone' ? '⭐' : '📝'}
                      </span>
                      <h3 className="font-semibold text-sm text-warm-text">{memory.title}</h3>
                    </div>
                    {memory.mood && (
                      <span className="text-lg">{moods.find((m) => m.value === memory.mood)?.emoji}</span>
                    )}
                  </div>
                  <p className="text-sm text-warm-muted leading-relaxed mb-2">{memory.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-warm-muted/70">
                      <Calendar className="w-3 h-3" />
                      {formatDate(memory.date)}
                    </div>
                    <button
                      onClick={() => removeMemory(memory.id)}
                      className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-warm-muted hover:text-red-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </MobileLayout>
  )
}
