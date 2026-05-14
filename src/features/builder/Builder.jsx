import React, { useEffect } from 'react';
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

    const handleImportModel = (e) => {
      const url = e.detail;
      const customId = 'custom-' + Date.now();
      const customDesign = {
        id: customId,
        name: 'Imported Model',
        modelUrl: url,
        thumbnail: '',
        mapping: design?.mapping || { 'Body': 'primary' }
      };
      dispatch(setSelectedDesign(customDesign));
      dispatch(setView('builder'));
    };

    window.addEventListener('eay:resetAll', handleResetAll);
    window.addEventListener('eay:save', handleSave);
    return () => {
      window.removeEventListener('eay:resetAll', handleResetAll);
      window.removeEventListener('eay:save', handleSave);
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
    <div className="flex-1 flex flex-col md:flex-row bg-white relative h-full overflow-hidden">
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
      />
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
  );
};

export default Builder;
