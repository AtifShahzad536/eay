import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  view: 'landing', // 'landing', 'builder', 'transition'
  selectedDesign: null,
  fromPage: null, // URL to navigate back to (e.g. /product-details/123)
  
  // Base Colors (mapped to meshes)
  primaryColor: '#ffffff',
  primaryIsGrad: false,
  primaryColor2: '#ffffff',
  
  secondaryColor: '#111111',
  secondaryIsGrad: false,
  secondaryColor2: '#111111',
  
  thirdColor: '#555555',
  thirdIsGrad: false,
  thirdColor2: '#555555',
  
  // Global Configs
  globalPattern: null, // 'carbon', 'camo', 'dots'
  lightingPreset: 'city',
  materialFinish: 'matte',
  mouseFollow: true,
  
  // Model Specifics
  meshes: [],
  activeMesh: null,
  meshStates: {},
  decals: [],
  selectedDecalId: null,
  roster: [{ id: Date.now(), name: '', number: '', size: 'L' }],
  
  refreshKey: 0,
};

export const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    setSelectedDesign: (state, action) => {
      state.selectedDesign = action.payload;
    },
    setPrimaryColor: (state, action) => {
      state.primaryColor = action.payload;
    },
    setPrimaryIsGrad: (state, action) => {
      state.primaryIsGrad = action.payload;
    },
    setPrimaryColor2: (state, action) => {
      state.primaryColor2 = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
    setSecondaryIsGrad: (state, action) => {
      state.secondaryIsGrad = action.payload;
    },
    setSecondaryColor2: (state, action) => {
      state.secondaryColor2 = action.payload;
    },
    setThirdColor: (state, action) => {
      state.thirdColor = action.payload;
    },
    setThirdIsGrad: (state, action) => {
      state.thirdIsGrad = action.payload;
    },
    setThirdColor2: (state, action) => {
      state.thirdColor2 = action.payload;
    },
    setGlobalPattern: (state, action) => {
      state.globalPattern = action.payload;
    },
    setLightingPreset: (state, action) => {
      state.lightingPreset = action.payload;
    },
    setMaterialFinish: (state, action) => {
      state.materialFinish = action.payload;
    },
    setMouseFollow: (state, action) => {
      state.mouseFollow = action.payload;
    },
    setMeshes: (state, action) => {
      state.meshes = action.payload;
    },
    setActiveMesh: (state, action) => {
      state.activeMesh = action.payload;
    },
    updateMeshStates: (state, action) => {
      state.meshStates = { ...state.meshStates, ...action.payload };
    },
    updateMeshProp: (state, action) => {
      const { meshId, prop, val } = action.payload;
      if (state.meshStates[meshId]) {
        state.meshStates[meshId][prop] = val;
      }
    },
    addDecal: (state, action) => {
      const decal = action.payload;
      const newDecal = {
        id: Date.now().toString(),
        type: decal.type || 'text',
        text: decal.text || 'TEXT',
        imageUrl: decal.imageUrl || null,
        color: '#ffffff',
        font: 'Outfit',
        decalScale: 0.15,
        ...decal
      };
      state.decals.push(newDecal);
      state.selectedDecalId = newDecal.id;
    },
    updateDecal: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.decals.findIndex(d => d.id === id);
      if (index !== -1) {
        state.decals[index] = { ...state.decals[index], ...updates };
      }
    },
    removeDecal: (state, action) => {
      const id = action.payload;
      state.decals = state.decals.filter(d => d.id !== id);
      if (state.selectedDecalId === id) state.selectedDecalId = null;
    },
    setSelectedDecalId: (state, action) => {
      state.selectedDecalId = action.payload;
    },
    setRoster: (state, action) => {
      state.roster = action.payload;
    },
    setFromPage: (state, action) => {
      state.fromPage = action.payload;
    },
    incrementRefreshKey: (state) => {
      state.refreshKey += 1;
    }
  },
});

export const {
  setView, setSelectedDesign, setFromPage,
  setPrimaryColor, setPrimaryIsGrad, setPrimaryColor2,
  setSecondaryColor, setSecondaryIsGrad, setSecondaryColor2,
  setThirdColor, setThirdIsGrad, setThirdColor2,
  setGlobalPattern, setLightingPreset, setMaterialFinish, setMouseFollow,
  setMeshes, setActiveMesh, updateMeshStates, updateMeshProp,
  addDecal, updateDecal, removeDecal, setSelectedDecalId,
  setRoster, incrementRefreshKey
} = builderSlice.actions;

export default builderSlice.reducer;
