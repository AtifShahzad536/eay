import { Users, Star, Trophy, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  { icon: <Users size={32} />, label: 'Happy Customers', value: '50K+', color: 'bg-blue-500' },
  { icon: <Star size={32} />, label: 'Satisfaction Rate', value: '98%', color: 'bg-pink-500' },
  { icon: <Trophy size={32} />, label: 'Pro Teams', value: '200+', color: 'bg-emerald-500' },
  { icon: <Clock size={32} />, label: 'Support', value: '24/7', color: 'bg-orange-500' },
]

export const Stats = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-lg bg-gray-50 border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow group"
            >
              <div className={`w-16 h-16 ${stat.color} text-white rounded-lg flex items-center justify-center mb-6 shadow-lg shadow-gray-200 group-hover:scale-110 transition-transform`}>
                {stat.icon}
              </div>
              <h3 className="text-4xl font-black text-slate-800 mb-2">{stat.value}</h3>
              <p className="text-slate-500 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
