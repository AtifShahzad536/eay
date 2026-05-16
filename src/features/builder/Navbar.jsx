import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineFolderOpen, HiOutlineSaveAs, HiOutlineDownload, HiOutlineCubeTransparent } from 'react-icons/hi';
import { VscHistory, VscEdit } from 'react-icons/vsc';

const Navbar = ({ onBack, backTo }) => {
  const [activeMenu, setActiveMenu] = useState(null);
  const barRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const menuData = [
    {
      label: 'File',
      icon: <HiOutlineFolderOpen className="text-lg" />,
      items: [
        {
          label: 'Import Model (.glb)', icon: <HiOutlineCubeTransparent />, action: () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.glb,.gltf';
            input.onchange = (e) => {
              const file = e.target.files[0];
              if (file) {
                const url = URL.createObjectURL(file);
                window.dispatchEvent(new CustomEvent('eay:importModel', { detail: url }));
              }
            };
            input.click();
          }
        },
        { label: 'Save Design', icon: <HiOutlineSaveAs />, action: () => window.dispatchEvent(new CustomEvent('eay:save')) },
        { label: 'Export PNG', icon: <HiOutlineDownload />, action: () => window.dispatchEvent(new CustomEvent('eay:export')) },
      ]
    },
    {
      label: 'Edit',
      icon: <VscEdit className="text-lg" />,
      items: [
        { label: 'Reset All Colors', icon: <VscHistory />, action: () => window.dispatchEvent(new CustomEvent('eay:resetAll')) },
      ]
    }
  ];

  return (
    <div
      ref={barRef}
      className="w-full h-10 bg-white border-b border-gray-900 flex items-stretch select-none z-50 flex-shrink-0 relative"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ── Branding Section ── */}
      <div className="flex items-center px-3 sm:px-6 gap-3 border-r border-gray-100">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 hover:bg-blue-600 hover:text-white transition-all group border border-gray-100"
          >
            <span className="text-[10px] group-hover:translate-x-0.5 transition-transform">◀</span>
            <span className="text-[9px] font-black uppercase tracking-tighter">Exit</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link to="/" title="Home" className="flex items-center gap-2 hover:scale-105 transition-transform">
              <div className="w-5 h-5 bg-blue-600 rounded-none flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-black text-[10px] leading-none">E</span>
              </div>
            </Link>
            <div className="h-4 w-px bg-gray-100 hidden sm:block" />
            {backTo && (
               <Link to={backTo} className="hidden sm:flex text-[9px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-all gap-1.5">
                  <span className="text-[10px]">↩</span> {backTo.includes('product-details') ? 'Return' : 'Back'}
               </Link>
            )}
          </div>
        )}
        <span className="text-[10px] sm:text-[11px] font-black text-gray-900 uppercase tracking-[0.2em] whitespace-nowrap">
          EAY <span className="text-blue-600">Builder</span>
        </span>
      </div>

      {/* ── Command Menus ── */}
      <div className="flex items-stretch">
        {menuData.map((menu) => (
          <div key={menu.label} className="relative flex items-stretch border-r border-gray-50">
            <button
              className={`px-4 sm:px-6 h-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300 outline-none
                ${activeMenu === menu.label ? 'text-blue-600 shadow-[inset_0_-2px_0_#2563eb]' : 'text-gray-500 hover:text-blue-600 hover:shadow-[inset_0_-1px_0_#e5e7eb]'}`}
              onClick={() => setActiveMenu(prev => prev === menu.label ? null : menu.label)}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
            >
              {menu.label}
              <span className={`text-[8px] transition-transform duration-300 ${activeMenu === menu.label ? 'rotate-180' : ''}`}>▼</span>
            </button>

            {activeMenu === menu.label && (
              <div className="absolute top-full left-0 mt-0 w-60 bg-white border border-gray-900 rounded-none shadow-2xl z-50 py-1.5 fade-up overflow-hidden">
                {menu.items.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => { item.action(); setActiveMenu(null); }}
                    className="w-full text-left px-5 py-3 text-[10px] font-black text-gray-700 hover:text-blue-600 flex items-center justify-between group transition-colors duration-100"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm opacity-50 group-hover:opacity-100">{item.icon}</span>
                      <span className="uppercase tracking-[0.2em]">{item.label}</span>
                    </div>
                    <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity">PRO</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Status Metadata ── */}
      <div className="ml-auto flex items-center gap-3 sm:gap-6 px-4 sm:px-8 bg-gray-50/50 border-l border-gray-100">
        <div className="hidden lg:flex flex-col items-end">
          <span className="text-[7px] font-black text-gray-300 uppercase tracking-[0.3em]">Environment</span>
          <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Production v1.0.4</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-none bg-green-500 animate-pulse" />
          <span className="text-[9px] font-black text-gray-900 uppercase tracking-widest">Live</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
