import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';
import {
  setMeshes,
  setActiveMesh,
  updateMeshStates,
  updateMeshProp,
  addDecal,
  updateDecal,
  removeDecal,
  setSelectedDecalId,
  setRoster,
  setGlobalPattern,
  setLightingPreset,
  setMaterialFinish,
  setMouseFollow,
  setSelectedDesign,
  setView
} from './builderSlice';

const Builder = () => {
  const dispatch = useDispatch();
  const [isHUDVisible, setIsHUDVisible] = useState(true);
  
  const {
    selectedDesign: design,
    primaryColor, primaryIsGrad, primaryColor2,
    secondaryColor, secondaryIsGrad, secondaryColor2,
    thirdColor, thirdIsGrad, thirdColor2,
    globalPattern, lightingPreset, materialFinish, mouseFollow,
    meshes, activeMesh, meshStates, decals, selectedDecalId, roster
  } = useSelector((state) => state.builder);

  const initialColors = {
    primary: { color: primaryColor, isGrad: primaryIsGrad, color2: primaryColor2 },
    secondary: { color: secondaryColor, isGrad: secondaryIsGrad, color2: secondaryColor2 },
    third: { color: thirdColor, isGrad: thirdIsGrad, color2: thirdColor2 }
  };

  // Handle Navbar Events
  useEffect(() => {
    const handleResetAll = () => {
      const resetStates = {};
      Object.keys(meshStates).forEach(meshId => {
        const m = meshes.find(mesh => mesh.id === meshId);
        if (m) {
          let type = 'Body';
          if (m.display.includes('Neck')) type = 'Neck';
          else if (m.display.includes('Sleeve')) type = m.display.includes('R') ? 'R_Sleeve' : 'L_Sleeve';
          else if (m.display.includes('Front')) type = 'Front';
          else if (m.display.includes('Back')) type = 'Back';

          const colorKey = design.mapping[type] || design.mapping['Body'] || 'primary';
          const config = initialColors[colorKey];

          resetStates[meshId] = {
            color: config.color,
            isGrad: config.isGrad,
            grad1: config.color2,
            grad2: config.color,
            pColor: '#ffffff',
            pUrl: null
          };
        }
      });
      dispatch(updateMeshStates(resetStates));
      window.dispatchEvent(new CustomEvent('eay:resetCamera'));
    };

    const handleSave = () => {
      console.log('Saving design...', { meshStates, decals });
      alert('Design Saved Successfully!');
    };

    const handleToggleHUD = () => {
      setIsHUDVisible(prev => !prev);
    };

    window.addEventListener('eay:resetAll', handleResetAll);
    window.addEventListener('eay:save', handleSave);
    window.addEventListener('eay:toggleHUD', handleToggleHUD);
    
    return () => {
      window.removeEventListener('eay:resetAll', handleResetAll);
      window.removeEventListener('eay:save', handleSave);
      window.removeEventListener('eay:toggleHUD', handleToggleHUD);
    };
  }, [dispatch, meshStates, meshes, design, initialColors]);

  const handleMeshesDetected = (meshList) => {
    dispatch(setMeshes(meshList));
    if (meshList.length > 0 && !activeMesh) {
      dispatch(setActiveMesh(meshList[0].id));
    }

    const nextStates = {};
    meshList.forEach(m => {
      if (!meshStates[m.id]) {
        let type = 'Body';
        if (m.display.includes('Neck')) type = 'Neck';
        else if (m.display.includes('Sleeve')) type = m.display.includes('R') ? 'R_Sleeve' : 'L_Sleeve';
        else if (m.display.includes('Front')) type = 'Front';
        else if (m.display.includes('Back')) type = 'Back';

        const colorKey = design.mapping[type] || design.mapping['Body'] || 'primary';
        const config = initialColors[colorKey];

        nextStates[m.id] = {
          color: config.color,
          isGrad: config.isGrad,
          grad1: config.color2,
          grad2: config.color,
          pColor: '#ffffff',
          pUrl: null
        };
      }
    });

    if (Object.keys(nextStates).length > 0) {
      dispatch(updateMeshStates(nextStates));
    }
  };

  if (!design) return <div className="p-20 text-center font-bold text-gray-400">Loading Design...</div>;

  return (
    <div className="flex-1 flex flex-col md:flex-row bg-white relative h-full min-h-0 overflow-hidden" style={{ minWidth: 0 }}>
      {/* ── Left Viewport & Component Dock ── */}
      <div className="flex-1 min-h-[350px] md:min-h-0 min-w-0 overflow-hidden">
        <LeftPanel
          modelUrl={design.modelUrl}
          meshes={meshes}
          activeMesh={activeMesh}
          setActiveMesh={(id) => dispatch(setActiveMesh(id))}
          meshStates={meshStates}
          onMeshesDetected={handleMeshesDetected}
          decals={decals}
          selectedDecalId={selectedDecalId}
          setSelectedDecalId={(id) => dispatch(setSelectedDecalId(id))}
          updateDecal={(id, updates) => dispatch(updateDecal({ id, updates }))}
          removeDecal={(id) => dispatch(removeDecal(id))}
          globalPattern={globalPattern}
          materialFinish={materialFinish}
          lightingPreset={lightingPreset}
          mouseFollow={mouseFollow}
          isHUDVisible={isHUDVisible}
        />
      </div>

      {/* ── Right Panel (Workstation) ── */}
      <div className={`transition-all duration-500 ease-in-out border-l border-gray-100 bg-white flex-shrink-0
        ${isHUDVisible ? 'w-full md:w-[420px] flex-1 md:flex-none md:h-full opacity-100' : 'w-0 h-0 opacity-0 translate-x-full overflow-hidden border-none'}`}>
        <RightPanel
          activeMesh={activeMesh}
          meshStates={meshStates}
          updateMeshProp={(meshId, prop, val) => dispatch(updateMeshProp({ meshId, prop, val }))}
          decals={decals}
          selectedDecalId={selectedDecalId}
          setSelectedDecalId={(id) => dispatch(setSelectedDecalId(id))}
          addDecal={(type, text, imageUrl) => dispatch(addDecal({ type, text, imageUrl }))}
          updateDecal={(id, updates) => dispatch(updateDecal({ id, updates }))}
          removeDecal={(id) => dispatch(removeDecal(id))}
          globalPattern={globalPattern}
          setGlobalPattern={(val) => dispatch(setGlobalPattern(val))}
          lightingPreset={lightingPreset}
          setLightingPreset={(val) => dispatch(setLightingPreset(val))}
          materialFinish={materialFinish}
          setMaterialFinish={(val) => dispatch(setMaterialFinish(val))}
          mouseFollow={mouseFollow}
          setMouseFollow={(val) => dispatch(setMouseFollow(val))}
          roster={roster}
          setRoster={(val) => dispatch(setRoster(val))}
        />
      </div>

      {/* Cinematic View Helper */}
      {!isHUDVisible && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none fade-up flex flex-col items-center">
           <span className="text-[8px] font-semibold text-gray-400 uppercase tracking-[1em] mb-1">Cinematic Mode</span>
           <div className="w-12 h-0.5 bg-blue-600/30" />
        </div>
      )}
    </div>
  );
};

export default Builder;
