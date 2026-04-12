import { motion } from 'framer-motion'
import { MobileLayout } from '@/components/layout/MobileLayout'

interface Story {
  id: string
  title: string
  image: string
  duration: string
}

interface Category {
  id: string
  name: string
  icon: string
  color: string
  bgColor: string
}

const stories: Story[] = [
  { 
    id: '1', 
    title: "Ay Dede'nin Maceraları", 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCP3I74t7N8lxg96c-DdS5lYLPcSF0YtNAOstI_1IpE9iPNgTTNtI20B6oM-42TgfixuNyBwdTKf9nt1dDfXQhQuZaVZ6ASDDdyWHQZOBELqIeM9Y3VsxIlzDa6hUxcz4Tfx-9veM8ND3q4yA0PHVulTqSTGR0e_UQ_utWYT9Aql-qrfe6VKlnVIEnhtPlVvLcl8mFywkSZM40eimasEYTgaODb74bcof35204sbCQnWTu84zd6fGtiLifZ0MUBR6A0sUo9fuF9pck', 
    duration: '5 dk' 
  },
  { 
    id: '2', 
    title: 'Küçük Yıldızın Yolculuğu', 
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBfVz-HqUZBIB_tNTookIPenpgtCZtPlgJtXH4uTvJPSCpkyiMzemPMkKl6mqoyu7X-MPA-5oNawQipqQYO6gMp_pS4t4y-ddGEKE2W59Mz8et4gV7Y31sQwwNthGGp-TYGqYqOBO-PylyaEC9Nda5ncPui241h1GTIE2IY6b9GjzlGznRGRqS5QWP0_Ieo_6Hck5dn4LJ4C6kPMq1bqIr0KbA65faRq6Xd2cGWonFLqYeKMsY4QV0SvFqdFl_a0eITWcApwknpVQ', 
    duration: '10 dk' 
  },
]

