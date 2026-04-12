import { useState } from 'react'
import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

interface SleepAid {
  id: string
  name: string
  icon: string
}

interface Lullaby {
  id: string
  title: string
  image: string
  duration: string
  rating: string
  isFavorite: boolean
}

const HERO_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuD_T01oiLHvfVvDY0COn8rFbfnFwYd_UZNKZn9lUEHVeXbyAr9iPhPPntVrzlZEW7yDmtDcXH5sXRFX2J-0t_J1glX8IoUPi0pQftpieU-6WzWh4lWfMEB30vrl9wrC6ZxLTKbNJHSYWQ8I5EC8ueTCViK2ViD8RgRD-Ta6ABMmBmjL6JrmpR8Pn_X_kEXoqAnqdZM7I8s2htQwdzU7aVqjh2OyNuegF4J_59VqPL7wDSqeZabqgo9oEO8bbF4TYG8sdqdNWMeABn8"
const FEATURED_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAi0K05UljEr_HQwd7s9k6tbiUAPCmDT1xzNUz0QVghX1vI5ieVMpLZhGRlFt9HthylV3esAmTH_USNmHInosdB9WyiOG4ybgCB2h-L5gJ73sBkhIB7m-usH1G3vSmoowduzPaRkRE72l79IZzZyVRYJbAm87Lv2NndTzuu2MIJGSIHIRWUcwS9aK5tHxtxamoQK610h-HlSvL-y9gwJbNwS1beGEuVQp1LHhThTZeGv49TDj508aZGhvDlbY-DVC90Up7MXk5Boa8"

const sleepAids: SleepAid[] = [
  { id: '1', name: 'Beyaz Gürültü', icon: 'air' },
  { id: '2', name: 'Yağmur Sesi', icon: 'rainy' },
  { id: '3', name: 'Anne Karnı', icon: 'favorite' },
  { id: '4', name: 'Orman Sesi', icon: 'nature' },
  { id: '5', name: 'Okyanus', icon: 'waves' },
]

const lullabies: Lullaby[] = [
  { 
    id: '1', 
    title: 'Dandini Dandini', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtpPxFfGlKbbivqjgJnbatobksVCjYHppGqAMnIBrdemVHxiIaHB_x_JFze5LSBfqGXgqCUlI29pwge0JPYLjp9CBCQ7tJ3qE6v16ZenaslmGOgm6H2hk4Zj8RwA_bON5ggVL14vm8UHPMbabAyqTdkhMjcIC5meUNTgA6fEoV8W69RP66l6CWr1dBarOAXsh67gSBIFBzfYMllTOMtXDNj9aMgFBq8HPfzdDixeQFOJZlfJ5XdalLwbA_4wN0TEWzMUk8k4vVYv0',
    duration: '04:20', 
    rating: '4.9', 
    isFavorite: true 
  },
  { 
    id: '2', 
    title: 'Fış Fış Kayıkçı', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCith4pfjhyF6wCm8I-9XpepQDlFAI_1sg2bPOBCzJsS202zFShDz0_k5idTf8IuywY6Hw1XnjYFUDh470RweGNl7eXN-F3gEw12MowNNEBSygmeASNJwzA_Wd_gYp02JSY2t6BA03q86cQnyoi9eA2d9LTnQTLabChO0v6uD0l5UKdClLcOlD_3mxE6vIona4b4epWCPbQauV82IOJ24APlf6XrdlJW09jFAh-B0kulJ6exxsQVoUCbelRfNswD1hLwFpMK76-JqI',
    duration: '03:15', 
    rating: '4.8', 
    isFavorite: false 
  },
  { 
    id: '3', 
    title: 'Eee Eee Bebek', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxYTCdY7wGDBOFwBdV8gOdbm87M3Ge5hCvcocB6_DlxA7QtIZebY8SgyZRnZcTN4H2o1dYfuYo_MaTvPP2TVFn8x_LfSbwxPlmLky5sZ3tZTLtYmkipAb4uWsXnFmLDzcx44ELCE-nB4RnOxoiHrbfIEDH7gDum7oL_HYj-C_egm0TB0H94W466uila6hixOCD07-EA2JhCvQCqSnn40hmGk_aXnQ9K-4rhF79441pT523V2kvY3ibvFB7KoP_KhuPFZYWpn9sK84',
    duration: '05:40', 
    rating: '5.0', 
    isFavorite: true 
  },
  { 
    id: '4', 
    title: 'Uyusun da Büyüsün', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8fz4RmBl_HD8MvCgWr2bs9wnmjA2qYCX2tC9-aoj31VCyNIV1VRTvYg9UCBgdVenfzvdNKK3uM-f6iytAa7xRXrigZ2Wxw2rDD_EpCAkidJl5nAZ-N05uM-TCpf7Ssarct4hYz9GSDkMgoUDmtsVAZjdCGbE86Gl9IrR9cMuL8C8xLTq8pnhaNbahJuF8NrBGB32geY8V1p6tGzDerPje_pYkseSd4ZSgUXxSYdSErv5aqR8lAp1kThL6IkZGGWcT4NvmvFZd2oI',
    duration: '06:15', 
    rating: '4.7', 
    isFavorite: false 
  },
]

