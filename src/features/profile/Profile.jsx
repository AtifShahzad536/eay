import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, User, Package, Heart, Settings, LogOut,
  Camera, Save, ChevronRight, Truck, CheckCircle2, Clock
} from 'lucide-react'
import { COLORS, BTN, GRADIENTS } from '../../config/theme'

const SAVED_DESIGNS = [
  {
    id: 1,
    name: 'Team Jersey 2024',
    date: 'Saved on 2024-04-15',
    image: 'https://images.unsplash.com/photo-1551280857-2b9bbe52acf4?w=600&h=400&fit=crop&q=80',
  },
  {
    id: 2,
    name: 'Custom Hoodie',
    date: 'Saved on 2024-04-10',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&h=400&fit=crop&q=80',
  },
]

const ORDERS = [
  { id: '#1001', date: '2024-04-20', items: 3, price: 189.99, status: 'Delivered' },
  { id: '#1002', date: '2024-04-18', items: 5, price: 249.99, status: 'In Transit' },
  { id: '#1003', date: '2024-04-10', items: 2, price: 99.99, status: 'Processing' },
]

const STATUS_CONFIG = {
  Delivered:  { color: 'bg-emerald-100 text-emerald-700', icon: <CheckCircle2 size={13} /> },
  'In Transit': { color: 'bg-blue-100 text-blue-700',    icon: <Truck size={13} /> },
  Processing: { color: 'bg-amber-100 text-amber-700',    icon: <Clock size={13} /> },
}

const NAV_ITEMS = [
  { key: 'profile',  label: 'Profile',       icon: User },
  { key: 'orders',   label: 'Orders',        icon: Package },
  { key: 'designs',  label: 'Saved Designs', icon: Heart },
  { key: 'settings', label: 'Settings',      icon: Settings },
]

