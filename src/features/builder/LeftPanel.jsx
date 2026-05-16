import React, { useState } from 'react';
import ModelViewer from './ModelViewer';
import { HiOutlineCamera, HiOutlineZoomIn, HiOutlineZoomOut, HiOutlineChevronDown, HiOutlineChevronRight, HiOutlineCube } from 'react-icons/hi';
import { VscFiles, VscMenu } from 'react-icons/vsc';

const ActivityBtn = ({ icon, label, onClick, active = false }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-12 flex flex-col items-center justify-center transition-all relative group cursor-pointer
      ${active ? 'text-blue-600 bg-gray-50/50' : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'}`}
    title={label}
  >
    <span className="text-xl">{icon}</span>
    {active && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 shadow-[2px_0_8px_rgba(37,99,235,0.4)]" />}
    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-[8px] font-bold uppercase tracking-widest rounded-none opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
       {label}
    </div>
  </button>
);

const LeftPanel = ({
  modelUrl,
  meshes,
  activeMesh,
  setActiveMesh,
  meshStates,
  onMeshesDetected,
  decals,
  selectedDecalId,
  setSelectedDecalId,
  updateDecal,
  removeDecal,
  globalPattern,
  materialFinish,
  lightingPreset,
  mouseFollow,
  isHUDVisible = true
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMeshesExpanded, setIsMeshesExpanded] = useState(true);

  return (
    <div className="flex-1 flex flex-col md:flex-row h-[50vh] md:h-full relative bg-white overflow-hidden font-['Outfit']">
      
      {/* ── 1. VS Code ACTIVITY BAR ── */}
      <div className={`transition-all duration-500 ease-in-out z-30 flex md:flex-col items-center bg-white border-r border-gray-100 flex-shrink-0
        ${isHUDVisible ? 'w-12 h-full' : 'w-0 h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="flex md:flex-col items-center w-full">
          <ActivityBtn 
            icon={<VscFiles size={20} />} 
            label="Explorer" 
            active={isSidebarOpen} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
          
          <div className="h-px w-6 bg-gray-100 my-2" />

          <ActivityBtn 
            icon={<HiOutlineCamera size={20} />} 
            label="Reset Camera" 
            onClick={() => window.dispatchEvent(new CustomEvent('eay:resetCamera'))} 
          />
          
          <ActivityBtn 
            icon={<HiOutlineZoomIn size={20} />} 
            label="Zoom In" 
            onClick={() => window.dispatchEvent(new CustomEvent('eay:zoom', { detail: -0.5 }))} 
          />
          
          <ActivityBtn 
            icon={<HiOutlineZoomOut size={20} />} 
            label="Zoom Out" 
            onClick={() => window.dispatchEvent(new CustomEvent('eay:zoom', { detail: 0.5 }))} 
          />
        </div>
      </div>

      {/* ── 2. VS Code SIDE BAR (The Explorer) ── */}
      <div className={`transition-all duration-500 ease-in-out z-20 flex flex-col bg-gray-50/50 border-r border-gray-100 flex-shrink-0 overflow-hidden
        ${isHUDVisible && isSidebarOpen ? 'w-56 h-full' : 'w-0 h-0 opacity-0 pointer-events-none'}`}
      >
        {/* Sidebar Header */}
        <div className="h-9 px-4 flex items-center justify-between bg-white border-b border-gray-100 flex-shrink-0">
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Explorer</span>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="text-gray-400 hover:text-gray-900 transition-colors p-1 hover:bg-gray-100 rounded-none"
            title="Collapse Sidebar"
          >
            <VscMenu size={12} />
          </button>
        </div>

        {/* MESHES Accordion */}
        <div className="flex-1 overflow-y-auto no-scrollbar" data-lenis-prevent>
          <div className="mb-1">
            <button 
              onClick={() => setIsMeshesExpanded(!isMeshesExpanded)}
              className="w-full flex items-center gap-1 px-1 py-1.5 hover:bg-gray-100/50 transition-colors cursor-pointer group outline-none"
            >
              {isMeshesExpanded ? <HiOutlineChevronDown size={14} className="text-gray-400" /> : <HiOutlineChevronRight size={14} className="text-gray-400" />}
              <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Active Meshes</span>
            </button>

            {isMeshesExpanded && (
              <div className="flex flex-col animate-in fade-in slide-in-from-top-1 duration-200">
                {meshes.map((info, idx) => {
                  const isActive = activeMesh === info.id;
                  return (
                    <button
                      key={info.id}
                      onClick={() => setActiveMesh(info.id)}
                      className={`group flex items-center gap-2 px-6 py-1.5 transition-all text-left relative outline-none
                        ${isActive ? 'bg-blue-600/5 text-blue-600' : 'text-gray-500 hover:bg-gray-200/50 hover:text-gray-900'}`}
                    >
                      <HiOutlineCube size={14} className={isActive ? 'text-blue-600' : 'text-gray-300 group-hover:text-gray-400'} />
                      <div className="flex flex-col leading-tight overflow-hidden">
                        <span className="text-[11px] font-medium truncate tracking-tight">{info.display}.obj</span>
                        <span className="text-[7px] font-bold text-gray-300 uppercase tracking-widest">Asset Group {String(idx + 1).padStart(2, '0')}</span>
                      </div>
                      {isActive && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Status Footer */}
        <div className="px-4 py-2 bg-white border-t border-gray-100 flex-shrink-0">
           <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">GPU Matrix Stable</span>
           </div>
        </div>
      </div>

      {/* ── 3. 3D VIEWPORT ── */}
      <div className="flex-1 relative bg-white overflow-hidden">
        <ModelViewer
          modelUrl={modelUrl}
          meshStates={meshStates}
          onMeshesDetected={onMeshesDetected}
          decals={decals}
          selectedDecalId={selectedDecalId}
          setSelectedDecalId={setSelectedDecalId}
          updateDecal={updateDecal}
          removeDecal={removeDecal}
          globalPattern={globalPattern}
          materialFinish={materialFinish}
          lightingPreset={lightingPreset}
          mouseFollow={mouseFollow}
        />

        {/* HUD Overlay - Badge */}
        <div className={`absolute top-6 left-6 pointer-events-none select-none z-10 transition-all duration-500 ${isHUDVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <div className="flex items-center gap-4 px-4 py-2 bg-white border border-gray-100 rounded-none shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <div className="w-1.5 h-1.5 rounded-none bg-blue-600 animate-pulse" />
            <div className="flex flex-col">
              <span className="text-[7px] font-semibold text-gray-300 uppercase tracking-[0.3em]">Studio Workspace</span>
              <span className="text-[9px] font-semibold text-gray-900 uppercase tracking-widest">{meshes.length} Active Components</span>
            </div>
          </div>
        </div>

        {/* Cinematic Backdrop Text */}
        {!isHUDVisible && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
            <h2 className="text-[20vw] font-black uppercase tracking-tighter select-none">ELITE</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;
