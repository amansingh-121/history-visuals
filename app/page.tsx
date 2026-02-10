"use client";

import React, { useRef } from "react";
import Image from "next/image";
import TimelinePath from "@/components/TimelinePath";
import CastleCard from "@/components/CastleCard";
import FogOverlay from "@/components/FogOverlay";
import { TIMELINE_DATA } from "@/app/data/timeline";

// A vertical S-shaped path that spans 3000px in height (matches viewBox)
// Passes through:
// 1. Left Card (~17.5% x, 15% y) -> 175, 450
// 2. Right Card (~82.5% x, 45% y) -> 825, 1350
// 3. Left Card (~17.5% x, 75% y) -> 175, 2250
const PATH_DATA =
  "M 500 0 C 500 200, 175 200, 175 450 C 175 800, 825 1000, 825 1350 C 825 1700, 175 1900, 175 2250 C 175 2600, 500 2800, 500 3000";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  return (
    <main
      ref={containerRef}
      className="relative w-full bg-black font-serif text-white selection:bg-gold selection:text-black"
      style={{ height: "400vh" }}
    >
      {/* 1. Background Layer (Fixed) */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1570784332176-fdd73da66f03?q=80&w=2071&auto=format&fit=crop"
          alt="Antique Map Background"
          fill
          className="object-cover transition-opacity duration-1000"
          style={{ filter: "brightness(0.3) contrast(1.2)" }}
          priority
        />
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/60" />{" "}
        {/* General darkening */}
      </div>

      <FogOverlay />

      {/* 2. Hero Section (Fixed until scrolled away) */}
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-20 pointer-events-none">
        <div className="transform transition-transform duration-1000 hover:scale-105">
          <h1 className="text-5xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600 font-serif tracking-tight drop-shadow-2xl text-center px-4 leading-tight">
            The Ages of Man
          </h1>
        </div>
        <div className="mt-8 flex flex-col items-center animate-pulse">
          <span className="text-amber-200/60 text-xs tracking-[0.4em] uppercase font-sans mb-4">
            Scroll to Begin
          </span>
          <div className="w-[1px] h-32 bg-gradient-to-b from-amber-500/50 to-transparent" />
        </div>
      </div>

      {/* 3. Narrative Content (Scrollable) */}
      <div className="relative w-full h-full z-30 max-w-[1600px] mx-auto">
        {/* Timeline Line Overlay */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible mix-blend-screen">
          <TimelinePath path={PATH_DATA} />
        </div>

        {/* Timeline Items */}
        {TIMELINE_DATA.map((item) => (
          <CastleCard
            key={item.id}
            {...item}
            // Passing 0 because yPercentage is handled inside the component via absolute top
            // wait, if I remove the wrapper, the component uses item.yPercentage
            // and positions itself absolutely.
          />
        ))}

        {/* Footer Marker */}
        <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 text-center pb-24 opacity-60">
          <div className="w-16 h-1 bg-amber-500/30 mx-auto mb-4 rounded-full" />
          <span className="text-amber-500 font-serif text-2xl tracking-widest uppercase">
            Present Day
          </span>
        </div>
      </div>
    </main>
  );
}
