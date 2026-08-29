import PageHeader from '@/components/PageHeader'
import FAQ from '@/components/FAQ'
import CTASection from '@/components/CTASection'
import { faqs } from '@/data/faqs'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'

export default function FAQPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'FAQs', path: '/faq' },
  ]

  usePageMeta(
    {
      title: 'Rooftop Solar FAQs | Kapizo Solar, Telangana',
      description:
        'Answers to common rooftop solar questions: system sizing, roof area needed, on-grid vs hybrid, net metering, batteries, maintenance, warranties and government subsidy.',
      path: '/faq',
    },
    [
      webPageSchema(
        'Rooftop Solar FAQs | Kapizo Solar',
        'Common questions about rooftop solar answered.',
        '/faq',
      ),
      breadcrumbSchema(crumbs),
      faqSchema(faqs),
    ],
  )

  return (
    <>
      <PageHeader
        eyebrow="FAQs"
        title="Rooftop solar questions, answered straight"
        description="Including the awkward parts: what solar will not do, what depends on your DISCOM, and what nobody can honestly guarantee you."
        breadcrumbs={crumbs}
      />
      <FAQ
        heading="Frequently asked questions"
        intro="If your question is not here, WhatsApp it to us. We will answer it properly, even if the answer is no."
      />
      <CTASection />
    </>
  )
}
