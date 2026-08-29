import { Link } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import { articles } from '@/data/knowledge'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, webPageSchema } from '@/lib/seo'
import { ArrowRightIcon } from '@/components/ui/Icons'

export default function KnowledgeHubPage() {
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Solar Knowledge Hub', path: '/solar-knowledge' },
  ]

  usePageMeta(
    {
      title: 'Solar Knowledge Hub | Guides & Explanations | Kapizo Solar',
      description:
        'Practical rooftop solar guides for Telangana: system sizing, on-grid vs hybrid, net metering, maintenance and scheme explanations, written by Kapizo Solar.',
      path: '/solar-knowledge',
    },
    [
      webPageSchema(
        'Solar Knowledge Hub | Kapizo Solar',
        'Practical guides and explanations about rooftop solar.',
        '/solar-knowledge',
      ),
      breadcrumbSchema(crumbs),
    ],
  )

  return (
    <>
      <PageHeader
        eyebrow="Knowledge Hub"
        title="Understand solar before you buy it"
        description="Plain explanations written for customers in Telangana, including the parts that usually do not come up until after you have paid."
        breadcrumbs={crumbs}
      />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="card card-hover flex flex-col p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-kapizo-orange-deep">
                  {article.readMinutes} min read
                </p>
                <h2 className="mt-2 font-display text-lg font-bold leading-snug text-kapizo-navy">
                  <Link to={`/solar-knowledge/${article.slug}`} className="hover:text-kapizo-green">
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                  {article.summary}
                </p>
                <Link
                  to={`/solar-knowledge/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-kapizo-green transition-all hover:gap-2.5"
                >
                  Read the guide
                  <ArrowRightIcon />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-display text-lg font-bold text-kapizo-navy">
              More guides are being added
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              We are adding more on cost factors, choosing components and the scheme paperwork. If
              something is confusing you, ask us. We will answer you directly, and probably write it
              up here for the next person.
            </p>
          </div>
        </div>
      </section>

      <CTASection primaryLabel="Calculate My Savings" />
    </>
  )
}
