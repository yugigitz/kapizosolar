import { useEffect } from 'react'
import { applyJsonLd, applySeo, type SeoConfig } from '@/lib/seo'

export function usePageMeta(seo: SeoConfig, schemas: object[] = []) {
  useEffect(() => {
    applySeo(seo)
    applyJsonLd(schemas)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seo.path])
}
