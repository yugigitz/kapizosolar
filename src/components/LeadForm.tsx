import { useState, type FormEvent } from 'react'
import { phones, telHref, whatsappHref } from '@/data/business'
import { plans, type PlanId } from '@/data/plans'
import { trackEvent } from '@/lib/analytics'
import { CheckIcon, PhoneIcon, WhatsAppIcon } from './ui/Icons'

export type LeadFormProps = {
  /** Pre-selects the plan and includes it in the WhatsApp handoff. */
  presetPlan?: PlanId
  /** Shorter form used on plan pages. */
  variant?: 'full' | 'compact'
  heading?: string
  description?: string
}

type FormState = {
  name: string
  phone: string
  city: string
  customerType: string
  monthlyBill: string
  systemSize: string
  plan: string
  roofType: string
  roofArea: string
  message: string
}

const emptyForm: FormState = {
  name: '',
  phone: '',
  city: '',
  customerType: 'Residential',
  monthlyBill: '',
  systemSize: '',
  plan: '',
  roofType: '',
  roofArea: '',
  message: '',
}

/**
 * LEAD DELIVERY STATUS: functional UI, NOT connected to a backend.
 *
 * Nothing is transmitted anywhere when the form is submitted. The form
 * validates input and composes the enquiry into a WhatsApp message, but the
 * lead only reaches Kapizo if the customer taps through to WhatsApp or calls.
 * The confirmation screen states this plainly so no one believes an enquiry
 * was delivered when it was not.
 *
 * `submitLead` is the single seam for adding real delivery later — a POST to a
 * form service, a serverless function or an email API. Wiring it up here is the
 * only change needed; no component or UI change is required.
 */
async function submitLead(_data: FormState): Promise<void> {
  // No-op. See LEAD DELIVERY STATUS above.
  return Promise.resolve()
}

