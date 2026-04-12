const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || ''
const REPLICATE_API_KEY = import.meta.env.VITE_REPLICATE_API_KEY || ''
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

const API_TIMEOUT_MS = 30_000

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS)
  try {
    const res = await fetch(url, { ...options, signal: controller.signal })
    if (!res.ok) {
      const body = await res.text().catch(() => '')
      throw new Error(`API isteği başarısız oldu (HTTP ${res.status}): ${body || res.statusText}`)
    }
    return res
  } catch (err: unknown) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('API isteği zaman aşımına uğradı. Lütfen tekrar deneyin.')
    }
    throw err
  } finally {
    clearTimeout(timeoutId)
  }
}

export async function generateBabyNames(params: {
  motherName: string
  fatherName: string
  surname: string
  motherBirthDate?: string
  fatherBirthDate?: string
  dueDate?: string
  gender: 'boy' | 'girl' | 'unisex'
  criteria: string[]
  count?: number
}): Promise<string> {
  const prompt = `Sen bir bebek isim uzmanısın. Numeroloji, astroloji, isim anlamları ve uluslararası telaffuz konusunda uzmansın.

Anne adı: ${params.motherName}
Baba adı: ${params.fatherName}
Soyadı: ${params.surname}
${params.motherBirthDate ? `Anne doğum tarihi: ${params.motherBirthDate}` : ''}
${params.fatherBirthDate ? `Baba doğum tarihi: ${params.fatherBirthDate}` : ''}
${params.dueDate ? `Tahmini doğum tarihi: ${params.dueDate}` : ''}
Cinsiyet: ${params.gender === 'boy' ? 'Erkek' : params.gender === 'girl' ? 'Kız' : 'Farketmez'}
Kriterler: ${params.criteria.join(', ')}

Lütfen ${params.count || 5} isim öner. Her isim için şu bilgileri JSON formatında ver:
[{
  "name": "İsim",
  "meaning": "Anlamı",
  "origin": "Kökeni",
  "gender": "boy/girl/unisex",
  "numerologyScore": 1-9 arası sayı,
  "numerologyMeaning": "Numerolojik anlam",
  "zodiacCompatibility": 1-100 arası uyum skoru,
  "isInternational": true/false (ç,ğ,ı,ö,ş,ü içermiyorsa true),
  "pronunciation": "Okunuşu",
  "tags": ["modern", "geleneksel", "uluslararası", vb.]
}]

Sadece JSON array döndür, başka bir şey yazma.`

  try {
    if (OPENAI_API_KEY) {
      const res = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.8,
        }),
      })
      const data = await res.json()
      return data.choices[0].message.content
    }

    if (GEMINI_API_KEY) {
      const res = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      )
      const data = await res.json()
      return data.candidates[0].content.parts[0].text
    }
  } catch (err: unknown) {
    throw new Error(err instanceof Error ? err.message : 'İsim önerileri alınırken bir hata oluştu.')
  }

  throw new Error('API anahtarı bulunamadı. Lütfen .env dosyasına VITE_OPENAI_API_KEY veya VITE_GEMINI_API_KEY ekleyin.')
}

export async function generateBabyImage(params: {
  motherPhotoUrl: string
  fatherPhotoUrl: string
  gender: 'boy' | 'girl'
  age: number
  style: 'realistic' | 'soft' | 'artistic'
}): Promise<string> {
  const styleMap = {
    realistic: 'photorealistic, high quality portrait photo',
    soft: 'soft dreamy portrait, gentle lighting, warm tones',
    artistic: 'artistic watercolor style portrait, pastel colors',
  }

  const prompt = `Generate a ${styleMap[params.style]} of a ${params.age} year old ${params.gender === 'boy' ? 'boy' : 'girl'} baby/child. The child should be a blend of the two parents shown. Cute, healthy, happy expression. Studio lighting, clean background.`

  try {
    if (REPLICATE_API_KEY) {
      const res = await fetchWithTimeout('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${REPLICATE_API_KEY}`,
        },
        body: JSON.stringify({
          version: 'stability-ai/sdxl',
          input: {
            prompt,
            image: params.motherPhotoUrl,
            num_outputs: 1,
          },
        }),
      })
      const data = await res.json()
      // Replicate returns output as an array of URLs
      if (data.output && Array.isArray(data.output) && data.output.length > 0) {
        return data.output[0]
      }
      // Fallback: prediction may still be processing, return the polling URL or ID
      return data.urls?.get || data.id
    }

    if (OPENAI_API_KEY) {
      const res = await fetchWithTimeout('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size: '1024x1024',
          quality: 'hd',
        }),
      })
      const data = await res.json()
      return data.data[0].url
    }
  } catch (err: unknown) {
    throw new Error(err instanceof Error ? err.message : 'Görsel oluşturulurken bir hata oluştu.')
  }

  throw new Error('API anahtarı bulunamadı. Lütfen .env dosyasına VITE_OPENAI_API_KEY veya VITE_REPLICATE_API_KEY ekleyin.')
}

export async function getAIResponse(prompt: string): Promise<string> {
  try {
    if (OPENAI_API_KEY) {
      const res = await fetchWithTimeout('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        }),
      })
      const data = await res.json()
      return data.choices[0].message.content
    }

    if (GEMINI_API_KEY) {
      const res = await fetchWithTimeout(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      )
      const data = await res.json()
      return data.candidates[0].content.parts[0].text
    }
  } catch (err: unknown) {
    throw new Error(err instanceof Error ? err.message : 'AI yanıtı alınırken bir hata oluştu.')
  }

  throw new Error('API anahtarı bulunamadı.')
}
