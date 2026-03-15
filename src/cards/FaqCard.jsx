import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
const FaqCard = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-white/10">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className="text-xl font-semibold text-white group-hover:text-blue-700 transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          className="text-white/50 group-hover:text-white"
        >
          <Plus size={24} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-6 text-blue-100/80 leading-relaxed italic whitespace-pre-line">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FaqCard;
