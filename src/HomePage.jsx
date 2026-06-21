import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CookieConsent from './components/CookieConsent'
import SEO from './SEO'

export default function HomePage() {
  return (
    <>
      <SEO />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Process />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </>
  )
}
