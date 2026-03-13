import { motion } from "motion/react";
import sponserData from "../data/SponsersData.js";
import Clouds from "../animations/clouds.jsx";
import SponserCard from "../cards/SponsersCard.jsx";

const SponserSection = () => {
  return (
    <section
      id="sponser"
      className="relative w-screen min-h-screen pb-32 bg-transparent"
    >
      <Clouds />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 flex flex-col items-center">
        {Object.entries(sponserData).map(([category, items]) => (
          <div key={category} className="w-full flex flex-col items-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-center text-white mb-8 capitalize tracking-wider drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              {category}
            </motion.h2>

            <SponserCard SponserData={items} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SponserSection;
