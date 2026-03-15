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
import Dock from "../assets/Dock";

const Navbar = () => {
  const navLinks = [
    { icon: <Home size={24} color="white" />, label: "Home", href: "#home" },
    {
      icon: <Handshake size={24} color="white" />,
      label: "Sponser",
      href: "#sponser",
    },
    {
      icon: <Lightbulb size={24} color="white" />,
      label: "Theme",
      href: "#theme",
    },
    {
      icon: <Calendar size={24} color="white" />,
      label: "Schedule",
      href: "#schedule",
    },
    {
      icon: <User size={24} color="white" />,
      label: "Alumini",
      href: "#alumini",
    },
    {
      icon: <CircleQuestionMark size={24} color="white" />,
      label: "FAQ",
      href: "#faq",
    },
    {
      icon: <Mail size={24} color="white" />,
      label: "Contact",
      href: "#contact",
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
