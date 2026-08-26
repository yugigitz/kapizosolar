import { Link } from 'react-router-dom'
import { usePageMeta } from '@/hooks/usePageMeta'
import { ArrowRightIcon } from '@/components/ui/Icons'

const links = [
  { label: 'Solar Calculator', to: '/solar-calculator' },
  { label: 'Solar Solutions', to: '/solutions' },
  { label: 'Plans', to: '/plans' },
  { label: 'PM Surya Ghar', to: '/pm-surya-ghar' },
  { label: 'Contact', to: '/contact' },
]

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found | Kapizo Solar',
    description: 'The page you are looking for could not be found.',
    path: '/404',
    noindex: true,
  })

  return (
    <section className="section bg-white">
      <div className="container-kapizo">
        <div className="mx-auto max-w-lg py-10 text-center">
          <p className="font-display text-6xl font-extrabold text-kapizo-orange">404</p>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-kapizo-navy sm:text-3xl">
            We could not find that page
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The link may be outdated or mistyped. Here is where most people are heading:
          </p>
          <ul className="mt-7 space-y-2 text-left">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-kapizo-navy transition-colors hover:border-kapizo-green hover:bg-kapizo-green/[0.03]"
                >
                  {l.label}
                  <ArrowRightIcon className="h-4 w-4 text-slate-400" />
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/" className="btn-primary mt-7">
            Back to homepage
          </Link>
        </div>
      </div>
    </section>
  )
}
