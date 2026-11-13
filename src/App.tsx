import { useState } from 'react'
import type { ServiceId } from './types'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { Process } from './components/Process'
import { Portfolio } from './components/Portfolio'
import { WhyUs } from './components/WhyUs'
import { About } from './components/About'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { PrivacyModal } from './components/PrivacyModal'

export function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>('operations-hub')
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false)

  const scrollToContact = (serviceId?: ServiceId) => {
    if (serviceId) {
      setSelectedService(serviceId)
    }
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services')
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Top Navigation */}
      <Navbar onDiscussClick={() => scrollToContact()} />

      {/* Main Content Landmark */}
      <main id="main-content" className="flex-grow">
        {/* Section A & B: Hero */}
        <Hero
          onExploreServices={scrollToServices}
          onDiscussProject={() => scrollToContact()}
        />

        {/* Section C: Services */}
        <Services onSelectService={scrollToContact} />

        {/* Section D: How We Work */}
        <Process />

        {/* Section E: Portfolio */}
        <Portfolio />

        {/* Section F: Why Vertiligence AI */}
        <WhyUs />

        {/* Section G: About Section */}
        <About />

        {/* Section H: Contact Section */}
        <Contact
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
      </main>

      {/* Section I: Footer */}
      <Footer
        onSelectService={scrollToContact}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* Privacy Notice Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  )
}

export default App
