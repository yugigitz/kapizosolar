import { Link } from 'react-router-dom'
import { phones, telHref, waMessages, whatsappHref } from '@/data/business'
import { trackEvent } from '@/lib/analytics'
import { CalculatorIcon, PhoneIcon, WhatsAppIcon } from './ui/Icons'

export default function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 backdrop-blur-sm xl:hidden">
      <div className="grid grid-cols-3 divide-x divide-slate-200">
        <a
          href={telHref(phones.primary)}
          onClick={() => trackEvent('phone_click', { context: 'mobile_bar' })}
          className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold text-kapizo-navy"
        >
          <PhoneIcon className="h-5 w-5 text-kapizo-orange-deep" />
          Call
        </a>
        <a
          href={whatsappHref(waMessages.general)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('whatsapp_click', { context: 'mobile_bar' })}
          className="flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-bold text-kapizo-navy"
        >
          <WhatsAppIcon className="h-5 w-5 text-kapizo-green" />
          WhatsApp
        </a>
        <Link
          to="/solar-calculator"
          className="flex flex-col items-center gap-0.5 bg-kapizo-orange py-2.5 text-[11px] font-bold text-white"
        >
          <CalculatorIcon className="h-5 w-5" />
          Get Quote
        </Link>
      </div>
    </div>
  )
}
