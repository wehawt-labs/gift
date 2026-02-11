import {
  CtaSection,
  FeaturesSection,
  HeroSection,
  HowItWorksSection,
  SamplesSection,
  TrustSection
} from '@/components/landing'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustSection />
      <HowItWorksSection />
      <SamplesSection />
      <FeaturesSection />
      <CtaSection />
    </>
  )
}