export const Profile = ({ isOpen, onClose, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile')

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('lenis-stopped')
      document.body.style.overflow = 'hidden'
    } else {
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
    }
    return () => {
      document.documentElement.classList.remove('lenis-stopped')
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="profile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/25 backdrop-blur-sm z-[105]"
          />

          {/* Full-height panel */}
          <motion.aside
            key="profile-panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed top-0 right-0 h-full w-full max-w-[900px] bg-[#F8F9FF] z-[110] flex flex-row shadow-2xl shadow-indigo-100/60 overflow-hidden"
          >
            {/* ─── LEFT SIDEBAR ─────────────────────────────── */}
            <div className="w-[76px] md:w-[240px] min-w-[76px] md:min-w-[240px] bg-white border-r border-gray-100 flex flex-col py-6 md:py-8 px-2 md:px-5 shrink-0 h-full overflow-y-auto custom-scrollbar">
              {/* Close btn */}
              <button
                onClick={onClose}
                className="self-center md:self-end w-10 h-10 md:w-9 md:h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all mb-6"
              >
                <X size={18} />
              </button>

              {/* Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <div className="w-12 h-12 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-indigo-200">
                    <User size={22} className="text-white md:hidden" />
                    <User size={36} className="text-white hidden md:block" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-5 h-5 md:w-7 md:h-7 bg-white rounded-full border-2 border-indigo-100 flex items-center justify-center text-indigo-500 hover:bg-indigo-50 transition-colors shadow-sm">
                    <Camera size={10} className="md:hidden" />
                    <Camera size={13} className="hidden md:block" />
                  </button>
                </div>
                <p className="hidden md:block mt-4 text-slate-800 text-lg">John Doe</p>
                <p className="hidden md:block text-sm text-slate-400 font-medium">john.doe@email.com</p>
              </div>

              {/* Nav */}
              <nav className="flex flex-col gap-2 md:gap-1 flex-1">
                {NAV_ITEMS.map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    title={label}
                    className={`flex items-center justify-center md:justify-start gap-0 md:gap-3 p-3 md:px-4 md:py-3 rounded-xl text-sm transition-all ${
                      activeTab === key
                        ? 'bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white shadow-lg shadow-indigo-200/50'
                        : 'text-slate-500 hover:bg-gray-50 hover:text-slate-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 md:w-[17px] md:h-[17px]" />
                    <span className="hidden md:inline">{label}</span>
                    {activeTab !== key && <ChevronRight size={14} className="hidden md:block ml-auto opacity-40" />}
                  </button>
                ))}
              </nav>

              {/* Logout */}
              <button 
                onClick={onLogout}
                title="Logout"
                className="flex items-center justify-center md:justify-start gap-0 md:gap-3 p-3 md:px-4 md:py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut className="w-5 h-5 md:w-[17px] md:h-[17px]" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>

            {/* ─── MAIN CONTENT ─────────────────────────────── */}
            <div className="flex-1 overflow-y-auto px-5 md:px-8 py-6 md:py-8 custom-scrollbar" data-lenis-prevent>

              {/* Page Header */}
              <div className="mb-6 md:mb-8">
                <h1 className="text-2xl md:text-3xl text-slate-800">My Account</h1>
                <p className="text-sm md:text-base text-slate-400 font-medium mt-1">Manage your profile and orders</p>
              </div>

              {/* ── PROFILE TAB ── */}
              {activeTab === 'profile' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm"
                >
                  <h2 className="text-xl text-slate-800 mb-4 md:mb-6">Profile Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                    {[
                      { label: 'First Name', value: 'John',               type: 'text' },
                      { label: 'Last Name',  value: 'Doe',                type: 'text' },
                      { label: 'Email',      value: 'john.doe@email.com', type: 'email' },
                      { label: 'Phone',      value: '+1 (555) 123-4567',  type: 'tel' },
                    ].map((field) => (
                      <div key={field.label}>
                        <label className="block text-xs text-slate-500 uppercase tracking-wider mb-2">
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          defaultValue={field.value}
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 md:px-5 py-2.5 md:py-3.5 text-slate-700 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-[#4F46E5] transition-all"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4">
                    <button className={`${BTN.primary} !px-4 md:!px-8 !py-3 md:!py-3.5 text-sm flex items-center justify-center gap-2`}>
                      <Save size={16} />
                      Save Changes
                    </button>
                    <button className="px-4 md:px-8 py-3 md:py-3.5 rounded-lg text-sm text-slate-500 bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors flex justify-center">
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── ORDERS TAB ── */}
              {activeTab === 'orders' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl text-slate-800 mb-6">Recent Orders</h2>
                  {ORDERS.map((order) => {
                    const cfg = STATUS_CONFIG[order.status]
                    return (
                      <div
                        key={order.id}
                        className="bg-white rounded-lg px-4 md:px-6 py-4 md:py-5 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between hover:border-indigo-100 hover:shadow-md transition-all gap-4 sm:gap-0"
                      >
                        <div>
                          <p className="text-slate-800">Order {order.id}</p>
                          <p className="text-sm text-slate-400 mt-0.5">
                            {order.date} · {order.items} items
                          </p>
                        </div>
                        <div className="flex items-center gap-4 self-end sm:self-auto">
                          <span className={`text-lg text-[${COLORS.primary}]`}>
                            ${order.price.toFixed(2)}
                          </span>
                          <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs ${cfg.color}`}>
                            {cfg.icon}
                            {order.status}
                          </span>
                          <ChevronRight size={18} className="text-gray-300" />
                        </div>
                      </div>
                    )
                  })}
                </motion.div>
              )}

              {/* ── SAVED DESIGNS TAB ── */}
              {activeTab === 'designs' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-xl text-slate-800 mb-6">Saved Designs</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {SAVED_DESIGNS.map((design) => (
                      <div
                        key={design.id}
                        className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer group"
                      >
                        <div className="relative h-44 overflow-hidden">
                          <img
                            src={design.image}
                            alt={design.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                        <div className="px-5 py-4">
                          <p className="text-slate-800">{design.name}</p>
                          <p className="text-xs text-slate-400 mt-1">{design.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* ── SETTINGS TAB ── */}
              {activeTab === 'settings' && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm"
                >
                  <h2 className="text-xl text-slate-800 mb-6">Account Settings</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Email Notifications', desc: 'Receive updates about your orders', enabled: true },
                      { label: 'SMS Alerts', desc: 'Get SMS when order status changes', enabled: false },
                      { label: 'Newsletter', desc: 'Receive our weekly sportswear newsletter', enabled: true },
                      { label: 'Two-Factor Auth', desc: 'Add an extra layer of security', enabled: false },
                    ].map((setting) => (
                      <div
                        key={setting.label}
                        className="flex items-center justify-between p-4 md:p-5 rounded-lg border border-gray-100 bg-gray-50/50 hover:border-indigo-100 transition-colors"
                      >
                        <div>
                          <p className="text-slate-700 text-sm">{setting.label}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{setting.desc}</p>
                        </div>
                        <button
                          className={`relative w-12 h-6 rounded-full transition-colors ${
                            setting.enabled ? 'bg-[#4F46E5]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
                              setting.enabled ? 'left-7' : 'left-1'
                            }`}
                          />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
