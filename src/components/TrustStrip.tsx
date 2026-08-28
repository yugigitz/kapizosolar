import { HomeIcon, LeafIcon, PanelIcon, ToolIcon } from './ui/Icons'

/**
 * The four reasons customers give for going solar, shown directly under the
 * hero's curved transition.
 *
 * Deliberately no durations or figures: warranty terms are the manufacturer's
 * and are confirmed per system, so nothing here states a performance lifetime.
 */
const benefits = [
  {
    icon: LeafIcon,
    tint: 'bg-kapizo-green/10 text-kapizo-green',
    title: 'Lower Electricity Bills',
    detail: 'Keep more of what you earn',
  },
  {
    icon: PanelIcon,
    tint: 'bg-blue-50 text-blue-700',
    title: 'Clean & Green Energy',
    detail: 'A cleaner, healthier tomorrow',
  },
  {
    icon: ToolIcon,
    tint: 'bg-kapizo-green/10 text-kapizo-green',
    title: 'Reliable & Low Maintenance',
    detail: 'Designed for Long-Term Performance',
  },
  {
    icon: HomeIcon,
    tint: 'bg-kapizo-green/10 text-kapizo-green',
    title: 'Increased Property Value',
    detail: 'A solar-ready home is a future-ready asset',
  },
]

export default function TrustStrip() {
  return (
    <section aria-label="Why rooftop solar" className="bg-white pb-9 pt-1.5">
      <div className="container-kapizo">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: Icon, tint, title, detail }) => (
            <li
              key={title}
              className="flex items-center gap-3.5 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-[0_1px_2px_rgba(11,31,58,0.05),0_8px_24px_-18px_rgba(11,31,58,0.25)]"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${tint}`}
              >
                <Icon className="h-[26px] w-[26px]" />
              </span>
              <span>
                <span className="block font-display text-[14.5px] font-extrabold leading-tight text-kapizo-navy">
                  {title}
                </span>
                <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">
                  {detail}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
