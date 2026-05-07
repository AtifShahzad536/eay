import { Hero } from '../features/home/Hero'
import { VideoShowcase } from '../features/home/VideoShowcase'
import { Stats } from '../features/home/Stats'
import { Features } from '../features/home/Features'
import { Categories } from '../features/home/Categories'
import CallToAction from '../features/home/CallToAction'

export const Home = () => (
  <>
    <Hero />
    <VideoShowcase />
    <Stats />
    <Features />
    <Categories />

    {/* Call to Action */}
    <CallToAction />
  </>
)
