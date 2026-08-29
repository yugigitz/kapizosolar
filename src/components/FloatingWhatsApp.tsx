import { phones, waMessages, whatsappHref } from '@/data/business'
import { trackEvent } from '@/lib/analytics'
import { WhatsAppIcon } from './ui/Icons'

/**
 * The single persistent WhatsApp button on the public site.
 *
 * Routed to phones.whatsapp (9640358338), the shared WhatsApp line. This is
 * neither personal contact number and must not be swapped for one. The button
 * is deliberately a plain circle rather than a labelled pill so it reads as an
 * overlay affordance instead of a second copy of the mobile action bar's
 * button, and it sits over that bar's right-hand cell rather than above its
 * WhatsApp cell.
 *
 * No entrance or hover animation beyond a shadow change: a button that is on
 * screen at all times should not draw attention to itself.
 *
 * Placement clears the two things it could otherwise cover. Vertically it sits
 * above the mobile action bar, which is fixed to the bottom below xl.
 * Horizontally it is paired with the container safe area in index.css: the
 * offset is kept tight so the reservation the page has to make stays as small
 * as the button's own footprint allows.
 */
export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref(waMessages.general, phones.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent('whatsapp_click', { context: 'floating_button' })}
      aria-label="Chat with Kapizo Solar on WhatsApp"
      title="Chat with Kapizo Solar on WhatsApp"
      className="fixed bottom-[4.5rem] right-2 z-40 flex h-11 w-11 items-center justify-center
                 rounded-full bg-[#25D366] text-white ring-1 ring-white/70
                 shadow-[0_6px_16px_-4px_rgba(2,6,23,0.45)]
                 transition-shadow duration-200 hover:shadow-[0_8px_22px_-4px_rgba(2,6,23,0.55)]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white
                 focus-visible:ring-offset-2 focus-visible:ring-offset-kapizo-navy
                 sm:right-5 sm:h-12 sm:w-12 xl:bottom-6 xl:right-6 xl:h-14 xl:w-14"
    >
      <WhatsAppIcon className="h-[22px] w-[22px] sm:h-6 sm:w-6 xl:h-7 xl:w-7" />
    </a>
  )
}
