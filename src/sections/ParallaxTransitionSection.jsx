import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import AlumniSection from "./AluminiSection";
import ScheduleSection from "./ScheduleSection";

const ParallaxTransitionSection = () => {
  const containerRef = useRef(null);

  // We make the container tall (300vh) to give plenty of scrolling room
  // for these sequential parallax animations to play out smoothly.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. mountain1 (top mountain) goes left
  // It starts at 0vw and moves to -100vw as scroll progresses from 0 to 0.4
  const mountain1X = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    ["0vw", "100vw"],
  );

  // 2. mountain2 (bottom mountain) goes down
  // It starts at 0% and moves down (e.g. 100%) as scroll progresses from 0 to 0.4
  const mountain2Y = useTransform(scrollYProgress, [0, 0.4], ["0%", "100%"]);

  // Alumni panel fades away
  const alumniOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const alumniY = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "-100%"]);

  const scheduleOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const scheduleY = useTransform(scrollYProgress, [0.5, 0.6], ["100%", "0%"]);
  // 3. ocean comes up
  // Starts off-screen below (100vh) and comes up right after the mountains start moving out
  const oceanY = useTransform(scrollYProgress, [0.3, 0.4], ["100vh", "0vh"]);

  // 4. tree comes up
  // Comes up slightly after the ocean
  const treeY = useTransform(scrollYProgress, [0.2, 0.4], ["100vh", "0vh"]);
  const treeScale = useTransform(scrollYProgress, [0.2, 0.6], ["0.5", "1"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-transparent"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* --- MOUNTAINS --- */}
        {/* Mountain 2 (Background / Bottom): Goes Down */}
        <motion.img
          src="/bg/mountain2.png"
          alt="Mountain 2"
          style={{ y: mountain2Y }}
          className="absolute bottom-0 left-0 mx-auto w-full h-auto z-10"
        />

        {/* Mountain 1 (Foreground / Top): Goes Right */}
        <motion.img
          src="/bg/mountain1.png"
          alt="Mountain 1"
          style={{ x: mountain1X }}
          className="absolute bottom-0 right-0 mx-auto w-[90%] md:w-[80%] h-auto z-20 pointer-events-none"
        />

        {/* --- ALUMNI SECTION OVER MOUNTAINS --- */}
        <motion.div
          style={{ y: alumniY, opacity: alumniOpacity }}
          className="absolute top-10 left-0 w-full md:w-1/2 h-auto z-25 flex flex-col items-center justify-center pointer-events-auto"
        >
          <AlumniSection />
        </motion.div>

        {/* --- OCEAN WAVES --- */}

        <motion.div
          style={{ y: oceanY }}
          className="absolute bottom-0 left-0 w-full h-[40vh] z-30 overflow-hidden pointer-events-none"
        >
          <video
            src="/0001-0250 (1)_1.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* --- TREE --- */}
        <motion.img
          src="/bg/tree.png"
          alt="Tree"
          style={{ y: treeY, scale: treeScale }}
          className="absolute bottom-30 left-10 w-[55%] md:w-[50%] lg:w-[30%] h-auto z-40 pointer-events-none"
        />

        {/* --- SCHEDULE SECTION OVER OCEAN --- */}
        <motion.div
          style={{ y: scheduleY, opacity: scheduleOpacity }}
          className="absolute top-10 left-0 w-full h-auto z-50 flex flex-col items-center justify-center pointer-events-auto"
        >
          <ScheduleSection />
        </motion.div>
      </div>
    </section>
  );
};

export default ParallaxTransitionSection;
