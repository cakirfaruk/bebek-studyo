import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Crown, Heart, LogOut, ChevronRight, Edit3, Star, Bell, Shield, HelpCircle, MessageCircle } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'

const menuItems = [
  { icon: Edit3, label: 'Profili Düzenle', path: '/profile-setup', color: 'text-primary-500', bg: 'bg-primary-50' },
  { icon: Heart, label: 'Favori İsimler', path: '/names', color: 'text-rose-500', bg: 'bg-rose-50', badge: true },
  { icon: Crown, label: 'Premium Üyelik', path: '/premium', color: 'text-accent-500', bg: 'bg-accent-50' },
  { icon: Bell, label: 'Bildirimler', path: '/notifications', color: 'text-sky-500', bg: 'bg-sky-50' },
  { icon: Shield, label: 'Gizlilik', path: '/privacy', color: 'text-mint-500', bg: 'bg-mint-50' },
  { icon: HelpCircle, label: 'Yardım & SSS', path: '/help', color: 'text-secondary-500', bg: 'bg-secondary-50' },
  { icon: MessageCircle, label: 'Bize Ulaşın', path: '/contact', color: 'text-lavender-500', bg: 'bg-lavender-50' },
]

const segmentLabels = {
  expecting: '🤰 Bebek Bekliyoruz',
  dreaming: '💑 Hayalini Kuruyoruz',
  newparent: '👶 Yeni Ebeveyn',
  planner: '📋 Planlıyoruz',
}

export default function Profile() {
  const navigate = useNavigate()
  const { profile, segment, favoriteNames, logout } = useStore()

  const handleLogout = () => {
    logout()
    navigate('/welcome')
  }

  return (
    <MobileLayout>
      <div className="py-4">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 border border-warm-border mb-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full gradient-warm flex items-center justify-center">
              {profile?.motherPhoto ? (
                <img src={profile.motherPhoto} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-7 h-7 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-lg text-warm-text">
                {profile?.motherName || 'Kullanıcı'}
              </h2>
              <p className="text-sm text-warm-muted">{profile?.email}</p>
              {segment && (
                <span className="inline-block mt-1 text-xs bg-primary-50 text-primary-600 px-2.5 py-0.5 rounded-full">
                  {segmentLabels[segment]}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-warm-border">
            <div className="text-center">
              <div className="font-bold text-lg text-warm-text">{profile?.credits || 0}</div>
              <div className="text-[10px] text-warm-muted">Kredi</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-warm-text">{favoriteNames.length}</div>
              <div className="text-[10px] text-warm-muted">Favori İsim</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-lg text-warm-text">
                {profile?.isPremium ? '👑' : '🆓'}
              </div>
              <div className="text-[10px] text-warm-muted">
                {profile?.isPremium ? 'Premium' : 'Ücretsiz'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Credit Purchase */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-accent-400 to-accent-500 rounded-2xl p-4 mb-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5" />
                <h3 className="font-semibold text-sm">Kredi Satın Al</h3>
              </div>
              <p className="text-white/80 text-xs">AI özelliklerini kullanmak için kredi gerekli</p>
            </div>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
              Satın Al
            </button>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl border border-warm-border overflow-hidden mb-6">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-warm-surface transition-colors border-b border-warm-border last:border-b-0"
            >
              <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center`}>
                <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
              </div>
              <span className="flex-1 text-sm font-medium text-warm-text">{item.label}</span>
              {item.badge && favoriteNames.length > 0 && (
                <span className="bg-primary-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {favoriteNames.length}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-warm-muted" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 h-12 rounded-xl border border-red-200 text-red-500 font-medium text-sm hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4.5 h-4.5" />
          Çıkış Yap
        </button>

        <p className="text-center text-[10px] text-warm-muted/50 mt-6">
          BebekStüdyo v1.0.0
        </p>
      </div>
    </MobileLayout>
  )
}
