"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface TimelinePathProps {
  path: string;
}

const TimelinePath: React.FC<TimelinePathProps> = ({ path }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Link path drawing to global scroll progress
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none w-full h-full overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 3000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="none"
      >
        {/* Faint Guide Path (always visible backdrop) */}
        <path
          d={path}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="4"
          strokeDasharray="10 10"
          strokeLinecap="round"
        />

        {/* Glow effect path */}
        <motion.path
          d={path}
          stroke="white"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength, opacity: 0.2, filter: "blur(12px)" }}
        />

        {/* Main animated dashed path */}
        <motion.path
          d={path}
          stroke="white"
          strokeWidth="4"
          strokeDasharray="20 20"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};

export default TimelinePath;
