import { Hero } from '../features/home/Hero'
import { FeatureCard } from '../features/home/FeatureCard'
import { Stats } from '../features/home/Stats'
import { Features } from '../features/home/Features'
import { Categories } from '../features/home/Categories'
import CallToAction from '../features/home/CallToAction'

export const Home = () => (
  <>
    <Hero />
    <FeatureCard />
    <Stats />
    <Features />
    <Categories />

    {/* Call to Action */}
    <CallToAction />
  </>
)
