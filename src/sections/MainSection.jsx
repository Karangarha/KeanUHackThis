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
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white gap-1 bg-black/30">
        <motion.div {...glowAnimation}>
          <TextType
            text="KeanUHackThis"
            as="h1"
            typingSpeed={70}
            initialDelay={0}
            pauseDuration={2000}
            deletingSpeed={30}
            loop={false}
            className="text-8xl font-bold"
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
          <h3 className="text-4xl font-bold">24Hour Hackathon Spring 2026</h3>
        </div>
        <div>
          <p className="text-xl font-bold">
            April 25-26, Kean University, Union, New Jersey
          </p>
        </div>
        <div className="mt-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="text-4xl font-bold border border-white rounded-full px-8 py-2 hover:bg-white/10 hover:backdrop-blur-sm transition-all duration-200"
          >
            Register Now
          </motion.button>
        </div>
        <div className="mt-1">
          <CountdownTimer targetDate="2026-04-25" />
        </div>
      </div>
    </section>
  );
};

export default MainSection;
