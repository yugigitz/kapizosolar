import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import MobileCTA from '@/components/MobileCTA'
import Home from '@/pages/Home'
import SolarCalculatorPage from '@/pages/SolarCalculatorPage'
import SolutionsPage from '@/pages/SolutionsPage'
import SolutionDetailPage from '@/pages/SolutionDetailPage'
import PlansPage from '@/pages/PlansPage'
import PlanDetailPage from '@/pages/PlanDetailPage'
import PMSuryaGharPage from '@/pages/PMSuryaGharPage'
import AboutPage from '@/pages/AboutPage'
import FAQPage from '@/pages/FAQPage'
import ContactPage from '@/pages/ContactPage'
import KnowledgeHubPage from '@/pages/KnowledgeHubPage'
import ArticlePage from '@/pages/ArticlePage'
import LegalPage from '@/pages/LegalPage'
import NotFoundPage from '@/pages/NotFoundPage'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-kapizo-navy focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <ScrollManager />
      <Navbar />

      <main id="main" className="pb-14 xl:pb-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solar-calculator" element={<SolarCalculatorPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="/plans" element={<PlansPage />} />
          <Route path="/plans/:slug" element={<PlanDetailPage />} />
          <Route path="/pm-surya-ghar" element={<PMSuryaGharPage />} />
          <Route path="/solar-knowledge" element={<KnowledgeHubPage />} />
          <Route path="/solar-knowledge/:slug" element={<ArticlePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <Footer />
      <MobileCTA />
    </>
  )
}
