import { whyKapizo } from '@/data/services'
import Reveal from './ui/Reveal'
import { CheckIcon } from './ui/Icons'

export default function WhyKapizo() {
  return (
    <section className="section bg-white" id="why-kapizo">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow">Why Kapizo Solar</span>
          <h2 className="h-section mt-3">What we hold ourselves to</h2>
          <p className="lede mt-4">
            We are new, so we cannot point at a hundred finished roofs. What we can do is be
            specific about how we work. Hold us to these.
          </p>
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyKapizo.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
              <div className="flex gap-3">
                <CheckIcon className="mt-1 h-4.5 w-4.5 shrink-0 text-kapizo-green" />
                <div>
                  <h3 className="font-display text-base font-bold text-kapizo-navy">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{item.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
