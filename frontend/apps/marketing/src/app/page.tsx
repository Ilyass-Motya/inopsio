import Hero from '@/components/sections/Hero'
import Features from '@/components/sections/Features'
import PlatformOverview from '@/components/sections/PlatformOverview'
import IndustrySolutions from '@/components/sections/IndustrySolutions'
import Stats from '@/components/sections/Stats'
import ResourcesTeaser from '@/components/sections/ResourcesTeaser'
import CTA from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <PlatformOverview />
      <IndustrySolutions />
      <Stats />
      <ResourcesTeaser />
      <CTA />
    </div>
  )
}
