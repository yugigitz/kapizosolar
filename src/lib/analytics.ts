/**
 * Analytics event layer.
 *
 * No provider is wired up yet and no tracking IDs are hardcoded. Events are
 * pushed to `window.dataLayer` if it exists, so adding Google Tag Manager or
 * GA4 later requires no changes to calling components.
 */

export type AnalyticsEvent =
  | 'phone_click'
  | 'whatsapp_click'
  | 'calculator_start'
  | 'calculator_complete'
  | 'quote_request'
  | 'plan_select'
  | 'contact_form_submit'
  | 'solar_solution_view'
  | 'pm_surya_ghar_view'

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params })
  }
}
