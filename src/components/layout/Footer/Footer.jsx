import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { COLORS, TEXT, BTN } from '../../../config/theme'

export const Footer = () => (
  <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

        {/* Brand & Contact */}
        <div className="lg:col-span-5">
          <h2 className={`text-4xl text-[${COLORS.primary}] mb-6`}>EAY SPORTS</h2>
          <p className="text-gray-500 text-lg leading-relaxed mb-10 max-w-md">
            Your premier destination for custom sportswear. We deliver quality, performance, and style to athletes and teams worldwide.
          </p>
          <div className="space-y-6">
            {[
              { icon: <Mail size={20} />,   bg: 'bg-[#6366F1] shadow-indigo-100',  text: 'info@eaysports.com' },
              { icon: <Phone size={20} />,  bg: 'bg-[#10B981] shadow-emerald-100', text: '+1 (555) 123-4567' },
              { icon: <MapPin size={20} />, bg: 'bg-[#F97316] shadow-orange-100',  text: '123 Sports Avenue, NY 10001' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center text-white shadow-lg`}>
                  {item.icon}
                </div>
                <span className="text-gray-700 text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { title: 'Company',  links: ['About Us', 'Contact', 'FAQ', 'Careers'] },
            { title: 'Products', links: ['Custom Sportswear', 'Custom Builder', 'Bulk Orders', 'Categories'] },
            { title: 'Support',  links: ['Shipping Info', 'Returns', 'Size Guide', 'Terms & Conditions'] },
          ].map(col => (
            <div key={col.title}>
              <h4 className="text-xl text-gray-800 mb-8 tracking-tight">{col.title}</h4>
              <ul className="space-y-5">
                {col.links.map(item => (
                  <li key={item}>
                    <a href="#" className={`text-gray-500 hover:text-[${COLORS.primary}] transition-colors`}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: Socials + Newsletter */}
      <div className="flex flex-col lg:flex-row items-center justify-between pt-10 border-t border-gray-100 gap-8">
        <div className="flex items-center gap-4">
          {[
            { icon: <FaFacebookF size={18} />, bg: 'bg-[#0EA5E9]' },
            { icon: <FaTwitter size={18} />,   bg: 'bg-[#D946EF]' },
            { icon: <FaInstagram size={18} />, bg: 'bg-[#F97316]' },
            { icon: <FaLinkedinIn size={18} />,bg: 'bg-[#10B981]' },
          ].map((s, i) => (
            <button key={i} className={`w-11 h-11 rounded-lg ${s.bg} text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}>
              {s.icon}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-6 py-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <button className={`${BTN.primary} !px-8 !py-4 rounded-lg shadow-xl shadow-blue-100 hover:scale-105 transition-transform`}>
            Subscribe
          </button>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-400 text-sm">
        <p>© 2026 EAY SPORTS. Excellence in Sportswear.</p>
      </div>
    </div>
  </footer>
)
