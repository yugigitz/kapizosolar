import { phones, telHref, whatsappHref } from '@/data/business'
import { trackEvent } from '@/lib/analytics'
import { PhoneIcon, WhatsAppIcon } from './Icons'

type CallProps = {
  phone?: string
  label?: string
  className?: string
  context?: string
}

export function CallButton({
  phone = phones.primary,
  label,
  className = 'btn-navy',
  context = 'generic',
}: CallProps) {
  return (
    <a
      href={telHref(phone)}
      className={className}
      onClick={() => trackEvent('phone_click', { phone, context })}
      aria-label={`Call Kapizo Solar on ${phone}`}
    >
      <PhoneIcon className="h-4 w-4" />
      {label ?? `Call ${phone}`}
    </a>
  )
}

type WaProps = {
  message: string
  phone?: string
  label?: string
  className?: string
  context?: string
}

export function WhatsAppButton({
  message,
  phone = phones.primary,
  label = 'WhatsApp Us',
  className = 'btn-green',
  context = 'generic',
}: WaProps) {
  return (
    <a
      href={whatsappHref(message, phone)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent('whatsapp_click', { phone, context })}
      aria-label={`${label} on WhatsApp`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {label}
    </a>
  )
}
