import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const CloudItem = ({ cloud, scrollYProgress }) => {
  const isLeft = cloud.side === "left";

  // Calculate relative top position (-5% to ~80%) map to startProgress
  const topPercent = parseFloat(cloud.top) || 0;
  // Top clouds start at 0, bottom clouds start up to 0.4
  let startProg = Math.max(0, Math.min(0.4, ((topPercent + 5) / 85) * 0.4));

  // Create different speeds by varying the duration of movement
  // Using imageID as a deterministic way to vary speed (e.g., 0.4 to 0.7 timeframe)
  const duration = 0.4 + (cloud.imageID % 4) * 0.1;
  const endProg = Math.min(1, startProg + duration);

  // Moving from original covering position (0vw) outwards to off-screen
  const xOffset = useTransform(
    scrollYProgress,
    [startProg, endProg],
    ["0vw", isLeft ? "-100vw" : "100vw"],
  );

  return (
    <motion.div style={{ x: xOffset }} className="absolute inset-0 z-[9999]">
      <motion.img
        src={`/clouds/${cloud.imageID}.png`}
        alt={`Cloud ${cloud.imageID}`}
        style={{
          x: cloud.left || cloud.right,
          top: cloud.top,
          width: cloud.width,
        }}
        className="absolute object-contain opacity-90 drop-shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 0.9, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.1 }}
      />
    </motion.div>
  );
};

const Clouds = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 50%", "start -40%"],
  });

  // Cloud configurations to create a dense overlap
  const cloudData = [
    { imageID: 1, side: "left", top: "-5%", left: "30%", width: "655px" },
    { imageID: 2, side: "right", top: "-5%", right: "100%", width: "556px" },
    { imageID: 3, side: "left", top: "-3%", left: "-15%", width: "357px" },
    { imageID: 4, side: "right", top: "10%", right: "125%", width: "581px" },
    { imageID: 5, side: "right", top: "0%", right: "200%", width: "486px" },
    { imageID: 6, side: "left", top: "25%", left: "40%", width: "697px" },
    { imageID: 7, side: "left", top: "40%", left: "-40%", width: "1169px" },
    { imageID: 8, side: "right", top: "30%", right: "275%", width: "320px" },
    { imageID: 9, side: "right", top: "45%", right: "110%", width: "553px" },
    { imageID: 10, side: "left", top: "80%", left: "-30%", width: "495px" },
    { imageID: 11, side: "right", top: "65%", right: "140%", width: "420px" },
    { imageID: 12, side: "right", top: "60%", right: "110%", width: "722px" },
    { imageID: 13, side: "left", top: "10%", left: "-30%", width: "987px" },
    { imageID: 14, side: "right", top: "75%", right: "55%", width: "551px" },
    { imageID: 7, side: "right", top: "20%", right: "70%", width: "1169px" },
  ];
  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-9999 pointer-events-none h-full w-screen "
    >
      {cloudData.map((cloud, index) => (
        <CloudItem
          key={index}
          cloud={cloud}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
};

export default Clouds;
