import { Hero } from './components/hero/Hero'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { ScrollProgress } from './components/layout/ScrollProgress'
import { Providers } from './components/providers/Providers'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Projects } from './components/sections/Projects'
import { Resume } from './components/sections/Resume'
import { Skills } from './components/sections/Skills'
import { Telemetry } from './components/sections/Telemetry'
import { Ticker } from './components/sections/Ticker'

export default function App() {
  return (
    <Providers>
      <a
        href="#main"
        className="label-tech sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[130] focus:bg-lime focus:px-4 focus:py-2 focus:text-[12px] focus:text-black"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <Ticker />
        <About />
        <Telemetry />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </Providers>
  )
}
