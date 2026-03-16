import React, { useState, useEffect } from "react";
import {
  Home,
  Handshake,
  Lightbulb,
  Calendar,
  User,
  CircleQuestionMark,
  Mail,
} from "lucide-react";
import { useLenis } from "./SmoothScroll";
import Dock from "../assets/Dock";

const Navbar = () => {
  const lenis = useLenis();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element && lenis) {
      lenis.scrollTo(element, { offset: 0 });
    } else if (element) {
      // Fallback just in case Lenis isn't ready
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { 
      icon: <Home size={24} color="white" />, 
      label: "Home", 
      onClick: () => scrollToSection("home") 
    },
    {
      icon: <Lightbulb size={24} color="white" />,
      label: "Theme",
      onClick: () => scrollToSection("theme")
    },
    {
      icon: <Calendar size={24} color="white" />,
      label: "Schedule",
      onClick: () => scrollToSection("schedule")
    },
    {
      icon: <User size={24} color="white" />,
      label: "Alumini",
      onClick: () => scrollToSection("alumini")
    },
    {
      icon: <Handshake size={24} color="white" />,
      label: "Sponser",
      onClick: () => scrollToSection("sponser")
    },
    {
      icon: <CircleQuestionMark size={24} color="white" />,
      label: "FAQ",
      onClick: () => scrollToSection("faq")
    },
    {
      icon: <Mail size={24} color="white" />,
      label: "Contact",
      onClick: () => scrollToSection("contact")
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <nav className="flex justify-center fixed w-full z-[100]">
      <Dock
        items={navLinks}
        panelHeight={isMobile ? 55 : 68}
        baseItemSize={isMobile ? 35 : 50}
        magnification={isMobile ? 55 : 70}
      />
    </nav>
  );
};

export default Navbar;