export default function Lullabies() {
  const [favorites, setFavorites] = useState<Record<string, boolean>>(
    Object.fromEntries(lullabies.map((l) => [l.id, l.isFavorite]))
  )

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <MobileLayout title="Uyku / Ninniler" showBack>
      <div className="space-y-10 pb-8 mt-4">
        
        {/* Hero Section */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[2rem] p-8 bg-gradient-to-br from-secondary-container to-white shadow-card border border-white/60"
          >
            <div className="relative z-10 max-w-md">
              <h2 className="text-4xl font-headline font-extrabold text-on-secondary-container leading-tight mb-4 tracking-tight">
                Tatlı Rüyalar Zamanı
              </h2>
              <p className="text-on-surface-variant text-[15px] font-body font-medium leading-relaxed max-w-[200px] md:max-w-xs">
                Miniğiniz için özenle seçilmiş en huzurlu ninniler ve rahatlatıcı uyku sesleri.
              </p>
            </div>
            
            <img 
              src={HERO_IMG}
              alt="Starry Night" 
              className="absolute -right-8 -bottom-8 w-64 h-64 object-contain opacity-80 mix-blend-multiply transform rotate-6 pointer-events-none drop-shadow-[0_20px_20px_rgba(0,0,0,0.1)]"
            />
          </motion.div>
        </section>

        {/* Sleeping Aids - Horizontal Scroll */}
        <section>
          <div className="flex items-center justify-between mb-5 px-1">
            <h3 className="text-xl font-headline font-bold text-on-surface">Uyku Yardımcıları</h3>
            <span className="text-primary text-[11px] font-extrabold uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer">Tümünü Gör</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-6 -mx-4 px-4 snap-x">
            {sleepAids.map((aid, i) => (
              <motion.div
                key={aid.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 }}
                className="snap-start flex-shrink-0 flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-[76px] h-[76px] rounded-full bg-surface-container-lowest shadow-sm flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-1 group-active:scale-95 border border-white/60 group-hover:border-primary/20 group-hover:shadow-md">
                  <span className="material-symbols-outlined text-secondary text-[32px] group-hover:scale-110 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 0" }}>{aid.icon}</span>
                </div>
                <span className="text-[11px] font-bold font-headline text-on-surface-variant group-hover:text-primary transition-colors">{aid.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Lullabies Grid */}
        <section>
          <div className="flex items-center justify-between mb-6 px-1">
            <h3 className="text-2xl font-headline font-bold text-on-surface">Popüler Ninniler</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lullabies.map((lullaby, i) => (
              <motion.div
                key={lullaby.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-surface-container-lowest rounded-[1.5rem] p-4 flex items-center gap-5 relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-card border border-white/60 cursor-pointer"
              >
                <div className="w-[88px] h-[88px] rounded-[1.25rem] overflow-hidden flex-shrink-0 shadow-inner relative">
                  <img src={lullaby.image} alt={lullaby.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                </div>
                
                <div className="flex-grow py-1 pr-12">
                  <h4 className="text-[17px] font-headline font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">{lullaby.title}</h4>
                  <div className="flex items-center gap-4 text-on-surface-variant text-[13px] font-semibold font-body">
                    <span className="flex items-center gap-1.5 opacity-80">
                      <span className="material-symbols-outlined text-[15px]">schedule</span> {lullaby.duration}
                    </span>
                    <span className="flex items-center gap-1.5 opacity-80">
                      <span className="material-symbols-outlined text-[15px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {lullaby.rating}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={(e) => toggleFavorite(lullaby.id, e)}
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center hover:scale-110 transition-transform rounded-full bg-white/50 backdrop-blur-sm"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${favorites[lullaby.id] ? 'text-primary' : 'text-on-surface-variant/50'}`}
                    style={favorites[lullaby.id] ? { fontVariationSettings: "'FILL' 1" } : undefined}
                  >
                    favorite
                  </span>
                </button>
                
                <div className="absolute right-4 bottom-4 w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-secondary-dim flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-[0_8px_16px_rgba(104,52,235,0.3)]">
                  <span
                    className="material-symbols-outlined text-white text-[22px] ml-0.5"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Playlist */}
        <section className="bg-primary-container/20 rounded-[2rem] p-6 border border-primary/10 shadow-sm relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="w-[200px] md:w-1/3 aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-3 transform hover:rotate-0 transition-transform duration-500 border-4 border-white/50">
              <img 
                src={FEATURED_IMG} 
                alt="Sleep Mix" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow text-center md:text-left flex flex-col items-center md:items-start">
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-md text-primary-dim text-[10px] font-extrabold uppercase tracking-widest mb-4 shadow-sm border border-white/40">
                Önerilen Liste
              </span>
              <h3 className="text-3xl font-headline font-extrabold text-on-surface mb-3 tracking-tight">Gece Yolculuğu</h3>
              <p className="text-on-surface-variant text-[15px] font-body mb-7 leading-relaxed max-w-sm">
                45 dakikalık kesintisiz uyku geçişi. Uykuya dalmayı kolaylaştıran özel doğa ritimleriyle hazırlandı.
              </p>
              
              <button className="bg-gradient-to-r from-secondary to-secondary-dim text-white px-8 py-4 rounded-full font-headline font-bold text-sm tracking-wide flex items-center gap-2.5 mx-auto md:mx-0 shadow-[0_12px_24px_rgba(104,52,235,0.3)] hover:scale-105 active:scale-95 transition-all border border-white/10">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_circle
                </span>
                Hemen Başlat
              </button>
            </div>
          </div>
        </section>
        
      </div>
    </MobileLayout>
  )
}
