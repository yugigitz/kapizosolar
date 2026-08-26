import { Link, Navigate, useParams } from 'react-router-dom'
import PageHeader from '@/components/PageHeader'
import CTASection from '@/components/CTASection'
import { AUTHOR, articles, getArticle } from '@/data/knowledge'
import { SITE_URL } from '@/data/business'
import { usePageMeta } from '@/hooks/usePageMeta'
import { breadcrumbSchema, faqSchema, webPageSchema } from '@/lib/seo'
import { ArrowRightIcon } from '@/components/ui/Icons'

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticle(slug) : undefined

  if (!article) return <Navigate to="/solar-knowledge" replace />

  const path = `/solar-knowledge/${article.slug}`
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Knowledge Hub', path: '/solar-knowledge' },
    { name: article.title, path },
  ]

  usePageMeta(
    { title: article.seo.title, description: article.seo.description, path },
    [
      webPageSchema(article.title, article.summary, path),
      breadcrumbSchema(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.summary,
        datePublished: article.publishedISO,
        dateModified: article.updatedISO,
        author: { '@type': 'Organization', name: AUTHOR, url: SITE_URL },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: `${SITE_URL}${path}`,
        inLanguage: 'en-IN',
      },
      ...(article.faqs ? [faqSchema(article.faqs)] : []),
    ],
  )

  const others = articles.filter((a) => a.slug !== article.slug).slice(0, 3)

  return (
    <>
      <PageHeader eyebrow="Knowledge Hub" title={article.title} description={article.summary} breadcrumbs={crumbs} />

      <section className="section bg-white">
        <div className="container-kapizo">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
            <article className="lg:col-span-2">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-slate-200 pb-5 text-xs text-slate-500">
                <span>
                  By <span className="font-semibold text-kapizo-navy">{AUTHOR}</span>
                </span>
                <span>
                  Updated{' '}
                  <time dateTime={article.updatedISO}>
                    {new Date(article.updatedISO).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </span>
                <span>{article.readMinutes} min read</span>
              </div>

              <div className="mt-6 rounded-xl border-l-4 border-kapizo-green bg-kapizo-green/[0.04] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-kapizo-green">
                  Short answer
                </p>
                <p className="mt-2 text-base leading-relaxed text-slate-700">{article.directAnswer}</p>
              </div>

              <div className="prose-kapizo mt-8">
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <h2>{section.heading}</h2>
                    {section.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                    {section.bullets && (
                      <ul>
                        {section.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}

                {article.faqs && article.faqs.length > 0 && (
                  <section>
                    <h2>Related questions</h2>
                    {article.faqs.map((f) => (
                      <div key={f.q}>
                        <h3>{f.q}</h3>
                        <p>{f.a}</p>
                      </div>
                    ))}
                  </section>
                )}
              </div>

              {article.sources && article.sources.length > 0 && (
                <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-5">
                  <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                    Sources
                  </h2>
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {article.sources.map((s) => (
                      <li key={s.href}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="font-semibold text-kapizo-green underline underline-offset-2"
                        >
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 rounded-xl border border-kapizo-green/25 bg-kapizo-green/[0.04] p-6">
                <h2 className="font-display text-lg font-bold text-kapizo-navy">
                  Want this applied to your property?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  Get an indicative system size for your electricity bill, then talk to us about what
                  it would look like on your roof.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link to="/solar-calculator" className="btn-primary">
                    Calculate My System Size
                    <ArrowRightIcon />
                  </Link>
                  <Link to="/contact" className="btn-outline">
                    Talk to Kapizo Solar
                  </Link>
                </div>
              </div>
            </article>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="card p-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Related pages
                  </h2>
                  <ul className="mt-3 space-y-2 text-sm">
                    {article.relatedLinks.map((l) => (
                      <li key={l.to}>
                        <Link to={l.to} className="font-semibold text-kapizo-green hover:underline">
                          {l.label} →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card mt-4 p-5">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    More guides
                  </h2>
                  <ul className="mt-3 space-y-3">
                    {others.map((a) => (
                      <li key={a.slug}>
                        <Link
                          to={`/solar-knowledge/${a.slug}`}
                          className="block text-sm font-semibold leading-snug text-kapizo-navy hover:text-kapizo-green"
                        >
                          {a.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  )
}
