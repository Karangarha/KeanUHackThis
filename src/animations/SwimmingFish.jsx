import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// A simple but elegant SVG fish component
const FishSvg = ({ color, className }) => (
  <svg
    viewBox="0 0 100 50"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: "drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.3))" }}
  >
    {/* Tail */}
    <path
      d="M20,25 L0,10 L5,25 L0,40 Z"
      fill={color}
      className="origin-[20px_25px] animate-[wiggle_0.5s_ease-in-out_infinite_alternate]"
    />
    {/* Body */}
    <path d="M20,25 C20,5 60,0 80,25 C60,50 20,45 20,25 Z" fill={color} />
    {/* Fins */}
    <path d="M40,15 C45,5 55,5 55,15 Z" fill={color} opacity="0.8" />
    <path d="M40,35 C45,45 55,45 55,35 Z" fill={color} opacity="0.8" />
    {/* Eye */}
    <circle cx="70" cy="22" r="2" fill="#fff" />
    <circle cx="71" cy="22" r="1" fill="#000" />
  </svg>
);

const SwimmingFish = () => {
  const [fishes, setFishes] = useState([]);

  useEffect(() => {
    // Generate an initial school of fish
    const colors = [
      "#fca311",
      "#14213d",
      "#ffffff",
      "#e5e5e5",
      "#3a86ff",
      "#8338ec",
      "#ff006e",
    ];

    // Add CSS for tail wiggle animation dynamically
    const style = document.createElement("style");
    style.textContent = `
      @keyframes wiggle {
        0% { transform: rotate(-10deg); }
        100% { transform: rotate(10deg); }
      }
    `;
    document.head.appendChild(style);

    const generateFish = (id) => {
      const isGoingRight = Math.random() > 0.5;
      // Use viewport width (vw) instead of pixels to guarantee they start off-screen
      const startX = isGoingRight ? "-50vw" : "150vw";
      const endX = isGoingRight ? "150vw" : "-50vw";

      // Randomize properties for variety
      return {
        id: id || Math.random().toString(36).substr(2, 9),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 60 + 40, // 40px to 100px (Bigger sizes)
        top: Math.random() * 100, // 0% to 100% from top (All over the section)
        duration: Math.random() * 20 + 20, // 20s to 40s to cross screen
        delay: Math.random() * 20, // Stagger initial start times widely
        startX,
        endX,
        isGoingRight,
        opacity: Math.random() * 0.4 + 0.3, // 0.3 to 0.7 opacity to blend into background
      };
    };

    // Create 20 initial fish for more coverage
    setFishes(Array.from({ length: 20 }, (_, i) => generateFish(i)));

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <AnimatePresence>
        {fishes.map((fish) => (
          <motion.div
            key={fish.id}
            initial={{
              x: fish.startX,
              y: Math.sin(0) * 20,
              opacity: fish.opacity,
              scaleX: fish.isGoingRight ? 1 : -1, // Flip fish based on direction
            }}
            animate={{
              x: fish.endX,
              // Sine wave movement on Y axis
              y: [0, -30, 0, 30, 0],
            }}
            transition={{
              duration: fish.duration,
              delay: fish.delay,
              ease: "linear",
              repeat: Infinity,
              y: {
                duration: fish.duration / 3, // Faster sine wave than crossing
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="absolute"
            style={{
              top: `${fish.top}%`,
              width: fish.size,
              height: fish.size / 2,
            }}
          >
            <FishSvg color={fish.color} className="w-full h-full" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SwimmingFish;
