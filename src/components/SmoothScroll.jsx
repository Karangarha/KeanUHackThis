import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

const SmoothScroll = ({ children }) => {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    // Initialize Lenis
    const instance = new Lenis({
      duration: 2.0, // Increase duration for slower feel (default 1.2)
      lerp: 0.05, // Decrease lerp for smoother, slower response (default 0.1)
      smoothWheel: true,
      wheelMultiplier: 0.5, // Slightly decrease wheel sensitivity
      touchMultiplier: 0.2,
    });

    // Force scroll to top on mount
    window.scrollTo(0, 0);
    instance.scrollTo(0, { immediate: true });

    setLenis(instance);

    // Use requestAnimationFrame to update Lenis
    function raf(time) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Cleanup on unmount
    return () => {
      instance.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
};

export default SmoothScroll;
