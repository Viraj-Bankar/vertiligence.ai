import { useState } from 'react'
import type { ServiceId } from './types'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Challenges } from './components/Challenges'
import { Services } from './components/Services'
import { EcosystemArchitecture } from './components/EcosystemArchitecture'
import { ProcessAudit } from './components/ProcessAudit'
import { Portfolio } from './components/Portfolio'
import { Industries } from './components/Industries'
import { Process } from './components/Process'
import { WhyUs } from './components/WhyUs'
import { About } from './components/About'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { PrivacyModal } from './components/PrivacyModal'

export function App() {
  const [selectedService, setSelectedService] = useState<ServiceId>('custom-software')
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
        {/* 1. Hero Section */}
        <Hero
          onExploreServices={scrollToServices}
          onDiscussProject={() => scrollToContact()}
        />

        {/* 2. Business Challenges Section */}
        <Challenges onSelectService={scrollToContact} />

        {/* 3. Core Services Section */}
        <Services onSelectService={scrollToContact} />

        {/* 4. Integrated Business Ecosystem Architecture */}
        <EcosystemArchitecture />

        {/* 5. Business Process Audit & Consulting */}
        <ProcessAudit onDiscussClick={() => scrollToContact('consulting')} />

        {/* 6. Featured Portfolio & Architecture Pipelines */}
        <Portfolio />

        {/* 7. Industries We Serve */}
        <Industries onSelectService={scrollToContact} />

        {/* 8. Our Working Process / Delivery Lifecycle */}
        <Process />

        {/* 9. Why Vertiligence AI & About */}
        <WhyUs />
        <About />

        {/* 10. Client FAQ Accordion */}
        <FAQ onDiscussClick={() => scrollToContact()} />

        {/* 11. Contact Section (Option A & Option B) */}
        <Contact
          selectedService={selectedService}
          onServiceChange={setSelectedService}
        />
      </main>

      {/* Section 12: Footer */}
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
