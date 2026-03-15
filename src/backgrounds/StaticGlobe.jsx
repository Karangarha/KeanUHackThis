import { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";

const PlanetGlobe = ({
  textureUrl,
  bumpUrl,
  width,
  height,
  rotationSpeed,
  atmosphereColor,
  style,
  customConfig,
  name,
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
    <div style={{ position: "absolute", ...style, pointerEvents: "none" }}>
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

const StaticGlobe = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { width, height } = windowSize;
  const isMobile = width < 768;

  const getPlanetSize = (baseSize) => (isMobile ? baseSize * 0.5 : baseSize);

  return (
    <div
      className="relative w-full min-h-[150vh] overflow-hidden flex flex-col items-center justify-start pt-32"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Top Text Section (Normal Document Flow) */}
      <div className="relative z-50 text-white text-center max-w-4xl px-4 flex flex-col items-center pointer-events-auto mb-16">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-[#62cff4] tracking-wider uppercase">
          Themes
        </h2>
        <p className="text-lg md:text-xl md:leading-relaxed font-light mb-4 drop-shadow-md">
          We use the word{" "}
          <strong className="font-semibold text-white">Themes</strong> instead
          of tracks to encourage creative freedom and interdisciplinary ideas.
        </p>
        <p className="text-base md:text-lg md:leading-relaxed font-light mb-8 drop-shadow-md text-gray-200">
          Your project does not need to fit perfectly into one category — themes
          are meant to guide inspiration, not limit innovation.
        </p>
      </div>

      {/* Background Planets (Taking up remaining space below text) */}
      <div className="relative flex-grow w-full pointer-events-none">
        {/* Mercury */}
        <PlanetGlobe
          name="MERCURY"
          textureUrl="/mercury.jpg"
          width={getPlanetSize(120)}
          height={getPlanetSize(120)}
          rotationSpeed={1.5}
          atmosphereColor="#aaaaaa"
          style={{ top: "15%", left: "8%", zIndex: 1 }}
        />

        {/* Venus */}
        <PlanetGlobe
          name="VENUS"
          textureUrl="/venus.jpg"
          width={getPlanetSize(180)}
          height={getPlanetSize(180)}
          rotationSpeed={-0.8}
          atmosphereColor="#ffa500"
          style={{ top: "50%", left: "15%", zIndex: 2 }}
        />

        {/* Mars */}
        <PlanetGlobe
          name="MARS"
          textureUrl="/mars.jpg"
          width={getPlanetSize(150)}
          height={getPlanetSize(150)}
          rotationSpeed={1.2}
          atmosphereColor="#ff4500"
          style={{ top: "25%", right: "20%", zIndex: 1 }}
        />

        {/* Main Earth Area */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          {/* SVG Connecting Lines Container */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ zIndex: 0 }}
          >
            {/* Top-Left: Healthcare */}
            <path
              d={
                isMobile
                  ? "M 38 38 L 25 38 L 25 22"
                  : "M 40 35 L 35 35 Q 33 35 33 30 L 33 20"
              }
              fill="none"
              stroke="#62cff4"
              strokeWidth="0.15"
              className="opacity-100"
            />
            {/* Bottom-Left: Sustainability */}
            <path
              d={
                isMobile
                  ? "M 38 62 L 25 62 L 25 78"
                  : "M 40 65 L 35 65 Q 33 65 33 70 L 33 80"
              }
              fill="none"
              stroke="#62cff4"
              strokeWidth="0.15"
              className="opacity-100"
            />
            {/* Top-Right: Business & Enterprise */}
            <path
              d={
                isMobile
                  ? "M 62 38 L 75 38 L 75 22"
                  : "M 40 35 L 64 35 Q 66 35 66 30 L 66 20"
              }
              fill="none"
              stroke="#62cff4"
              strokeWidth="0.15"
              className="opacity-100"
            />
            {/* Bottom-Right: Entertainment & Education */}
            <path
              d={
                isMobile
                  ? "M 62 62 L 75 62 L 75 78"
                  : "M 40 65 L 64 65 Q 66 65 66 70 L 66 80"
              }
              fill="none"
              stroke="#62cff4"
              strokeWidth="0.15"
              className="opacity-100"
            />
          </svg>

          {/* Theme Boxes */}
          <div className="absolute inset-0 w-full h-full pointer-events-auto">
            {/* Healthcare */}
            <div
              className="absolute px-6 py-4 border-2 border-[#62cff4] bg-white/5 backdrop-blur-md text-white rounded-xl shadow-[0_0_15px_rgba(98,207,244,0.1)] hover:scale-105 transition-transform cursor-default w-[280px] h-[160px] flex flex-col justify-center text-center"
              style={{
                top: "10%",
                left: "35%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 text-[#62cff4]">
                Healthcare
              </h3>
              <p className="text-xs md:text-sm text-gray-200 font-light leading-relaxed">
                Revolutionizing patient care and medical technology through
                innovative digital solutions.
              </p>
            </div>

            {/* Sustainability */}
            <div
              className="absolute px-6 py-4 border-2 border-[#62cff4] bg-white/5 backdrop-blur-md text-white rounded-xl shadow-[0_0_15px_rgba(98,207,244,0.1)] hover:scale-105 transition-transform cursor-default w-[280px] h-[160px] flex flex-col justify-center text-center"
              style={{
                top: "90%",
                left: "35%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 text-[#62cff4]">
                Sustainability
              </h3>
              <p className="text-xs md:text-sm text-gray-200 font-light leading-relaxed">
                Creating eco-friendly systems and sustainable tech for a greener
                future.
              </p>
            </div>

            {/* Business & Enterprise */}
            <div
              className="absolute px-6 py-4 border-2 border-[#62cff4] bg-white/5 backdrop-blur-md text-white rounded-xl shadow-[0_0_15px_rgba(98,207,244,0.1)] hover:scale-105 transition-transform cursor-default w-[280px] h-[160px] flex flex-col justify-center text-center"
              style={{
                top: "10%",
                left: "65%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 text-[#62cff4]">
                Business & Enterprise
              </h3>
              <p className="text-xs md:text-sm text-gray-200 font-light leading-relaxed">
                Optimizing workflows and scaling modern businesses with powerful
                enterprise tools.
              </p>
            </div>

            {/* Entertainment & Education */}
            <div
              className="absolute px-6 py-4 border-2 border-[#62cff4] bg-white/5 backdrop-blur-md text-white rounded-xl shadow-[0_0_15px_rgba(98,207,244,0.1)] hover:scale-105 transition-transform cursor-default w-[280px] h-[160px] flex flex-col justify-center text-center"
              style={{
                top: "90%",
                left: "65%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 text-[#62cff4]">
                Entertainment & Education
              </h3>
              <p className="text-xs md:text-sm text-gray-200 font-light leading-relaxed">
                Gamifying learning and building immersive experiences for the
                next generation.
              </p>
            </div>
          </div>

          <PlanetGlobe
            textureUrl="/flat_earth.jpg"
            bumpUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            width={isMobile ? width / 2.6 : width / 2.6}
            height={isMobile ? width / 2.6 : width / 2.6}
            rotationSpeed={0.5}
            atmosphereColor="lightblue"
            style={{ position: "relative", zIndex: 10 }}
            customConfig={{
              showGraticule: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StaticGlobe;
