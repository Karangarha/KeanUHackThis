import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue } from "motion/react";
import cloudData from "../data/cloudData";

export const CloudItem = ({
  cloud,
  scrollYProgress,
  isMobile,
  isTransition,
  transitionValue,
}) => {
  const fallbackScroll = useMotionValue(0);
  const fallbackTransition = useMotionValue(0);

  const activeScroll = scrollYProgress || fallbackScroll;
  const activeTransition = transitionValue || fallbackTransition;

  const isLeft = cloud.side === "left";

  // Calculate relative top position (-5% to ~80%) map to startProgress
  const topPercent = parseFloat(cloud.top) || 0;
  // Top clouds start at 0, bottom clouds start up to 0.4
  let startProg = Math.max(0, Math.min(0.4, ((topPercent + 10) / 100) * 0.4));

  // Create different speeds by varying the duration of movement
  const duration = 0.5 + (cloud.imageID % 4) * 0.1;
  const endProg = Math.min(1, startProg + duration);

  // Normal scroll movement (revealing content)
  const normalX = useTransform(
    activeScroll,
    [startProg, endProg],
    ["0vw", isLeft ? "-120vw" : "120vw"],
  );

  // Transition movement - Multi-phase: fade in then separate
  const burstOpacity = useTransform(activeTransition, [0, 0.5], [0, 1]);
  const burstX = useTransform(
    activeTransition,
    [0.55, 1],
    ["0vw", isLeft ? "-120vw" : "125vw"],
  );

  const xOffset = isTransition ? burstX : normalX;
  const activeScale = useTransform(activeTransition, [0, 0.5], [1.2, 1]);

  const cloudWidth = cloud.width;

  return (
    <motion.div
      style={{ x: xOffset }}
      className="absolute inset-0 z-0 overflow-visible"
    >
      <motion.img
        src={`/clouds/${cloud.imageID}.png`}
        alt={`Cloud ${cloud.imageID}`}
        style={{
          left: "50%",
          top: cloud.top,
          width: cloudWidth,
          opacity: isTransition ? burstOpacity : 1,
          scale: isTransition ? activeScale : 1,
          x: cloud.baseX || 0,
        }}
        className="absolute object-contain drop-shadow-2xl translate-x-[-50%]"
        initial={
          isTransition ? { scale: 1.1, opacity: 0 } : { opacity: 0, scale: 0.9 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1.2,
          delay: (cloud.imageID % 8) * 0.05,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
};

const Clouds = ({
  isTransition,
  transitionProgress,
  zIndex = 0,
  scrollYProgress: externalScrollYProgress,
}) => {
  const containerRef = React.useRef(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress: internalScrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "start -150%"],
  });

  const activeScrollYProgress =
    externalScrollYProgress || internalScrollYProgress;

  // Ensure we have a motion value for transitionProgress even if not provided
  const internalTransitionProgress = useMotionValue(0);
  const activeTransitionValue =
    transitionProgress || internalTransitionProgress;

  // For mobile, we'll only show a subset of clouds to reduce clutter
  const visibleClouds = isMobile
    ? cloudData.filter((_, index) => index % 2 === 0)
    : cloudData;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none h-full w-full ${isTransition ? "overflow-visible" : ""}`}
      style={{ zIndex }}
    >
      {visibleClouds.map((cloud, index) => (
        <CloudItem
          key={index}
          cloud={cloud}
          scrollYProgress={activeScrollYProgress}
          isMobile={isMobile}
          isTransition={isTransition}
          transitionValue={activeTransitionValue}
        />
      ))}
    </div>
  );
};

export default Clouds;
