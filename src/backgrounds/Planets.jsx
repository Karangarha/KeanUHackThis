import { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const Planets = ({
  textureUrl,
  bumpUrl,
  width,
  height,
  rotationSpeed,
  atmosphereColor,
  style,
  customConfig,
  name,
  className,
  planetRef,
}) => {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = rotationSpeed;
      controls.enableZoom = false;
      controls.enableRotate = false;
      controls.enablePan = false;
    }
  }, [rotationSpeed]);

  return (
    <div
      ref={planetRef}
      className={className}
      style={{ position: "absolute", ...style, pointerEvents: "none" }}
    >
      <Globe
        ref={globeRef}
        globeImageUrl={textureUrl}
        bumpImageUrl={bumpUrl}
        showGlobe={true}
        showAtmosphere={true}
        atmosphereColor={atmosphereColor}
        atmosphereAltitude={0.15}
        showGraticule={false}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)" // Transparent background for stacking
        enablePointerInteraction={false}
        showPointerCursor={false}
        {...customConfig}
      />
      {name && (
        <div
          style={{
            position: "absolute",
            bottom: "-30px",
            left: "50%",
            transform: "translateX(-50%)",
            color: "rgba(255, 255, 255, 0.8)",
            fontFamily: "sans-serif",
            fontSize: "1.2rem",
            fontWeight: "bold",
            letterSpacing: "0.1em",
            textShadow: "0 2px 8px rgba(0,0,0,0.9)",
            pointerEvents: "none",
          }}
        >
          {name}
        </div>
      )}
    </div>
  );
};

export default Planets;
