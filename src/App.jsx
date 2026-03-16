import "./index.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SmoothScroll from "./components/SmoothScroll";

function App() {
  return (
    <SmoothScroll>
      <Router>
        <Navbar />
        {/* KeanUHackThis Fixed Logo - Top Left */}
        <img
          id="hackathon-fixed-logo"
          src="https://www.keanuhackthis.com/img/HACKATHON_LOGO_2026_-fotor-bg-remover-2025102105342.png"
          alt="KeanUHackThis 2026 Logo"
          style={{
            display: "block",
            maxWidth: "120px",
            minWidth: "80px",
            position: "absolute",
            left: "20px",
            top: "20px",
            width: "12%",
            zIndex: "10000",
            pointerEvents: "none",
          }}
        />

        {/* MLH Trust Badge - Top Right */}
        <a
          id="mlh-trust-badge"
          style={{
            display: "block",
            maxWidth: "110px",
            minWidth: "70px",
            position: "fixed",
            right: "20px",
            top: "0",
            width: "10%",
            zIndex: "10000",
          }}
          href="https://www.mlh.com/seasons/2026/events"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-gray.svg"
            alt="Major League Hacking 2026 Hackathon Season"
            style={{ width: "100%" }}
          />
        </a>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </SmoothScroll>
  );
}

export default App;
