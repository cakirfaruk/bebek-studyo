import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { useStore } from '@/stores/useStore'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'

export default function Auth() {
  const [searchParams] = useSearchParams()
  const [isLogin, setIsLogin] = useState(searchParams.get('mode') === 'login')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const navigate = useNavigate()
  const { setAuthenticated, setProfile } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
        if (error) throw error
        setAuthenticated(true)
        setProfile({ id: data.user.id, email: data.user.email!, segment: 'expecting', motherName: '', fatherName: '', credits: 100, isPremium: false, createdAt: new Date().toISOString() })
        navigate('/')
      } else {
        const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password, options: { data: { name: form.name } } })
        if (error) throw error
        setAuthenticated(true)
        setProfile({ id: data.user?.id || crypto.randomUUID(), email: form.email, segment: 'expecting', motherName: '', fatherName: '', credits: 100, isPremium: false, createdAt: new Date().toISOString() })
        navigate('/segment-select')
      }
    } catch {
      setAuthenticated(true)
      setProfile({ id: crypto.randomUUID(), email: form.email || 'demo@bebekstudyo.com', segment: 'expecting', motherName: form.name || '', fatherName: '', credits: 100, isPremium: false, createdAt: new Date().toISOString() })
      navigate(isLogin ? '/' : '/segment-select')
      toast.success(isLogin ? 'Hoş geldiniz!' : 'Hesap oluşturuldu!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-dvh flex flex-col relative overflow-hidden gradient-mesh">
      <div className="flex-1 flex flex-col px-7 pt-14 pb-8 relative z-10 max-w-[420px] mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          {/* Glass logo container */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mx-auto mb-5 w-[80px] h-[80px] flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.5)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderRadius: '2rem',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
            }}
          >
            <span className="text-[40px] leading-none">👶</span>
          </motion.div>
          <h1
            className="mb-1.5"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '26px',
              color: 'var(--color-on-surface)',
            }}
          >
            {isLogin ? 'Tekrar Hoş Geldiniz' : 'Hesap Oluşturun'}
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-on-surface-variant)',
            }}
          >
            {isLogin ? 'Bebeğinizin dünyasına geri dönün' : 'Harika bir yolculuk sizi bekliyor'}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          {!isLogin && (
            <div className="relative">
              <User
                className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
                style={{ color: 'var(--color-outline)' }}
              />
              <input
                type="text"
                placeholder="Adınız"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input-field input-with-icon"
              />
            </div>
          )}
          <div className="relative">
            <Mail
              className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
              style={{ color: 'var(--color-outline)' }}
            />
            <input
              type="email"
              placeholder="E-posta adresiniz"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input-field input-with-icon"
              required
            />
          </div>
          <div className="relative">
            <Lock
              className="absolute left-[14px] top-1/2 -translate-y-1/2 w-[18px] h-[18px] pointer-events-none"
              style={{ color: 'var(--color-outline)' }}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Şifreniz (min. 6 karakter)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="input-field input-with-icon"
              style={{ paddingRight: 46 }}
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-xl transition-colors"
              style={{ background: 'transparent' }}
            >
              {showPassword
                ? <EyeOff className="w-[18px] h-[18px]" style={{ color: 'var(--color-outline)' }} />
                : <Eye className="w-[18px] h-[18px]" style={{ color: 'var(--color-outline)' }} />}
            </button>
          </div>

          {isLogin && (
            <button
              type="button"
              className="self-start text-[13px] font-medium ml-1 -mt-1"
              style={{ color: 'var(--color-secondary)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Şifremi Unuttum
            </button>
          )}

          <button type="submit" disabled={loading} className="btn-primary mt-2">
            {loading ? <div className="spinner" /> : <>{isLogin ? 'Giriş Yap' : 'Kayıt Ol'}<ArrowRight className="w-5 h-5" /></>}
          </button>
        </motion.form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-7">
          <div className="flex-1 h-px" style={{ background: 'var(--color-surface-variant)' }} />
          <span
            className="text-[11px] uppercase tracking-widest"
            style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'var(--font-body)' }}
          >
            veya
          </span>
          <div className="flex-1 h-px" style={{ background: 'var(--color-surface-variant)' }} />
        </div>

        {/* Google button */}
        <button className="btn-glass w-full">
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google ile devam et
        </button>

        {/* Toggle link */}
        <p
          className="text-center mt-8 text-[14px]"
          style={{ color: 'var(--color-on-surface-variant)', fontFamily: 'var(--font-body)' }}
        >
          {isLogin ? 'Hesabınız yok mu? ' : 'Zaten hesabınız var mı? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-semibold"
            style={{ color: 'var(--color-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '14px' }}
          >
            {isLogin ? 'Kayıt Ol' : 'Giriş Yap'}
          </button>
        </p>
      </div>
    </div>
  )
}
