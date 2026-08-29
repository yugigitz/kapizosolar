export const SITE_URL = 'https://kapizosolar.in'

export const business = {
  name: 'Kapizo Solar',
  legalName: 'Kapizo Solar',
  tagline: 'Powering a Sustainable Tomorrow',
  description:
    'Kapizo Solar is a solar EPC company based in Mancherial, Telangana, providing rooftop solar design, installation and commissioning for homes, businesses, industries and agricultural customers across Telangana.',
  address: {
    line1: '#18-225, Padmashali Colony',
    line2: 'Near Panchamukhi Hanuman Temple',
    city: 'Mancherial',
    state: 'Telangana',
    postalCode: '504208',
    country: 'IN',
  },
  serviceArea: 'Mancherial and across Telangana',
  /**
   * Contact lines. Designations are deliberately omitted until the team
   * structure is finalised, so nothing here invents a job title.
   */
  contacts: [
    { name: 'Yugandhar Jadi', phone: '7799049801' },
    { name: 'Thoutam Ramakrishna', phone: '9652398338' },
  ],
} as const

/**
 * Three distinct lines, deliberately not interchangeable:
 *   primary   - Yugandhar Jadi's line, used for calls and the contact page.
 *   secondary - Thoutam Ramakrishna's line, used for calls and the contact page.
 *   whatsapp  - the shared WhatsApp line behind the floating button. It is not
 *               either personal number and must not be substituted with one.
 */
export const phones = {
  primary: '7799049801',
  secondary: '9652398338',
  whatsapp: '9640358338',
} as const

/**
 * Social profiles. Empty means the account does not exist yet: the footer
 * renders the icon in a disabled state rather than linking somewhere wrong.
 * Adding the real URL here is the only change needed to activate the link.
 */
export const socialLinks = {
  instagram: '',
  facebook: '',
} as const

export const primaryPhoneIntl = `+91${phones.primary}`
export const secondaryPhoneIntl = `+91${phones.secondary}`

export function telHref(phone: string): string {
  return `tel:+91${phone.replace(/\D/g, '').slice(-10)}`
}

export function whatsappHref(message: string, phone: string = phones.primary): string {
  const digits = phone.replace(/\D/g, '').slice(-10)
  return `https://wa.me/91${digits}?text=${encodeURIComponent(message)}`
}

export const waMessages = {
  general:
    'Hello Kapizo Solar, I am interested in installing a rooftop solar system. I would like to know the suitable system size, approximate cost, subsidy eligibility and savings.',
  quote:
    'Hello Kapizo Solar, I would like to request a solar quote for my property. Please share the recommended system size and estimated cost.',
  consultation:
    'Hello Kapizo Solar, I would like to book a free consultation to discuss rooftop solar for my property.',
  siteVisit:
    'Hello Kapizo Solar, I would like to request a rooftop site assessment visit. Please let me know the available slots.',
  expert:
    'Hello Kapizo Solar, I would like to speak with a solar expert about system options for my property.',
  subsidy:
    'Hello Kapizo Solar, I would like to understand my eligibility under the PM Surya Ghar rooftop solar scheme and how the subsidy process works.',
  commercial:
    'Hello Kapizo Solar, I am interested in a commercial solar installation. Please share details on system design and the EPC process.',
  industrial:
    'Hello Kapizo Solar, I am interested in an industrial solar solution. Please share details on capacity planning and the EPC process.',
  agricultural:
    'Hello Kapizo Solar, I am interested in a solar solution for agricultural use. Please share the available options.',
} as const