export default function LeadForm({
  presetPlan,
  variant = 'full',
  heading = 'Get your solar recommendation',
  description = 'Share a few details and we will come back with a system size and a clear proposal.',
}: LeadFormProps) {
  const [form, setForm] = useState<FormState>({
    ...emptyForm,
    plan: presetPlan ? (plans.find((p) => p.id === presetPlan)?.name ?? '') : '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Please enter your name'
    const digits = form.phone.replace(/\D/g, '')
    if (digits.length < 10) next.phone = 'Please enter a valid 10-digit mobile number'
    if (!form.city.trim()) next.city = 'Please enter your city or town'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function buildMessage(): string {
    const lines = [
      'Hello Kapizo Solar, I would like a solar recommendation.',
      '',
      `Name: ${form.name}`,
      `Mobile: ${form.phone}`,
      `City: ${form.city}`,
      `Customer type: ${form.customerType}`,
    ]
    if (form.monthlyBill) lines.push(`Monthly electricity bill: ₹${form.monthlyBill}`)
    if (form.systemSize) lines.push(`Interested system size: ${form.systemSize}`)
    if (form.plan) lines.push(`Preferred plan: ${form.plan}`)
    if (form.roofType) lines.push(`Roof type: ${form.roofType}`)
    if (form.roofArea) lines.push(`Approximate rooftop area: ${form.roofArea} sq ft`)
    if (form.message) lines.push(`Message: ${form.message}`)
    return lines.join('\n')
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    await submitLead(form)
    trackEvent('contact_form_submit', {
      customer_type: form.customerType,
      plan: form.plan || undefined,
    })
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="card p-6 text-center sm:p-8">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-kapizo-green/10 text-kapizo-green">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h3 className="mt-4 font-display text-xl font-bold text-kapizo-navy">
          One last step, {form.name.split(' ')[0]}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">
          Your enquiry is ready but has <strong>not been sent yet</strong>. Tap the WhatsApp button
          below to send it to us, or call us directly — we will discuss your requirement and arrange
          a site assessment.
        </p>
        <div className="mx-auto mt-6 flex max-w-sm flex-col gap-2.5 sm:flex-row">
          <a
            href={whatsappHref(buildMessage())}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { context: 'lead_form_confirm' })}
            className="btn-green flex-1"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Send on WhatsApp
          </a>
          <a
            href={telHref(phones.primary)}
            onClick={() => trackEvent('phone_click', { context: 'lead_form_confirm' })}
            className="btn-outline flex-1"
          >
            <PhoneIcon className="h-4 w-4" />
            Call {phones.primary}
          </a>
        </div>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false)
            setForm({ ...emptyForm, plan: form.plan })
          }}
          className="mt-5 text-sm font-semibold text-slate-500 underline underline-offset-2 hover:text-kapizo-navy"
        >
          Submit another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card p-5 sm:p-7">
      <h3 className="font-display text-xl font-bold text-kapizo-navy">{heading}</h3>
      <p className="mt-1.5 text-sm text-slate-600">{description}</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="lf-name" className="field-label">
            Name <span className="text-kapizo-orange-deep">*</span>
          </label>
          <input
            id="lf-name"
            className="field"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'lf-name-err' : undefined}
          />
          {errors.name && (
            <p id="lf-name-err" className="mt-1 text-xs font-medium text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lf-phone" className="field-label">
            Mobile number <span className="text-kapizo-orange-deep">*</span>
          </label>
          <input
            id="lf-phone"
            type="tel"
            inputMode="tel"
            className="field"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'lf-phone-err' : undefined}
          />
          {errors.phone && (
            <p id="lf-phone-err" className="mt-1 text-xs font-medium text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lf-city" className="field-label">
            City / town <span className="text-kapizo-orange-deep">*</span>
          </label>
          <input
            id="lf-city"
            className="field"
            value={form.city}
            onChange={(e) => update('city', e.target.value)}
            autoComplete="address-level2"
            aria-invalid={!!errors.city}
            aria-describedby={errors.city ? 'lf-city-err' : undefined}
          />
          {errors.city && (
            <p id="lf-city-err" className="mt-1 text-xs font-medium text-red-600">
              {errors.city}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lf-type" className="field-label">
            Customer type
          </label>
          <select
            id="lf-type"
            className="field"
            value={form.customerType}
            onChange={(e) => update('customerType', e.target.value)}
          >
            <option>Residential</option>
            <option>Commercial</option>
            <option>Industrial</option>
            <option>Agricultural</option>
          </select>
        </div>

        <div>
          <label htmlFor="lf-bill" className="field-label">
            Monthly electricity bill (₹)
          </label>
          <input
            id="lf-bill"
            type="number"
            inputMode="numeric"
            min={0}
            className="field"
            value={form.monthlyBill}
            onChange={(e) => update('monthlyBill', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="lf-plan" className="field-label">
            Preferred plan
          </label>
          <select
            id="lf-plan"
            className="field"
            value={form.plan}
            onChange={(e) => update('plan', e.target.value)}
          >
            <option value="">Not sure yet</option>
            {plans.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        {variant === 'full' && (
          <>
            <div>
              <label htmlFor="lf-size" className="field-label">
                Interested system size
              </label>
              <input
                id="lf-size"
                className="field"
                placeholder="e.g. 3 kW"
                value={form.systemSize}
                onChange={(e) => update('systemSize', e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lf-rooftype" className="field-label">
                Roof type <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <select
                id="lf-rooftype"
                className="field"
                value={form.roofType}
                onChange={(e) => update('roofType', e.target.value)}
              >
                <option value="">Select</option>
                <option>RCC / concrete slab</option>
                <option>Metal sheet</option>
                <option>Tiled</option>
                <option>Ground mount</option>
                <option>Other</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="lf-area" className="field-label">
                Approximate rooftop area in sq ft{' '}
                <span className="font-normal text-slate-400">(optional)</span>
              </label>
              <input
                id="lf-area"
                type="number"
                inputMode="numeric"
                min={0}
                className="field"
                value={form.roofArea}
                onChange={(e) => update('roofArea', e.target.value)}
              />
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="lf-message" className="field-label">
            Message <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <textarea
            id="lf-message"
            rows={3}
            className="field resize-y"
            value={form.message}
            onChange={(e) => update('message', e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn-primary mt-6 w-full">
        Get My Solar Recommendation
      </button>

      <p className="mt-3 text-center text-xs leading-relaxed text-slate-500">
        We use your details only to respond to this enquiry. No spam.
      </p>
    </form>
  )
}
