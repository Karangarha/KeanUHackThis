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

      <ParallaxTransitionSection />
      <FAQSection />
      <ContectSection />
    </>
  );
};

export default HomePage;
