import PageHeader from '@/components/PageHeader'
import LeadForm from '@/components/LeadForm'
import { business, phones, telHref, waMessages, whatsappHref } from '@/data/business'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, localBusinessSchema, webPageSchema } from '@/lib/seo'
import { trackEvent } from '@/lib/analytics'
import { MapPinIcon, PhoneIcon, WhatsAppIcon } from '@/components/ui/Icons'

export default function ContactPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]

  usePageMeta(
    {
      title: 'Contact Kapizo Solar | Rooftop Solar in Mancherial, Telangana',
      description:
        'Contact Kapizo Solar in Mancherial, Telangana for rooftop solar enquiries. Call 7799049801 or 9652398338, WhatsApp us, or request a site assessment.',
      path: '/contact',
    },
    [
      webPageSchema(
        'Contact Kapizo Solar',
        'Get in touch with Kapizo Solar for rooftop solar enquiries in Telangana.',
        '/contact',
      ),
      breadcrumbSchema(crumbs),
      localBusinessSchema,
    ],
  )

  const mapQuery = encodeURIComponent(
    `${business.address.line1}, ${business.address.line2}, ${business.address.city}, ${business.address.state} ${business.address.postalCode}`,
  )

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to a solar expert"
        description="Send us your electricity bill and we will tell you the system size you need, what it would cost and what to expect. No obligation."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-kapizo-navy">
                Kapizo Solar
              </h2>
              <p className="mt-1.5 text-sm font-semibold text-kapizo-green">{business.tagline}</p>

              <div className="mt-8 space-y-5">
                {business.founders.map((f) => (
                  <div key={f.name} className="card p-5">
                    <p className="text-xs font-bold uppercase tracking-wider text-kapizo-orange-deep">
                      {f.role}
                    </p>
                    <p className="mt-1 font-display text-lg font-bold text-kapizo-navy">{f.name}</p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <a
                        href={telHref(f.phone)}
                        onClick={() => trackEvent('phone_click', { context: 'contact_page' })}
                        className="btn-navy !px-4 !py-2.5 text-xs"
                      >
                        <PhoneIcon className="h-4 w-4" />
                        {f.phone}
                      </a>
                      <a
                        href={whatsappHref(waMessages.general, f.phone)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('whatsapp_click', { context: 'contact_page' })}
                        className="btn-green !px-4 !py-2.5 text-xs"
                      >
                        <WhatsAppIcon className="h-4 w-4" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card mt-5 p-5">
                <div className="flex gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-kapizo-orange-deep" />
                  <div>
                    <h3 className="font-display text-base font-bold text-kapizo-navy">Office</h3>
                    <address className="mt-2 text-sm not-italic leading-relaxed text-slate-600">
                      {business.address.line1}
                      <br />
                      {business.address.line2}
                      <br />
                      {business.address.city}, {business.address.state} – {business.address.postalCode}
                    </address>
                  </div>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Service Area
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    Serving customers in Mancherial and across Telangana. We travel for site
                    assessments across the state — tell us your location and we will confirm
                    scheduling.
                  </p>
                </div>
              </div>

              <div className="mt-5 overflow-hidden rounded-xl border border-slate-200">
                <iframe
                  title="Kapizo Solar office location in Mancherial, Telangana"
                  src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                  width="100%"
                  height="280"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block border-0"
                />
              </div>
            </div>

            <div>
              <LeadForm
                heading="Send an enquiry"
                description="Share your requirement and we will respond with a recommended system size and next steps."
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
