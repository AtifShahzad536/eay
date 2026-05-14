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
      className="w-full h-8 bg-[#f5f5f5] border-b border-[#e0e0e0] flex items-stretch select-none z-50 flex-shrink-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* App Branding */}
      <div className="flex items-center px-4 gap-2 border-r border-[#e0e0e0]">
        {onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-2 py-0.5 hover:bg-gray-200 rounded transition-colors mr-2 group"
          >
            <span className="text-[10px] text-gray-400 group-hover:text-blue-500 transition-colors">◀</span>
            <span className="text-[9px]  text-gray-400 group-hover:text-gray-900 uppercase tracking-tighter transition-colors">Back</span>
          </button>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/" title="Back to Home" className="flex items-center gap-2 hover:bg-gray-200 px-1 rounded transition-colors">
              <div className="w-4 h-4 bg-[#00b0f0] rounded-sm flex items-center justify-center">
                <span className="text-white font-black text-[9px] leading-none">E</span>
              </div>
            </Link>
            {backTo ? (
              <Link
                to={backTo}
                className="text-[9px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors flex items-center gap-1.5"
              >
                <span className="text-[10px]">↩</span> {backTo.includes('product-details') ? 'Go Back' : 'Back'}
              </Link>
            ) : (
              <Link
                to="/"
                className="text-[9px]  text-gray-400 hover:text-blue-600 uppercase tracking-widest transition-colors flex items-center gap-1.2"
              >
                <span className="text-[8px]">↩</span> Home
              </Link>
            )}
          </div>
        )}
        <span className="text-[8px] md:text-[12px] font-semibold text-[#222]  tracking-tight ml-1">EAY Builder</span>
      </div>

      {/* Menus */}
      {menuData.map((menu) => (
        <div key={menu.label} className="relative flex items-stretch">
          <button
            className={`px-4 h-full text-[8px]  uppercase tracking-widest flex items-center gap-2 transition-all duration-200 outline-none
              ${activeMenu === menu.label ? 'text-[#4F46E5] bg-indigo-50/50' : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/30'}`}
            onMouseDown={() => setActiveMenu(prev => prev === menu.label ? null : menu.label)}
            onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
          >
            {menu.label}
          </button>

          {activeMenu === menu.label && (
            <div className="absolute top-full left-0 mt-0 w-56 bg-white border border-gray-100 rounded-b-xl shadow-2xl z-50 py-1.5 fade-up overflow-hidden backdrop-blur-xl">
              {menu.items.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { item.action(); setActiveMenu(null); }}
                  className="w-full text-left px-4 py-2.5 text-[10px] font-bold text-gray-600 hover:bg-indigo-50 hover:text-[#4F46E5] flex items-center gap-3 transition-colors duration-100"
                >
                  <span className="text-base text-gray-400">{item.icon}</span>
                  <span className="uppercase tracking-widest">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="ml-auto flex items-center gap-4 px-6 border-l border-gray-100">
        <span className="text-[8px] text-gray-300 font-black uppercase tracking-[0.2em]">v1.0.4 · Production</span>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
          <span className="text-[8px] font-black text-green-500 uppercase tracking-widest">Live</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
