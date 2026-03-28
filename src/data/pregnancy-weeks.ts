import type { PregnancyWeek } from '@/types'

export const pregnancyWeeks: PregnancyWeek[] = [
  {
    week: 4, babySize: '1 mm', babySizeComparison: 'Haşhaş tohumu', babyWeight: '<1 g', babyLength: '1 mm',
    babyDevelopment: ['Embriyo rahme yerleşiyor', 'Plasenta oluşmaya başlıyor', 'Sinir sistemi gelişmeye başlıyor'],
    motherSymptoms: ['Adet gecikmesi', 'Hafif kramplar', 'Yorgunluk'],
    tips: ['Folik asit almaya başlayın', 'Doktorunuza başvurun', 'Alkol ve sigaradan uzak durun'],
    warning: ['Ağır kanama', 'Şiddetli karın ağrısı'],
  },
  {
    week: 5, babySize: '2 mm', babySizeComparison: 'Susam tohumu', babyWeight: '<1 g', babyLength: '2 mm',
    babyDevelopment: ['Kalp atmaya başlıyor', 'Beyin ve omurilik gelişiyor', 'Göz ve kulak tomurcukları oluşuyor'],
    motherSymptoms: ['Bulantı başlayabilir', 'Göğüslerde hassasiyet', 'Sık idrara çıkma'],
    tips: ['Küçük ve sık öğünler yiyin', 'Bol su için', 'Prenatal vitamin alın'],
    warning: ['Ağır kanama', 'Tek taraflı ağrı'],
  },
  {
    week: 8, babySize: '1.6 cm', babySizeComparison: 'Ahududu', babyWeight: '1 g', babyLength: '1.6 cm',
    babyDevelopment: ['Parmaklar ve ayak parmakları beliriyor', 'Yüz hatları oluşuyor', 'Tüm ana organlar mevcut'],
    motherSymptoms: ['Sabah bulantısı yoğun olabilir', 'Yorgunluk', 'Duygusal dalgalanmalar'],
    tips: ['Zencefil çayı bulantıya iyi gelebilir', 'İlk ultrasonunuzu planlayın', 'Düzenli uyuyun'],
    warning: ['Şiddetli kusma (hiperemezis)', 'Kanama'],
  },
  {
    week: 12, babySize: '5.4 cm', babySizeComparison: 'Limon', babyWeight: '14 g', babyLength: '5.4 cm',
    babyDevelopment: ['Refleksler gelişiyor', 'Tırnaklar oluşuyor', 'Yüz ifadeleri yapabiliyor', 'Cinsiyet organları belirginleşiyor'],
    motherSymptoms: ['Bulantı azalmaya başlıyor', 'Enerji artıyor', 'Karında hafif şişkinlik'],
    tips: ['İkili test zamanı', 'Haberi paylaşmaya başlayabilirsiniz', 'Hafif egzersiz yapın'],
    warning: ['Vajinal kanama', 'Ateş'],
  },
  {
    week: 16, babySize: '11.6 cm', babySizeComparison: 'Avokado', babyWeight: '100 g', babyLength: '11.6 cm',
    babyDevelopment: ['Hareketler hissedilebilir', 'İskelet güçleniyor', 'Saç çıkmaya başlıyor', 'Yüz ifadeleri artıyor'],
    motherSymptoms: ['Enerji artışı', 'İlk hareketler (flutter)', 'Burun tıkanıklığı'],
    tips: ['Üçlü tarama testi', 'Rahat kıyafetler giyin', 'Demir açısından zengin besinler tüketin'],
    warning: ['Baş ağrısı ile birlikte görme bulanıklığı'],
  },
  {
    week: 20, babySize: '16.5 cm', babySizeComparison: 'Muz', babyWeight: '300 g', babyLength: '25 cm (baş-topuk)',
    babyDevelopment: ['Cinsiyet ultrasonla belirlenebilir', 'Verniks (koruyucu tabaka) oluşuyor', 'Uyku-uyanıklık döngüsü var', 'Sesleri duyabiliyor'],
    motherSymptoms: ['Karın belirginleşiyor', 'Sırt ağrısı başlayabilir', 'Bebek hareketleri hissediliyor'],
    tips: ['Detaylı ultrason zamanı', 'Bebek odasını planlamaya başlayın', 'Kegel egzersizleri yapın'],
    warning: ['Ani şişlik (yüz ve ellerde)', 'Baş ağrısı'],
  },
  {
    week: 24, babySize: '30 cm', babySizeComparison: 'Mısır koçanı', babyWeight: '600 g', babyLength: '30 cm',
    babyDevelopment: ['Akciğerler gelişiyor', 'Beyin hızla büyüyor', 'Göz kapakları açılıp kapanabiliyor', 'Parmak izleri oluşuyor'],
    motherSymptoms: ['Braxton Hicks kasılmaları', 'Bacak krampları', 'Uyku güçlüğü'],
    tips: ['Şeker yükleme testi (24-28. hafta)', 'Sol tarafınıza yatın', 'Doğum hazırlık kursuna başlayın'],
    warning: ['Düzenli kasılmalar', 'Sıvı gelmesi'],
  },
  {
    week: 28, babySize: '38 cm', babySizeComparison: 'Patlıcan', babyWeight: '1 kg', babyLength: '38 cm',
    babyDevelopment: ['Gözlerini açıp kapatabiliyor', 'Rüya görebiliyor', 'Bağışıklık sistemi gelişiyor', 'Beyin kıvrımları oluşuyor'],
    motherSymptoms: ['Nefes darlığı', 'Mide ekşimesi', 'Ödem (şişlik)'],
    tips: ['3. trimester başlıyor', 'Doğum planınızı yapmaya başlayın', 'Bebek eşyalarını hazırlamaya başlayın'],
    warning: ['Azalan bebek hareketleri', 'Görme değişiklikleri'],
  },
  {
    week: 32, babySize: '42 cm', babySizeComparison: 'Kabak', babyWeight: '1.7 kg', babyLength: '42 cm',
    babyDevelopment: ['Kemikler sertleşiyor (kafatası hariç)', 'Akciğerler olgunlaşıyor', 'Yağ depolamaya devam ediyor', 'Baş aşağı pozisyon alabilir'],
    motherSymptoms: ['Sık idrara çıkma artıyor', 'Sırt ağrısı', 'Uyku bozuklukları'],
    tips: ['Hastane çantanızı hazırlayın', 'Doğum planını finalize edin', 'Bebek koltuğu alın'],
    warning: ['Su gelmesi', 'Düzenli kasılmalar'],
  },
  {
    week: 36, babySize: '47 cm', babySizeComparison: 'Karpuz (küçük)', babyWeight: '2.7 kg', babyLength: '47 cm',
    babyDevelopment: ['Akciğerler neredeyse tam olgun', 'Bağışıklık sistemi güçleniyor', 'Baş aşağı pozisyonda', 'Yağ depolama devam ediyor'],
    motherSymptoms: ['Pelvik basınç', 'Sık kasılmalar', '"Aydınlanma" (bebeğin aşağı inmesi)'],
    tips: ['Haftalık doktor kontrolü', 'B grubu streptokok testi', 'Emzirme hazırlığı yapın'],
    warning: ['Su gelmesi', 'Kanama', 'Azalan bebek hareketleri'],
  },
  {
    week: 40, babySize: '51 cm', babySizeComparison: 'Karpuz', babyWeight: '3.4 kg', babyLength: '51 cm',
    babyDevelopment: ['Tam olgun bebek', 'Organlar çalışmaya hazır', 'Güçlü kavrama refleksi', 'Doğuma hazır!'],
    motherSymptoms: ['Kasılmalar sıklaşabilir', 'Serviks açılması', 'Enerji patlaması olabilir'],
    tips: ['Doğum belirtilerini bilin', 'Hastaneye ne zaman gideceğinizi bilin', 'Rahat olun ve dinlenin'],
    warning: ['Su gelmesi', 'Düzenli ve güçlü kasılmalar', 'Kanama'],
  },
]

export function getWeekData(week: number): PregnancyWeek {
  const sorted = [...pregnancyWeeks].sort((a, b) => a.week - b.week)
  let closest = sorted[0]
  for (const w of sorted) {
    if (w.week <= week) closest = w
    else break
  }
  return closest
}
