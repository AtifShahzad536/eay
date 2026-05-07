import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { useHero } from './useHero'
import { GRADIENTS, BTN, COLORS } from '../../config/theme'

const IMAGES = [
  '/images/hero/HXE-Web-Banner-Explore.jpg_v=1.png',
  '/images/hero/S25-BaseballEquipment.jpg_v=1.png',
  '/images/hero/S25-BasketballEquipment.jpg_v=1.png',
  '/images/hero/S25-CustomBaseballApparel.jpg_v=1.png'
]

export const Hero = () => {
  const { handleStartDesigning, handleBrowseCollection } = useHero()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % IMAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % IMAGES.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + IMAGES.length) % IMAGES.length)

  return (
    <section className="relative h-[380px] sm:min-h-screen overflow-hidden bg-slate-950">

      {/* Full-Screen Slider — No overlay, fully visible images */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={IMAGES[currentSlide]}
              alt="Hero Sports"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Only a very subtle bottom fade so controls stay readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      {/* Text Content — bottom-left, compact glass card */}
      <div className="absolute bottom-14 sm:bottom-16 left-3 sm:left-[5%] lg:left-[8%] xl:left-[12%] z-10 max-w-[92%] sm:max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className=""
        >
          {/* Badge */}
          {/* <div className="flex items-center gap-2 mb-3">
            <Sparkles size={14} className="text-yellow-400 animate-pulse" />
            <span className="text-[10px]  text-yellow-300 uppercase tracking-widest">
              AI-Powered Design Assistant
            </span>
          </div> */}

          {/* Title — smaller */}
          {/* <h1 className="text-[20px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-[600] leading-[1.15] tracking-[-0.03em] mb-1 sm:mb-2 text-white">
            Create Your{' '}
            <span className={GRADIENTS.heroText}>
              Perfect Jersey
            </span>
          </h1> */}

          {/* Subtitle — hidden on mobile to save space */}
          {/* <p className="hidden sm:block text-[14px] text-white/75 leading-relaxed mb-5">
            Premium sportswear designed by you — fast delivery &amp; top quality.
          </p> */}

          {/* Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleStartDesigning}
              className={`group flex items-center gap-1.5 ${BTN.primary} !text-[11px] sm:!text-sm !py-2 sm:!py-2.5 !px-3.5 sm:!px-5 rounded-lg sm:rounded-full whitespace-nowrap`}
            >
              Start Designing
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleBrowseCollection}
              className={`${BTN.ghost} !text-[11px] sm:!text-sm !py-2 sm:!py-2.5 !px-3.5 sm:!px-5 rounded-lg sm:rounded-full whitespace-nowrap`}
            >
              Browse Collection
            </button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators — bottom-center */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {IMAGES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-400 rounded-full ${currentSlide === index ? 'w-8 bg-white' : 'w-2 bg-white/40'
              }`}
          />
        ))}
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 border border-white/10 text-white transition-all hidden md:flex"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 border border-white/10 text-white transition-all hidden md:flex"
      >
        <ChevronRight size={22} />
      </button>

    </section>
  )
}
