import { motion } from "motion/react";

export default function SponserCard({ SponserData }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 md:gap-10 w-full mb-10">
      {SponserData.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center h-10 md:h-16 group overflow-visible"
        >
          <div className="h-full w-auto flex items-center justify-center p-2 z-10 transition-transform duration-300 transform group-hover:scale-110">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-auto object-contain filter drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </motion.a>
      ))}
    </div>
  );
}
