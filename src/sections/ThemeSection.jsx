import Galaxy from "../backgrounds/Galaxy";

const ThemeSection = () => {
  return (
    <section id="theme" className="w-full h-screen">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          background:
            "linear-gradient(to bottom, #000000 0%, #0f0c29 30%, #302b63 60%, #62cff4 100%)",
        }}
      >
        <Galaxy
          starSpeed={0}
          density={1}
          hueShift={80}
          speed={0.2}
          glowIntensity={0.15}
          saturation={1}
          mouseRepulsion
          repulsionStrength={0}
          twinkleIntensity={0.35}
          rotationSpeed={0}
          transparent={true}
        />
      </div>
    </section>
  );
};

export default ThemeSection;
