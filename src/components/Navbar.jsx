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

  return (
    <nav className="flex justify-center fixed w-full">
      <Dock
        items={navLinks}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </nav>
  );
};

export default Navbar;
