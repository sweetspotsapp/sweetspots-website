import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { ProblemSection } from '@/components/problem-section';
import { SolutionSection } from '@/components/solution-section';
import { HowItWorks } from '@/components/how-it-works';
import { CTASection } from '@/components/cta-section';
import { Footer } from '@/components/footer';
import RecommendedTripsSection from '@/components/recommended-trips-section';
import CollaborationSection from '@/components/collaboration-section';
import Inquiry from '@/components/inquiry';
import BenefitsSection from '@/components/benefits-section';
import CTAToastOnScroll from '@/components/cta/CTAToastOnScroll';
import EarlyBirdSection from '@/components/early-bird-section';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <CTAToastOnScroll trigger={{
      percent: 20,
      }}/>
      <HeroSection />
      {/* <EarlyBirdSection /> */}
      <SolutionSection />
      <RecommendedTripsSection />

      <CollaborationSection />
      <BenefitsSection/>
      <CTASection />
      <Footer />
      {/* <ProblemSection /> */}
      {/* <HowItWorks /> */}
      {/* <Inquiry  /> */}
    </main>
  );
}