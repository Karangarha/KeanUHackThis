import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const day1Events = [
  { time: "8:00 AM – 9:00 AM", title: "📝 Check-In + Breakfast", description: "Check in, grab breakfast, and meet fellow hackers before the event begins." },
  { time: "9:00 AM – 9:30 AM", title: "🎉 Opening Ceremony", description: "Welcome, hackathon overview, rules, judging criteria, and sponsor introductions." },
  { time: "9:30 AM – 10:15 AM", title: "🎤 Workshop: AI in Business", description: "Hosted by Sajid Hussain" },
  { time: "10:00 AM – 10:45 AM", title: "🎤 Workshop: Cybersecurity Innovation", description: "Hosted by CrowdStrike" },
  { time: "11:00 AM – 11:45 AM", title: "🎤 Workshop: Building with AI", description: "Hosted by DojoDesk" },
  { time: "11:30 AM – 4:30 PM", title: "🤝 Sponsor Networking + Career Expo", description: "Meet companies, explore internships, and connect with industry professionals." },
  { time: "12:00 PM – 1:00 PM", title: "🍕 Lunch", description: "Lunch served for all participants." },
  { time: "1:15 PM – 2:00 PM", title: "🎤 Workshop: AI in Finance", description: "Hosted by Nasdaq" },
  { time: "2:15 PM – 3:00 PM", title: "🎤 Workshop: AI in Healthcare", description: "Hosted by Dr. Meng" },
  { time: "3:00 PM – 3:45 PM", title: "🎤 Workshop: Enterprise AI", description: "Hosted by Infosys" },
  { time: "3:00 PM – 4:00 PM", title: "🍪 Afternoon Snacks", description: "Grab a snack and recharge." },
  { time: "4:30 PM – 5:15 PM", title: "🎤 MLH Workshop", description: "Hosted by Major League Hacking" },
  { time: "5:00 PM – 5:45 PM", title: "🎓 Kean Tech Alumni Panel", description: "Hear from Kean alumni working across the tech industry." },
  { time: "6:00 PM – 7:00 PM", title: "🍽️ Dinner", description: "Dinner served for all hackers." },
  { time: "7:30 PM – 8:15 PM", title: "🎤 MLH Workshop", description: "Evening workshop hosted by Major League Hacking" },
];

const day2Events = [
  { time: "12:30 AM – 2:00 AM", title: "🍪 Midnight Snacks", description: "Late-night snacks available for hackers." },
  { time: "1:00 AM – 2:00 AM", title: "🎮 Gaming Tournament", description: "Mario Kart & Super Smash Bros tournament." },
  { time: "2:00 AM – 3:00 AM", title: "🎲 Board & Card Games", description: "UNO, Mafia, Codenames, and more." },
  { time: "3:00 AM – 4:00 AM", title: "🎬 Movie Chill Room", description: "Relax with a movie while taking a hacking break." },
  { time: "4:00 AM – 4:30 AM", title: "🧘 Energy Reset", description: "Stretch break and recharge." },
  { time: "6:00 AM", title: "⏰ Project Submission Deadline", description: "All hackathon projects must be submitted before this time." },
  { time: "6:30 AM – 8:00 AM", title: "🍳 Breakfast", description: "Hot breakfast for participants." },
  { time: "7:00 AM – 8:30 AM", title: "👨‍⚖️ Project Judging", description: "Finalist teams present their projects to judges." },
  { time: "8:30 AM – 9:00 AM", title: "🏆 Closing Ceremony + Awards", description: "Winning teams announced and prizes awarded." },
];

