"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import FogOverlay from "@/components/FogOverlay";
import { TIMELINE_DATA } from "@/app/data/timeline";
import ExpandableTimelineItem from "@/components/ExpandableTimelineItem";
import VerticalZigZagPath from "@/components/VerticalZigZagPath";
import LandingPageItem from "@/components/LandingPageItem";
import IndiascopeDashboard from "@/components/IndiascopeDashboard";
import CategoryDetails from "@/components/CategoryDetails";
import "@/styles/indiascope.css";
import "@/styles/history-detail.css";

type ViewState = "intro" | "dashboard" | "category" | "periods" | "timeline";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);
  const [view, setView] = useState<ViewState>("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<string>("history");
  const [selectedPeriod, setSelectedPeriod] = useState<"ancient" | "medieval" | "modern" | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter timeline data
  const filteredTimelineData = useMemo(() => {
    if (!selectedPeriod) return [];
    return TIMELINE_DATA.filter((item) => item.period === selectedPeriod);
  }, [selectedPeriod]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handlePeriodSelect = (period: "ancient" | "medieval" | "modern" | null) => {
    if (period) {
      setSelectedPeriod(period);
      setView("timeline");
    } else {
      setSelectedPeriod(null);
      setView("periods");
    }
    setExpandedId(null);
  };

  const handleCategoryClick = (id: string) => {
    if (id === "timeline") {
      setView("periods");
    } else {
      setSelectedCategory(id);
      setView("category");
    }
  };

  return (
    <main
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#1a120b] font-serif text-[#f8f1e7] selection:bg-amber-500 selection:text-black overflow-x-hidden"
    >
      {/* Background Map - Consistent across all views */}
      <div className="fixed inset-0 z-0 h-screen w-screen pointer-events-none">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/d/d3/India_map_1700_1792.jpg"
          alt="Historical India Map"
          fill
          className="object-cover transition-opacity duration-1000 opacity-40 grayscale brightness-[0.3]"
          priority
        />
        <div className="absolute inset-0 bg-[#1a120b]/60" />
      </div>

      <FogOverlay />

      <AnimatePresence mode="wait">

        {view === "dashboard" && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <IndiascopeDashboard onCategoryClick={handleCategoryClick} />
          </motion.div>
        )}

        {view === "category" && (
          <motion.div key="category" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <CategoryDetails
              categoryType={selectedCategory}
              onBack={() => setView("dashboard")}
              onTimelineClick={() => setView("periods")}
            />
          </motion.div>
        )}

        {view === "periods" && (
          <motion.div key="periods" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10 w-full">
            {/* Periods Header */}
            <header className="relative pt-32 pb-20 text-center space-y-6 z-20">
              <button
                onClick={() => setView("dashboard")}
                className="absolute top-12 left-12 flex items-center gap-3 group text-white/40 hover:text-amber-200 transition-all duration-300 bg-black/40 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/5 hover:border-amber-500/30"
              >
                <span className="text-xl">←</span>
                <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold">Dashboard</span>
              </button>

              <div className="space-y-2">
                <h1 className="text-7xl md:text-9xl font-serif tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-400 to-amber-900 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                  ITIHAS
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-amber-500/50" />
                  <p className="text-amber-200/80 text-sm md:text-base tracking-[0.6em] uppercase font-sans font-light">
                    CHOOSE YOUR JOURNEY
                  </p>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-amber-500/50" />
                </div>
              </div>
            </header>

            {/* Vertical Zig-Zag Flow for Period Selection */}
            <div className="relative pb-48 space-y-0 min-h-screen">
              <VerticalZigZagPath count={3} />

              <div className="relative">
                {[
                  { id: "ancient", title: "Ancient", desc: "The Dawn of Civilization", img: "/PHOTOS/unnamed-removebg-preview.png" },
                  { id: "medieval", title: "Medieval", desc: "The Era of Empires", img: "/PHOTOS/mughal empire.png" },
                  { id: "modern", title: "Modern", desc: "The Road to Republic", img: "/PHOTOS/MODERN INDIA.png" },
                ].map((era, idx) => (
                  <LandingPageItem
                    key={era.id}
                    id={era.id}
                    title={era.title}
                    description={era.desc}
                    image={era.img}
                    index={idx}
                    onClick={() => handlePeriodSelect(era.id as any)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === "timeline" && (
          <motion.div key="timeline" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative z-10">
            {/* Sticky Header */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 px-8 py-3 bg-[#1a120b]/60 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
              <button
                onClick={() => handlePeriodSelect(null)}
                className="flex items-center gap-2 group text-white/60 hover:text-white transition-colors border-r border-white/10 pr-6 mr-2"
              >
                <span>←</span>
                <span className="font-sans text-xs uppercase tracking-widest font-bold">Back</span>
              </button>
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <h2 className="text-xl md:text-2xl font-serif text-amber-200 capitalize tracking-tight">
                  {selectedPeriod} Timeline
                </h2>
              </div>
            </div>

            {/* Vertical Timeline Flow */}
            <div className="relative pt-48 pb-48 space-y-0 min-h-[1200px]">
              <VerticalZigZagPath count={filteredTimelineData.length} />

              <div className="space-y-0">
                {filteredTimelineData.map((item, idx) => (
                  <ExpandableTimelineItem
                    key={item.id}
                    item={item}
                    index={idx}
                    isExpanded={expandedId === item.id}
                    onToggle={() => toggleExpand(item.id)}
                  />
                ))}
              </div>

              <div className="text-center py-24 opacity-60">
                <div className="w-16 h-1 bg-amber-500/30 mx-auto mb-4 rounded-full" />
                <span className="text-amber-500 font-serif text-2xl tracking-widest uppercase">
                  End of {selectedPeriod} Era
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

