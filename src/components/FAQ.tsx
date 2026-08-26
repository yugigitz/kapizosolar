import { useState } from 'react'
import { Link } from 'react-router-dom'
import { faqs, type Faq } from '@/data/faqs'
import { ArrowRightIcon, ChevronDownIcon } from './ui/Icons'

type Props = {
  items?: Faq[]
  limit?: number
  showViewAll?: boolean
  heading?: string
  intro?: string
}

export default function FAQ({
  items = faqs,
  limit,
  showViewAll = false,
  heading = 'Questions customers actually ask',
  intro = 'Straight answers, including the parts that are commonly glossed over.',
}: Props) {
  const [open, setOpen] = useState<number | null>(0)
  const list = limit ? items.slice(0, limit) : items

  return (
    <section className="section bg-white" id="faq">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow">FAQs</span>
          <h2 className="h-section mt-3">{heading}</h2>
          <p className="lede mt-4">{intro}</p>
        </div>

        <div className="mt-10 max-w-3xl divide-y divide-slate-200 border-y border-slate-200">
          {list.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-btn-${i}`}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-base font-bold text-kapizo-navy sm:text-lg">
                      {faq.q}
                    </span>
                    <ChevronDownIcon
                      className={`mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  hidden={!isOpen}
                  className="pb-5"
                >
                  <p className="max-w-2xl text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              </div>
            )
          })}
        </div>

        {showViewAll && (
          <Link to="/faq" className="btn-outline mt-8">
            Read all frequently asked questions
            <ArrowRightIcon />
          </Link>
        )}
      </div>
    </section>
  )
}