const categories: Category[] = [
  { id: '1', name: 'Doğa Masalları', icon: 'nature_people', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  { id: '2', name: 'Hayvan Dostlar', icon: 'pets', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  { id: '3', name: 'Uzay Serüveni', icon: 'rocket_launch', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { id: '4', name: 'Sevgi Bağı', icon: 'favorite', color: 'text-pink-600', bgColor: 'bg-pink-100' },
]

export default function Stories() {
  return (
    <MobileLayout title="Masallar ve Hikayeler" showBack>
      <div className="space-y-12 pb-6 mt-4">
        
        {/* Header Section */}
        <section className="space-y-2">
          <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">Uyku Öncesi Masallar</h2>
          <p className="text-on-surface-variant max-w-md font-body text-lg">
            Bebeğinizin hayal dünyasını besleyen, huzurlu bir uykuya hazırlayan en tatlı hikayeler burada.
          </p>
        </section>

        {/* Stories Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-card border border-white/50 hover:shadow-[0_30px_60px_rgba(104,52,235,0.12)] transition-all duration-500 flex flex-col"
            >
              <div className="h-64 md:h-80 overflow-hidden relative">
                <img 
                  src={story.image} 
                  alt={story.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/20">
                  <span className="material-symbols-outlined text-white text-sm">schedule</span>
                  <span className="text-white text-xs font-semibold">{story.duration}</span>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <h3 className="text-2xl font-headline font-bold text-on-surface line-clamp-1">{story.title}</h3>
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-secondary to-secondary-dim text-white py-3 md:py-4 rounded-full font-headline font-semibold flex items-center justify-center gap-2 shadow-lg shadow-secondary/30 active:scale-95 hover:scale-[1.02] transition-all">
                    <span className="material-symbols-outlined text-sm md:text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_arrow
                    </span>
                    Sesli Dinle
                  </button>
                  <button className="flex-1 border-2 border-secondary-container text-secondary py-3 md:py-4 rounded-full font-headline font-semibold flex items-center justify-center gap-2 hover:bg-secondary-container transition-all active:scale-95">
                    <span className="material-symbols-outlined text-sm md:text-base">menu_book</span>
                    Oku
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Featured Section: Günün Hikayesi */}
        <section className="relative mt-8">
          <div className="bg-gradient-to-br from-[#1a1c2c] to-[#4a1942] rounded-3xl p-8 md:p-12 overflow-hidden relative shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Background Decorative Glow */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-pink-500/20 rounded-full blur-[80px]" />

            {/* Image Container with Breakout */}
            <div className="w-full md:w-5/12 relative z-10 flex justify-center">
              <div className="aspect-square w-full max-w-[280px] rounded-[2rem] overflow-hidden border-4 border-white/10 shadow-2xl transform md:-rotate-3 group transition-transform hover:rotate-0 duration-500">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqh7iB-NsgeVXtPbR2itvtl4U7BU_8gwqdTZH_gdV2M-g8pAlsJgx0lRA18IiBvhhdWC7IN6x_f11-WtQxjsEay8f3flOq3klFIKzXr83n-79Xmpa0DALe9a3OAhIEaGslcDnhIKc5ikKopxgLVNEF4aIj1pCtXiCbXSbzLTS46bM9e3ihnMeAmRvgBSRmsItr_fDnp3j2YNWeEzhUhyJjFvPDb8NTMPytp79o-CiSbTkjeKHT9RN42LPq0Z8Itl7xH8x-LkPJlXc" 
                  alt="Günün Hikayesi" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Content Container */}
            <div className="w-full md:w-7/12 space-y-6 z-10 text-white flex flex-col items-center md:items-start text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary rounded-full border border-secondary/50 shadow-md">
                <span className="material-symbols-outlined text-sm text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span className="text-[11px] font-extrabold tracking-widest uppercase text-secondary-fixed">Günün Hikayesi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold leading-tight text-white drop-shadow-lg">
                Bulutların Üstündeki Köy
              </h2>
              <p className="text-slate-300 text-base md:text-lg font-body font-light leading-relaxed max-w-md">
                Pofuduk bulutların üzerinde yaşayan küçük bir kuzunun rüya dolu serüvenine eşlik edin. En popüler masalımız!
              </p>
              
              <div className="flex flex-col md:flex-row items-center gap-6 pt-4 w-full justify-center md:justify-start">
                <button className="w-full md:w-auto bg-white text-secondary px-8 py-4 rounded-full font-headline font-bold shadow-xl flex items-center justify-center gap-3 active:scale-95 hover:scale-105 transition-all text-sm md:text-base">
                  <span className="material-symbols-outlined text-xl md:text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_circle
                  </span>
                  Hemen Dinle
                </button>
                <div className="flex items-center gap-6 text-slate-300 mt-2 md:mt-0">
                  <div className="flex flex-col items-center">
                    <span className="text-xl md:text-2xl font-headline font-bold text-white">12 dk</span>
                    <span className="text-[10px] opacity-70 uppercase font-bold tracking-widest font-body">Süre</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/20" />
                  <div className="flex flex-col items-center">
                    <span className="text-xl md:text-2xl font-headline font-bold text-white">4.9</span>
                    <span className="text-[10px] opacity-70 uppercase font-bold tracking-widest font-body">Puan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="pt-4 pb-2">
          <h3 className="text-2xl font-headline font-bold mb-6 flex items-center gap-3 text-on-surface">
            <span className="material-symbols-outlined text-primary text-3xl">auto_awesome_motion</span>
            Hikaye Kategorileri
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar -mx-4 px-4 snap-x">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="snap-start flex-shrink-0 bg-surface-container-lowest border border-white/60 px-6 py-5 rounded-2xl flex items-center gap-4 active:scale-95 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className={`w-12 h-12 rounded-full ${cat.bgColor} flex items-center justify-center ${cat.color} shadow-inner`}>
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>{cat.icon}</span>
                </div>
                <span className="font-headline font-bold text-base text-on-surface">{cat.name}</span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </MobileLayout>
  )
}
