import { Link } from 'react-router-dom'
import { phones, telHref } from '@/data/business'
import { PRICING_STATEMENT, planWhatsAppMessage, specValue, type Plan } from '@/data/plans'
import { whatsappHref } from '@/data/business'
import { trackEvent } from '@/lib/analytics'
import { ArrowRightIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from '../ui/Icons'

export default function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      className={`relative flex flex-col rounded-xl border bg-white transition-shadow duration-300 ${
        plan.recommended
          ? // The default option, so it is lifted out of the row rather than
            // sitting level with the other two.
            'border-2 border-kapizo-green p-6 shadow-card-hover ring-4 ring-kapizo-green/10 lg:-my-3 lg:py-9'
          : 'border-slate-200 p-6 shadow-card hover:shadow-card-hover'
      }`}
    >
      {plan.recommended && (
        <span className="absolute -top-3.5 left-6 inline-flex items-center gap-1.5 rounded-full bg-kapizo-green px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
          <span aria-hidden="true">⭐</span>
          Most customers start here
        </span>
      )}

      <h3 className="font-display text-xl font-extrabold text-kapizo-navy">
        {plan.name}
        {plan.recommended && (
          <span className="ml-1.5 text-base" aria-hidden="true">
            ⭐
          </span>
        )}
      </h3>
      <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-kapizo-orange-deep">
        {plan.audienceLabel}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">{plan.positioning}</p>

      <dl className="mt-5 space-y-2 border-y border-slate-100 py-4 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">System size</dt>
          <dd className="text-right font-semibold text-kapizo-navy">{plan.capacityOptions}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">Modules</dt>
          <dd className="text-right font-semibold text-kapizo-navy">{specValue(plan.specs.panels)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-slate-500">Battery</dt>
          <dd className="text-right font-semibold text-kapizo-navy">{specValue(plan.specs.storage)}</dd>
        </div>
      </dl>

      <ul className="mt-4 flex-1 space-y-2.5">
        {plan.keyAdvantages.map((adv) => (
          <li key={adv} className="flex gap-2.5 text-sm text-slate-600">
            <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-kapizo-green" />
            {adv}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">{PRICING_STATEMENT}</p>

      <div className="mt-5 space-y-2.5">
        <Link
          to={`/plans/${plan.slug}`}
          onClick={() => trackEvent('plan_select', { plan: plan.id, action: 'view_details' })}
          className={plan.recommended ? 'btn-primary w-full' : 'btn-navy w-full'}
        >
          View {plan.name}
          <ArrowRightIcon />
        </Link>
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={whatsappHref(planWhatsAppMessage(plan))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { context: 'plan_card', plan: plan.id })}
            className="btn-outline !px-3 !py-2.5 text-xs"
          >
            <WhatsAppIcon className="h-4 w-4 text-kapizo-green" />
            WhatsApp
          </a>
          <a
            href={telHref(phones.primary)}
            onClick={() => trackEvent('phone_click', { context: 'plan_card', plan: plan.id })}
            className="btn-outline !px-3 !py-2.5 text-xs"
          >
            <PhoneIcon className="h-4 w-4 text-kapizo-orange-deep" />
            Call
          </a>
        </div>
      </div>
    </article>
  )
}
