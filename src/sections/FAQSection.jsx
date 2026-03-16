import { useState } from "react";
import UnderwaterBubbleSection from "../animations/UnderwaterBubbleSection";
import SwimmingFish from "../animations/SwimmingFish";
import Footer from "../components/Footer";
import FaqCard from "../cards/FaqCard";
import { faqData } from "../data/FaqData";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full min-h-screen overflow-hidden bg-[linear-gradient(180deg,#62cff4,#2c67f2)]"
    >
      {/* Absolute background bubbles spanning the section */}
      <UnderwaterBubbleSection />

      {/* Ambient background swimming fish */}
      <SwimmingFish />

      {/* FAQ Content Layered on Top */}
      <div className="relative z-10 text-white w-full max-w-4xl px-4 py-20 flex flex-col items-center mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 md:mb-12 drop-shadow-lg text-center">
          🌙 Dream in AI Hackathon-FAQ   
        </h2>
        <h4>Got questions? We’ve got answers! 💭</h4>
        <h4>If you’re curious, excited, or a little nervous, you’re in the right place ✨</h4>

        <div className="w-full bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-2xl space-y-2">
          {faqData.map((faq, index) => (
            <FaqCard
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default FAQSection;
