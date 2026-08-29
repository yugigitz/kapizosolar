import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { KapizoLogo } from './ui/BrandImage'
import { ArrowRightIcon, ChevronDownIcon } from './ui/Icons'

/** The two calculators, grouped behind one navigation entry. */
const calculatorItems = [
  { label: 'Solar Savings Calculator', to: '/solar-calculator' },
  { label: 'Solar Loan EMI Calculator', to: '/solar-loan-emi' },
]

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Solar Solutions', to: '/solutions' },
  { label: 'Solar Calculators', children: calculatorItems },
  { label: 'Plans', to: '/plans' },
  { label: 'PM Surya Ghar', to: '/pm-surya-ghar' },
  { label: 'Knowledge', to: '/solar-knowledge' },
  { label: 'About', to: '/about' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  // Click/keyboard only. Opening on hover as well made the state ambiguous:
  // the pointer entering fired open, and the click that followed toggled it
  // straight back shut.
  const [calcOpen, setCalcOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const dropdownRef = useRef<HTMLLIElement>(null)
  const location = useLocation()
  const calcActive = calculatorItems.some((c) => c.to === location.pathname)

  useEffect(() => {
    setOpen(false)
    setCalcOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!calcOpen) return
    const onDown = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setCalcOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setCalcOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [calcOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_1px_3px_rgba(11,31,58,0.10),0_8px_24px_-16px_rgba(11,31,58,0.25)]' : 'border-b border-slate-100'
      }`}
    >
      <nav className="container-kapizo" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link to="/" className="flex shrink-0 items-center" aria-label="Kapizo Solar home">
            {/* Sized off the bar height rather than a fixed value, so the
                wordmark and the strapline under it are both legible without
                the header growing. Aspect ratio is preserved by w-auto. */}
            <KapizoLogo
              alt="Kapizo Solar, Powering a Sustainable Tomorrow"
              className="h-12 w-auto lg:h-14"
              priority
            />
          </Link>

          <ul className="hidden items-center gap-0 xl:flex">
            {navItems.map((item) =>
              item.children ? (
                <li
                  key={item.label}
                  ref={dropdownRef}
                  className="relative"
                >
                  <button
                    type="button"
                    aria-expanded={calcOpen}
                    aria-controls="calculators-menu"
                    onClick={() => setCalcOpen((v) => !v)}
                    className={`flex shrink-0 items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold transition-colors ${
                      calcActive
                        ? 'text-kapizo-green'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-kapizo-navy'
                    }`}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`h-3.5 w-3.5 transition-transform ${calcOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {calcOpen && (
                    <ul
                      id="calculators-menu"
                      className="absolute left-0 top-full z-50 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white py-1.5 shadow-card"
                    >
                      {item.children.map((child) => (
                        <li key={child.to}>
                          <NavLink
                            to={child.to}
                            onClick={() => setCalcOpen(false)}
                            className={({ isActive }) =>
                              `block px-4 py-2.5 text-[13px] font-semibold transition-colors ${
                                isActive
                                  ? 'bg-kapizo-green/5 text-kapizo-green'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-kapizo-navy'
                              }`
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `block shrink-0 whitespace-nowrap rounded-md px-2.5 py-2 text-[13px] font-semibold transition-colors ${
                        isActive
                          ? 'text-kapizo-green'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-kapizo-navy'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>

          <div className="hidden shrink-0 xl:block">
            <Link to="/contact" className="btn-cta !rounded-full !px-5 !py-2.5 text-[13px]">
              Get Solar Quote
              <ArrowRightIcon />
            </Link>
          </div>

          <button
            type="button"
            className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-kapizo-navy xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-slate-100 bg-white xl:hidden"
        >
          <ul className="container-kapizo flex flex-col py-3">
            {navItems.map((item) =>
              item.children ? (
                /* No disclosure to tap on a phone: both calculators are listed
                   directly, which is one gesture instead of two. */
                <li key={item.label} className="border-b border-slate-100 py-3">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <ul className="mt-1">
                    {item.children.map((child) => (
                      <li key={child.to}>
                        <NavLink
                          to={child.to}
                          className={({ isActive }) =>
                            `flex items-center justify-between py-2.5 text-base font-semibold ${
                              isActive ? 'text-kapizo-green' : 'text-kapizo-navy'
                            }`
                          }
                        >
                          {child.label}
                          <ArrowRightIcon className="h-4 w-4 text-slate-300" />
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center justify-between border-b border-slate-100 py-3.5 text-base font-semibold ${
                        isActive ? 'text-kapizo-green' : 'text-kapizo-navy'
                      }`
                    }
                  >
                    {item.label}
                    <ArrowRightIcon className="h-4 w-4 text-slate-300" />
                  </NavLink>
                </li>
              ),
            )}
          </ul>
          <div className="container-kapizo pb-28 pt-2">
            <Link to="/contact" className="btn-primary w-full">
              Get Solar Quote
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
