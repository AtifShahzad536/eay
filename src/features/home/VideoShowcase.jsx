import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Sparkles, ChevronRight, Zap, Scissors, Wind, Cpu } from 'lucide-react'
import { COLORS, GRADIENTS, SPACING, BTN } from '../../config/theme'

export const VideoShowcase = () => {
  const [isPlaying1, setIsPlaying1] = useState(true)
  const [isMuted1, setIsMuted1] = useState(true)
  const [isPlaying2, setIsPlaying2] = useState(true)
  const [isMuted2, setIsMuted2] = useState(true)

  const videoRef1 = useRef(null)
  const videoRef2 = useRef(null)

  const togglePlay1 = () => {
    if (videoRef1.current.paused) {
      videoRef1.current.play()
      setIsPlaying1(true)
    } else {
      videoRef1.current.pause()
      setIsPlaying1(false)
    }
  }

  const toggleMute1 = () => {
    videoRef1.current.muted = !videoRef1.current.muted
    setIsMuted1(videoRef1.current.muted)
  }

  const togglePlay2 = () => {
    if (videoRef2.current.paused) {
      videoRef2.current.play()
      setIsPlaying2(true)
    } else {
      videoRef2.current.pause()
      setIsPlaying2(false)
    }
  }

  const toggleMute2 = () => {
    videoRef2.current.muted = !videoRef2.current.muted
    setIsMuted2(videoRef2.current.muted)
  }

  const VideoControls = ({ isPlaying, isMuted, onTogglePlay, onToggleMute }) => (
    <div className="absolute bottom-4 right-4 flex items-center gap-2 z-20">
      <button
        onClick={onTogglePlay}
        className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
      >
        {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
      <button
        onClick={onToggleMute}
        className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>
    </div>
  )

  return (
    <section className="bg-white mt-2 overflow-hidden border-y border-slate-100">
      <div className="flex flex-col lg:flex-row items-stretch min-h-[600px] lg:min-h-[750px]">

        {/* Left Side: Dual Video Stack */}
        <div className="w-full lg:w-1/2 flex flex-col bg-slate-100">

          {/* Top Video: Action */}
          <div className="h-1/2 relative border-b border-white/10 group">
            <video
              ref={videoRef1}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.select-sport.com/cdn/shop/videos/c/vp/05b072ff0f6547d0ac4a35024391ff3f/05b072ff0f6547d0ac4a35024391ff3f.HD-1080p-7.2Mbps-22875215.mp4?v=0" type="video/mp4" />
            </video>
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white text-[9px] font-bold uppercase tracking-widest">
              Action Phase
            </div>
            <VideoControls
              isPlaying={isPlaying1}
              isMuted={isMuted1}
              onTogglePlay={togglePlay1}
              onToggleMute={toggleMute1}
            />
          </div>

          {/* Bottom Video: Process/Craft */}
          <div className="h-1/2 relative group">
            <video
              ref={videoRef2}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="https://www.select-sport.com/cdn/shop/videos/c/vp/04457a95c3a744be95879b0826d72cc9/04457a95c3a744be95879b0826d72cc9.HD-1080p-7.2Mbps-12161544.mp4?v=0" type="video/mp4" />
            </video>
            <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-md text-white text-[9px] font-bold uppercase tracking-widest">
              Craft Phase
            </div>
            <VideoControls
              isPlaying={isPlaying2}
              isMuted={isMuted2}
              onTogglePlay={togglePlay2}
              onToggleMute={toggleMute2}
            />
          </div>
        </div>

        {/* Right Side: Content */}
        <div className="w-full lg:w-1/2 flex items-center bg-[#F8FAFF] p-8 sm:p-16 lg:p-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-60" />

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 text-[#4F46E5] text-[11px] font-bold uppercase tracking-widest mb-8">
              <span className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
              Behind The Scenes
            </div>

            <h2 className="text-4xl lg:text-6xl text-slate-800 leading-[1.1] mb-8 font-bold">
              Crafted for the <br />
              <span className={`text-transparent bg-clip-text ${GRADIENTS.button}`}>Champions.</span>
            </h2>

            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              We merge elite athletic performance with artisanal craftsmanship. Our two-stage process ensures every jersey is both a masterpiece of design and a powerhouse of performance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {[
                { title: 'Action Tested', icon: <Zap className="text-amber-500" size={20} /> },
                { title: 'Hand-Finished', icon: <Scissors className="text-indigo-500" size={20} /> },
                { title: 'Breathable Tech', icon: <Wind className="text-sky-500" size={20} /> },
                { title: 'AI Optimized', icon: <Cpu className="text-purple-500" size={20} /> }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-white border border-indigo-50 shadow-sm hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">{item.title}</span>
                </div>
              ))}
            </div>

            <button className={`${BTN.primary} group flex items-center gap-3 px-8 py-4 rounded-xl shadow-xl shadow-indigo-100 hover:scale-105 transition-all w-full sm:w-auto justify-center`}>
              Learn Our Process
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  )
}
