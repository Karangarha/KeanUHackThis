import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const alumni = [
  {
    name: "Andrea",
    role: "Cybersecurity Analyst @Deloitte",
    image: "alumnis/alumni_3.png",
    linkedin: "https://www.linkedin.com/in/andreabalcacer/"
  },
  {
    name: "Gillian",
    role: "Software Engineer @Prudential",
    image: "alumnis/alumni_2.png",
    linkedin: "https://www.linkedin.com/in/gillianmroberts4/"
  },
  {
    name: "Joseph",
    role: "Cyber Research Engineer @Lockheed Martin",
    image: "alumnis/alumni_1.jpg",
    linkedin: "https://www.linkedin.com/in/joseph-waldron-a24038201/"
  },
  {
    name: "Wilbert",
    role: "Pathways Associate Systems Engineer @Northrop Grumman",
    image: "alumnis/alumni_5.png",
    linkedin: "https://www.linkedin.com/in/wilbertvillalobos/"
  },
  {
    name: "A'nya",
    role: "Data Management Professional @Bloomberg",
    image: "alumnis/alumni_4.jpg",
    linkedin: "https://www.linkedin.com/in/a-nya-carr/"
  },
];

const AlumniSection = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Automatic Loop
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % alumni.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getCardProps = (cardIndex) => {
    const diff = (cardIndex - index + alumni.length) % alumni.length;
    const xOffset = isMobile ? "40%" : "60%";

    // Logic for Center, Right (next), and Left (previous)
    if (diff === 0)
      return {
        position: "center",
        z: 10,
        x: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
      };
    if (diff === 1)
      return {
        position: "right",
        z: 5,
        x: xOffset,
        scale: isMobile ? 0.7 : 0.8,
        opacity: 0.6,
        rotate: 5,
      };
    if (diff === alumni.length - 1)
      return {
        position: "left",
        z: 5,
        x: `-${xOffset}`,
        scale: isMobile ? 0.7 : 0.8,
        opacity: 0.6,
        rotate: -5,
      };
    return {
      position: "hidden",
      z: 0,
      x: 0,
      scale: 0.5,
      opacity: 0,
      rotate: 0,
    };
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-[500px] overflow-hidden">
      <h2 className="text-4xl font-bold text-white mb-8 mt-8">Alumni</h2>
      <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
        {alumni.map((person, i) => {
          const { x, scale, opacity, z, rotate } = getCardProps(i);
          return (
            <motion.div
              key={person.name}
              animate={{
                x,
                scale,
                opacity,
                zIndex: z,
                rotateY: rotate * 2,
                rotateZ: rotate,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="absolute w-56 h-72 md:w-72 md:h-96 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col items-center justify-center text-center text-white"
              style={{ perspective: 1000 }}
            >
              <img
                src={person.image}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-blue-400 mb-3 md:mb-4 shadow-lg"
                alt={person.name}
              />
              <h3 className="text-xl md:text-2xl font-bold">{person.name}</h3>
              <p className="text-xs md:text-sm text-blue-200 mt-1 md:mt-2">
                {person.role}
              </p>
              <a href={person.linkedin || "#"} target="_blank" rel="noopener noreferrer" className="mt-4 md:mt-6 cursor-pointer hover:scale-110 transition-transform">
                <img src="/alumnis/linkedIn.png" alt="LinkedIn" className="w-8 h-8 md:w-10 md:h-10 rounded-md" />
              </a>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex gap-8 mt-4 z-20">
        <button
          onClick={() => setIndex((index - 1 + alumni.length) % alumni.length)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft size={40} />
        </button>
        <button
          onClick={() => setIndex((index + 1) % alumni.length)}
          className="text-white/50 hover:text-white transition-colors"
        >
          <ChevronRight size={40} />
        </button>
      </div>
    </div>
  );
};

export default AlumniSection;
