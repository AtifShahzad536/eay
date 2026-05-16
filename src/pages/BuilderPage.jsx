import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../features/builder/Navbar';
import Builder from '../features/builder/Builder';
import LandingPage from '../features/builder/LandingPage';
import { designs } from '../features/builder/data/designs';
import { 
  setSelectedDesign, 
  setPrimaryColor, setPrimaryIsGrad, setPrimaryColor2,
  setSecondaryColor, setSecondaryIsGrad, setSecondaryColor2,
  setThirdColor, setThirdIsGrad, setThirdColor2,
  setGlobalPattern, setLightingPreset, setMaterialFinish, setMouseFollow,
  incrementRefreshKey, setFromPage
} from '../features/builder/builderSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

export const BuilderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { selectedDesign, refreshKey, fromPage, ...builderState } = useSelector((state) => state.builder);

  // Local transition state — only used for the brief GPU-clearing spinner
  const [isTransitioning, setIsTransitioning] = useState(false);

  // ── URL is the single source of truth ──
  // /builder       → landing page
  // /builder/:id   → 3D builder
  const isBuilderView = !!id;

  // Save fromPage to Redux once on first entry so it survives internal route changes
  useEffect(() => {
    const incomingFrom = location.state?.from;
    dispatch(setFromPage(incomingFrom || null));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Load the correct design whenever the URL :id changes
  useEffect(() => {
    if (id) {
      const design = designs.find(d => d.id === id);
      if (design) {
        dispatch(setSelectedDesign(design));
      }
    }
  }, [id, dispatch]);

  // Listen for custom model imports from the Navbar FILE menu
  useEffect(() => {
    const handleImport = (e) => {
      const url = e.detail;
      const customDesign = {
        id: 'custom-' + Date.now(),
        name: 'Imported Model',
        modelUrl: url,
        thumbnail: '',
        mapping: {
          'Body': 'primary', 'Front': 'primary', 'Back': 'primary',
          'R_Sleeve': 'secondary', 'L_Sleeve': 'secondary', 'Neck': 'third'
        }
      };
      dispatch(setSelectedDesign(customDesign));
      navigate(`/builder/custom-${Date.now()}`, { state: location.state });
    };
    window.addEventListener('eay:importModel', handleImport);
    return () => window.removeEventListener('eay:importModel', handleImport);
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectDesign = (design) => {
    // Forward location.state so fromPage in Redux is kept alive
    navigate(`/builder/${design.id}`, { state: location.state });
  };

  const handleBackToLanding = () => {
    // Show the GPU-clearing spinner for 200ms, then navigate back to /builder (landing)
    setIsTransitioning(true);
    dispatch(incrementRefreshKey());
    setTimeout(() => {
      setIsTransitioning(false);
      navigate('/builder', { state: location.state });
    }, 200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-[100dvh] flex flex-col bg-white ${isBuilderView ? 'h-[100dvh] overflow-hidden' : ''}`}
    >
      <AnimatePresence mode="wait">

        {/* ── GPU Clearing Transition Spinner ── */}
        {isTransitioning && (
          <motion.div
            key="transition"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center bg-white py-40"
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Clearing GPU Context...</span>
            </div>
          </motion.div>
        )}

        {/* ── Landing Page  (/builder, no id) ── */}
        {!isTransitioning && !isBuilderView && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col"
          >
            <Navbar onBack={null} backTo={fromPage} />
            <LandingPage
              {...builderState}
              setPrimaryColor={(val) => dispatch(setPrimaryColor(val))}
              setPrimaryIsGrad={(val) => dispatch(setPrimaryIsGrad(val))}
              setPrimaryColor2={(val) => dispatch(setPrimaryColor2(val))}
              setSecondaryColor={(val) => dispatch(setSecondaryColor(val))}
              setSecondaryIsGrad={(val) => dispatch(setSecondaryIsGrad(val))}
              setSecondaryColor2={(val) => dispatch(setSecondaryColor2(val))}
              setThirdColor={(val) => dispatch(setThirdColor(val))}
              setThirdIsGrad={(val) => dispatch(setThirdIsGrad(val))}
              setThirdColor2={(val) => dispatch(setThirdColor2(val))}
              setGlobalPattern={(val) => dispatch(setGlobalPattern(val))}
              setLightingPreset={(val) => dispatch(setLightingPreset(val))}
              setMaterialFinish={(val) => dispatch(setMaterialFinish(val))}
              setMouseFollow={(val) => dispatch(setMouseFollow(val))}
              onSelectDesign={handleSelectDesign}
            />
          </motion.div>
        )}

        {/* ── 3D Builder  (/builder/:id) ── */}
        {!isTransitioning && isBuilderView && (
          <motion.div
            key={`builder-${refreshKey}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col h-full min-h-0 overflow-hidden"
          >
            <Navbar onBack={handleBackToLanding} backTo={fromPage} />
            <div className="flex-1 overflow-hidden">
              <Builder />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </motion.div>
  );
};
