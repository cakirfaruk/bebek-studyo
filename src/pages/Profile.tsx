import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Crown, Heart, LogOut, ChevronRight, Edit3, Star, Bell, Shield, HelpCircle, MessageCircle } from 'lucide-react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'

const menuItems = [
  { icon: Edit3, label: 'Profili Duzenle', path: '/profile-setup', iconBg: 'bg-primary-container/30', iconColor: 'text-primary' },
  { icon: Heart, label: 'Favori Isimler', path: '/names', iconBg: 'bg-primary/10', iconColor: 'text-primary', badge: true },
  { icon: Crown, label: 'Premium Uyelik', path: '/premium', iconBg: 'bg-secondary-container', iconColor: 'text-secondary' },
  { icon: Bell, label: 'Bildirimler', path: '/notifications', iconBg: 'bg-tertiary-container/30', iconColor: 'text-tertiary' },
  { icon: Shield, label: 'Gizlilik', path: '/privacy', iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary-dim' },
  { icon: HelpCircle, label: 'Yardim & SSS', path: '/help', iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
  { icon: MessageCircle, label: 'Bize Ulasin', path: '/contact', iconBg: 'bg-primary-container/20', iconColor: 'text-primary-dim' },
]

const segmentLabels = {
  expecting: 'Bebek Bekliyoruz',
  dreaming: 'Hayalini Kuruyoruz',
  newparent: 'Yeni Ebeveyn',
  planner: 'Planliyoruz',
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
      <div className="space-y-8 pb-6">
        {/* Profile Card - Glass card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 shadow-card"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden">
              {profile?.motherPhoto ? (
                <img src={profile.motherPhoto} alt="" className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-7 h-7 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-lg text-on-surface">
                {profile?.motherName || 'Kullanici'}
              </h2>
              <p className="text-sm text-on-surface-variant font-body">{profile?.email}</p>
              {segment && (
                <span className="inline-block mt-1 text-xs bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
                  {segmentLabels[segment]}
                </span>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5">
            <div className="text-center bg-surface-container-low rounded-xl py-3">
              <div className="font-bold text-lg text-on-surface font-display">{profile?.credits || 0}</div>
              <div className="text-[10px] text-on-surface-variant font-body uppercase tracking-wider font-semibold">Kredi</div>
            </div>
            <div className="text-center bg-surface-container-low rounded-xl py-3">
              <div className="font-bold text-lg text-on-surface font-display">{favoriteNames.length}</div>
              <div className="text-[10px] text-on-surface-variant font-body uppercase tracking-wider font-semibold">Favori</div>
            </div>
            <div className="text-center bg-surface-container-low rounded-xl py-3">
              <div className="font-bold text-lg text-on-surface font-display">
                {profile?.isPremium ? '👑' : '🆓'}
              </div>
              <div className="text-[10px] text-on-surface-variant font-body uppercase tracking-wider font-semibold">
                {profile?.isPremium ? 'Premium' : 'Ucretsiz'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Premium / Credit Purchase Banner - gradient-brand */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-primary to-secondary text-white shadow-[0_20px_40px_rgba(186,9,97,0.2)]"
        >
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-5 h-5" />
                <h3 className="font-display font-bold">Kredi Satin Al</h3>
              </div>
              <p className="text-white/80 text-xs font-body">AI ozelliklerini kullanmak icin kredi gerekli</p>
            </div>
            <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-5 py-2.5 rounded-full text-sm font-bold transition-colors shadow-lg">
              Satin Al
            </button>
          </div>
        </motion.div>

        {/* Menu Items - Glass card */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/30 transition-colors ${
                index < menuItems.length - 1 ? '' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <span className="flex-1 text-sm font-medium text-on-surface font-body">{item.label}</span>
              {item.badge && favoriteNames.length > 0 && (
                <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {favoriteNames.length}
                </span>
              )}
              <ChevronRight className="w-4 h-4 text-on-surface-variant" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-error-container/10 text-error font-bold text-sm hover:bg-error-container/20 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Cikis Yap
        </button>

        <p className="text-center text-[10px] text-on-surface-variant/50 font-body">
          BebekStudyo v1.0.0
        </p>
      </div>
    </MobileLayout>
  )
}
