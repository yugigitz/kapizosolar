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
            Kapizo Solar is a new company, and we would rather earn trust through how we work than
            through claims we cannot back up. These are the standards every project is held to.
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
