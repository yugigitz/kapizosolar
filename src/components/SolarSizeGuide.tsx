import { Link } from 'react-router-dom'
import { systemSizeGuide } from '@/lib/solarCalc'
import { ArrowRightIcon } from './ui/Icons'

export default function SolarSizeGuide() {
  return (
    <section className="section bg-slate-50" id="size-guide">
      <div className="container-kapizo">
        <div className="max-w-2xl">
          <span className="eyebrow">System Size Guide</span>
          <h2 className="h-section mt-3">What does each system size actually cover?</h2>
          <p className="lede mt-4">
            A useful starting reference before you calculate. These are indicative figures for
            typical Telangana conditions — your own numbers depend on site, orientation, shading and
            system specification.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[620px] border-collapse text-sm">
            <caption className="sr-only">Indicative rooftop solar system sizes and coverage</caption>
            <thead>
              <tr className="border-b-2 border-slate-200">
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Size
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Typically suits
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Indicative generation
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                  Indicative area
                </th>
              </tr>
            </thead>
            <tbody>
              {systemSizeGuide.map((row) => (
                <tr key={row.size} className="border-b border-slate-100 bg-white">
                  <th scope="row" className="px-4 py-4 text-left font-display text-base font-extrabold text-kapizo-green">
                    {row.size}
                  </th>
                  <td className="px-4 py-4 text-slate-600">{row.useCase}</td>
                  <td className="px-4 py-4 font-semibold text-kapizo-navy">{row.generation}</td>
                  <td className="px-4 py-4 font-semibold text-kapizo-navy">{row.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="disclaimer mt-6">
          All figures above are <strong>indicative</strong> and assume an unshaded roof with
          reasonable orientation. Generation varies by season, location, module specification,
          soiling and system condition. Area requirements change significantly with elevated
          structures or higher-efficiency modules.
        </div>

        <Link to="/solar-calculator" className="btn-primary mt-7">
          Calculate the size for my bill
          <ArrowRightIcon />
        </Link>
      </div>
    </section>
  )
}
