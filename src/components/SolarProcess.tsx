import { processSteps } from '@/data/services'
import Reveal from './ui/Reveal'

export default function SolarProcess() {
  return (
    <section className="section bg-white" id="process">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow">The Kapizo EPC Process</span>
          <h2 className="h-section mt-3">Six steps from first call to commissioned system</h2>
          <p className="lede mt-4">
            Every project follows the same sequence, so you always know what happens next and what is
            expected from you at each stage.
          </p>
        </div>

        <ol className="mt-12 space-y-4">
          {processSteps.map((step, i) => (
            <Reveal as="li" key={step.step} delay={i * 50}>
              <div className="card card-hover flex gap-5 p-5 sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-kapizo-green text-base font-extrabold text-white">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-kapizo-navy">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <p className="mt-6 text-xs leading-relaxed text-slate-500">
          Timelines for DISCOM approvals, inspection and meter installation are determined by the
          distribution company, so we do not promise guaranteed approval dates.
        </p>
      </div>
    </section>
  )
}
