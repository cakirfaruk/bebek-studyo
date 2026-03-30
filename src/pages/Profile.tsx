import { useNavigate } from 'react-router-dom'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'

const menuItems = [
  { icon: 'edit', label: 'Profili Düzenle', path: '/profile-setup', iconBg: 'bg-primary-container/30', iconColor: 'text-primary' },
  { icon: 'favorite', label: 'Favori İsimler', path: '/names', iconBg: 'bg-primary/10', iconColor: 'text-primary', badge: true },
  { icon: 'workspace_premium', label: 'Premium Üyelik', path: '/premium', iconBg: 'bg-secondary-container', iconColor: 'text-secondary' },
  { icon: 'notifications', label: 'Bildirimler', path: '/notifications', iconBg: 'bg-tertiary-container/30', iconColor: 'text-tertiary' },
  { icon: 'shield', label: 'Gizlilik', path: '/privacy', iconBg: 'bg-tertiary/10', iconColor: 'text-tertiary-dim' },
  { icon: 'help', label: 'Yardım & SSS', path: '/help', iconBg: 'bg-secondary/10', iconColor: 'text-secondary' },
  { icon: 'chat', label: 'Bize Ulaşın', path: '/contact', iconBg: 'bg-primary-container/20', iconColor: 'text-primary-dim' },
]

const segmentLabels: Record<string, string> = {
  expecting: 'Bebek Bekliyoruz',
  dreaming: 'Hayalini Kuruyoruz',
  newparent: 'Yeni Ebeveyn',
  planner: 'Planlıyoruz',
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
        {/* Profile Card - Glass card with avatar */}
        <div className="glass-card rounded-lg p-6 shadow-xl shadow-primary-dim/5">
          <div className="flex items-center gap-4">
            {/* Avatar with gradient ring */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-0.5 shadow-lg shadow-primary/20">
              <div className="w-full h-full rounded-full bg-surface-container-lowest overflow-hidden flex items-center justify-center">
                {profile?.motherPhoto ? (
                  <img src={profile.motherPhoto} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="material-symbols-outlined text-on-surface-variant text-3xl">person</span>
                )}
              </div>
            </div>
            <div className="flex-1">
              <h2 className="font-display font-bold text-lg text-on-surface">
                {profile?.motherName || 'Kullanıcı'}
              </h2>
              <p className="text-sm text-on-surface-variant font-body">{profile?.email}</p>
              {segment && (
                <span className="inline-block mt-1 text-xs bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
                  {segmentLabels[segment]}
                </span>
              )}
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-5 border-t border-outline-variant/10">
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
                {profile?.isPremium ? (
                  <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                ) : (
                  <span className="text-on-surface-variant">Free</span>
                )}
              </div>
              <div className="text-[10px] text-on-surface-variant font-body uppercase tracking-wider font-semibold">
                {profile?.isPremium ? 'Premium' : 'Ücretsiz'}
              </div>
            </div>
          </div>
        </div>

        {/* Premium CTA - gradient-brand */}
        <div className="relative overflow-hidden rounded-lg p-6 bg-gradient-to-br from-primary to-secondary text-white shadow-2xl shadow-primary/20">
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined">star</span>
                <h3 className="font-display font-bold">Kredi Satın Al</h3>
              </div>
              <p className="text-white/80 text-xs font-body">AI özelliklerini kullanmak için kredi gerekli</p>
            </div>
            <button className="bg-white/20 backdrop-blur-md hover:bg-white/30 px-5 py-2.5 rounded-full text-sm font-bold transition-colors shadow-lg">
              Satın Al
            </button>
          </div>
        </div>

        {/* Menu Items - Glass card */}
        <div className="glass-card rounded-lg overflow-hidden shadow-xl shadow-primary-dim/5">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/30 transition-colors"
            >
              <div className={`w-10 h-10 rounded-full ${item.iconBg} flex items-center justify-center`}>
                <span className={`material-symbols-outlined ${item.iconColor}`}>{item.icon}</span>
              </div>
              <span className="flex-1 text-sm font-medium text-on-surface font-body">{item.label}</span>
              {item.badge && favoriteNames.length > 0 && (
                <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {favoriteNames.length}
                </span>
              )}
              <span className="material-symbols-outlined text-on-surface-variant text-base">chevron_right</span>
            </button>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-error-container/10 text-error font-bold text-sm hover:bg-error-container/20 transition-colors"
        >
          <span className="material-symbols-outlined">logout</span>
          Çıkış Yap
        </button>

        <p className="text-center text-[10px] text-on-surface-variant/50 font-body">
          BebekStüdyo v1.0.0
        </p>
      </div>
    </MobileLayout>
  )
}
