import { Mail, Phone, MapPin } from 'lucide-react'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { COLORS, TEXT, BTN, SPACING } from '../../../config/theme'

export const Footer = () => (
  <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
    <div className={`${SPACING.container}`}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">

        {/* Brand & Contact */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl bg-[${COLORS.primary}] flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200`}>
              ES
            </div>
            <h2 className={`text-3xl font-bold tracking-tight text-slate-800`}>EAY SPORTS</h2>
          </div>
          <p className="text-slate-500 text-[16px] leading-snug mb-10 max-w-sm">
            Your premier destination for custom sportswear. We deliver quality, performance, and style to athletes and teams worldwide.
          </p>
          <div className="space-y-4">
            {[
              { icon: <Mail size={20} />,   bg: 'bg-[#6366F1] shadow-indigo-100',  text: 'info@eaysports.com' },
              { icon: <Phone size={20} />,  bg: 'bg-[#10B981] shadow-emerald-100', text: '+1 (555) 123-4567' },
              { icon: <MapPin size={20} />, bg: 'bg-[#F97316] shadow-orange-100',  text: '123 Sports Avenue, NY 10001' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center text-white shadow-lg`}>
                  {item.icon}
                </div>
                <span className="text-slate-600 font-medium">{item.text}</span>
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
              <h4 className="text-sm uppercase tracking-widest font-bold text-slate-400 mb-6">{col.title}</h4>
              <ul className="space-y-3.5">
                {col.links.map(item => (
                  <li key={item}>
                    <a href="#" className={`text-slate-600 hover:text-[${COLORS.primary}] transition-colors text-[15px]`}>{item}</a>
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
          {/* Social Icons — slightly smaller on mobile */}
          {[
            { icon: <FaFacebookF />, bg: 'bg-[#0EA5E9]' },
            { icon: <FaTwitter />,   bg: 'bg-[#D946EF]' },
            { icon: <FaInstagram />, bg: 'bg-[#F97316]' },
            { icon: <FaLinkedinIn />,bg: 'bg-[#10B981]' },
          ].map((s, i) => (
            <button key={i} className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg ${s.bg} text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg [&>svg]:w-4 sm:[&>svg]:w-[18px]`}>
              {s.icon}
            </button>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full max-w-md px-4 sm:px-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 sm:px-6 sm:py-4 text-xs sm:text-base text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          <button className={`${BTN.primary} !px-5 !py-2.5 sm:!px-8 sm:!py-4 rounded-lg text-xs sm:text-base shadow-xl shadow-blue-100 hover:scale-105 transition-transform`}>
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
