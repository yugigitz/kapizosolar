import logoWebp from '@/assets/kapizo-solar-logo-display.webp'
import logoPng from '@/assets/kapizo-solar-logo-display.png'
import bannerWebp from '@/assets/kapizo-solar-banner-display.webp'
import bannerPng from '@/assets/kapizo-solar-banner-display.png'

/**
 * Brand images render from display-sized derivatives of the official assets.
 * The derivatives are scaled copies — the logo design itself is unaltered.
 * The full-resolution originals remain untouched at:
 *   src/assets/kapizo-logo.png       (1825x862)
 *   src/assets/kapizo-web-banner.png (2048x682)
 */

type Props = {
  className?: string
  alt: string
  priority?: boolean
}

export function KapizoLogo({ className = '', alt, priority = false }: Props) {
  return (
    <picture>
      <source srcSet={logoWebp} type="image/webp" />
      <img
        src={logoPng}
        alt={alt}
        width={508}
        height={240}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  )
}

export function KapizoBanner({ className = '', alt, priority = false }: Props) {
  return (
    <picture>
      <source srcSet={bannerWebp} type="image/webp" />
      <img
        src={bannerPng}
        alt={alt}
        width={1081}
        height={360}
        className={className}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchPriority: 'high' as const } : {})}
      />
    </picture>
  )
}
