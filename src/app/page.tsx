import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import ProgramsSection from '@/components/home/ProgramsSection';
import SupplementsSection from '@/components/home/SupplementsSection';
import Testimonials from '@/components/home/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <ProgramsSection />
      <Features />
      <SupplementsSection />
      <Testimonials />
    </>
  );
}
