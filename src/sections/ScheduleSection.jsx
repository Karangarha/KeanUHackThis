import { motion } from "motion/react";

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

const day1Data = [
  {
    day: "Day 1 - Morning Kickoff (8 AM - 11 AM)",
    events: [
      { time: "8:00 AM", title: "Welcome & Check-In", description: "Arrival, breakfast, settle in" },
      { time: "9:00 AM", title: "Opening Ceremony", description: "Intro, rules, announcements" },
      { time: "9:30 AM", title: "Team Formation", description: "Form teams, brainstorm ideas" },
      { time: "10:00 AM", title: "Hacking Begins", description: "Coding, planning, prototyping" },
      { time: "10:45 - 11:00 AM", title: "Companies Arrive", description: "Sponsors set up for Career Expo" },
    ],
  },
  {
    day: "Career Expo + Workshops (11 AM - 3 PM)",
    events: [
      { time: "11:00AM - 1:00PM", title: "Group A at Expo", description: "Companies will meet students in rotating time blocks" },
      { time: "12:00PM - 3:00PM", title: "Group B at Expo", description: "Companies will meet students in rotating time blocks" },
      { time: "12:30PM - 1:30PM", title: "Workshop 1", description: "1-hour blocks running alongside the expo" },
      { time: "12:30PM - 1:30PM", title: "Lunch", description: "Hackers eat while working/attending workshops" },
      { time: "1:30PM - 2:30PM", title: "Workshop 2", description: "1-hour blocks running alongside the expo" },
      { time: "2:30PM - 3:30PM", title: "Workshop 3", description: "1-hour blocks running alongside the expo" },
      { time: "3:00 PM", title: "Career Expo Ends", description: "Thank-yous to sponsors" },
    ],
  },
  {
    day: "Afternoon & Early Evening (3 PM - 7PM)",
    events: [
      { time: "3:00PM", title: "Hacking Continues", description: "Hacking Continues" },
      { time: "4:00PM - 6:00PM", title: "Social Break + Snacks", description: "Light refreshments and activities (games, networking, mini-contests, etc.) while hacking progresses." },
      { time: "6:00PM - 7:00PM", title: "Hacking Continues", description: "Hacking continues" },
    ],
  },
  {
    day: "Dinner & Evening Sessions (7 PM - 10 PM)",
    events: [
      { time: "7:00PM - 8:00PM", title: "Pizza Dinner", description: "1 pie per team; regroup, refuel, and prepare for long night" },
      { time: "8:00PM - 10:00PM", title: "Workshops & Hacking", description: "Optional technical workshops + strong hacking focus" },
    ],
  },
  {
    day: "Overnight Hacking (10 PM - 5 AM)",
    events: [
      { time: "10:00PM - 5:00AM", title: "Hacking Continues", description: "Hacking continues, snacks + coffee, mentors available for debugging, rest areas open" },
    ],
  },
];

const day2Data = [
  {
    day: "Day 2 (5 AM - 8 AM)",
    events: [
      { time: "5:00AM - 7:00 AM", title: "Final Stretch", description: "Teams polish presentations, finalize demos, and submit projects" },
      { time: "7:00AM", title: "Judging & Closing Ceremony", description: "Team pitches to judges, winners announced, Thanks-yous + group photos" },
      { time: "8:00 AM", title: "Event Ends", description: "Head home, sleep, and celebrate!" },
    ],
  },
];

const ScheduleSection = () => {
  const renderScheduleBlock = (daySchedule, dayIndex) => (
    <div key={dayIndex} className="mb-20">
      <h3 className="text-3xl md:text-4xl font-bold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-white to-[#82b1ff] border-b-2 border-[#82b1ff]/30 pb-4 inline-block drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
        {daySchedule.day}
      </h3>
      
      <div className="relative border-l-2 border-[#82b1ff]/30 ml-4 md:ml-8 py-4 space-y-12">
        {daySchedule.events.map((event, eventIndex) => (
          <motion.div 
            key={eventIndex}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Timeline Node */}
            <div className="absolute -left-[9px] top-6 w-4 h-4 bg-[#0a0e27] border-2 border-[#82b1ff] rounded-full shadow-[0_0_10px_#82b1ff] z-10" />
            
            {/* Content Card */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-[#82b1ff]/50 transition-all duration-300 backdrop-blur-sm group cursor-pointer relative overflow-hidden shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
              <div className="absolute top-0 left-0 w-1 h-full bg-[#82b1ff] transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
              
              <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 mb-3">
                <span className="text-xl md:text-2xl font-bold text-[#82b1ff] min-w-[140px] drop-shadow-[0_0_8px_rgba(130,177,255,0.5)]">
                  {event.time}
                </span>
                <h4 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
                  {event.title}
                </h4>
              </div>
              <p className="text-gray-300 md:ml-[172px] text-lg font-light tracking-wide">
                {event.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="schedule" className="w-full min-h-screen py-24 flex flex-col items-center overflow-hidden">
      <motion.h2 
        {...glowAnimation}
        className="text-6xl md:text-8xl font-bold mb-20 text-center text-white"
      >
        Schedule
      </motion.h2>

      <div className="w-full max-w-[90rem] px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start mx-auto">
        {/* Left Column - Day 1 */}
        <div className="flex flex-col">
          {day1Data.map(renderScheduleBlock)}
        </div>

        {/* Right Column - Day 2 */}
        <div className="flex flex-col">
          {day2Data.map(renderScheduleBlock)}
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
