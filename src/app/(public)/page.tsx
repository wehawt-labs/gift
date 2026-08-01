import {
  CtaSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  SamplesSection,
  TrustSection
} from '@/components/landing'
import { Footer } from '@/components/layout'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <SamplesSection />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </>
  )
}
