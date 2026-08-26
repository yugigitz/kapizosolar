import { Link } from 'react-router-dom'
import { KapizoLogo } from './ui/BrandImage'
import { business, phones, telHref } from '@/data/business'
import { MapPinIcon, PhoneIcon } from './ui/Icons'

const quickLinks = [
  { label: 'Solar Solutions', to: '/solutions' },
  { label: 'Solar Calculator', to: '/solar-calculator' },
  { label: 'Plans', to: '/plans' },
  { label: 'PM Surya Ghar', to: '/pm-surya-ghar' },
  { label: 'Solar Knowledge Hub', to: '/solar-knowledge' },
  { label: 'About Kapizo', to: '/about' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

const solutionLinks = [
  { label: 'Residential Rooftop Solar', to: '/solutions/residential' },
  { label: 'Commercial Solar EPC', to: '/solutions/commercial' },
  { label: 'Industrial Solar Solutions', to: '/solutions/industrial' },
  { label: 'Agricultural Solar Solutions', to: '/solutions/agricultural' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-kapizo py-14 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-block rounded-lg bg-white p-3 shadow-sm">
              <KapizoLogo alt="Kapizo Solar logo" className="h-10 w-auto" />
            </div>
            <p className="mt-4 text-sm font-semibold text-kapizo-green">{business.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              A solar EPC company based in Mancherial, delivering rooftop solar design, installation
              and commissioning across Telangana.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-kapizo-navy">Quick Links</h2>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition-colors hover:text-kapizo-green">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-kapizo-navy">Solar Solutions</h2>
            <ul className="mt-4 space-y-2.5">
              {solutionLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-600 transition-colors hover:text-kapizo-green">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-kapizo-navy">Contact</h2>
            <address className="mt-4 space-y-3 not-italic">
              <a
                href={telHref(phones.primary)}
                className="flex items-center gap-2 text-sm font-semibold text-kapizo-navy hover:text-kapizo-green"
              >
                <PhoneIcon className="h-4 w-4 text-kapizo-orange" />
                {phones.primary}
              </a>
              <a
                href={telHref(phones.secondary)}
                className="flex items-center gap-2 text-sm font-semibold text-kapizo-navy hover:text-kapizo-green"
              >
                <PhoneIcon className="h-4 w-4 text-kapizo-orange" />
                {phones.secondary}
              </a>
              <div className="flex gap-2 pt-1 text-sm leading-relaxed text-slate-600">
                <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-kapizo-orange" />
                <span>
                  {business.address.line1}
                  <br />
                  {business.address.line2}
                  <br />
                  {business.address.city}, {business.address.state} – {business.address.postalCode}
                </span>
              </div>
            </address>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Service Area
            </p>
            <p className="text-sm text-slate-600">{business.serviceArea}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="text-xs text-slate-500 hover:text-kapizo-green">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-slate-500 hover:text-kapizo-green">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
