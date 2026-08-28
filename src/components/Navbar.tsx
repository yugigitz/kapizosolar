import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { KapizoLogo } from './ui/BrandImage'
import { ArrowRightIcon } from './ui/Icons'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Solar Solutions', to: '/solutions' },
  { label: 'Solar Calculator', to: '/solar-calculator' },
  { label: 'Plans', to: '/plans' },
  { label: 'PM Surya Ghar', to: '/pm-surya-ghar' },
  { label: 'Knowledge', to: '/solar-knowledge' },
  { label: 'About', to: '/about' },
  { label: 'FAQs', to: '/faq' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

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

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-2 text-[13px] font-semibold transition-colors ${
                      isActive
                        ? 'text-kapizo-green'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-kapizo-navy'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
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
            {navItems.map((item) => (
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
            ))}
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
