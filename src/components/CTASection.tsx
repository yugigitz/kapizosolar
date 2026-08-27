import { Link } from 'react-router-dom'
import { phones, waMessages, telHref, whatsappHref } from '@/data/business'
import { trackEvent } from '@/lib/analytics'
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from './ui/Icons'

type Props = {
  title?: string
  description?: string
  waMessage?: string
  primaryLabel?: string
  primaryTo?: string
  context?: string
}

export default function CTASection({
  title = 'Ready to see what solar looks like for your property?',
  description = 'Start with an estimate, or talk to us directly. Either way, the next step is a site assessment and a proper proposal, not a sales pitch.',
  waMessage = waMessages.general,
  primaryLabel = 'Calculate My Savings',
  primaryTo = '/solar-calculator',
  context = 'cta_section',
}: Props) {
  return (
    <section className="bg-kapizo-navy">
      <div className="container-kapizo py-14 sm:py-16">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-extrabold leading-tight text-white sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {description}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <Link to={primaryTo} className="btn-primary">
              {primaryLabel}
              <ArrowRightIcon />
            </Link>
            <a
              href={whatsappHref(waMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('whatsapp_click', { context })}
              className="btn-green"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Talk to a Solar Expert
            </a>
            <a
              href={telHref(phones.primary)}
              onClick={() => trackEvent('phone_click', { context })}
              className="btn-ghost-light"
            >
              <PhoneIcon className="h-4 w-4" />
              {phones.primary}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
