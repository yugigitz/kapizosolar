import { DocumentIcon, HeadsetIcon, MapPinIcon, ShieldIcon, ToolIcon } from './ui/Icons'

const items = [
  { icon: ShieldIcon, label: 'Quality-Focused Components' },
  { icon: ToolIcon, label: 'Professional Installation' },
  { icon: DocumentIcon, label: 'End-to-End Assistance' },
  { icon: HeadsetIcon, label: 'After-Sales Support' },
  { icon: MapPinIcon, label: 'Serving Telangana' },
]

export default function TrustStrip() {
  return (
    <section aria-label="What Kapizo Solar provides" className="border-b border-slate-200 bg-white">
      <div className="container-kapizo">
        <ul className="grid grid-cols-2 gap-x-4 gap-y-5 py-7 sm:grid-cols-3 lg:grid-cols-5 lg:py-8">
          {items.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-kapizo-green/10 text-kapizo-green">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[13px] font-semibold leading-tight text-kapizo-navy">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
