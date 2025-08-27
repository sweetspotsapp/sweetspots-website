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
import CTAToastOnScroll from '@/components/CTAToastOnScroll';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <CTAToastOnScroll trigger={{
        percent: 20,
      }}/>
      <HeroSection />
      {/* <ProblemSection /> */}
      <SolutionSection />
      <RecommendedTripsSection />
      <CollaborationSection />
      {/* <HowItWorks /> */}
      <CTASection />
      {/* <Inquiry  /> */}
      <Footer />
    </main>
  );
}