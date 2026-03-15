import { motion } from "motion/react";
import TextType from "../assets/TextType";
import CountdownTimer from "../assets/CountDownTime";

const glowAnimation = {
  animate: {
    textShadow: [
      "0 0 5px #fff",
      "0 0 10px #fff",
      "0 0 20px #82b1ff",
      "0 0 10px #82b1ff",
      "0 0 5px #fff",
    ],
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "reverse",
  },
};

const MainSection = () => {
  return (
    <section
      id="home"
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Video */}
      <video
        src="/hackathon_wallpaper.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white gap-2 md:gap-1 px-4 text-center bg-black/30">
        <motion.div {...glowAnimation}>
          <TextType
            text="KeanUHackThis"
            as="h1"
            typingSpeed={70}
            initialDelay={0}
            pauseDuration={2000}
            deletingSpeed={30}
            loop={false}
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold"
            showCursor={false}
            hideCursorWhileTyping={true}
            cursorCharacter="|"
            cursorClassName=""
            cursorBlinkDuration={0.5}
            textColors={[]}
            variableSpeed={null}
            onSentenceComplete={null}
            startOnVisible={false}
            reverseMode={false}
          />
        </motion.div>
        <div>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold">24Hour Hackathon Spring 2026</h3>
        </div>
        <div>
          <p className="text-sm sm:text-lg md:text-xl font-medium md:font-bold opacity-90">
            April 25-26, Kean University, Union, New Jersey
          </p>
        </div>
        <div className="mt-6 md:mt-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="text-2xl md:text-4xl font-bold border-2 border-white rounded-full px-6 py-2 md:px-8 md:py-3 hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-200 shadow-lg"
          >
            Register Now
          </motion.button>
        </div>
        <div className="mt-4 md:mt-1 scale-75 sm:scale-90 md:scale-100">
          <CountdownTimer targetDate="2026-04-25" />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
