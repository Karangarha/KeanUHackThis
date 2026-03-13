import MainSection from "../sections/MainSection";
import SponserSection from "../sections/SponserSection";
import ParallaxTransitionSection from "../sections/ParallaxTransitionSection";
import ThemeSection from "../sections/ThemeSection";
import FAQSection from "../sections/FAQSection";
import ContectSection from "../sections/ContectSection";

const HomePage = () => {
  return (
    <>
      <MainSection />
      <ThemeSection />
      {/* Global Background Wrapper for Sponsors and Parallax to ensure seamless blending */}
      <div className="w-full bg-[linear-gradient(115deg,#62cff4,#2c67f2)]">
        <SponserSection />
        <ParallaxTransitionSection />
      </div>
      <FAQSection />
      <ContectSection />
    </>
  );
};

export default HomePage;
