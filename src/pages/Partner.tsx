import { useState } from 'react'
import { MobileLayout } from '@/components/layout/MobileLayout'
import { useStore } from '@/stores/useStore'
import { toast } from 'sonner'

function generateShareCode(profileId: string): string {
  let hash = 0
  for (let i = 0; i < profileId.length; i++) {
    hash = ((hash << 5) - hash + profileId.charCodeAt(i)) | 0
  }
  return Math.abs(hash).toString().slice(0, 6).padStart(6, '0')
}

export default function Partner() {
  const { profile } = useStore()
  const [partnerCode, setPartnerCode] = useState('')

  const shareCode = profile?.id ? generateShareCode(profile.id) : '000000'

  const handleCopy = () => {
    navigator.clipboard.writeText(shareCode).then(() => {
      toast.success('Kod kopyalandi')
    }).catch(() => {
      toast.info(`Kodunuz: ${shareCode}`)
    })
  }

  const handleConnect = () => {
    if (!partnerCode || partnerCode.length !== 6) {
      toast.error('Lutfen 6 haneli bir kod girin')
      return
    }
    toast.info('Eslestirme ozelligi yakin zamanda aktif olacak')
  }

  return (
    <MobileLayout title="Es Paylasimi" showBack>
      <div className="space-y-8 pb-6">
        {/* Share Code Section */}
        <div className="glass-card rounded-lg p-6 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mx-auto">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-primary text-3xl"
            >
              group
            </span>
          </div>
          <div>
            <h2 className="font-display font-bold text-on-surface text-lg">Paylasim Kodunuz</h2>
            <p className="text-on-surface-variant text-xs mt-1">
              Esinize bu kodu gonderin
            </p>
          </div>

          {/* Code Display */}
          <div className="flex items-center justify-center gap-2">
            <div className="bg-surface-container-lowest rounded-xl px-8 py-4 border-2 border-primary/20">
              <span className="font-display font-black text-3xl text-on-surface tracking-[0.3em]">
                {shareCode}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-container/20 text-primary rounded-full text-sm font-bold hover:bg-primary-container/30 transition-colors"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-base">content_copy</span>
            Kodu Kopyala
          </button>
        </div>

        {/* Enter Partner Code */}
        <div className="glass-card rounded-lg p-6 space-y-4">
          <div className="text-center">
            <h3 className="font-display font-bold text-on-surface text-sm">Esinizin Kodunu Girin</h3>
            <p className="text-on-surface-variant text-xs mt-1">
              Esinizden aldiginiz 6 haneli kodu girin
            </p>
          </div>

          <input
            type="text"
            maxLength={6}
            placeholder="000000"
            value={partnerCode}
            onChange={(e) => setPartnerCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            className="w-full bg-surface-container-low rounded-xl px-4 py-4 text-center text-on-surface text-2xl font-display font-bold tracking-[0.3em] outline-none focus:ring-2 focus:ring-primary/30"
          />

          <button
            onClick={handleConnect}
            className="btn-primary w-full py-3 rounded-full text-sm font-bold"
          >
            <span aria-hidden="true" className="material-symbols-outlined text-base mr-2 align-middle">link</span>
            Baglan
          </button>
        </div>
      </div>
    </MobileLayout>
  )
}
