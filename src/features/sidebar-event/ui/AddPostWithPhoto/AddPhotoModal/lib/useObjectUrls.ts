import { useEffect, useMemo } from 'react'

export const useObjectUrls = (files: File[]) => {
  const urls = useMemo(() => files.map(f => URL.createObjectURL(f)), [files])

  useEffect(() => {
    return () => {
      for (const url of urls) {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url)
        }
      }
    }
  }, [urls])

  return urls
}
