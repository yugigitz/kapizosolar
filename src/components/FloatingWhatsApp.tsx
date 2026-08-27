import { phones, waMessages, whatsappHref } from '@/data/business'
import { trackEvent } from '@/lib/analytics'
import { WhatsAppIcon } from './ui/Icons'

/**
 * Persistent WhatsApp button, shown on every public page.
 *
 * Routed to phones.secondary (9652398338) rather than the site-wide primary
 * number, because this channel is monitored separately from the enquiry form
 * and the in-page CTAs.
 *
 * Placement avoids the two things it could otherwise cover:
 *   - the mobile action bar (MobileCTA), which is fixed to the bottom below
 *     the xl breakpoint, so the button clears it until that bar disappears;
 *   - form fields and in-page CTAs, by sitting in the right gutter rather
 *     than over the content column.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(waMessages.general, phones.secondary)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { context: 'floating_button' })}
      aria-label="Chat with Kapizo Solar on WhatsApp"
      className="group fixed right-4 z-40 flex items-center gap-0 overflow-hidden rounded-full
                 bg-[#25D366] text-white shadow-[0_4px_14px_rgba(37,211,102,0.35)]
                 ring-1 ring-black/5 transition-shadow duration-200
                 hover:shadow-[0_6px_20px_rgba(37,211,102,0.45)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                 focus-visible:ring-offset-2 focus-visible:ring-offset-kapizo-navy
                 bottom-[4.75rem] sm:right-5 xl:bottom-6 xl:right-6"
    >
      <span className="flex shrink-0 items-center justify-center p-3.5 sm:p-4">
        <WhatsAppIcon className="h-6 w-6" />
      </span>
      {/* Label expands on hover for pointer users; icon-only on touch, where
          horizontal space is tight and the icon is already unambiguous. */}
      <span
        className="hidden max-w-0 whitespace-nowrap text-sm font-semibold
                   transition-[max-width,padding] duration-300 ease-out
                   group-hover:max-w-[11rem] group-hover:pr-5
                   group-focus-visible:max-w-[11rem] group-focus-visible:pr-5
                   xl:block"
      >
        Chat on WhatsApp
      </span>
    </a>
  )
}
