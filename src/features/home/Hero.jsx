import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useHero } from './useHero'

export const Hero = () => {
  const { handleStartDesigning, handleBrowseCollection } = useHero()

  return (
    <section className="relative pt-44 pb-32 overflow-hidden bg-white">

      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group cursor-pointer mb-10 flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <Sparkles size={18} className="text-yellow-500 animate-pulse" />
            <span className="text-sm font-bold text-[#4F46E5]">
              New: AI-Powered Design Assistant
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[56px] md:text-[96px] font-[900] leading-[1] tracking-[-0.04em] mb-10 text-slate-800"
          >
            Create Your <br />
            <span className="bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#DB2777] bg-clip-text text-transparent">
              Perfect Jersey
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-3xl text-[18px] md:text-[22px] text-slate-500 font-normal leading-[1.6] mb-14"
          >
            Professional sportswear designed by you. Premium quality, lightning-fast delivery.
          </motion.p>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          >
            <button
              onClick={handleStartDesigning}
              className="group bg-[#4F46E5] text-white px-9 py-4.5 rounded-full font-bold text-lg flex items-center gap-3 shadow-xl shadow-blue-200/50 hover:scale-105 transition-all"
            >
              Start Designing
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={handleBrowseCollection}
              className="px-9 py-4.5 rounded-full font-bold text-lg text-slate-800 bg-white border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
            >
              Browse Collection
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