const ScheduleSection = () => {
  const [activeDay, setActiveDay] = useState(1);
  const [activeEventIndex, setActiveEventIndex] = useState(0);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  const leftCloudX = useTransform(smoothProgress, [0, 1], ["15vw", "-60vw"]);
  const rightCloudX = useTransform(smoothProgress, [0, 1], ["-15vw", "60vw"]);
  const cloudOpacity = useTransform(smoothProgress, [0, 0.9, 1], [1, 1, 0]);

  const currentEvents = activeDay === 1 ? day1Events : day2Events;
  const currentEvent = currentEvents[activeEventIndex];

  const handleNext = () => {
    setActiveEventIndex((prev) => (prev < currentEvents.length - 1 ? prev + 1 : prev));
  };

  const handlePrev = () => {
    setActiveEventIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleChangeDay = (day) => {
    setActiveDay(day);
    setActiveEventIndex(0);
  };

  return (
    <section id="schedule" ref={sectionRef} className="w-full min-h-[100vh] py-24 flex flex-col items-center justify-center relative overflow-hidden z-10 bg-[rgb(21,96,172)]">
      
      {/* Spreading Background Clouds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div style={{ x: leftCloudX, opacity: cloudOpacity }} className="absolute left-0 top-0 bottom-0 w-1/2 h-full z-0">
          {/* Cloud 1 */}
          <div className="absolute w-[220px] h-[70px] bg-[#eef5ff]/95 rounded-full blur-[3px] right-[-40px] top-[10%] shadow-lg">
               <div className="absolute w-[110px] h-[110px] bg-[#eef5ff]/95 rounded-full -top-[60px] left-[30px]"></div>
               <div className="absolute w-[90px] h-[90px] bg-[#eef5ff]/95 rounded-full -top-[40px] right-[20px]"></div>
          </div>
          {/* Cloud 2 */}
          <div className="absolute w-[300px] h-[90px] bg-[#eef5ff]/90 rounded-full blur-[4px] right-[10%] top-[25%]">
               <div className="absolute w-[150px] h-[150px] bg-[#eef5ff]/90 rounded-full -top-[70px] left-[50px]"></div>
               <div className="absolute w-[110px] h-[110px] bg-[#eef5ff]/90 rounded-full -top-[50px] right-[40px]"></div>
          </div>
          {/* Cloud 3 */}
          <div className="absolute w-[200px] h-[60px] bg-[#eef5ff]/85 rounded-full blur-[5px] right-[-80px] top-[40%]">
               <div className="absolute w-[100px] h-[100px] bg-[#eef5ff]/85 rounded-full -top-[50px] left-[30px]"></div>
          </div>
          {/* Cloud 4 */}
          <div className="absolute w-[250px] h-[80px] bg-[#eef5ff]/95 rounded-full blur-[3px] right-[30%] top-[55%]">
               <div className="absolute w-[120px] h-[120px] bg-[#eef5ff]/95 rounded-full -top-[60px] left-[40px]"></div>
               <div className="absolute w-[100px] h-[100px] bg-[#eef5ff]/95 rounded-full -top-[40px] right-[30px]"></div>
          </div>
          {/* Cloud 5 */}
          <div className="absolute w-[320px] h-[100px] bg-[#eef5ff]/90 rounded-full blur-[4px] right-[-20px] top-[75%] shadow-md">
               <div className="absolute w-[160px] h-[160px] bg-[#eef5ff]/90 rounded-full -top-[80px] left-[60px]"></div>
               <div className="absolute w-[120px] h-[120px] bg-[#eef5ff]/90 rounded-full -top-[50px] right-[30px]"></div>
          </div>
          {/* Cloud 6 */}
          <div className="absolute w-[180px] h-[50px] bg-[#eef5ff]/80 rounded-full blur-[6px] right-[25%] top-[90%]">
               <div className="absolute w-[80px] h-[80px] bg-[#eef5ff]/80 rounded-full -top-[40px] left-[20px]"></div>
          </div>
        </motion.div>

        <motion.div style={{ x: rightCloudX, opacity: cloudOpacity }} className="absolute right-0 top-0 bottom-0 w-1/2 h-full z-0">
          {/* Cloud A */}
          <div className="absolute w-[350px] h-[110px] bg-[#eef5ff]/95 rounded-full blur-[3px] left-[-80px] top-[15%] shadow-lg">
               <div className="absolute w-[180px] h-[180px] bg-[#eef5ff]/95 rounded-full -top-[90px] left-[60px]"></div>
               <div className="absolute w-[130px] h-[130px] bg-[#eef5ff]/95 rounded-full -top-[60px] right-[40px]"></div>
          </div>
          {/* Cloud B */}
          <div className="absolute w-[240px] h-[75px] bg-[#eef5ff]/90 rounded-full blur-[4px] left-[15%] top-[30%]">
               <div className="absolute w-[120px] h-[120px] bg-[#eef5ff]/90 rounded-full -top-[60px] left-[30px]"></div>
               <div className="absolute w-[100px] h-[100px] bg-[#eef5ff]/90 rounded-full -top-[40px] right-[30px]"></div>
          </div>
          {/* Cloud C */}
          <div className="absolute w-[280px] h-[85px] bg-[#eef5ff]/85 rounded-full blur-[4px] left-[-20px] top-[45%]">
               <div className="absolute w-[140px] h-[140px] bg-[#eef5ff]/85 rounded-full -top-[70px] left-[40px]"></div>
               <div className="absolute w-[110px] h-[110px] bg-[#eef5ff]/85 rounded-full -top-[50px] right-[40px]"></div>
          </div>
          {/* Cloud D */}
          <div className="absolute w-[200px] h-[65px] bg-[#eef5ff]/95 rounded-full blur-[5px] left-[40%] top-[60%]">
               <div className="absolute w-[100px] h-[100px] bg-[#eef5ff]/95 rounded-full -top-[50px] left-[20px]"></div>
               <div className="absolute w-[80px] h-[80px] bg-[#eef5ff]/95 rounded-full -top-[30px] right-[20px]"></div>
          </div>
          {/* Cloud E */}
          <div className="absolute w-[300px] h-[95px] bg-[#eef5ff]/90 rounded-full blur-[4px] left-[-50px] top-[80%] shadow-md">
               <div className="absolute w-[150px] h-[150px] bg-[#eef5ff]/90 rounded-full -top-[70px] left-[50px]"></div>
               <div className="absolute w-[110px] h-[110px] bg-[#eef5ff]/90 rounded-full -top-[40px] right-[30px]"></div>
          </div>
          {/* Cloud F */}
          <div className="absolute w-[220px] h-[60px] bg-[#eef5ff]/85 rounded-full blur-[5px] left-[25%] top-[95%]">
               <div className="absolute w-[110px] h-[110px] bg-[#eef5ff]/85 rounded-full -top-[50px] left-[30px]"></div>
          </div>
        </motion.div>
      </div>

      {/* Heading */}
      <motion.h2
        className="text-6xl md:text-8xl font-black mb-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        style={{ fontFamily: "'Varela Round', 'Nunito', 'Fredoka', 'Quicksand', sans-serif" }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Schedule
      </motion.h2>

      {/* Day Toggle */}
      <div className="flex bg-white/10 p-1.5 rounded-full mb-8 backdrop-blur-md shadow-lg border border-white/20">
        <button
          onClick={() => handleChangeDay(1)}
          className={`px-8 py-2 md:py-2.5 rounded-full font-bold text-base md:text-lg transition-all duration-300 ${activeDay === 1 ? 'bg-white text-blue-500 shadow-md transform scale-105' : 'text-white hover:bg-white/20'}`}
        >
          Day 1
        </button>
        <button
          onClick={() => handleChangeDay(2)}
          className={`px-8 py-2 md:py-2.5 rounded-full font-bold text-base md:text-lg transition-all duration-300 ${activeDay === 2 ? 'bg-white text-blue-500 shadow-md transform scale-105' : 'text-white hover:bg-white/20'}`}
        >
          Day 2
        </button>
      </div>

      <p className="text-white/90 text-xl md:text-2xl font-semibold mb-12 drop-shadow-md tracking-wide">
        {activeDay === 1 ? "Saturday, April 25, 2026" : "Sunday, April 26, 2026"}
      </p>

      {/* Main Carousel Area */}
      <div className="flex items-center justify-center w-full max-w-5xl px-4 relative min-h-[300px] mb-12 group">
        
        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          disabled={activeEventIndex === 0}
          className={`shrink-0 p-3 md:p-4 rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 ${activeEventIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 hover:scale-105 cursor-pointer hover:border-white/60'} mr-4 sm:mr-8 md:mr-16 z-20 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
          aria-label="Previous event"
        >
          <ChevronLeft size={32} strokeWidth={2.5} />
        </button>

        {/* Card */}
        <div className="flex-1 w-full max-w-2xl relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeDay}-${activeEventIndex}`}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full h-[400px] md:h-[450px] bg-[#82B1FF]/40 backdrop-blur-2xl border-2 border-white/20 rounded-3xl p-8 md:p-14 shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center text-center relative overflow-hidden"
            >
              {/* Glossy top highlight */}
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-t-3xl border-t border-white/30"></div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-5 drop-shadow-lg tracking-wide" style={{ fontFamily: "'Varela Round', 'Nunito', 'Fredoka', 'Quicksand', sans-serif" }}>
                {currentEvent.title}
              </h3>
              
              <p className="text-[#e2eeff] text-base md:text-lg font-bold mb-6 tracking-widest flex items-center justify-center gap-3 w-full drop-shadow-sm uppercase">
                <span>{currentEvent.time}</span>
                {currentEvent.location && (
                  <>
                    <span className="text-white/60 font-black">|</span>
                    <span>{currentEvent.location}</span>
                  </>
                )}
              </p>

              <div className="w-16 h-1 bg-white/30 rounded-full mb-6"></div>

              <p className="text-white/90 text-lg md:text-xl font-medium max-w-lg leading-relaxed drop-shadow-sm">
                {currentEvent.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          disabled={activeEventIndex === currentEvents.length - 1}
          className={`shrink-0 p-3 md:p-4 rounded-full border-2 border-white/30 bg-white/10 text-white backdrop-blur-md transition-all duration-300 ${activeEventIndex === currentEvents.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-white/20 hover:scale-105 cursor-pointer hover:border-white/60'} ml-4 sm:ml-8 md:ml-16 z-20 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]`}
          aria-label="Next event"
        >
          <ChevronRight size={32} strokeWidth={2.5} />
        </button>
      </div>

      <p className="text-red-500 font-bold italic text-center mb-16 relative z-10 text-lg md:text-xl tracking-wider drop-shadow-sm">
        Schedule is tentative and subject to change.
      </p>

      {/* Bottom Timeline */}
      <div className="w-full max-w-6xl px-4 md:px-8 mt-4 relative z-10 overflow-x-auto pb-4 custom-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <style dangerouslySetInnerHTML={{__html: `
          .custom-scrollbar::-webkit-scrollbar { display: none; }
        `}} />
        <div className="relative flex items-center justify-between min-w-[800px] w-full mt-6 py-4">
          
          {/* Connecting Line background */}
          <div className="absolute top-[28px] md:top-[32px] transform -translate-y-1/2 left-0 w-full h-[2px] bg-white/20 z-0 rounded-full"></div>
          
          {/* Active Connecting Line segment */}
          <div 
            className="absolute top-[28px] md:top-[32px] transform -translate-y-1/2 left-0 h-[3px] bg-white transition-all duration-500 z-0 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            style={{ 
              width: `${(activeEventIndex / (currentEvents.length - 1)) * 100}%` 
            }}
          ></div>

          {currentEvents.map((event, index) => {
            const isActive = index === activeEventIndex;
            const isPassed = index <= activeEventIndex;
            
            return (
              <div 
                key={index}
                className="flex flex-col items-center cursor-pointer group flex-1 shrink-0 px-1 relative z-10"
                onClick={() => setActiveEventIndex(index)}
              >
                {/* Timeline Dot Wrapper to increase click area */}
                <div className="py-2">
                  <div 
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 md:border-3 transition-all duration-500 flex items-center justify-center shrink-0
                      ${isActive 
                        ? 'bg-white border-white scale-125 shadow-[0_0_20px_rgba(255,255,255,0.9)]' 
                        : isPassed 
                          ? 'bg-[#1a2d53] border-white/80 group-hover:bg-[#253966] group-hover:border-white shadow-[0_0_8px_rgba(255,255,255,0.4)]' 
                          : 'bg-[#1a2d53] border-white/40 group-hover:border-white/70 group-hover:bg-[#1f335e]'
                      }`}
                  ></div>
                </div>
                
                {/* Time Label */}
                <span 
                  className={`mt-3 text-xs md:text-sm font-bold transition-all duration-300 whitespace-nowrap tracking-wide
                    ${isActive 
                      ? 'text-white scale-110 drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]' 
                      : isPassed
                        ? 'text-white/80 group-hover:text-white'
                        : 'text-white/50 group-hover:text-white/70'
                    }`}
                >
                  {event.time.split(" ")[0]} <span className="text-[10px] md:text-xs">{event.time.split(" ")[1]}</span>
                </span>
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;

