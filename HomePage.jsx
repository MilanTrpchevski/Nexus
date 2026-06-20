import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Services from './components/Services'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <>
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
    </>
  )
}
