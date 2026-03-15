import React from "react";

const Footer = () => {
  return (
    <footer className="relative w-full flex flex-col justify-end mt-[30vh]">
      {/* Background Image (Sandbg) - Set to cover the entire footer and sit behind */}
      <img
        src="/sandbg.png"
        alt="Deep Sand Background"
        className="absolute -bottom-30 left-0 w-full h-auto block pointer-events-none"
      />
      {/* Foreground Image (Sand1) - Sits on top of sandbg, responsive height */}
      <img
        src="/sand1.png"
        alt="Sandy Seabed Foreground"
        className="absolute -bottom-20 left-0 z-10 w-full h-auto object-bottom pointer-events-none"
      />

      {/* Text Content - Positioned absolutely at the very bottom over both images */}
      <div className="absolute bottom-8 inset-x-0 z-20 flex flex-col items-center gap-2 text-white/90 font-medium tracking-wide drop-shadow-md px-4">
        <p className="text-sm md:text-lg font-semibold uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-center">
          made with love from kean hackathon team
        </p>
        <a
          href="mailto:acmkean@kean.edu"
          className="text-sm md:text-base text-blue-200 hover:text-white transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          contact us:{" "}
          <span className="underline decoration-2 underline-offset-4">
            acmkean@kean.edu
          </span>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
