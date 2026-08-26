import { componentCategories } from '@/data/services'
import Reveal from './ui/Reveal'

export default function ComponentQuality() {
  return (
    <section className="section bg-slate-50" id="components">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow">Components</span>
          <h2 className="h-section mt-3">Quality Components. Smart Procurement.</h2>
          <p className="lede mt-4">
            We do not tie every project to one brand. Component selection is a design decision made
            against your system requirements, budget, availability, performance expectations,
            warranty terms and site suitability.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {componentCategories.map((cat, i) => (
            <Reveal as="article" key={cat.name} delay={i * 50} className="card card-hover p-5">
              <h3 className="font-display text-base font-bold text-kapizo-navy">{cat.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{cat.what}</p>
              <p className="mt-3 border-t border-slate-100 pt-3 text-sm leading-relaxed text-slate-500">
                <span className="font-semibold text-kapizo-green">How we select: </span>
                {cat.selection}
              </p>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 rounded-lg border border-slate-200 bg-white px-5 py-4 text-sm leading-relaxed text-slate-600">
          The specific make and model proposed for your project is confirmed in your written
          proposal after site assessment, based on what is genuinely available and appropriate at
          that time.
        </p>
      </div>
    </section>
  )
}
