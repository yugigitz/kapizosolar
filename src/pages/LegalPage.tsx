import PageHeader from '@/components/PageHeader'
import { business, phones } from '@/data/business'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo'

type Props = { kind: 'privacy' | 'terms' }

export default function LegalPage({ kind }: Props) {
  const isPrivacy = kind === 'privacy'
  const path = isPrivacy ? '/privacy-policy' : '/terms'
  const title = isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: title, path },
  ]

  usePageMeta(
    {
      title: `${title} | Kapizo Solar`,
      description: isPrivacy
        ? 'How Kapizo Solar collects, uses and protects the information you share through this website.'
        : 'The terms governing use of the Kapizo Solar website, including the basis on which estimates and information are provided.',
      path,
    },
    [webPageSchema(title, `${title} for Kapizo Solar`, path), breadcrumbSchema(crumbs)],
  )

  return (
    <>
      <PageHeader eyebrow="Legal" title={title} breadcrumbs={crumbs} />
      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="prose-kapizo mx-auto max-w-3xl">
            {isPrivacy ? (
              <>
                <h2>What we collect</h2>
                <p>
                  When you submit an enquiry through this website, we collect the details you enter:
                  your name, mobile number, city, customer type and any additional information you
                  choose to share about your property or requirement.
                </p>
                <p>
                  The solar calculator on this site runs entirely in your browser. The values you
                  enter are not transmitted to us unless you choose to send them through the WhatsApp
                  or enquiry options.
                </p>

                <h2>How we use it</h2>
                <p>
                  We use the information you provide solely to respond to your enquiry, to discuss
                  your requirement, prepare a proposal and arrange a site assessment. We do not sell
                  your information, and we do not share it with third parties for marketing.
                </p>

                <h2>WhatsApp and phone contact</h2>
                <p>
                  When you use a WhatsApp link on this site, your message is sent through WhatsApp and
                  is subject to WhatsApp's own privacy terms. When you call us, standard telephone
                  records apply.
                </p>

                <h2>Analytics</h2>
                <p>
                  This website is built to support analytics tools. Where analytics is enabled, it is
                  used to understand which pages are useful and how the site is performing, not to
                  identify you personally.
                </p>

                <h2>Retention and your choices</h2>
                <p>
                  We keep enquiry details for as long as needed to respond and to maintain a record of
                  our discussions with you. If you would like your details removed from our records,
                  contact us on {phones.primary} and we will do so.
                </p>

                <h2>Contact</h2>
                <p>
                  For any question about this policy, contact {business.name} on {phones.primary} or{' '}
                  {phones.secondary}, or write to us at our office address listed on the contact page.
                </p>
              </>
            ) : (
              <>
                <h2>About this website</h2>
                <p>
                  This website is operated by {business.name}, a solar EPC company based in{' '}
                  {business.address.city}, {business.address.state}. By using this website you accept
                  these terms.
                </p>

                <h2>Estimates are not quotations</h2>
                <p>
                  The solar calculator and all indicative figures on this website, including system capacity,
                  generation, savings, payback period, rooftop area and CO₂ reduction, are estimates
                  provided for initial planning only. They are based on stated assumptions and cannot
                  account for the specific conditions at your site.
                </p>
                <p>
                  These estimates do not constitute a quotation, an offer, or any guarantee of
                  generation, savings or performance. A binding proposal is issued only in writing
                  after a site assessment.
                </p>

                <h2>Government schemes and regulatory information</h2>
                <p>
                  Information on this website about government schemes, subsidies, net metering and
                  approval processes is our summary provided to help you understand the process. It
                  is not a government publication. Eligibility, amounts, conditions and procedures are
                  set by the relevant government authorities and distribution companies and may
                  change. You should verify current information through official government channels
                  before making any decision.
                </p>
                <p>
                  We do not claim empanelled or authorised vendor status under any government scheme
                  unless explicitly stated with supporting evidence.
                </p>

                <h2>Component specifications</h2>
                <p>
                  Plan specifications described on this website indicate the category and standard of
                  components. The specific make and model proposed for your project is confirmed in
                  your written proposal, based on suitability and availability at that time.
                  Warranties are provided by the component manufacturers and are subject to their
                  terms.
                </p>

                <h2>Approvals and timelines</h2>
                <p>
                  Feasibility approval, inspection, net metering and subsidy disbursement are decided
                  by your electricity distribution company and the relevant government authorities. We
                  assist with documentation but do not control these outcomes or their timelines, and
                  we make no guarantee regarding approval or approval dates.
                </p>

                <h2>Contact</h2>
                <p>
                  For any question about these terms, contact {business.name} on {phones.primary} or{' '}
                  {phones.secondary}.
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
