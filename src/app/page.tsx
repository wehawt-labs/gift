import {
  CtaSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  TrustSection
} from '@/components/landing'
import { Footer, Header } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
