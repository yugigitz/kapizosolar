import { waMessages } from '@/data/business'
import { WhatsAppButton } from './ui/CTAButtons'
import { PanelIcon } from './ui/Icons'

export default function ProjectsComingSoon() {
  return (
    <section className="section bg-slate-50" id="projects">
      <div className="container-kapizo">
        <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 text-center sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-kapizo-orange/10 text-kapizo-orange-deep">
            <PanelIcon className="h-7 w-7" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-extrabold text-kapizo-navy sm:text-3xl">
            Kapizo Projects: Coming Soon
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Rather than fill this page with stock photographs of somebody else's work, we publish
            our own installations here, with the system details, as they are commissioned.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600">
            Every installation is carried out by our own team and documented end to end, from the
            system design through to commissioning.
          </p>
          <div className="mt-7 flex justify-center">
            <WhatsAppButton
              message={waMessages.consultation}
              label="Talk to Us About Your Roof"
              className="btn-primary"
              context="projects_coming_soon"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
