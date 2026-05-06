import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export const FeatureCard = () => {
  return (
    <section className="py-12 bg-white flex justify-center items-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        animate={{ 
          rotate: [2, -2, 2],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
        className="relative w-full max-w-[320px] aspect-square group cursor-pointer"
      >
        {/* Main Gradient Card */}
        <div className="w-full h-full bg-gradient-to-br from-[#4F46E5] via-[#7C3AED] to-[#DB2777] rounded-[2.5rem] shadow-2xl shadow-indigo-100/50 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
           {/* Inner glow effect */}
           <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] opacity-40" />
           
           {/* Shine effect */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>

        {/* Sparkle Badge */}
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 10, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-lg shadow-xl flex items-center justify-center border border-gray-50 z-20"
        >
          <Sparkles size={32} className="text-yellow-500" />
        </motion.div>
        
        {/* Bottom text indicator (optional, makes it look more like a card) */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <span className="text-sm font-bold text-slate-400">View Details</span>
        </div>
      </motion.div>
    </section>
  )
}
