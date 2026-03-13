import UnderwaterBubbleSection from "../animations/UnderwaterBubbleSection";
const FAQSection = () => {
  return (
    <section
      id="faq"
      className="relative w-full min-h-screen overflow-hidden bg-[linear-gradient(180deg,#62cff4,#2c67f2)]"
    >
      {/* Absolute background bubbles spanning the section */}
      <UnderwaterBubbleSection />

      {/* FAQ Content Layered on Top */}
      <div className="relative z-10 text-white w-full max-w-4xl px-4 py-20 flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 drop-shadow-lg text-center">
          Frequently Asked Questions
        </h2>

        <div className="w-full space-y-4">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 w-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">What is a hackathon?</h3>
            <p className="text-white/80">
              A hackathon is an invention marathon where students collaborate to
              build creative software or hardware projects from scratch within a
              set timeframe.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 w-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Who can attend?</h3>
            <p className="text-white/80">
              Any undergraduate or graduate university student can attend! No
              prior experience is required.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 w-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">
              How much does it cost?
            </h3>
            <p className="text-white/80">
              It is completely free! We will provide meals, swag, workspace, and
              Wi-Fi for all attendees.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
