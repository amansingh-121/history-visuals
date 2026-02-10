"use client";

import React from "react";

const FogOverlay = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Primary Fog Layer */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/10 via-transparent to-transparent opacity-40 animate-fog" />

      {/* Noise/Mist Texture Layer */}
      <div
        className="absolute inset-[-20%] opacity-[0.15] mix-blend-overlay animate-fog"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Secondary Fog Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white/10" />
    </div>
  );
};

export default FogOverlay;
