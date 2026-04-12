import { useState } from 'react'

export function useImageFallback(src: string, fallback = '') {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const onError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallback)
    }
  }

  return { src: imgSrc, onError, hasError }
}
