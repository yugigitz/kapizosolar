/**
 * Lead delivery client.
 *
 * Posts the enquiry to the server-side intake endpoint. The endpoint owns all
 * credentials and storage — nothing sensitive lives in this bundle. This module
 * only knows the endpoint URL, which is public by nature.
 *
 * The endpoint is configurable at build time via VITE_LEAD_ENDPOINT so the same
 * code can point at the PHP endpoint on Hostinger, a serverless function or a
 * hosted form service without touching the form component.
 */

export type LeadPayload = {
  name: string
  phone: string
  email?: string
  city: string
  customerType: string
  monthlyBill?: string
  systemSize?: string
  plan?: string
  roofType?: string
  roofArea?: string
  message?: string
  /** Which page the enquiry came from — useful for attribution. */
  sourcePage?: string
  /** Honeypot. Always empty for real users. */
  company?: string
}

export type LeadResult =
  | { ok: true; reference: string; emailed: boolean; stored: boolean }
  | { ok: false; kind: 'validation'; fields: Record<string, string>; message: string }
  | { ok: false; kind: 'rate_limited' | 'network' | 'server'; message: string }

const ENDPOINT = import.meta.env.VITE_LEAD_ENDPOINT || '/api/submit-lead.php'
const TIMEOUT_MS = 15000

/**
 * Submits a lead. Resolves with a discriminated result rather than throwing, so
 * the UI can distinguish "your details were wrong" from "we could not reach the
 * server" and respond appropriately.
 */
export async function submitLead(payload: LeadPayload): Promise<LeadResult> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    let data: any = null
    try {
      data = await res.json()
    } catch {
      // Non-JSON response (an HTML error page from the host, most likely).
    }

    if (res.ok && data?.ok) {
      return {
        ok: true,
        reference: String(data.reference ?? ''),
        emailed: Boolean(data.emailed),
        stored: Boolean(data.stored),
      }
    }

    if (res.status === 422 && data?.fields) {
      return {
        ok: false,
        kind: 'validation',
        fields: data.fields as Record<string, string>,
        message: String(data.message ?? 'Please correct the highlighted fields.'),
      }
    }

    if (res.status === 429) {
      return {
        ok: false,
        kind: 'rate_limited',
        message: String(
          data?.message ?? 'Too many enquiries from this connection. Please call or WhatsApp us instead.',
        ),
      }
    }

    return {
      ok: false,
      kind: 'server',
      message: String(
        data?.message ?? 'We could not submit your enquiry just now. Please try again, or reach us on WhatsApp.',
      ),
    }
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === 'AbortError'
    return {
      ok: false,
      kind: 'network',
      message: aborted
        ? 'That took too long. Please check your connection and try again, or reach us on WhatsApp.'
        : 'We could not reach our server. Please try again, or reach us on WhatsApp.',
    }
  } finally {
    window.clearTimeout(timer)
  }
}
