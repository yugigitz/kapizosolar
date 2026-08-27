import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { ChevronDownIcon } from './ui/Icons'

export type Crumb = { name: string; path: string }

type Props = {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  children?: ReactNode
  /**
   * Tightens the vertical rhythm so the section below the header reaches the
   * first viewport. Used where the page's main interaction, rather than the
   * headline, is the thing the visitor came for.
   */
  dense?: boolean
}

export default function PageHeader({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
  dense,
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-kapizo-gradient">
      <div className="absolute inset-0 bg-kapizo-radial" aria-hidden="true" />
      <div
        className={`container-kapizo relative ${
          dense ? 'py-8 sm:py-10 lg:py-12' : 'py-12 sm:py-16 lg:py-20'
        }`}
      >
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className={dense ? 'mb-3' : 'mb-5'}>
            <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-300">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.path} className="flex items-center gap-1">
                  {i > 0 && (
                    <ChevronDownIcon className="h-3.5 w-3.5 -rotate-90 text-slate-500" />
                  )}
                  {i === breadcrumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-kapizo-amber">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link to={crumb.path} className="hover:text-white">
                      {crumb.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className="eyebrow !text-kapizo-amber">{eyebrow}</span>
        )}
        <h1
          className={`mt-3 max-w-3xl font-display font-extrabold leading-[1.12] text-white ${
            dense ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-3xl sm:text-4xl lg:text-5xl'
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`leading-relaxed text-slate-300 ${
              dense ? 'mt-3 max-w-3xl text-sm sm:text-base' : 'mt-5 max-w-2xl text-base sm:text-lg'
            }`}
          >
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  )
}
